import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert `import.meta.url` to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the post title from command line argument
const title = process.argv[2];
if (!title) {
  console.error('❌ Please provide a post title.');
  process.exit(1);
}

// Format the title for the filename (e.g., "My New Post" -> "my-new-post")
const slug = title.toLowerCase().replace(/\s+/g, '-');
const date = new Date(),
  dformat =
    [date.getMonth() + 1, date.getDate(), date.getFullYear()].join('/') +
    ' ' +
    [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');

// Define the content folder (adjust if needed)
const postsDir = path.join(__dirname, `../src/content/post/${slug}`);
const postPath = path.join(postsDir, `index.md`);

// Ensure the blog directory exists
if (!fs.existsSync(postsDir)) {
  fs.mkdirSync(postsDir, { recursive: true });
}

// Markdown content template
const content = `---
title: ${title}
tags: ["astro", "blog"]
author: Joseph
category: review
publishDate: ${dformat}
---

# ${title}

Write your content here!
`;

fs.writeFileSync(postPath, content);
console.log(`✅ Blog post created: ${postPath}`);
