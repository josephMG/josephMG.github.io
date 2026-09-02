/**
 * Reference: https://hunormarton.com/blog/astro-table-of-contents/
 */

import { visit } from 'unist-util-visit';
import type { Node } from 'unist';
import type { VFile } from 'vfile';
import type { Heading } from 'mdast';
import { toString } from 'mdast-util-to-string';
import GithubSlugger from 'github-slugger';

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

export default function remarkTableOfContents() {
  return (tree: Node, file: VFile) => {
    const toc: TocEntry[] = [];
    const astroFile = file as AstroVFile;
    const slugger = new GithubSlugger();

    visit(tree, 'heading', (node: Heading) => {
      const title = toString(node);
      const slug = slugger.slug(title);

      // Ignore h1 (page title) and headings deeper than level 3
      if (node.depth < 2 || node.depth > 3) return;

      // Ignore TOC placeholder headings
      const cleanTitle = title.trim().toLowerCase();
      if (cleanTitle === 'toc' || cleanTitle === 'table of contents' || cleanTitle === '目錄') {
        return;
      }

      toc.push({ depth: node.depth, title, href: `#${slug}` });
    });

    // Ensure the frontmatter object exists
    astroFile.data.astro = astroFile.data.astro || { frontmatter: {} };
    astroFile.data.astro.frontmatter = astroFile.data.astro.frontmatter || {};

    // Add the TOC to the frontmatter
    astroFile.data.astro.frontmatter.tableOfContents = toc;
  };
}
