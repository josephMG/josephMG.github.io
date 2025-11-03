import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert `import.meta.url` to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function formatDate(d) {
  let year = d.getFullYear();
  let month = ('0' + (d.getMonth() + 1)).slice(-2); // Month is zero-based
  let day = ('0' + d.getDate()).slice(-2);
  let hour = ('0' + d.getHours()).slice(-2);
  let minute = ('0' + d.getMinutes()).slice(-2);
  let second = ('0' + d.getSeconds()).slice(-2);
  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}

// Get the post title from command line argument
const title = process.argv[2];
if (!title) {
  console.error('❌ Please provide a post title.');
  process.exit(1);
}

// Format the title for the filename (e.g., "My New Post" -> "my-new-post")
const slug = title.toLowerCase().replace(/\s+/g, '-');
const date = new Date();
const dformat = formatDate(date);

// Define the content folder (adjust if needed)
const postsDir = path.join(__dirname, `../src/content/post/${slug}`);
const postPath = path.join(postsDir, `index.md`);

// Ensure the blog directory exists
if (!fs.existsSync(postsDir)) {
  fs.mkdirSync(postsDir, { recursive: true });
}

// Markdown content template
const content = `---
title: '${title}'
tags: ["astro", "blog"]
author: Joseph
category: 'AI & Machine Learning'
publishDate: ${dformat}
image: 'banner.png'
---
Write your content here!

<!-- more -->

### TOC

If you like this post, please connect with me on LinkedIn and give me some encouragement. Thanks.
`;

fs.writeFileSync(postPath, content);
console.log(`✅ Blog post created: ${postPath}`);
