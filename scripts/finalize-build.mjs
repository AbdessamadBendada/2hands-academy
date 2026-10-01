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
