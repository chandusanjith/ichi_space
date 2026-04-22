import { Tool, CategoryInfo, ToolCategory } from "@/types";
export type { Tool, CategoryInfo, ToolCategory };

export const categories: CategoryInfo[] = [
  {
    id: "calculators",
    name: "Calculators",
    icon: "Calculator",
    description: "Math, EMI, BMI, age and more",
    color: "from-violet-500 to-purple-600",
  },
  {
    id: "time-date",
    name: "Time & Date",
    icon: "Clock",
    description: "World clock, timers, countdowns",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "text-tools",
    name: "Text Tools",
    icon: "Type",
    description: "Word count, case convert, summarize",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: "developer-tools",
    name: "Developer Tools",
    icon: "Code",
    description: "JSON, Base64, Regex, SQL",
    color: "from-orange-500 to-amber-500",
  },
  {
    id: "file-tools",
    name: "File Tools",
    icon: "FileText",
    description: "PDF merge, image compress",
    color: "from-pink-500 to-rose-500",
  },
  {
    id: "security",
    name: "Security",
    icon: "Shield",
    description: "Passwords, hashes",
    color: "from-red-500 to-orange-500",
  },
  {
    id: "finance",
    name: "Finance",
    icon: "DollarSign",
    description: "Discounts, prices",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "productivity",
    name: "Productivity",
    icon: "Zap",
    description: "Notes, todos, pomodoro",
    color: "from-indigo-500 to-violet-500",
  },
];

export const tools: Tool[] = [
  // Calculators
  {
    slug: "basic-calculator",
    name: "Basic Calculator",
    description: "Perform basic arithmetic calculations with a clean interface",
    category: "calculators",
    icon: "Calculator",
    path: "/calculators/basic",
    keywords: ["calculate", "math", "add", "subtract", "multiply", "divide", "arithmetic"],
    isPopular: true,
  },
  {
    slug: "emi-calculator",
    name: "EMI Calculator",
    description: "Calculate your monthly loan EMI with amortization schedule",
    category: "calculators",
    icon: "Landmark",
    path: "/calculators/emi",
    keywords: ["emi", "loan", "mortgage", "interest", "monthly payment", "amortization"],
    isPopular: true,
  },
  {
    slug: "age-calculator",
    name: "Age Calculator",
    description: "Calculate exact age in years, months, and days",
    category: "calculators",
    icon: "Cake",
    path: "/calculators/age",
    keywords: ["age", "birthday", "birth date", "how old"],
  },
  {
    slug: "bmi-calculator",
    name: "BMI Calculator",
    description: "Calculate your Body Mass Index and health category",
    category: "calculators",
    icon: "Heart",
    path: "/calculators/bmi",
    keywords: ["bmi", "body mass index", "weight", "height", "health", "obesity"],
    isPopular: true,
  },
  {
    slug: "percentage-calculator",
    name: "Percentage Calculator",
    description: "Calculate percentages, increases, and decreases",
    category: "calculators",
    icon: "Percent",
    path: "/calculators/percentage",
    keywords: ["percentage", "percent", "increase", "decrease", "ratio"],
  },
  {
    slug: "currency-converter",
    name: "Currency Converter",
    description: "Convert between 160+ world currencies with live rates",
    category: "calculators",
    icon: "ArrowLeftRight",
    path: "/calculators/currency-converter",
    keywords: ["currency", "convert", "usd", "inr", "eur", "exchange rate", "forex"],
    isPopular: true,
  },
  // Time & Date
  {
    slug: "world-clock",
    name: "World Clock",
    description: "View current time across multiple time zones",
    category: "time-date",
    icon: "Globe",
    path: "/time-date/world-clock",
    keywords: ["time", "timezone", "world clock", "utc", "gmt"],
  },
  {
    slug: "date-difference",
    name: "Date Difference",
    description: "Calculate the difference between two dates",
    category: "time-date",
    icon: "CalendarDays",
    path: "/time-date/date-difference",
    keywords: ["date", "difference", "days between", "duration"],
  },
  {
    slug: "countdown-timer",
    name: "Countdown Timer",
    description: "Set a countdown to any future date or event",
    category: "time-date",
    icon: "Timer",
    path: "/time-date/countdown-timer",
    keywords: ["countdown", "timer", "event", "deadline"],
  },
  // Text Tools
  {
    slug: "word-counter",
    name: "Word Counter",
    description: "Count words, characters, sentences, and reading time",
    category: "text-tools",
    icon: "FileText",
    path: "/text-tools/word-counter",
    keywords: ["word count", "character count", "text length", "reading time"],
    isPopular: true,
  },
  {
    slug: "case-converter",
    name: "Case Converter",
    description: "Convert text between different cases",
    category: "text-tools",
    icon: "CaseSensitive",
    path: "/text-tools/case-converter",
    keywords: ["uppercase", "lowercase", "title case", "camel case", "snake case"],
  },
  {
    slug: "text-summarizer",
    name: "Text Summarizer",
    description: "Summarize long text using AI",
    category: "text-tools",
    icon: "Sparkles",
    path: "/text-tools/text-summarizer",
    keywords: ["summarize", "summary", "ai", "shorten", "tldr"],
    isNew: true,
  },
  {
    slug: "grammar-checker",
    name: "Grammar Checker",
    description: "Check and fix grammar mistakes in your text",
    category: "text-tools",
    icon: "SpellCheck",
    path: "/text-tools/grammar-checker",
    keywords: ["grammar", "spell check", "proofread", "writing"],
    isNew: true,
  },
  // Developer Tools
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    description: "Format, validate, and minify JSON data",
    category: "developer-tools",
    icon: "Braces",
    path: "/developer-tools/json-formatter",
    keywords: ["json", "format", "validate", "minify", "prettify", "parse"],
    isPopular: true,
  },
  {
    slug: "base64",
    name: "Base64 Encode/Decode",
    description: "Encode and decode Base64 strings",
    category: "developer-tools",
    icon: "Binary",
    path: "/developer-tools/base64",
    keywords: ["base64", "encode", "decode", "binary"],
  },
  {
    slug: "regex-tester",
    name: "Regex Tester",
    description: "Test regular expressions with live matching",
    category: "developer-tools",
    icon: "Regex",
    path: "/developer-tools/regex-tester",
    keywords: ["regex", "regular expression", "pattern", "match", "test"],
  },
  {
    slug: "sql-formatter",
    name: "SQL Formatter",
    description: "Format and beautify SQL queries",
    category: "developer-tools",
    icon: "Database",
    path: "/developer-tools/sql-formatter",
    keywords: ["sql", "format", "query", "database", "beautify"],
  },
  // File Tools
  {
    slug: "pdf-tools",
    name: "PDF Merge & Split",
    description: "Merge multiple PDFs or split pages",
    category: "file-tools",
    icon: "Files",
    path: "/file-tools/pdf-tools",
    keywords: ["pdf", "merge", "split", "combine", "document"],
  },
  {
    slug: "image-compressor",
    name: "Image Compressor",
    description: "Compress images while maintaining quality",
    category: "file-tools",
    icon: "Image",
    path: "/file-tools/image-compressor",
    keywords: ["image", "compress", "resize", "optimize", "photo"],
    isPopular: true,
  },
  // Security
  {
    slug: "password-generator",
    name: "Password Generator",
    description: "Generate strong, secure passwords",
    category: "security",
    icon: "KeyRound",
    path: "/security/password-generator",
    keywords: ["password", "generate", "secure", "strong", "random"],
    isPopular: true,
  },
  {
    slug: "hash-generator",
    name: "Hash Generator",
    description: "Generate MD5, SHA-256, and SHA-512 hashes",
    category: "security",
    icon: "Hash",
    path: "/security/hash-generator",
    keywords: ["hash", "md5", "sha256", "sha512", "checksum", "encrypt"],
  },
  // Finance
  {
    slug: "discount-calculator",
    name: "Discount Calculator",
    description: "Calculate discounts and savings instantly",
    category: "finance",
    icon: "Tag",
    path: "/finance/discount-calculator",
    keywords: ["discount", "sale", "savings", "price", "deal"],
  },
  // {
  //   slug: "fuel-price",
  //   name: "Fuel Price Tracker",
  //   description: "Track fuel prices across cities",
  //   category: "finance",
  //   icon: "Fuel",
  //   path: "/finance/fuel-price",
  //   keywords: ["fuel", "petrol", "diesel", "gas", "price"],
  // },
  // {
  //   slug: "gold-price",
  //   name: "Gold Price Tracker",
  //   description: "Track live gold prices and trends",
  //   category: "finance",
  //   icon: "Gem",
  //   path: "/finance/gold-price",
  //   keywords: ["gold", "price", "precious metal", "investment"],
  // },
  // Productivity
  {
    slug: "notes",
    name: "Notes",
    description: "Create and manage personal notes",
    category: "productivity",
    icon: "StickyNote",
    path: "/productivity/notes",
    keywords: ["notes", "write", "memo", "notepad"],
    isPopular: true,
  },
  {
    slug: "todos",
    name: "Todo List",
    description: "Manage tasks with priorities and due dates",
    category: "productivity",
    icon: "ListTodo",
    path: "/productivity/todos",
    keywords: ["todo", "task", "checklist", "to-do", "list"],
    isPopular: true,
  },
  {
    slug: "pomodoro",
    name: "Pomodoro Timer",
    description: "Focus timer with 25/5 minute work/break cycles",
    category: "productivity",
    icon: "AlarmClock",
    path: "/productivity/pomodoro",
    keywords: ["pomodoro", "focus", "timer", "productivity", "work"],
  },
];

export function searchTools(query: string): Tool[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();
  const words = q.split(/\s+/);

  return tools
    .map((tool) => {
      let score = 0;
      const nameL = tool.name.toLowerCase();
      const descL = tool.description.toLowerCase();

      // Exact name match
      if (nameL === q) score += 100;
      // Name starts with query
      else if (nameL.startsWith(q)) score += 80;
      // Name contains query
      else if (nameL.includes(q)) score += 60;

      // Keyword matches
      for (const kw of tool.keywords) {
        if (kw === q) score += 70;
        else if (kw.includes(q) || q.includes(kw)) score += 40;
      }

      // Word-level matching
      for (const word of words) {
        if (word.length < 2) continue;
        if (nameL.includes(word)) score += 20;
        if (descL.includes(word)) score += 10;
        for (const kw of tool.keywords) {
          if (kw.includes(word)) score += 15;
        }
      }

      return { tool, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.tool);
}

export function getToolsByCategory(category: ToolCategory): Tool[] {
  return tools.filter((t) => t.category === category);
}

export function getPopularTools(): Tool[] {
  return tools.filter((t) => t.isPopular);
}

export function getCategoryInfo(id: ToolCategory): CategoryInfo | undefined {
  return categories.find((c) => c.id === id);
}
