import path from 'path';
import { fileURLToPath } from 'url';

import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import icon from 'astro-icon';
import compress from 'astro-compress';
import remarkToc from 'remark-toc';
import type { AstroIntegration } from 'astro';
import rehypeAstroRelativeMarkdownLinks from 'astro-rehype-relative-markdown-links';
import rehypeExternalLinks from 'rehype-external-links';
import astrowind from './vendor/integration';

import {
  readingTimeRemarkPlugin,
  responsiveTablesRehypePlugin,
  lazyImagesRehypePlugin,
  rehypePhotoswipe,
} from './src/utils/frontmatter';
import rehypeMermaid from 'rehype-mermaid';
import remarkTableOfContents from './src/utils/table-of-content-plugin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const hasExternalScripts = false;
const whenExternalScripts = (items: (() => AstroIntegration) | (() => AstroIntegration)[] = []) =>
  hasExternalScripts ? (Array.isArray(items) ? items.map((item) => item()) : [items()]) : [];

export default defineConfig({
  site: 'https://josephmg.github.io',
  // base: '',
  output: 'static',
  trailingSlash: 'always',
  // build: {
  //   redirects: false,
  // },
  // redirects: {
  //   '/blog': {
  //     status: 301,
  //     destination: '/blog/1/',
  //   },
  //   '/blog/': {
  //     status: 301,
  //     destination: '/blog/1/',
  //   },
  // },
  integrations: [
    sitemap({
      filter: (page) => {
        const url = new URL(page);
        const pathname = url.pathname;
        
        // Exclude pagination URLs like /blog/2/, /blog/3/ etc.
        if (pathname.match(/\/blog\/\d+\/?$/)) {
          return false;
        }
        
        // Exclude tag, category, author aggregate and pagination pages
        if (pathname.startsWith('/tag') || pathname.startsWith('/category') || pathname.startsWith('/author')) {
          return false;
        }
        
        // Exclude template pages
        const isTemplate = pathname.startsWith('/homes') || 
                           pathname.startsWith('/landing') ||
                           pathname.startsWith('/contact') ||
                           pathname.startsWith('/pricing') ||
                           pathname.startsWith('/services') ||
                           pathname.startsWith('/terms') ||
                           pathname.startsWith('/privacy');
        if (isTemplate) {
          return false;
        }
        
        return true;
      }
    }),
    mdx(),
    icon({
      include: {
        tabler: ['*'],
        'flat-color-icons': [
          'template',
          'gallery',
          'approval',
          'document',
          'advertising',
          'currency-exchange',
          'voice-presentation',
          'business-contact',
          'database',
        ],
      },
    }),

    ...whenExternalScripts(() =>
      partytown({
        config: { forward: ['dataLayer.push'] },
      })
    ),

    compress({
      CSS: true,
      HTML: {
        'html-minifier-terser': {
          removeAttributeQuotes: false,
        },
      },
      Image: false,
      JavaScript: true,
      SVG: false,
      Logger: 1,
    }),

    astrowind({
      config: './src/config.yaml',
    }),
  ],

  image: {
    domains: ['cdn.pixabay.com'],
  },

  markdown: {
    syntaxHighlight: {
      type: 'shiki',
      excludeLangs: ['mermaid'],
    },
    remarkPlugins: [readingTimeRemarkPlugin, [remarkToc, { heading: 'toc', maxDepth: 3 }], remarkTableOfContents],
    rehypePlugins: [
      rehypePhotoswipe,
      rehypeMermaid,
      responsiveTablesRehypePlugin,
      lazyImagesRehypePlugin,
      rehypeAstroRelativeMarkdownLinks,
      [rehypeExternalLinks, { target: '_blank' }],
    ],
  },

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  },
});
