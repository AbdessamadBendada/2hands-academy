import type { CollectionEntry } from 'astro:content';
import type { Language } from './site';

export const blogRoutes = {
  fr: '/conseils/',
  en: '/en/insights/',
} as const;

export function blogArticlePath(language: Language, slug: string) {
  return `${blogRoutes[language]}${slug}/`;
}

export type BlogEntry = CollectionEntry<'blog'>;

export interface BlogPair {
  translationKey: string;
  fr: BlogEntry;
  en: BlogEntry;
}

function compareNewestFirst(a: BlogEntry, b: BlogEntry) {
  return b.data.publishedAt.getTime() - a.data.publishedAt.getTime();
}

export function getCompletePublishedBlogPairs(entries: BlogEntry[], now = new Date()): BlogPair[] {
  const publishable = entries.filter((entry) => !entry.data.draft && entry.data.publishedAt <= now);
  const slugsByLanguage = new Map<string, string>();
  const entriesByTranslation = new Map<string, Partial<Record<Language, BlogEntry>>>();

  for (const entry of publishable) {
    const slugKey = `${entry.data.language}:${entry.data.slug}`;
    const existingSlugEntry = slugsByLanguage.get(slugKey);
    if (existingSlugEntry) {
      throw new Error(`Duplicate ${entry.data.language} blog slug "${entry.data.slug}" in ${existingSlugEntry} and ${entry.id}.`);
    }
    slugsByLanguage.set(slugKey, entry.id);

    const translations = entriesByTranslation.get(entry.data.translationKey) ?? {};
    const existingTranslation = translations[entry.data.language];
    if (existingTranslation) {
      throw new Error(
        `Duplicate ${entry.data.language} article for translation key "${entry.data.translationKey}" in ${existingTranslation.id} and ${entry.id}.`,
      );
    }
    translations[entry.data.language] = entry;
    entriesByTranslation.set(entry.data.translationKey, translations);
  }

  return [...entriesByTranslation.entries()]
    .filter((entry): entry is [string, Record<Language, BlogEntry>] => Boolean(entry[1].fr && entry[1].en))
    .map(([translationKey, translations]) => ({ translationKey, fr: translations.fr, en: translations.en }))
    .sort((a, b) => compareNewestFirst(a.fr, b.fr));
}

export function getPublishedBlogEntries(entries: BlogEntry[], language: Language, now = new Date()) {
  return getCompletePublishedBlogPairs(entries, now)
    .map((pair) => pair[language])
    .sort(compareNewestFirst);
}

export function getBlogStaticPaths(entries: BlogEntry[], language: Language, now = new Date()) {
  const pairs = getCompletePublishedBlogPairs(entries, now);
  if (pairs.length === 0) return [];

  const posts = pairs.map((pair) => pair[language]).sort(compareNewestFirst);
  const hub = {
    params: { slug: undefined },
    props: { kind: 'hub' as const, language, posts },
  };
  const articles = pairs.map((pair) => ({
    params: { slug: pair[language].data.slug },
    props: {
      kind: 'article' as const,
      language,
      entry: pair[language],
      translation: pair[language === 'fr' ? 'en' : 'fr'],
      posts,
    },
  }));

  return [hub, ...articles];
}
