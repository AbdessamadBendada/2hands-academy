import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const authorUrls = {
  fr: '/a-propos/',
  en: '/en/about/',
} as const;
const serviceUrls = {
  fr: new Set([
    '/services/diagnostic/',
    '/services/formation-equipe/',
    '/services/soin-signature/',
    '/services/accompagnement/',
  ]),
  en: new Set([
    '/en/services/assessment/',
    '/en/services/team-training/',
    '/en/services/signature-treatment/',
    '/en/services/ongoing-support/',
  ]),
} as const;

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) => z.object({
    title: z.string().trim().min(20).max(75),
    description: z.string().trim().min(70).max(170),
    language: z.enum(['fr', 'en']),
    translationKey: z.string().trim().min(1).max(100).regex(slugPattern, 'Use a lowercase, hyphen-separated translation key.'),
    slug: z.string().trim().min(1).max(100).regex(slugPattern, 'Use a lowercase, hyphen-separated URL slug.'),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    author: z.literal('Brooke Wescott'),
    authorUrl: z.string().trim().startsWith('/').endsWith('/'),
    heroImage: image(),
    heroImageAlt: z.string().trim().min(15).max(180),
    excerpt: z.string().trim().min(70).max(240),
    primaryKeyword: z.string().trim().min(3).max(100),
    secondaryKeywords: z.array(z.string().trim().min(2).max(100)).max(8).default([]),
    serviceUrl: z.string().trim().startsWith('/').endsWith('/'),
    serviceLabel: z.string().trim().min(3).max(100),
    relatedTranslationKeys: z.array(
      z.string().trim().min(1).max(100).regex(slugPattern, 'Related translation keys must be lowercase and hyphen-separated.'),
    ).max(4).default([]),
    draft: z.boolean().default(true),
  }).superRefine((entry, context) => {
    if (entry.authorUrl !== authorUrls[entry.language]) {
      context.addIssue({
        code: 'custom',
        path: ['authorUrl'],
        message: `Use Brooke's ${entry.language === 'fr' ? 'French' : 'English'} profile URL: ${authorUrls[entry.language]}`,
      });
    }

    if (!serviceUrls[entry.language].has(entry.serviceUrl)) {
      context.addIssue({
        code: 'custom',
        path: ['serviceUrl'],
        message: `Use a canonical ${entry.language === 'fr' ? 'French' : 'English'} hospitality service URL.`,
      });
    }

    if (entry.updatedAt && entry.updatedAt < entry.publishedAt) {
      context.addIssue({
        code: 'custom',
        path: ['updatedAt'],
        message: 'The updated date cannot be earlier than the publication date.',
      });
    }

    const normalizedPrimaryKeyword = entry.primaryKeyword.toLocaleLowerCase(entry.language);
    const normalizedSecondaryKeywords = entry.secondaryKeywords.map((keyword) => keyword.toLocaleLowerCase(entry.language));
    if (new Set(normalizedSecondaryKeywords).size !== normalizedSecondaryKeywords.length) {
      context.addIssue({
        code: 'custom',
        path: ['secondaryKeywords'],
        message: 'Secondary keywords must be unique.',
      });
    }
    if (normalizedSecondaryKeywords.includes(normalizedPrimaryKeyword)) {
      context.addIssue({
        code: 'custom',
        path: ['secondaryKeywords'],
        message: 'Do not repeat the primary keyword in secondaryKeywords.',
      });
    }

    if (entry.relatedTranslationKeys.includes(entry.translationKey)) {
      context.addIssue({
        code: 'custom',
        path: ['relatedTranslationKeys'],
        message: 'An article cannot list itself as related content.',
      });
    }
    if (new Set(entry.relatedTranslationKeys).size !== entry.relatedTranslationKeys.length) {
      context.addIssue({
        code: 'custom',
        path: ['relatedTranslationKeys'],
        message: 'Related translation keys must be unique.',
      });
    }
  }),
});

export const collections = { blog };
