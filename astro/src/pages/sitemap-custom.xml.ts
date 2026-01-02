import { getSortedCollectionPosts, generateSitemapXml } from '../utils/generateSitemapXml';

export const GET = async () => {
  const posts = await getSortedCollectionPosts({ collection: 'post' });

  const sitemap = await generateSitemapXml({
    posts,
    site: { url: import.meta.env.SITE },
  });

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
