/**
 * Site Configuration
 * Central configuration for the application
 */

export const siteConfig = {
    name: 'Next.js Template Starter',
    description: 'Next.js 15 Boilerplate with Tailwind CSS 4 and shadcn/ui',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    ogImage: '/og-image.png',

    // Links
    links: {
        github: '',
        twitter: '',
        docs: '/docs',
    },

    // Creator info
    creator: {
        name: '',
        username: '',
        url: '',
    },

    // SEO defaults
    seo: {
        titleTemplate: '%s | Next.js Template Starter',
        defaultTitle: 'Next.js Template Starter',
        defaultDescription:
            'A modern Next.js 15 boilerplate with Tailwind CSS 4, shadcn/ui, and comprehensive utilities.',
        keywords: [
            'Next.js',
            'React',
            'Tailwind CSS',
            'shadcn/ui',
            'TypeScript',
            'Boilerplate',
        ],
    },

    // Theme configuration
    theme: {
        defaultTheme: 'system' as const,
        themes: ['light', 'dark', 'system'] as const,
    },

    // Localization
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'zh-CN'],
    },
} as const;

export type SiteConfig = typeof siteConfig;
