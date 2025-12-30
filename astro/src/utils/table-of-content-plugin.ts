/**
 * Reference: https://hunormarton.com/blog/astro-table-of-contents/
 */

import { visit } from 'unist-util-visit';
import type { Node, Parent } from 'unist';
import type { VFile } from 'vfile';
import type { Heading, PhrasingContent } from 'mdast';

interface TocEntry {
  depth: number;
  title: string;
  href: string;
}

interface AstroVFile extends VFile {
  data: {
    astro: {
      frontmatter: {
        tableOfContents?: TocEntry[];
        [key: string]: any;
      };
    };
  };
}

function getNodeValue(node: Parent | PhrasingContent): string {
  if ('value' in node && typeof node.value === 'string') {
    return node.value;
  }

  if ('children' in node && Array.isArray(node.children)) {
    return (node.children as PhrasingContent[]).map(getNodeValue).join('');
  }

  return '';
}

export default function remarkTableOfContents() {
  return (tree: Node, file: VFile) => {
    const toc: TocEntry[] = [];
    const astroFile = file as AstroVFile;

    visit(tree, 'heading', (node: Heading, _index: number | undefined, parent: Parent | undefined) => {
      // Only consider top-level headings
      if (parent?.type !== 'root') return;

      const depth = node.depth;
      const title = getNodeValue(node);
      
      // Ignore headings deeper than level 3
      if (depth > 3) return;

      // Create a URL-friendly slug
      const href = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove non-word characters
        .trim()
        .replace(/\s+/g, '-'); // Replace spaces with hyphens

      toc.push({ depth, title, href: `#${href}` });
    });

    // Ensure the frontmatter object exists
    astroFile.data.astro = astroFile.data.astro || { frontmatter: {} };
    astroFile.data.astro.frontmatter = astroFile.data.astro.frontmatter || {};
    
    // Add the TOC to the frontmatter
    astroFile.data.astro.frontmatter.tableOfContents = toc;
  };
}
