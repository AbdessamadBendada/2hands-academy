import { readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

// Cloudflare Pages looks for the closest physical 404.html file. Astro's
// directory build format nests dotted routes, so promote the English error
// page to /en/404.html after every production build.
const nestedEnglish404 = resolve('dist/en/404.html/index.html');
const english404 = resolve('dist/en/404.html');
const html = await readFile(nestedEnglish404);

await rm(dirname(nestedEnglish404), { recursive: true });
await writeFile(english404, html);

// Astro's sitemap integration always emits an index plus numbered chunks.
// This site has a single small sitemap, so also publish that chunk directly at
// the conventional /sitemap.xml URL. Keep the generated files available so an
// already-submitted Search Console sitemap continues working unchanged.
const generatedSitemap = resolve('dist/sitemap-0.xml');
const directSitemap = resolve('dist/sitemap.xml');
const sitemapXml = await readFile(generatedSitemap);

await writeFile(directSitemap, sitemapXml);
