import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative, resolve, sep } from 'node:path';

const root = resolve('dist');
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

if (errors.length) {
  console.error(`Site audit failed with ${errors.length} issue(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Site audit passed: ${pages.size} routes, metadata, headings, images, links and anchors checked.`);
