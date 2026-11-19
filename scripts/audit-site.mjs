import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative, resolve, sep } from 'node:path';

const root = resolve('dist');
const blogSourceRoot = resolve('src/content/blog');
const errors = [];
const pages = new Map();

async function collectHtml(directory) {
  const entries = await readdir(directory);
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry);
    const details = await stat(path);
    if (details.isDirectory()) files.push(...await collectHtml(path));
    else if (entry.endsWith('.html')) files.push(path);
  }
  return files;
}

function routeFor(file) {
  const path = relative(root, file).split(sep).join('/');
  if (path === 'index.html') return '/';
  if (path.endsWith('/index.html')) return `/${path.slice(0, -10)}`;
  return `/${path}`;
}

function matches(html, pattern) {
  return [...html.matchAll(pattern)].map((match) => match[1]);
}

function frontmatterValue(frontmatter, key) {
  const match = frontmatter.match(new RegExp(`^${key}:\\s*["']?([^"'\\n]+?)["']?\\s*$`, 'm'));
  return match?.[1].trim();
}

async function collectBlogSources() {
  let entries = [];
  try {
    entries = await readdir(blogSourceRoot);
  } catch {
    return [];
  }

  const posts = [];
  for (const filename of entries.filter((entry) => /\.mdx?$/.test(entry))) {
    const source = await readFile(join(blogSourceRoot, filename), 'utf8');
    const frontmatter = source.match(/^---\s*\n([\s\S]*?)\n---/)?.[1];
    if (!frontmatter) {
      errors.push(`blog source ${filename}: missing YAML frontmatter`);
      continue;
    }
    const language = frontmatterValue(frontmatter, 'language');
    const translationKey = frontmatterValue(frontmatter, 'translationKey');
    const slug = frontmatterValue(frontmatter, 'slug');
    const publishedAt = frontmatterValue(frontmatter, 'publishedAt');
    const draft = frontmatterValue(frontmatter, 'draft');
    if (!language || !translationKey || !slug || !publishedAt || !draft) {
      errors.push(`blog source ${filename}: audit requires language, translationKey, slug, publishedAt and draft`);
      continue;
    }
    posts.push({ filename, language, translationKey, slug, publishedAt: new Date(publishedAt), draft: draft === 'true' });
  }
  return posts;
}

for (const file of await collectHtml(root)) {
  const html = await readFile(file, 'utf8');
  pages.set(routeFor(file), html);
}

for (const [route, html] of pages) {
  const titles = matches(html, /<title>([^<]*)<\/title>/g);
  const descriptions = matches(html, /<meta name="description" content="([^"]*)"/g);
  const canonicals = matches(html, /<link rel="canonical" href="([^"]*)"/g);
  const h1s = matches(html, /<h1(?:\s[^>]*)?>([\s\S]*?)<\/h1>/g);
  const ids = matches(html, /\sid="([^"]+)"/g);

  if (titles.length !== 1 || !titles[0].trim()) errors.push(`${route}: expected one non-empty title`);
  if (descriptions.length !== 1 || !descriptions[0].trim()) errors.push(`${route}: expected one non-empty meta description`);
  if (canonicals.length !== 1) errors.push(`${route}: expected one canonical URL`);
  if (h1s.length !== 1) errors.push(`${route}: expected one h1, found ${h1s.length}`);
  if (!html.includes('hreflang="en"') || !html.includes('hreflang="fr"') || !html.includes('hreflang="x-default"')) errors.push(`${route}: incomplete hreflang links`);
  if (!html.includes('application/ld+json')) errors.push(`${route}: missing structured data`);
  if (new Set(ids).size !== ids.length) errors.push(`${route}: duplicate id attribute`);

  for (const tag of html.match(/<img\b[^>]*>/g) || []) {
    if (!/\salt="[^"]*"/.test(tag)) errors.push(`${route}: image missing alt attribute`);
    if (!/\swidth="\d+"/.test(tag) || !/\sheight="\d+"/.test(tag)) errors.push(`${route}: image missing intrinsic dimensions`);
  }

  for (const href of matches(html, /\shref="([^"]+)"/g)) {
    if (/^(?:https?:|mailto:|tel:|#)/.test(href)) continue;
    const [path, hash] = href.split('#');
    const normalized = path || route;
    const target = pages.get(normalized);
    if (!target) {
      const asset = resolve(root, normalized.replace(/^\/+/, ''));
      let assetExists = false;
      try {
        assetExists = (await stat(asset)).isFile();
      } catch {
        assetExists = false;
      }
      if (!assetExists) errors.push(`${route}: broken internal link ${href}`);
      continue;
    }
    if (hash && !target.includes(`id="${hash}"`)) errors.push(`${route}: missing anchor target ${href}`);
  }

  if (/Details to confirm|Images to confirm|Source to verify|Détails à confirmer|Visuels à confirmer|Source à vérifier|Prototype form|Formulaire prototype/.test(html)) {
    errors.push(`${route}: contains internal placeholder language`);
  }
}

const sitemap = await readFile(join(root, 'sitemap.xml'), 'utf8');
const rssPath = join(root, 'rss.xml');
let rss = null;
try {
  rss = await readFile(rssPath, 'utf8');
} catch {
  rss = null;
}
const frenchHub = '/conseils/';
const englishHub = '/en/insights/';
const frenchArticles = [...pages.keys()].filter((route) => route.startsWith(frenchHub) && route !== frenchHub);
const englishArticles = [...pages.keys()].filter((route) => route.startsWith(englishHub) && route !== englishHub);
const blogIsPublic = pages.has(frenchHub) || pages.has(englishHub) || frenchArticles.length > 0 || englishArticles.length > 0;
const blogSources = await collectBlogSources();
const now = new Date();
const publishableByKey = new Map();

for (const post of blogSources) {
  const route = post.language === 'fr' ? `${frenchHub}${post.slug}/` : `${englishHub}${post.slug}/`;
  const individuallyPublishable = !post.draft && post.publishedAt <= now;
  if (!individuallyPublishable && pages.has(route)) errors.push(`${route}: draft or future-dated blog source generated a public route`);
  if (!individuallyPublishable && sitemap.includes(`<loc>https://2handsacademy.com${route}</loc>`)) errors.push(`${route}: draft or future-dated blog source entered sitemap`);
  if (individuallyPublishable) {
    const translations = publishableByKey.get(post.translationKey) ?? {};
    translations[post.language] = post;
    publishableByKey.set(post.translationKey, translations);
  }
}

for (const [translationKey, translations] of publishableByKey) {
  const completePair = translations.fr && translations.en;
  for (const language of ['fr', 'en']) {
    const post = translations[language];
    if (!post) continue;
    const route = language === 'fr' ? `${frenchHub}${post.slug}/` : `${englishHub}${post.slug}/`;
    if (completePair && !pages.has(route)) errors.push(`${route}: complete publishable pair ${translationKey} did not generate a route`);
    if (!completePair && pages.has(route)) errors.push(`${route}: incomplete bilingual pair ${translationKey} generated a route`);
  }
}

if (!blogIsPublic) {
  if (pages.has(frenchHub) || pages.has(englishHub)) errors.push('empty blog hub generated without publishable content');
  if (rss !== null) errors.push('/rss.xml: empty RSS feed generated without publishable content');
  if (/(?:\/conseils\/|\/en\/insights\/)/.test(sitemap)) errors.push('sitemap contains blog URLs while the blog is unpublished');
  for (const route of ['/', '/en/']) {
    const html = pages.get(route) ?? '';
    if (/href="\/(?:conseils|en\/insights)\/"/.test(html)) errors.push(`${route}: blog navigation exposed while the blog is unpublished`);
  }
} else {
  if (!pages.has(frenchHub) || !pages.has(englishHub)) errors.push('public blog must generate both French and English hubs');
  if (frenchArticles.length === 0 || englishArticles.length === 0) errors.push('public blog must contain at least one article in each language');
  if (rss === null) errors.push('/rss.xml: missing for public blog');

  for (const [route, requiredType] of [[frenchHub, 'CollectionPage'], [englishHub, 'CollectionPage']]) {
    const html = pages.get(route) ?? '';
    if (!html.includes(`"@type":"${requiredType}"`) || !html.includes('"@type":"ItemList"')) errors.push(`${route}: missing collection structured data`);
    if (!html.includes('rel="alternate" type="application/rss+xml"')) errors.push(`${route}: missing RSS discovery link`);
  }

  for (const route of [...frenchArticles, ...englishArticles]) {
    const html = pages.get(route) ?? '';
    const canonical = matches(html, /<link rel="canonical" href="([^"]*)"/g)[0];
    const otherLanguage = route.startsWith(frenchHub) ? 'en' : 'fr';
    const counterpart = matches(html, new RegExp(`<link rel="alternate" hreflang="${otherLanguage}" href="([^"]*)"`, 'g'))[0];
    if (!html.includes('<meta property="og:type" content="article"')) errors.push(`${route}: missing article Open Graph type`);
    if (!html.includes('property="article:published_time"')) errors.push(`${route}: missing article publication metadata`);
    if (!html.includes('"@type":"BlogPosting"')) errors.push(`${route}: missing BlogPosting structured data`);
    if (!html.includes('"@type":"BreadcrumbList"')) errors.push(`${route}: missing BreadcrumbList structured data`);
    if (!html.includes('rel="alternate" type="application/rss+xml"')) errors.push(`${route}: missing RSS discovery link`);
    if (!canonical || !sitemap.includes(`<loc>${canonical}</loc>`)) errors.push(`${route}: missing from sitemap`);
    if (!counterpart) errors.push(`${route}: missing reciprocal language URL`);
    else {
      const counterpartPath = new URL(counterpart).pathname;
      if (!pages.has(counterpartPath)) errors.push(`${route}: hreflang counterpart does not exist: ${counterpartPath}`);
      else if (!(pages.get(counterpartPath) ?? '').includes(`href="${canonical}"`)) errors.push(`${route}: hreflang counterpart is not reciprocal`);
    }
    if (rss !== null && canonical && !rss.includes(`<link>${canonical}</link>`)) errors.push(`${route}: missing from RSS feed`);
  }

  for (const route of ['/', '/en/']) {
    const expectedHub = route === '/' ? frenchHub : englishHub;
    if (!(pages.get(route) ?? '').includes(`href="${expectedHub}"`)) errors.push(`${route}: public blog missing from navigation/footer`);
  }
  if (rss !== null) {
    if (!rss.startsWith('<?xml version="1.0" encoding="UTF-8"?>')) errors.push('/rss.xml: missing XML declaration');
    if (!rss.includes('<rss version="2.0"') || !rss.includes('<channel>')) errors.push('/rss.xml: invalid RSS channel structure');
    if (!rss.includes('<dc:language>fr</dc:language>') || !rss.includes('<dc:language>en</dc:language>')) errors.push('/rss.xml: both languages are required');
  }
}

if (errors.length) {
  console.error(`Site audit failed with ${errors.length} issue(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Site audit passed: ${pages.size} routes, metadata, headings, images, links and anchors checked.`);
