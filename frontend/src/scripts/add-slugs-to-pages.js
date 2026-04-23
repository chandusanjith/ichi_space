const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '../app');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('page.tsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const pages = walk(baseDir);

pages.forEach(pagePath => {
  let content = fs.readFileSync(pagePath, 'utf8');
  
  // Skip if already has slug
  if (content.includes('slug=')) return;
  
  if (content.includes('<ToolLayout')) {
    // Extract slug from path
    // e.g., /app/calculators/age/page.tsx -> age
    const parts = pagePath.split('/');
    const slug = parts[parts.length - 2];
    
    // Add slug prop to ToolLayout
    // Regex to find <ToolLayout and add slug after categoryPath or before >
    if (content.includes('categoryPath=')) {
      content = content.replace(/(categoryPath=\{?["'].*?["']\}?)/, `$1\n      slug="${slug}"`);
      fs.writeFileSync(pagePath, content);
      console.log(`Updated ${pagePath} with slug: ${slug}`);
    }
  }
});
