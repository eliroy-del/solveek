export type NavItem = {
  label: string;
  href: string;
  description?: string;
  children?: NavItem[];
};

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  icon: string;
  image: string;
  features: string[];
  benefits: string[];
};

export type Industry = {
  slug: string;
  title: string;
  description: string;
  icon: string;
  image: string;
};

export type Project = {
  slug: string;
  title: string;
  industry: string;
  location: string;
  challenge: string;
  solution: string;
  results: string[];
  image: string;
  gallery: string[];
};

export type Insight = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
};

export type Job = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
};

export type Office = {
  city: string;
  country: string;
  address: string;
  phone: string;
  email: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  image: string;
};

export type Stat = {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
};

export type ProcessStep = {
  step: number;
  title: string;
  description: string;
};

export type TimelineItem = {
  year: string;
  title: string;
  description: string;
};
