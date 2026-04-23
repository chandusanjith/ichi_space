import { Tool } from "@/types";

export function generateSoftwareAppSchema(tool: Tool) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    applicationCategory: getCategoryFromId(tool.category),
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
}

function getCategoryFromId(id: string) {
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
