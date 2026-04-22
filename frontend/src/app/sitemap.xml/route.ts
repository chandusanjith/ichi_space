import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://ichispace.tech';

  // Base routes
  const routes = [
    '',
    '/calculators',
    '/developer-tools',
    '/file-tools',
    '/finance',
    '/productivity',
    '/security',
    '/text-tools',
    '/time-date',
  ];

  // Specific tool routes
  const toolRoutes = [
    // Calculators
    '/calculators/age',
    '/calculators/basic',
    '/calculators/bmi',
    '/calculators/currency-converter',
    '/calculators/emi',
    '/calculators/percentage',
    
    // Developer Tools
    '/developer-tools/base64',
    '/developer-tools/json-formatter',
    '/developer-tools/regex-tester',
    '/developer-tools/sql-formatter',
    
    // File Tools
    '/file-tools/image-compressor',
    '/file-tools/pdf-tools',
    
    // Finance
    '/finance/discount-calculator',
    '/finance/fuel-price',
    '/finance/gold-price',
    
    // Productivity
    '/productivity/notes',
    '/productivity/pomodoro',
    '/productivity/todos',
    
    // Security
    '/security/hash-generator',
    '/security/password-generator',
    
    // Text Tools
    '/text-tools/case-converter',
    '/text-tools/grammar-checker',
    '/text-tools/text-summarizer',
    '/text-tools/word-counter',
    
    // Time & Date
    '/time-date/countdown-timer',
    '/time-date/date-difference',
    '/time-date/world-clock',
  ];

  const allRoutes = [...routes, ...toolRoutes];
  const lastModified = new Date().toISOString();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map((route) => {
    const priority = route === '' ? '1.0' : route.split('/').length === 2 ? '0.8' : '0.6';
    return `  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
    },
  });
}
