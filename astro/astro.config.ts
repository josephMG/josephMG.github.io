import fs from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';

import matter from 'gray-matter';
import slugify from 'limax';
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';

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

// 讀取各文章 frontmatter 的發佈/更新日期,供 sitemap 的 <lastmod> 使用。
// (astro.config 無法存取 astro:content,故直接讀 markdown frontmatter;
//  slug 用與站台相同的 limax 規則,對應文章網址 /blog/<slug>/)
const postLastmod = new Map<string, string>();
try {
  const postsDir = path.join(__dirname, 'src/content/post');
  for (const entry of fs.readdirSync(postsDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const mdPath = path.join(postsDir, entry.name, 'index.md');
    if (!fs.existsSync(mdPath)) continue;
    const { data } = matter(fs.readFileSync(mdPath, 'utf-8'));
    const raw = data.updateDate ?? data.publishDate;
    if (!raw) continue;
    const date = raw instanceof Date ? raw : new Date(raw);
    if (Number.isNaN(date.getTime())) continue;
    postLastmod.set(slugify(entry.name), date.toISOString());
  }
} catch {
  /* 讀取失敗就略過 lastmod */
}

const hasExternalScripts = false;
const whenExternalScripts = (items: (() => AstroIntegration) | (() => AstroIntegration)[] = []) =>
  hasExternalScripts ? (Array.isArray(items) ? items.map((item) => item()) : [items()]) : [];

export default defineConfig({
  site: 'https://josephmg.github.io',
  // base: '',
  output: 'static',
  trailingSlash: 'always',
  // Astro 7 預設 compressHTML 改為 'jsx',會改變行內元素間的空白處理,故維持 v6 行為
  compressHTML: true,
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
      },
      serialize(item) {
        const match = new URL(item.url).pathname.match(/\/blog\/([^/]+)\/?$/);
        if (match) {
          const lastmod = postLastmod.get(match[1]);
          if (lastmod) item.lastmod = lastmod;
        }
        return item;
      },
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
    // Astro 7 預設改用 Sätteri processor,不相容既有的 remark/rehype 外掛,故改回 unified()
    processor: unified({
      remarkPlugins: [readingTimeRemarkPlugin, [remarkToc, { heading: 'toc', maxDepth: 3 }], remarkTableOfContents],
      rehypePlugins: [
        rehypePhotoswipe,
        rehypeMermaid,
        responsiveTablesRehypePlugin,
        lazyImagesRehypePlugin,
        rehypeAstroRelativeMarkdownLinks,
        [rehypeExternalLinks, { target: '_blank' }],
      ],
    }),
    syntaxHighlight: {
      type: 'shiki',
      excludeLangs: ['mermaid'],
    },
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
