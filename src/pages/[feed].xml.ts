import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { blogArticlePath, getCompletePublishedBlogPairs, type BlogPair } from '../data/blog';

const site = 'https://2handsacademy.com';

export const getStaticPaths: GetStaticPaths = async () => {
  const pairs = getCompletePublishedBlogPairs(await getCollection('blog'));
  return pairs.length > 0 ? [{ params: { feed: 'rss' }, props: { pairs } }] : [];
};

const escapeXml = (value: string) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

export const GET: APIRoute = ({ props }) => {
  const pairs = props.pairs as BlogPair[];
  const items = pairs
    .flatMap((pair) => [pair.fr, pair.en])
    .sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime())
    .map((entry) => {
      const url = new URL(blogArticlePath(entry.data.language, entry.data.slug), site).href;
      return `<item>
        <title>${escapeXml(entry.data.title)}</title>
        <link>${escapeXml(url)}</link>
        <guid isPermaLink="true">${escapeXml(url)}</guid>
        <description>${escapeXml(entry.data.excerpt)}</description>
        <pubDate>${entry.data.publishedAt.toUTCString()}</pubDate>
        <dc:language>${entry.data.language}</dc:language>
        <dc:creator>${escapeXml(entry.data.author)}</dc:creator>
      </item>`;
    })
    .join('\n');

  const latestDate = pairs
    .flatMap((pair) => [pair.fr, pair.en])
    .reduce((latest, entry) => entry.data.publishedAt > latest ? entry.data.publishedAt : latest, new Date(0));
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>2Hands — Conseils &amp; Insights</title>
    <link>${site}/</link>
    <description>Expert guidance for hotel spa leaders and teams in French and English.</description>
    <language>fr</language>
    <lastBuildDate>${latestDate.toUTCString()}</lastBuildDate>
    <atom:link xmlns:atom="http://www.w3.org/2005/Atom" href="${site}/rss.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(body, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
