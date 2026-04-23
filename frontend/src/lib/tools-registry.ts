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
    slug: "basic",
    name: "Basic Calculator",
    description: "Perform basic arithmetic calculations with a clean interface",
    category: "calculators",
    icon: "Calculator",
    path: "/calculators/basic",
    keywords: ["calculate", "math", "add", "subtract", "multiply", "divide", "arithmetic"],
    isPopular: true,
  },
  {
    slug: "emi",
    name: "EMI Calculator",
    description: "Calculate your monthly loan EMI with amortization schedule",
    category: "calculators",
    icon: "Landmark",
    path: "/calculators/emi",
    keywords: ["emi", "loan", "mortgage", "interest", "monthly payment", "amortization"],
    isPopular: true,
    seoAbout: "The EMI Calculator is an essential financial tool for anyone planning a loan. It calculates your Equated Monthly Installment (EMI) based on the principal amount, interest rate, and loan tenure. It also provides a detailed amortization schedule so you can see how your payments are split between interest and principal over time.",
    seoFaq: [
      {
        question: "How is EMI calculated?",
        answer: "EMI is calculated using the formula: [P x R x (1+R)^N]/[(1+R)^N-1], where P is Principal, R is interest rate per month, and N is the number of monthly installments."
      },
      {
        question: "Can I use this for home loans and car loans?",
        answer: "Yes, this calculator works for any type of loan with fixed monthly installments."
      }
    ]
  },
  {
    slug: "age",
    name: "Age Calculator",
    description: "Calculate exact age in years, months, and days",
    category: "calculators",
    icon: "Cake",
    path: "/calculators/age",
    keywords: ["age", "birthday", "how old am i", "date of birth", "chronological age"],
    seoAbout: "The Age Calculator precisely determines your age in years, months, and days based on your birth date. It's perfect for tracking milestones, calculating age differences, or simply answering the question 'Exactly how old am I today?'.",
    seoFaq: [
      {
        question: "Does it account for leap years?",
        answer: "Yes, our calculator accurately accounts for leap years and different month lengths to give you the exact day count."
      }
    ]
  },
  {
    slug: "bmi",
    name: "BMI Calculator",
    description: "Calculate your Body Mass Index and health category",
    category: "calculators",
    icon: "Heart",
    path: "/calculators/bmi",
    keywords: ["bmi", "body mass index", "weight", "height", "health", "obesity"],
    isPopular: true,
    seoAbout: "The BMI (Body Mass Index) Calculator helps you quickly assess your body weight relative to your height. It provides an estimate of whether you are underweight, have a healthy weight, or are overweight, based on standard health categories. It is a useful screening tool for overall health awareness.",
    seoFaq: [
      {
        question: "What is a healthy BMI range?",
        answer: "For most adults, a healthy BMI is between 18.5 and 24.9."
      },
      {
        question: "Is BMI accurate for everyone?",
        answer: "BMI is a general screening tool. It may not be accurate for athletes with high muscle mass or elderly individuals."
      }
    ]
  },
  {
    slug: "percentage-calculator",
    name: "Percentage Calculator",
    description: "Calculate percentages, increases, and decreases",
    category: "calculators",
    icon: "Percent",
    path: "/calculators/percentage",
    keywords: ["percentage", "percent", "increase", "decrease", "ratio"],
    seoAbout: "The Percentage Calculator is a versatile math tool designed to handle all your percent-related calculations. Whether you're a student solving homework, a shopper calculating a discount, or a professional analyzing growth rates, this tool provides instant and accurate results.",
    seoFaq: [
      {
        question: "How do I calculate a percentage increase?",
        answer: "To calculate percentage increase: subtract the original value from the new value, divide by the original value, and multiply by 100."
      },
      {
        question: "What is 20% of 150?",
        answer: "To find 20% of 150, multiply 150 by 0.20, which equals 30."
      }
    ]
  },
  {
    slug: "currency-converter",
    name: "Currency Converter",
    description: "Convert between 160+ world currencies with live rates",
    category: "calculators",
    icon: "ArrowLeftRight",
    path: "/calculators/currency-converter",
    keywords: ["currency", "exchange rate", "forex", "money converter", "usd", "eur"],
    isPopular: true,
    seoAbout: "The Currency Converter provides real-time exchange rates for global currencies. Convert between USD, EUR, GBP, JPY, and many more instantly. It's an essential tool for travelers, international shoppers, and financial enthusiasts tracking market trends.",
    seoFaq: [
      {
        question: "How often are the rates updated?",
        answer: "Our currency rates are fetched from reliable financial APIs and updated regularly to ensure accuracy."
      }
    ]
  },
  // Time & Date
  {
    slug: "world-clock",
    name: "World Clock",
    description: "View current time across multiple time zones",
    category: "time-date",
    icon: "Globe",
    path: "/time-date/world-clock",
    keywords: ["world clock", "time zones", "local time", "global time", "utc"],
    seoAbout: "The World Clock helps you stay connected across time zones. Quickly check the current time in major cities around the globe. Ideal for scheduling international meetings or keeping in touch with friends and family abroad.",
    seoFaq: [
      {
        question: "How many cities can I track?",
        answer: "You can track time for dozens of major cities across all continents."
      }
    ]
  },
  {
    slug: "date-difference",
    name: "Date Difference",
    description: "Calculate the difference between two dates",
    category: "time-date",
    icon: "CalendarDays",
    path: "/time-date/date-difference",
    keywords: ["date", "days between", "duration", "time span", "calculator"],
    seoAbout: "The Date Difference Calculator allows you to find the exact number of days, weeks, and months between two specific dates. Use it for project planning, counting down to special events, or determining the length of a time period.",
    seoFaq: [
      {
        question: "Can it calculate working days only?",
        answer: "The current version calculates total calendar days between two dates."
      }
    ]
  },
  {
    slug: "countdown-timer",
    name: "Countdown Timer",
    description: "Set a countdown to any future date or event",
    category: "time-date",
    icon: "Timer",
    path: "/time-date/countdown-timer",
    keywords: ["countdown", "timer", "event", "timer online", "seconds"],
    seoAbout: "The Countdown Timer is a simple yet powerful tool for tracking remaining time for any event or task. Set your target time and watch the seconds tick down. Perfect for focus sessions, cooking, or waiting for a big reveal.",
    seoFaq: [
      {
        question: "Will the timer sound an alarm?",
        answer: "Yes, a clear notification sound will play once the timer reaches zero."
      }
    ]
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
    seoAbout: "The Word Counter is an essential tool for writers, students, and editors. It provides detailed statistics about your text, including word count, character count (with and without spaces), sentence count, and even estimated reading time. Whether you're working on an essay, a blog post, or a social media update, our counter helps you stay within your limits.",
    seoFaq: [
      {
        question: "Does it count spaces as characters?",
        answer: "Yes, our tool provides both character counts with spaces and without spaces, so you can meet specific platform requirements."
      },
      {
        question: "Is there a limit to how much text I can count?",
        answer: "No, the tool is designed to handle very large documents efficiently directly in your browser."
      }
    ]
  },
  {
    slug: "case-converter",
    name: "Case Converter",
    description: "Convert text between different cases",
    category: "text-tools",
    icon: "CaseSensitive",
    path: "/text-tools/case-converter",
    keywords: ["case converter", "uppercase", "lowercase", "title case", "camel case", "snake case"],
    seoAbout: "The Case Converter is a versatile text utility that allows you to change the capitalization of your text instantly. Whether you need to convert a paragraph to UPPERCASE, lowercase, Sentence case, or even specialized formats like camelCase or PascalCase for coding, this tool has you covered.",
    seoFaq: [
      {
        question: "Does it support Title Case?",
        answer: "Yes, our Title Case converter follows standard capitalization rules for headings and titles."
      }
    ]
  },
  {
    slug: "text-summarizer",
    name: "Text Summarizer",
    description: "Summarize long text using AI",
    category: "text-tools",
    icon: "Sparkles",
    path: "/text-tools/text-summarizer",
    keywords: ["summarize", "text summary", "tl;dr", "shorten text", "ai summary"],
    isNew: true,
    seoAbout: "The Text Summarizer uses advanced algorithms to distill long articles, essays, or reports into concise summaries. Save time by getting the key points and main ideas without reading through pages of text. Perfect for students, researchers, and busy professionals.",
    seoFaq: [
      {
        question: "How accurate is the summary?",
        answer: "The tool is designed to identify the most important sentences and keywords to provide a high-level overview of the content."
      }
    ]
  },
  {
    slug: "grammar-checker",
    name: "Grammar Checker",
    description: "Check and fix grammar mistakes in your text",
    category: "text-tools",
    icon: "SpellCheck",
    path: "/text-tools/grammar-checker",
    keywords: ["grammar", "spell check", "writing assistant", "correction", "proofreading"],
    isNew: true,
    seoAbout: "Our Grammar Checker helps you write with confidence by identifying and fixing common grammatical errors, spelling mistakes, and punctuation issues. Improve the clarity and professionalism of your emails, essays, and documents instantly.",
    seoFaq: [
      {
        question: "Is it a substitute for a human editor?",
        answer: "While it catches most common errors, we recommend a final human review for highly critical or creative writing."
      }
    ]
  },
  {
    slug: "lorem-ipsum",
    name: "Lorem Ipsum Generator",
    description: "Generate custom placeholder text for your designs and mockups",
    category: "text-tools",
    icon: "AlignLeft",
    path: "/text-tools/lorem-ipsum",
    keywords: ["lorem ipsum", "placeholder text", "generator", "dummy text", "text"],
    isNew: true,
    seoAbout: "Our Lorem Ipsum Generator allows you to quickly create professional-grade placeholder text for your design projects. You can customize the number of paragraphs, sentences, or even words to fit your specific layout needs. It's the perfect tool for web designers and graphic artists who need dummy text that looks like natural language.",
    seoFaq: [
      {
        question: "What is Lorem Ipsum?",
        answer: "Lorem Ipsum is standard placeholder text used in the design and printing industry to demonstrate the visual form of a document without using meaningful content."
      },
      {
        question: "Can I generate text other than Lorem Ipsum?",
        answer: "Currently, our generator focus on high-quality classical Latin-style placeholder text, which is the industry standard."
      }
    ]
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
    keywords: ["base64", "decode", "encode", "binary to text", "string"],
    seoAbout: "The Base64 Encoder/Decoder is a developer essential for converting binary data into ASCII strings and vice versa. It's commonly used for data URI generation, embedding images in CSS, or transmitting data over protocols that only support text.",
    seoFaq: [
      {
        question: "Is Base64 a form of encryption?",
        answer: "No, Base64 is an encoding scheme, not encryption. It is used to transform data, not to secure it."
      }
    ]
  },
  {
    slug: "regex-tester",
    name: "Regex Tester",
    description: "Test regular expressions with live matching",
    category: "developer-tools",
    icon: "Regex",
    path: "/developer-tools/regex-tester",
    keywords: ["regex", "regular expression", "tester", "tester", "javascript regex"],
    seoAbout: "The Regex Tester allows you to build and test regular expressions in real-time. With instant highlighting for matches and groups, it's the perfect environment for debugging complex patterns before implementing them in your code.",
    seoFaq: [
      {
        question: "Which regex flavor does it support?",
        answer: "The tester currently uses the JavaScript RegExp engine, which is compatible with most modern development environments."
      }
    ]
  },
  {
    slug: "sql-formatter",
    name: "SQL Formatter",
    description: "Format and beautify SQL queries",
    category: "developer-tools",
    icon: "Database",
    path: "/developer-tools/sql-formatter",
    keywords: ["sql", "formatter", "beautify", "minify", "sql editor"],
    seoAbout: "The SQL Formatter turns messy database queries into beautiful, readable code. It automatically handles indentation, casing for keywords (SELECT, FROM, WHERE), and complex joins, making it easier to review and optimize your SQL.",
    seoFaq: [
      {
        question: "Does it support multiple SQL dialects?",
        answer: "Yes, it works effectively with standard SQL as well as dialects like MySQL, PostgreSQL, and SQL Server."
      }
    ]
  },
  {
    slug: "uuid-generator",
    name: "UUID / GUID Generator",
    description: "Generate bulk v4 UUIDs instantly",
    category: "developer-tools",
    icon: "Fingerprint",
    path: "/developer-tools/uuid-generator",
    keywords: ["uuid", "guid", "generator", "unique", "id", "v4"],
    isNew: true,
    seoAbout: "The UUID Generator is a developer-centric tool for creating Universally Unique Identifiers (v4). It's designed for speed and reliability, allowing you to generate single or bulk IDs for databases, session tracking, or any application where uniqueness is critical.",
    seoFaq: [
      {
        question: "What is a UUID v4?",
        answer: "A Version 4 UUID is a universally unique identifier that is generated using random or pseudo-random numbers."
      },
      {
        question: "Are these UUIDs really unique?",
        answer: "Yes, the probability of a collision with UUID v4 is so low that it is considered zero for practical purposes."
      }
    ]
  },
  {
    slug: "color-converter",
    name: "Color Converter",
    description: "Convert colors between HEX, RGB, and HSL formats",
    category: "developer-tools",
    icon: "Palette",
    path: "/developer-tools/color-converter",
    keywords: ["color", "converter", "hex", "rgb", "hsl", "palette"],
    isNew: true,
    seoAbout: "The Color Converter is a powerful utility for designers and developers to switch between various color formats including HEX, RGB, and HSL. It also provides a visual preview and allows you to adjust values in real-time to find the perfect shade for your project.",
    seoFaq: [
      {
        question: "Which color format is best for CSS?",
        answer: "HEX and RGB are the most common, but HSL is often preferred for its readability and ease of creating variations (like lighter or darker shades)."
      }
    ]
  },
  // File Tools
  {
    slug: "pdf-tools",
    name: "PDF Merge & Split",
    description: "Merge multiple PDFs or split pages",
    category: "file-tools",
    icon: "Files",
    path: "/file-tools/pdf-tools",
    keywords: ["pdf", "merge pdf", "split pdf", "compress pdf", "pdf editor"],
    seoAbout: "The PDF Tools suite provides a collection of essential utilities for managing your PDF documents. Merge multiple files into one, split large PDFs into individual pages, or compress files to reduce size without sacrificing quality. All processing happens locally in your browser for maximum privacy.",
    seoFaq: [
      {
        question: "Is it safe to upload my sensitive PDFs?",
        answer: "Yes, our PDF tools process your files directly in your web browser. Your documents are never uploaded to any server, ensuring total privacy."
      }
    ]
  },
  {
    slug: "image-compressor",
    name: "Image Compressor",
    description: "Compress images while maintaining quality",
    category: "file-tools",
    icon: "Image",
    path: "/file-tools/image-compressor",
    keywords: ["compress image", "resize image", "jpg optimizer", "png compressor", "webp"],
    isPopular: true,
    seoAbout: "The Image Compressor helps you reduce the file size of your photos and graphics while maintaining excellent visual quality. It supports popular formats like JPEG, PNG, and WebP, making it ideal for optimizing website assets or saving storage space.",
    seoFaq: [
      {
        question: "How much can I reduce the file size?",
        answer: "Depending on the original format and quality settings, you can often reduce file sizes by 50% to 80% with minimal visible difference."
      }
    ]
  },
  // Security
  {
    slug: "password-generator",
    name: "Password Generator",
    description: "Generate strong, secure passwords",
    category: "security",
    icon: "KeyRound",
    path: "/security/password-generator",
    keywords: ["password generator", "secure password", "random string", "password manager"],
    isPopular: true,
    seoAbout: "The Password Generator creates strong, unpredictable passwords to help you secure your online accounts. Customize the length and include symbols, numbers, and mixed-case letters to meet any security requirement. A must-have tool for better digital security.",
    seoFaq: [
      {
        question: "What makes a password strong?",
        answer: "A strong password is typically at least 12 characters long and contains a mix of uppercase letters, lowercase letters, numbers, and special symbols."
      }
    ]
  },
  {
    slug: "hash-generator",
    name: "Hash Generator",
    description: "Generate MD5, SHA-256, and SHA-512 hashes",
    category: "security",
    icon: "Hash",
    path: "/security/hash-generator",
    keywords: ["hash", "md5", "sha256", "sha1", "checksum", "generator"],
    seoAbout: "The Hash Generator allows you to calculate secure cryptographic hashes for any text input. It supports multiple algorithms including MD5, SHA-1, and SHA-256, which are essential for verifying data integrity and secure data handling.",
    seoFaq: [
      {
        question: "What is a hash function used for?",
        answer: "Hash functions are used to create a unique digital 'fingerprint' of data. Even a tiny change in the input will result in a completely different hash."
      }
    ]
  },
  // Finance
  {
    slug: "discount-calculator",
    name: "Discount Calculator",
    description: "Calculate discounts and savings instantly",
    category: "finance",
    icon: "Tag",
    path: "/finance/discount-calculator",
    keywords: ["discount calculator", "sale", "percent off", "shopping", "savings"],
    seoAbout: "The Discount Calculator helps you find out exactly how much you'll save during a sale. Simply enter the original price and the discount percentage to see the final price and your total savings. Perfect for holiday shopping and clearance events.",
    seoFaq: [
      {
        question: "Can it handle double discounts?",
        answer: "You can calculate the first discount, and then apply a second discount to the new price for stacked savings."
      }
    ]
  },
  {
    slug: "fuel-price",
    name: "Fuel Price Tracker",
    description: "Track fuel prices across cities",
    category: "finance",
    icon: "Fuel",
    path: "/finance/fuel-price",
    keywords: ["fuel price", "petrol price", "diesel price", "gasoline", "fuel cost"],
    seoAbout: "Stay updated with the latest Fuel Prices for petrol and diesel. Our tool provides a convenient way to check current rates, helping you plan your commute and manage your travel expenses more effectively.",
    seoFaq: [
      {
        question: "Are these prices national or local?",
        answer: "We aim to provide the most relevant and up-to-date average market prices for fuel."
      }
    ]
  },
  {
    slug: "gold-price",
    name: "Gold Price Tracker",
    description: "Track live gold prices and trends",
    category: "finance",
    icon: "Gem",
    path: "/finance/gold-price",
    keywords: ["gold price", "silver price", "precious metals", "gold rate", "investment"],
    seoAbout: "Track the latest Gold and Silver Prices with our real-time precious metals tracker. Whether you're an investor or just curious about market trends, this tool provides current rates in various weights and carats.",
    seoFaq: [
      {
        question: "What carats are supported?",
        answer: "We provide rates for standard 24K and 22K gold, as well as silver prices."
      }
    ]
  },
  // Productivity
  {
    slug: "notes",
    name: "Notes",
    description: "Create and manage personal notes",
    category: "productivity",
    icon: "StickyNote",
    path: "/productivity/notes",
    keywords: ["notes", "notepad", "scratchpad", "online notes", "text editor"],
    isPopular: true,
    seoAbout: "The Notes tool is a simple, distraction-free environment for jotting down ideas, lists, or snippets of information. It's your digital scratchpad that's always ready when inspiration strikes.",
    seoFaq: [
      {
        question: "Are my notes saved?",
        answer: "Yes, your notes are saved locally in your browser's storage so they'll be there when you return."
      }
    ]
  },
  {
    slug: "todos",
    name: "Todo List",
    description: "Manage tasks with priorities and due dates",
    category: "productivity",
    icon: "ListTodo",
    path: "/productivity/todos",
    keywords: ["todo list", "task manager", "check list", "productivity", "planner"],
    isPopular: true,
    seoAbout: "The Todos tool helps you stay organized and productive by managing your daily tasks. Create, check off, and organize your to-do list to ensure you never miss an important deadline or errand.",
    seoFaq: [
      {
        question: "Can I organize tasks into categories?",
        answer: "The current version focus on a streamlined, single-list approach for maximum simplicity and speed."
      }
    ]
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
