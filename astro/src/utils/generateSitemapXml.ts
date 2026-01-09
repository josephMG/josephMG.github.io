import slugify from 'limax';
import { getCollection } from 'astro:content';

export async function getSortedCollectionPosts({ collection }: { collection: 'post' }) {
  return await getCollection(collection).then((entries) =>
    entries
      .filter((entry) => !entry.data.draft)
      .sort((a, b) => new Date(b.data.publishDate ?? 0).valueOf() - new Date(a.data.publishDate ?? 0).valueOf())
  );
}

export async function generateSitemapXml({
  posts,
  site,
}: {
  posts: Awaited<ReturnType<typeof getSortedCollectionPosts>>;
  site: { url: string };
}) {
  return `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <url>
        <loc>${site.url}</loc>
        <lastmod>${new Date(posts[0].data.publishDate ?? 0).toISOString()}</lastmod>
        <priority>1.00</priority>
    </url>
    ${posts
      .map((post) => {
        const loc = new URL(`/${slugify(post.slug)}`, site.url).href;
        return `
            <url>
                <loc>${loc}</loc>
                <lastmod>${new Date(post.data.publishDate ?? 0).toISOString()}</lastmod>
                <priority>0.80</priority>
            </url>
        `.trim();
      })
      .join('')}
    </urlset>
`.trim();
}
