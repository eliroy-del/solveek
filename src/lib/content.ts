import { createServerClient } from "@/lib/supabase/server";
import type {
  FaqItem,
  Industry,
  Insight,
  Office,
  ProcessStep,
  Project,
  Service,
  ServicePackage,
  Stat,
  Testimonial,
  TimelineItem,
} from "@/types";

type ServiceRow = {
  slug: string;
  title: string;
  short_title: string;
  description: string;
  long_description: string;
  icon: string;
  image: string;
  features: string[] | null;
  benefits: string[] | null;
  featured: boolean;
};

type IndustryRow = {
  slug: string;
  title: string;
  description: string;
  icon: string;
  image: string;
};

type ProjectRow = {
  slug: string;
  title: string;
  industry: string;
  location: string;
  challenge: string;
  solution: string;
  results: string[] | null;
  image: string;
  gallery: string[] | null;
};

type InsightRow = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  read_time: string;
  image: string;
  featured: boolean;
};

type FaqRow = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

type TestimonialRow = {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  image: string;
};

type StatRow = {
  value: number | string;
  suffix: string;
  label: string;
  decimals: number;
};

type ProcessRow = {
  step: number;
  title: string;
  description: string;
};

type TimelineRow = {
  year: string;
  title: string;
  description: string;
};

type OfficeRow = {
  city: string;
  country: string;
  address: string;
  phone: string;
  email: string;
};

type WhyRow = {
  title: string;
  description: string;
  icon: string;
};

type SiteContentRow = {
  key: string;
  value: unknown;
};

async function queryRows<T>(
  fn: () => PromiseLike<{ data: T[] | null; error: { message: string } | null }>
): Promise<T[]> {
  const { data, error } = await fn();
  if (error) {
    throw new Error(`Supabase query failed: ${error.message}`);
  }
  return data ?? [];
}

async function queryMaybeSingle<T>(
  fn: () => PromiseLike<{ data: unknown; error: { message: string } | null }>
): Promise<T | null> {
  const { data, error } = await fn();
  if (error) {
    throw new Error(`Supabase query failed: ${error.message}`);
  }
  return (data as T | null) ?? null;
}

export async function getServices(): Promise<Service[]> {
  const supabase = createServerClient();
  const data = await queryRows(() =>
    supabase
      .from("services")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .returns<ServiceRow[]>()
  );

  return data.map((row) => ({
    slug: row.slug,
    title: row.title,
    shortTitle: row.short_title,
    description: row.description,
    longDescription: row.long_description,
    icon: row.icon,
    image: row.image,
    features: row.features ?? [],
    benefits: row.benefits ?? [],
  }));
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const supabase = createServerClient();
  const data = await queryMaybeSingle<ServiceRow>(() =>
    supabase
      .from("services")
      .select("*")
      .eq("published", true)
      .eq("slug", slug)
      .maybeSingle()
  );
  if (!data) return null;

  return {
    slug: data.slug,
    title: data.title,
    shortTitle: data.short_title,
    description: data.description,
    longDescription: data.long_description,
    icon: data.icon,
    image: data.image,
    features: data.features ?? [],
    benefits: data.benefits ?? [],
  };
}

export async function getFeaturedCapabilities() {
  const supabase = createServerClient();
  const data = await queryRows(() =>
    supabase
      .from("services")
      .select("slug,title,description,icon,featured,sort_order")
      .eq("published", true)
      .eq("featured", true)
      .order("sort_order", { ascending: true })
      .limit(4)
      .returns<Pick<ServiceRow, "slug" | "title" | "description" | "icon">[]>()
  );

  if (data.length) {
    return data.map((s) => ({
      slug: s.slug,
      title: s.title,
      description: s.description,
      icon: s.icon,
    }));
  }

  const services = await getServices();
  return services.slice(0, 4).map((s) => ({
    slug: s.slug,
    title: s.title,
    description: s.description,
    icon: s.icon,
  }));
}

export async function getIndustries(): Promise<Industry[]> {
  const supabase = createServerClient();
  const data = await queryRows(() =>
    supabase
      .from("industries")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .returns<IndustryRow[]>()
  );

  return data.map((row) => ({
    slug: row.slug,
    title: row.title,
    description: row.description,
    icon: row.icon,
    image: row.image,
  }));
}

export async function getProjects(): Promise<Project[]> {
  const supabase = createServerClient();
  const data = await queryRows(() =>
    supabase
      .from("projects")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .returns<ProjectRow[]>()
  );

  return data.map((row) => ({
    slug: row.slug,
    title: row.title,
    industry: row.industry,
    location: row.location,
    challenge: row.challenge,
    solution: row.solution,
    results: row.results ?? [],
    image: row.image,
    gallery: row.gallery ?? [],
  }));
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = createServerClient();
  const data = await queryMaybeSingle<ProjectRow>(() =>
    supabase
      .from("projects")
      .select("*")
      .eq("published", true)
      .eq("slug", slug)
      .maybeSingle()
  );
  if (!data) return null;

  return {
    slug: data.slug,
    title: data.title,
    industry: data.industry,
    location: data.location,
    challenge: data.challenge,
    solution: data.solution,
    results: data.results ?? [],
    image: data.image,
    gallery: data.gallery ?? [],
  };
}

export async function getInsights(): Promise<Insight[]> {
  const supabase = createServerClient();
  const data = await queryRows(() =>
    supabase
      .from("insights")
      .select("*")
      .eq("published", true)
      .order("date", { ascending: false })
      .returns<InsightRow[]>()
  );

  return data.map((row) => ({
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    author: row.author,
    date: row.date,
    readTime: row.read_time,
    image: row.image,
    featured: row.featured,
  }));
}

export async function getInsightBySlug(slug: string): Promise<Insight | null> {
  const supabase = createServerClient();
  const data = await queryMaybeSingle<InsightRow>(() =>
    supabase
      .from("insights")
      .select("*")
      .eq("published", true)
      .eq("slug", slug)
      .maybeSingle()
  );
  if (!data) return null;

  return {
    slug: data.slug,
    title: data.title,
    excerpt: data.excerpt,
    category: data.category,
    author: data.author,
    date: data.date,
    readTime: data.read_time,
    image: data.image,
    featured: data.featured,
  };
}

export async function getFaqs(): Promise<FaqItem[]> {
  const supabase = createServerClient();
  const data = await queryRows(() =>
    supabase
      .from("faqs")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .returns<FaqRow[]>()
  );

  return data.map((row) => ({
    id: row.id,
    question: row.question,
    answer: row.answer,
    category: row.category,
  }));
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = createServerClient();
  const data = await queryRows(() =>
    supabase
      .from("testimonials")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .returns<TestimonialRow[]>()
  );

  return data.map((row) => ({
    id: row.id,
    name: row.name,
    role: row.role,
    company: row.company,
    quote: row.quote,
    rating: row.rating,
    image: row.image,
  }));
}

export async function getStats(): Promise<Stat[]> {
  const supabase = createServerClient();
  const data = await queryRows(() =>
    supabase
      .from("stats")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .returns<StatRow[]>()
  );

  return data.map((row) => ({
    value: Number(row.value),
    suffix: row.suffix,
    label: row.label,
    decimals: row.decimals,
  }));
}

export async function getProcessSteps(): Promise<ProcessStep[]> {
  const supabase = createServerClient();
  const data = await queryRows(() =>
    supabase
      .from("process_steps")
      .select("*")
      .eq("published", true)
      .order("step", { ascending: true })
      .returns<ProcessRow[]>()
  );

  return data.map((row) => ({
    step: row.step,
    title: row.title,
    description: row.description,
  }));
}

export async function getTimeline(): Promise<TimelineItem[]> {
  const supabase = createServerClient();
  const data = await queryRows(() =>
    supabase
      .from("timeline")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .returns<TimelineRow[]>()
  );

  return data.map((row) => ({
    year: row.year,
    title: row.title,
    description: row.description,
  }));
}

export async function getOffices(): Promise<Office[]> {
  const supabase = createServerClient();
  const data = await queryRows(() =>
    supabase
      .from("offices")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .returns<OfficeRow[]>()
  );

  return data.map((row) => ({
    city: row.city,
    country: row.country,
    address: row.address,
    phone: row.phone,
    email: row.email,
  }));
}

export async function getWhyChoose() {
  const supabase = createServerClient();
  const data = await queryRows(() =>
    supabase
      .from("why_choose")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .returns<WhyRow[]>()
  );

  return data.map((row) => ({
    title: row.title,
    description: row.description,
    icon: row.icon,
  }));
}

async function getSiteContent<T>(key: string): Promise<T> {
  const supabase = createServerClient();
  const data = await queryMaybeSingle<SiteContentRow>(() =>
    supabase.from("site_content").select("key,value").eq("key", key).maybeSingle()
  );
  if (!data) throw new Error(`Missing site_content key: ${key}`);
  return data.value as T;
}

export async function getBrandValues() {
  return getSiteContent<{ title: string; description: string }[]>("brand_values");
}

export async function getAboutHighlights() {
  return getSiteContent<string[]>("about_highlights");
}

export async function getTrustItems() {
  return getSiteContent<string[]>("trust_items");
}

export async function getWebsiteDesignPackages() {
  return getSiteContent<ServicePackage[]>("website_design_packages");
}

export type NavService = {
  label: string;
  href: string;
  description: string;
};

export async function getServiceNavItems(): Promise<NavService[]> {
  const services = await getServices();
  return services.map((service) => ({
    label: service.title,
    href: `/services/${service.slug}`,
    description: service.description,
  }));
}
