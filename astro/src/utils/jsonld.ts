import { SITE } from 'astrowind:config';
import logoImage from '~/assets/images/joseph-avatar.jpg';

// 對齊網站實際渲染名稱('Joseph',而非 SITE.name='Joseph & Sandy')
const SITE_NAME = 'Joseph';
const LANG = 'zh-TW';
const SITE_URL = (SITE?.site || '').replace(/\/+$/, '');

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const toAbsolute = (path = ''): string => {
  try {
    return new URL(path, `${SITE_URL}/`).href;
  } catch {
    return path;
  }
};

type JsonLdNode = Record<string, unknown>;

/** 共用的發佈者(Organization)節點 */
export const organizationNode = (): JsonLdNode => ({
  '@type': 'Organization',
  '@id': ORG_ID,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: {
    '@type': 'ImageObject',
    url: toAbsolute(logoImage.src),
    width: logoImage.width,
    height: logoImage.height,
  },
});

/** 首頁 WebSite 節點 */
export const websiteNode = (): JsonLdNode => ({
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  inLanguage: LANG,
  publisher: { '@id': ORG_ID },
});

export interface BlogPostingInput {
  url: string; // 文章絕對網址(canonical)
  title: string;
  description?: string;
  image?: { url: string; width?: number; height?: number }; // url 為絕對網址
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  authorUrl?: string; // 絕對網址
  keywords?: Array<string>;
}

/** 文章 BlogPosting 節點(含內嵌 Person 作者) */
export const blogPostingNode = (p: BlogPostingInput): JsonLdNode => ({
  '@type': 'BlogPosting',
  '@id': `${p.url}#article`,
  headline: p.title,
  ...(p.description ? { description: p.description } : {}),
  ...(p.image?.url
    ? {
        image: [
          {
            '@type': 'ImageObject',
            url: p.image.url,
            ...(p.image.width ? { width: p.image.width } : {}),
            ...(p.image.height ? { height: p.image.height } : {}),
          },
        ],
      }
    : {}),
  ...(p.datePublished ? { datePublished: p.datePublished } : {}),
  dateModified: p.dateModified || p.datePublished,
  ...(p.authorName
    ? { author: { '@type': 'Person', name: p.authorName, ...(p.authorUrl ? { url: p.authorUrl } : {}) } }
    : {}),
  publisher: { '@id': ORG_ID },
  mainEntityOfPage: { '@type': 'WebPage', '@id': p.url },
  ...(p.keywords?.length ? { keywords: p.keywords } : {}),
  inLanguage: LANG,
});

export interface BreadcrumbItem {
  name: string;
  url: string; // 絕對網址
}

/** 麵包屑 BreadcrumbList 節點 */
export const breadcrumbNode = (items: Array<BreadcrumbItem>): JsonLdNode => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

/** 把多個節點組成單一 @graph(自動過濾 falsy) */
export const jsonLdGraph = (...nodes: Array<JsonLdNode | null | undefined>) => ({
  '@context': 'https://schema.org',
  '@graph': nodes.filter(Boolean),
});
