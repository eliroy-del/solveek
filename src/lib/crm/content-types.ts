export type ContentFieldType =
  | "text"
  | "textarea"
  | "number"
  | "checkbox"
  | "date"
  | "array"
  | "json";

export type ContentField = {
  name: string;
  label: string;
  type: ContentFieldType;
  required?: boolean;
  help?: string;
  rows?: number;
};

export type ContentTypeConfig = {
  key: string;
  label: string;
  description: string;
  table: string;
  titleField: string;
  /** Public path pattern for revalidation hints */
  publicPaths: string[];
  hasPublished: boolean;
  orderBy?: { column: string; ascending?: boolean };
  fields: ContentField[];
  createDefaults?: Record<string, unknown>;
};

export const CONTENT_TYPES: ContentTypeConfig[] = [
  {
    key: "projects",
    label: "Work",
    description: "Featured work and case studies on /work.",
    table: "projects",
    titleField: "title",
    publicPaths: ["/work", "/projects"],
    hasPublished: true,
    orderBy: { column: "sort_order", ascending: true },
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "industry", label: "Industry", type: "text" },
      { name: "location", label: "Location", type: "text" },
      { name: "challenge", label: "Challenge", type: "textarea", rows: 4 },
      { name: "solution", label: "Solution", type: "textarea", rows: 4 },
      {
        name: "results",
        label: "Results",
        type: "array",
        help: "One result per line",
      },
      { name: "image", label: "Image path", type: "text", help: "/images/..." },
      {
        name: "gallery",
        label: "Gallery paths",
        type: "array",
        help: "One image path per line",
      },
      { name: "website_url", label: "Live website URL", type: "text" },
      { name: "featured", label: "Featured", type: "checkbox" },
      { name: "sort_order", label: "Sort order", type: "number" },
      { name: "published", label: "Published", type: "checkbox" },
    ],
    createDefaults: {
      industry: "",
      location: "",
      challenge: "",
      solution: "",
      results: [],
      image: "",
      gallery: [],
      website_url: "",
      featured: false,
      sort_order: 0,
      published: false,
    },
  },
  {
    key: "insights",
    label: "Blog",
    description: "Articles shown on /blog.",
    table: "insights",
    titleField: "title",
    publicPaths: ["/blog", "/insights"],
    hasPublished: true,
    orderBy: { column: "date", ascending: false },
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "excerpt", label: "Excerpt", type: "textarea", rows: 3 },
      { name: "body", label: "Body", type: "textarea", rows: 14 },
      { name: "category", label: "Category", type: "text" },
      { name: "author", label: "Author", type: "text" },
      { name: "date", label: "Date", type: "date" },
      { name: "read_time", label: "Read time", type: "text" },
      { name: "image", label: "Image path", type: "text" },
      { name: "featured", label: "Featured", type: "checkbox" },
      { name: "published", label: "Published", type: "checkbox" },
    ],
    createDefaults: {
      excerpt: "",
      body: "",
      category: "General",
      author: "Solveek",
      date: new Date().toISOString().slice(0, 10),
      read_time: "5 min",
      image: "",
      featured: false,
      published: false,
    },
  },
  {
    key: "services",
    label: "Services",
    description: "Service catalogue used across the site.",
    table: "services",
    titleField: "title",
    publicPaths: ["/services", "/ecosystem"],
    hasPublished: true,
    orderBy: { column: "sort_order", ascending: true },
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "short_title", label: "Short title", type: "text" },
      { name: "description", label: "Description", type: "textarea", rows: 3 },
      {
        name: "long_description",
        label: "Long description",
        type: "textarea",
        rows: 6,
      },
      { name: "icon", label: "Icon name", type: "text" },
      { name: "image", label: "Image path", type: "text" },
      { name: "features", label: "Features", type: "array", help: "One per line" },
      { name: "benefits", label: "Benefits", type: "array", help: "One per line" },
      { name: "featured", label: "Featured", type: "checkbox" },
      { name: "sort_order", label: "Sort order", type: "number" },
      { name: "published", label: "Published", type: "checkbox" },
    ],
    createDefaults: {
      short_title: "",
      description: "",
      long_description: "",
      icon: "Layers",
      image: "",
      features: [],
      benefits: [],
      featured: false,
      sort_order: 0,
      published: false,
    },
  },
  {
    key: "industries",
    label: "Industries",
    description: "Industry pages and listings.",
    table: "industries",
    titleField: "title",
    publicPaths: ["/industries"],
    hasPublished: true,
    orderBy: { column: "sort_order", ascending: true },
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", rows: 4 },
      { name: "icon", label: "Icon name", type: "text" },
      { name: "image", label: "Image path", type: "text" },
      { name: "sort_order", label: "Sort order", type: "number" },
      { name: "published", label: "Published", type: "checkbox" },
    ],
    createDefaults: {
      description: "",
      icon: "Layers",
      image: "",
      sort_order: 0,
      published: false,
    },
  },
  {
    key: "faqs",
    label: "FAQs",
    description: "Questions and answers on /faqs.",
    table: "faqs",
    titleField: "question",
    publicPaths: ["/faqs"],
    hasPublished: true,
    orderBy: { column: "sort_order", ascending: true },
    fields: [
      { name: "question", label: "Question", type: "text", required: true },
      { name: "answer", label: "Answer", type: "textarea", rows: 5, required: true },
      { name: "category", label: "Category", type: "text" },
      { name: "sort_order", label: "Sort order", type: "number" },
      { name: "published", label: "Published", type: "checkbox" },
    ],
    createDefaults: {
      category: "General",
      sort_order: 0,
      published: false,
    },
  },
  {
    key: "testimonials",
    label: "Testimonials",
    description: "Client quotes shown across the site.",
    table: "testimonials",
    titleField: "name",
    publicPaths: ["/"],
    hasPublished: true,
    orderBy: { column: "sort_order", ascending: true },
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "role", label: "Role", type: "text" },
      { name: "company", label: "Company", type: "text" },
      { name: "quote", label: "Quote", type: "textarea", rows: 4, required: true },
      { name: "rating", label: "Rating (1-5)", type: "number" },
      { name: "image", label: "Image path", type: "text" },
      { name: "sort_order", label: "Sort order", type: "number" },
      { name: "published", label: "Published", type: "checkbox" },
    ],
    createDefaults: {
      role: "",
      company: "",
      rating: 5,
      image: "",
      sort_order: 0,
      published: false,
    },
  },
  {
    key: "stats",
    label: "Stats",
    description: "Numeric proof points on the homepage and elsewhere.",
    table: "stats",
    titleField: "label",
    publicPaths: ["/"],
    hasPublished: true,
    orderBy: { column: "sort_order", ascending: true },
    fields: [
      { name: "label", label: "Label", type: "text", required: true },
      { name: "value", label: "Value", type: "number", required: true },
      { name: "suffix", label: "Suffix", type: "text" },
      { name: "decimals", label: "Decimals", type: "number" },
      { name: "sort_order", label: "Sort order", type: "number" },
      { name: "published", label: "Published", type: "checkbox" },
    ],
    createDefaults: {
      suffix: "",
      decimals: 0,
      sort_order: 0,
      published: false,
    },
  },
  {
    key: "process_steps",
    label: "Process",
    description: "How we work steps.",
    table: "process_steps",
    titleField: "title",
    publicPaths: ["/"],
    hasPublished: true,
    orderBy: { column: "step", ascending: true },
    fields: [
      { name: "step", label: "Step number", type: "number", required: true },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", rows: 3 },
      { name: "published", label: "Published", type: "checkbox" },
    ],
    createDefaults: {
      description: "",
      published: false,
    },
  },
  {
    key: "timeline",
    label: "Timeline",
    description: "Company timeline entries.",
    table: "timeline",
    titleField: "title",
    publicPaths: ["/about"],
    hasPublished: true,
    orderBy: { column: "sort_order", ascending: true },
    fields: [
      { name: "year", label: "Year", type: "text", required: true },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", rows: 3 },
      { name: "sort_order", label: "Sort order", type: "number" },
      { name: "published", label: "Published", type: "checkbox" },
    ],
    createDefaults: {
      description: "",
      sort_order: 0,
      published: false,
    },
  },
  {
    key: "offices",
    label: "Offices",
    description: "Office and contact locations.",
    table: "offices",
    titleField: "city",
    publicPaths: ["/contact", "/about"],
    hasPublished: true,
    orderBy: { column: "sort_order", ascending: true },
    fields: [
      { name: "city", label: "City", type: "text", required: true },
      { name: "country", label: "Country", type: "text", required: true },
      { name: "address", label: "Address", type: "textarea", rows: 2 },
      { name: "phone", label: "Phone", type: "text" },
      { name: "email", label: "Email", type: "text" },
      { name: "sort_order", label: "Sort order", type: "number" },
      { name: "published", label: "Published", type: "checkbox" },
    ],
    createDefaults: {
      address: "",
      phone: "",
      email: "",
      sort_order: 0,
      published: false,
    },
  },
  {
    key: "why_choose",
    label: "Why Choose",
    description: "Why Choose Solveek points.",
    table: "why_choose",
    titleField: "title",
    publicPaths: ["/"],
    hasPublished: true,
    orderBy: { column: "sort_order", ascending: true },
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", rows: 3 },
      { name: "icon", label: "Icon name", type: "text" },
      { name: "sort_order", label: "Sort order", type: "number" },
      { name: "published", label: "Published", type: "checkbox" },
    ],
    createDefaults: {
      description: "",
      icon: "Sparkles",
      sort_order: 0,
      published: false,
    },
  },
  {
    key: "site_content",
    label: "Site blocks",
    description:
      "Packages, trust bar, brand values, and other keyed homepage/service blocks.",
    table: "site_content",
    titleField: "key",
    publicPaths: ["/", "/services"],
    hasPublished: false,
    orderBy: { column: "key", ascending: true },
    fields: [
      { name: "key", label: "Key", type: "text", required: true },
      {
        name: "value",
        label: "Value (JSON)",
        type: "json",
        rows: 18,
        required: true,
        help: "Valid JSON only. Publishing saves immediately to the live site.",
      },
    ],
  },
];

export function getContentType(key: string) {
  return CONTENT_TYPES.find((item) => item.key === key) ?? null;
}

export const CONTENT_EDITOR_ROLES = [
  "super_admin",
  "admin",
  "marketing",
] as const;
