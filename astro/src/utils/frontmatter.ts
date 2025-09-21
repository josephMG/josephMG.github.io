import getReadingTime from 'reading-time';
import path from 'path';
import { toString } from 'mdast-util-to-string';
import { visit } from 'unist-util-visit';
import type { RehypePlugin, RemarkPlugin } from '@astrojs/markdown-remark';

export const readingTimeRemarkPlugin: RemarkPlugin = () => {
  return function (tree, file) {
    const textOnPage = toString(tree);
    const readingTime = Math.ceil(getReadingTime(textOnPage).minutes);

    if (file.data.astro?.frontmatter) file.data.astro.frontmatter.readingTime = readingTime;
  };
};

export const responsiveTablesRehypePlugin: RehypePlugin = () => {
  return function (tree) {
    if (!tree.children) return;

    for (let i = 0; i < tree.children.length; i++) {
      const child = tree.children[i];

      if (child.type === 'element' && child.tagName === 'table') {
        tree.children[i] = {
          type: 'element',
          tagName: 'div',
          properties: {
            style: 'overflow:auto',
          },
          children: [child],
        };

        i++;
      }
    }
  };
};

export const lazyImagesRehypePlugin: RehypePlugin = () => {
  return function (tree) {
    if (!tree.children) return;

    visit(tree, 'element', function (node) {
      if (node.tagName === 'img') {
        node.properties.loading = 'lazy';
      }
    });
  };
};

/**
 * 自訂 rehype plugin：
 * 找出所有 <img>，如果外面沒有 <a>，就包成 <a> 並加上 PhotoSwipe 需要的 data- 屬性。
 */
export const rehypePhotoswipe: RehypePlugin = (options: { width?: number; height?: number } = {}) => {
  const { width = 1600 /* height = 1200 */ } = options;

  return function (tree, file) {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName === 'img') {
        if (!file?.dirname) return;

        const folder = path.basename(file?.dirname); //.replaceAll(/[\[\]\-]/g, '');
        const src = node.properties.src;

        if (folder === 'post') return;
        if (!parent) return;
        // 如果已經被 <a> 包住就跳過
        if ((parent as any).tagName === 'a') return;

        const fileFullPath = encodeURIComponent(`${file.dirname}/${src}`);
        if (index !== undefined)
          parent.children[index] = {
            type: 'element',
            tagName: 'a',
            properties: {
              class: 'photoswipe-wrapper',
              href: `_image?href=${fileFullPath}`,
              'data-pswp-width': width,
              // 'data-pswp-height': height,
              target: '_blank',
              rel: 'noopener',
            },
            children: [node],
          };
      }
    });
  };
};
