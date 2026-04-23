const fs = require('fs');
const path = require('path');

const registryPath = path.join(__dirname, '../lib/tools-registry.ts');
const registryContent = fs.readFileSync(registryPath, 'utf8');

// Improved extraction using a more flexible regex to handle formatted JS objects
const toolBlockRegex = /\{[\s\S]*?slug:\s*"(.*?)"[\s\S]*?name:\s*"(.*?)"[\s\S]*?description:\s*"(.*?)"[\s\S]*?category:\s*"(.*?)"[\s\S]*?path:\s*"(.*?)"[\s\S]*?keywords:\s*\[([\s\S]*?)\][\s\S]*?\}/g;

const tools = [];
let match;
while ((match = toolBlockRegex.exec(registryContent)) !== null) {
  const [_, slug, name, description, category, toolPath, keywordsRaw] = match;
  const keywords = keywordsRaw.replace(/["\s]/g, '').split(',').filter(Boolean);
  
  tools.push({
    slug,
    name,
    description,
    category,
    path: toolPath,
    keywords
  });
}

console.log(`Found ${tools.length} tools in registry.`);

const baseDir = path.join(__dirname, '../app');

function getCategoryName(id) {
  switch (id) {
    case 'calculators': return 'Calculators';
    case 'developer-tools': return 'DeveloperApplication';
    case 'text-tools': return 'DesignApplication';
    case 'time-date': return 'UtilitiesApplication';
    case 'productivity': return 'ProductivityApplication';
    case 'security': return 'SecurityApplication';
    case 'finance': return 'FinanceApplication';
    case 'file-tools': return 'UtilitiesApplication';
    default: return 'WebApplication';
  }
}

tools.forEach(tool => {
  if (!tool.path) return;
  
  const relativePath = tool.path.startsWith('/') ? tool.path.substring(1) : tool.path;
  const toolDir = path.join(baseDir, relativePath);
  const layoutPath = path.join(toolDir, 'layout.tsx');
  
  if (!fs.existsSync(toolDir)) {
    console.log(`Directory does not exist: ${toolDir}`);
    return;
  }

  // Skip manually optimized files for now
  if (['json-formatter', 'pomodoro'].includes(tool.slug)) {
    console.log(`Skipping manually optimized tool: ${tool.slug}`);
    return;
  }

  const categoryLabel = getCategoryName(tool.category);

  const layoutContent = `import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '${tool.name} - Free Online Tool | Ichi Space',
  description: '${tool.description.replace(/'/g, "\\'")}',
  keywords: '${tool.keywords ? tool.keywords.join(', ') : ""}',
  openGraph: {
    title: '${tool.name} - Free Online Tool | Ichi Space',
    description: '${tool.description.replace(/'/g, "\\'")}',
    url: 'https://ichispace.tech${tool.path}',
    siteName: 'Ichi Space',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '${tool.name} - Ichi Space',
    description: '${tool.description.replace(/'/g, "\\'")}',
  },
  alternates: {
    canonical: 'https://ichispace.tech${tool.path}',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: '${tool.name}',
  description: '${tool.description.replace(/'/g, "\\'")}',
  applicationCategory: '${categoryLabel}',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  author: {
    '@type': 'Organization',
    name: 'Ichi Space',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
`;

  fs.writeFileSync(layoutPath, layoutContent);
  console.log(`Generated: ${layoutPath}`);
});
