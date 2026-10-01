import { readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

// Cloudflare Pages looks for the closest physical 404.html file. Astro's
// directory build format nests dotted routes, so promote the French error
// page to /fr/404.html after every production build.
const nestedFrench404 = resolve('dist/fr/404.html/index.html');
const french404 = resolve('dist/fr/404.html');
const html = await readFile(nestedFrench404);

await rm(dirname(nestedFrench404), { recursive: true });
await writeFile(french404, html);
