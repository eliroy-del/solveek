import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function loadEnv() {
  const envPath = resolve(process.cwd(), ".env.local");
  const text = readFileSync(envPath, "utf8");
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const i = trimmed.indexOf("=");
    if (i === -1) continue;
    const key = trimmed.slice(0, i);
    const value = trimmed.slice(i + 1);
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnv();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error("Missing Supabase env vars");
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const IMAGES = {
  design: "https://images.unsplash.com/photo-1739300293396-9ad79111c8e4?auto=format&fit=crop&w=1600&q=80",
  social: "https://images.unsplash.com/photo-1739300293396-9ad79111c8e4?auto=format&fit=crop&w=1600&q=80",
  ecommerce: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=80",
  saas: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
  meeting: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=80",
  product: "https://images.unsplash.com/photo-1528901166007-3784c7dd3653?auto=format&fit=crop&w=1600&q=80",
  analytics: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
  code: "https://images.unsplash.com/photo-1528901166007-3784c7dd3653?auto=format&fit=crop&w=1600&q=80",
  office: "https://images.unsplash.com/photo-1528901166007-3784c7dd3653?auto=format&fit=crop&w=1600&q=80",
  team: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=80",
  teamAlt: "https://images.unsplash.com/photo-1528901166007-3784c7dd3653?auto=format&fit=crop&w=1600&q=80",
  portrait: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=400&q=80",
  portraitAlt: "https://images.unsplash.com/photo-1528901166007-3784c7dd3653?auto=format&fit=crop&w=400&q=80",
  portraitSoft: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400&q=80",
};

async function upsert(table, rows, onConflict = "slug") {
  const { error } = await supabase.from(table).upsert(rows, { onConflict });
  if (error) throw new Error(`${table}: ${error.message}`);
  console.log(`✓ ${table} (${rows.length})`);
}

const services = [
  {
    slug: "website-design",
    title: "Website Design",
    short_title: "Web",
    description: "Premium, responsive websites that communicate credibility and convert visitors into customers.",
    long_description: "SOLVEEK designs and builds websites that feel intentional, from first impression to final conversion.",
    icon: "MonitorSmartphone",
    image: IMAGES.design,
    features: ["Custom UI systems", "Next.js / modern web stacks", "CMS-ready architecture", "Performance & accessibility"],
    benefits: ["Stronger first impressions", "Higher conversion rates", "Faster publishing workflows"],
    featured: true,
    sort_order: 1,
  },
  {
    slug: "social-media-management",
    title: "Social Media Management",
    short_title: "Social",
    description: "Strategy, content, and community management that grow brand authority across channels.",
    long_description: "We run social as a growth engine with channel strategy, creative systems, and reporting loops.",
    icon: "Share2",
    image: IMAGES.social,
    features: ["Channel strategy", "Content production", "Community engagement", "Performance reporting"],
    benefits: ["Consistent brand presence", "Audience growth with intent", "Clear ROI visibility"],
    featured: true,
    sort_order: 2,
  },
  {
    slug: "ecommerce",
    title: "E-commerce",
    short_title: "Commerce",
    description: "High-converting storefronts, product experiences, and checkout flows built for sales.",
    long_description: "SOLVEEK builds e-commerce experiences that reduce friction and increase average order value.",
    icon: "ShoppingBag",
    image: IMAGES.ecommerce,
    features: ["Store design & development", "Payment integrations", "CRO", "Catalog workflows"],
    benefits: ["Faster path to purchase", "Improved cart recovery", "Scalable commerce"],
    featured: true,
    sort_order: 3,
  },
  {
    slug: "branding-identity",
    title: "Branding & Identity",
    short_title: "Brand",
    description: "Visual identities and brand systems that make your company unmistakable.",
    long_description: "SOLVEEK crafts brand foundations so every digital touchpoint feels coherent and premium.",
    icon: "Palette",
    image: IMAGES.meeting,
    features: ["Logo & visual identity", "Brand guidelines", "Tone of voice", "Launch collateral"],
    benefits: ["Memorable presence", "Consistent brand", "Faster creative production"],
    featured: true,
    sort_order: 4,
  },
  {
    slug: "seo-content",
    title: "SEO & Content",
    short_title: "SEO",
    description: "Search strategy and content systems that compound organic visibility.",
    long_description: "We align technical SEO, content architecture, and editorial quality for durable discovery.",
    icon: "Search",
    image: IMAGES.analytics,
    features: ["Technical SEO", "Content strategy", "On-page optimization", "Editorial systems"],
    benefits: ["Organic traffic", "Topical authority", "Sales-ready content"],
    featured: false,
    sort_order: 5,
  },
  {
    slug: "maintenance-support",
    title: "Maintenance & Support",
    short_title: "Support",
    description: "Proactive care, updates, and optimization for websites and digital products.",
    long_description: "SOLVEEK provides ongoing maintenance and iterative improvements after launch.",
    icon: "Headset",
    image: IMAGES.office,
    features: ["Uptime monitoring", "Security updates", "Performance tuning", "Feature retainers"],
    benefits: ["Fewer emergencies", "Continuous improvement", "A partner after launch"],
    featured: false,
    sort_order: 6,
  },
];

async function main() {
  // Probe
  const probe = await supabase.from("services").select("id").limit(1);
  if (probe.error) {
    console.error("\nTables not found yet.");
    console.error("Apply supabase/migrations/20260808210000_solveek_cms.sql in the Supabase SQL Editor,");
    console.error("or connect the Solveek MCP and ask me to apply the migration.\n");
    console.error(probe.error.message);
    process.exit(1);
  }

  await upsert("services", services);

  const { error: unpublishServicesError } = await supabase
    .from("services")
    .update({ published: false, featured: false })
    .in("slug", [
      "saas-products",
      "cloud-devops",
      "ui-ux-design",
      "custom-software",
      "mobile-apps",
      "digital-marketing",
    ]);
  if (unpublishServicesError) {
    throw new Error(`services unpublish: ${unpublishServicesError.message}`);
  }

  await upsert("industries", [
    { slug: "startups", title: "Startups", description: "MVPs, brand launches, and growth systems built for speed.", icon: "Rocket", image: IMAGES.product, sort_order: 1 },
    { slug: "ecommerce-brands", title: "E-commerce Brands", description: "Storefronts and campaigns designed to increase revenue.", icon: "ShoppingBag", image: IMAGES.ecommerce, sort_order: 2 },
    { slug: "saas-companies", title: "SaaS Companies", description: "Product UX, websites, and acquisition funnels that convert.", icon: "Layers", image: IMAGES.saas, sort_order: 3 },
    { slug: "professional-services", title: "Professional Services", description: "Authority-building websites for firms that sell expertise.", icon: "Briefcase", image: IMAGES.meeting, sort_order: 4 },
    { slug: "healthcare", title: "Healthcare", description: "Compliant digital experiences that build patient trust.", icon: "HeartPulse", image: IMAGES.team, sort_order: 5 },
    { slug: "education", title: "Education", description: "Learning platforms and enrollment experiences that engage.", icon: "GraduationCap", image: IMAGES.office, sort_order: 6 },
    { slug: "real-estate", title: "Real Estate", description: "Property platforms and lead systems for modern agencies.", icon: "Building2", image: IMAGES.analytics, sort_order: 7 },
    { slug: "hospitality", title: "Hospitality", description: "Brand sites and booking journeys with premium polish.", icon: "Hotel", image: IMAGES.design, sort_order: 8 },
    { slug: "fintech", title: "Fintech", description: "Secure product interfaces and trust-first brand systems.", icon: "Wallet", image: IMAGES.code, sort_order: 9 },
    { slug: "nonprofits", title: "Nonprofits", description: "Mission-driven digital platforms that inspire action.", icon: "HeartHandshake", image: IMAGES.teamAlt, sort_order: 10 },
  ]);

  const PROJECT_IMAGES = {
    ecommerce: "/images/project-northline-commerce.png",
    checkout: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1600&q=80",
    retail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=80",
    saas: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    dashboard: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
    metrics: "https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=1600&q=80",
    social: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1600&q=80",
    content: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=1600&q=80",
    planning: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=1600&q=80",
    website: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1600&q=80",
    designDesk: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1600&q=80",
  };

  await upsert("projects", [
    {
      slug: "northline-commerce-rebuild",
      title: "Northline Commerce Rebuild",
      industry: "E-commerce",
      location: "Direct-to-consumer brand",
      challenge: "An apparel brand needed a faster storefront and clearer product storytelling.",
      solution: "SOLVEEK redesigned the brand system and rebuilt the storefront with focused CRO experiments.",
      results: ["38% increase in conversion rate", "22% higher average order value", "Page load under 1.8s on mobile"],
      image: PROJECT_IMAGES.ecommerce,
      gallery: [PROJECT_IMAGES.ecommerce, PROJECT_IMAGES.checkout, PROJECT_IMAGES.retail],
      featured: true,
      sort_order: 1,
    },
    {
      slug: "lumen-brand-system",
      title: "Lumen Brand Identity System",
      industry: "Branding",
      location: "Consumer lifestyle brand",
      challenge: "The brand looked inconsistent across packaging, social, and digital touchpoints.",
      solution: "SOLVEEK crafted a full identity system with logo suite, color, type, voice, and reusable brand guidelines.",
      results: ["Unified brand presence across channels", "Faster creative production for the team", "Clear guidelines adopted company-wide"],
      image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&w=1600&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
      ],
      featured: true,
      sort_order: 2,
    },
    {
      slug: "atelier-social-system",
      title: "Atelier Social Growth System",
      industry: "Lifestyle brand",
      location: "Multi-channel social",
      challenge: "Inconsistent content and no operating rhythm across channels.",
      solution: "SOLVEEK built a content operating system and performance dashboard.",
      results: ["3.2x increase in engagement rate", "Consistent weekly publishing", "Clear campaign attribution"],
      image: PROJECT_IMAGES.social,
      gallery: [PROJECT_IMAGES.social, PROJECT_IMAGES.content, PROJECT_IMAGES.planning],
      featured: true,
      sort_order: 3,
    },
    {
      slug: "brightpath-website-platform",
      title: "BrightPath Website Platform",
      industry: "Education",
      location: "EdTech company",
      challenge: "Needed a credible digital presence for enrollments and content marketing.",
      solution: "We delivered a modular website with CMS workflows and SEO foundations.",
      results: ["64% more qualified inquiries", "Editorial publishing 5x faster", "Expanded search visibility"],
      image: PROJECT_IMAGES.website,
      gallery: [PROJECT_IMAGES.website, PROJECT_IMAGES.designDesk, PROJECT_IMAGES.dashboard],
      featured: true,
      sort_order: 4,
    },
  ]);

  await upsert("insights", [
    { slug: "conversion-first-website-design", title: "Conversion-First Website Design Without Sacrificing Craft", excerpt: "How premium visual design and clear UX architecture drive measurable outcomes.", body: "", category: "Design", author: "Amara Okonkwo", date: "2026-06-12", read_time: "7 min", image: IMAGES.design, featured: true },
    { slug: "saas-onboarding-that-sticks", title: "SaaS Onboarding That Sticks", excerpt: "Practical UX patterns that help new users reach value faster.", body: "", category: "Product", author: "Daniel Reyes", date: "2026-05-28", read_time: "6 min", image: IMAGES.saas, featured: false },
    { slug: "social-systems-not-posts", title: "Build Social Systems, Not Just Posts", excerpt: "Why high-performing brands treat social as an operating system.", body: "", category: "Marketing", author: "Priya Nair", date: "2026-05-04", read_time: "8 min", image: IMAGES.social, featured: false },
    { slug: "ecommerce-checkout-friction", title: "Where Checkout Friction Quietly Kills Revenue", excerpt: "A practical checklist for finding silent leaks between product page and purchase.", body: "", category: "E-commerce", author: "James Whitfield", date: "2026-04-18", read_time: "5 min", image: IMAGES.ecommerce, featured: false },
    { slug: "design-systems-for-scale", title: "Design Systems That Keep Growing Brands Coherent", excerpt: "How reusable components accelerate shipping without diluting quality.", body: "", category: "Design", author: "Elena Markov", date: "2026-03-30", read_time: "9 min", image: IMAGES.product, featured: false },
    { slug: "ai-in-digital-products", title: "Using AI in Digital Products Without Losing Trust", excerpt: "A grounded approach to AI features that feel useful and brand-aligned.", body: "", category: "Technology", author: "Sophie Laurent", date: "2026-03-09", read_time: "6 min", image: IMAGES.code, featured: false },
  ]);

  const { error: faqErr } = await supabase.from("faqs").upsert([
    { question: "What does SOLVEEK do?", answer: "SOLVEEK is an IT solutions company specializing in website design, social media management, e-commerce, SaaS products, branding, UX, and digital growth systems.", category: "General", sort_order: 1 },
    { question: "Can you build both marketing websites and SaaS products?", answer: "Yes. We design and engineer marketing websites, e-commerce platforms, and full SaaS products.", category: "Services", sort_order: 2 },
    { question: "What does a typical project process look like?", answer: "Most engagements move through discovery, strategy, design, build, launch, and optimization.", category: "Process", sort_order: 3 },
    { question: "How do engagements typically start?", answer: "Start with a quote request or strategy call. We scope outcomes, timeline, and commercial model.", category: "Pricing", sort_order: 4 },
    { question: "Do you offer ongoing social media management?", answer: "Yes. Strategy, content production, publishing, community management, and reporting.", category: "Services", sort_order: 5 },
    { question: "Which technologies do you work with?", answer: "Next.js, TypeScript, headless CMS platforms, Shopify, cloud infrastructure, and analytics tooling.", category: "Technology", sort_order: 6 },
    { question: "Do you support products after launch?", answer: "Absolutely. Maintenance, monitoring, feature iteration, and growth retainers are available.", category: "Support", sort_order: 7 },
    { question: "Who do you typically work with?", answer: "Startups, growing brands, SaaS companies, professional services firms, and established organizations.", category: "General", sort_order: 8 },
  ], { onConflict: "question" }).select();
  // faqs may not have unique on question - use delete+insert if needed
  if (faqErr) {
    await supabase.from("faqs").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    const { error } = await supabase.from("faqs").insert([
      { question: "What does SOLVEEK do?", answer: "SOLVEEK is an IT solutions company specializing in website design, social media management, e-commerce, SaaS products, branding, UX, and digital growth systems.", category: "General", sort_order: 1 },
      { question: "Can you build both marketing websites and SaaS products?", answer: "Yes. We design and engineer marketing websites, e-commerce platforms, and full SaaS products.", category: "Services", sort_order: 2 },
      { question: "What does a typical project process look like?", answer: "Most engagements move through discovery, strategy, design, build, launch, and optimization.", category: "Process", sort_order: 3 },
      { question: "How do engagements typically start?", answer: "Start with a quote request or strategy call. We scope outcomes, timeline, and commercial model.", category: "Pricing", sort_order: 4 },
      { question: "Do you offer ongoing social media management?", answer: "Yes. Strategy, content production, publishing, community management, and reporting.", category: "Services", sort_order: 5 },
      { question: "Which technologies do you work with?", answer: "Next.js, TypeScript, headless CMS platforms, Shopify, cloud infrastructure, and analytics tooling.", category: "Technology", sort_order: 6 },
      { question: "Do you support products after launch?", answer: "Absolutely. Maintenance, monitoring, feature iteration, and growth retainers are available.", category: "Support", sort_order: 7 },
      { question: "Who do you typically work with?", answer: "Startups, growing brands, SaaS companies, professional services firms, and established organizations.", category: "General", sort_order: 8 },
    ]);
    if (error) throw error;
  }
  console.log("✓ faqs");

  await supabase.from("testimonials").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("testimonials").insert([
    { name: "Ama Boateng", role: "Founder", company: "Northline Apparel", quote: "SOLVEEK rebuilt our storefront with clarity and craft. Conversion improved within weeks.", rating: 5, image: IMAGES.portrait, sort_order: 1 },
    { name: "Kwame Mensah", role: "CEO", company: "Pulseboard", quote: "They redesigned how users reach value. Activation jumped, and we finally have a design system we can ship from.", rating: 5, image: IMAGES.portraitAlt, sort_order: 2 },
    { name: "Efua Asante", role: "Marketing Director", company: "Atelier Collective", quote: "Our social presence went from inconsistent to intentional.", rating: 5, image: IMAGES.portraitSoft, sort_order: 3 },
  ]);
  console.log("✓ testimonials");

  await supabase.from("stats").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("stats").insert([
    { value: 180, suffix: "+", label: "Projects Delivered", decimals: 0, sort_order: 1 },
    { value: 60, suffix: "+", label: "Active Clients", decimals: 0, sort_order: 2 },
    { value: 98, suffix: "%", label: "Client Satisfaction", decimals: 0, sort_order: 3 },
    { value: 12, suffix: "+", label: "Years Experience", decimals: 0, sort_order: 4 },
    { value: 40, suffix: "+", label: "Specialists", decimals: 0, sort_order: 5 },
  ]);
  console.log("✓ stats");

  await supabase.from("process_steps").upsert([
    { step: 1, title: "Discover", description: "We clarify goals, audiences, constraints, and the outcomes that matter." },
    { step: 2, title: "Strategize", description: "Positioning, information architecture, and delivery plans are defined with intent." },
    { step: 3, title: "Design", description: "Interfaces, brand systems, and prototypes are crafted for clarity and conversion." },
    { step: 4, title: "Build", description: "Engineering brings the experience to life with performance and scalability in mind." },
    { step: 5, title: "Launch", description: "We ship with QA, analytics, and a rollout plan your team can trust." },
    { step: 6, title: "Optimize", description: "Measurement and iteration keep improving results after launch." },
  ], { onConflict: "step" });
  console.log("✓ process_steps");

  await supabase.from("timeline").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("timeline").insert([
    { year: "2014", title: "Founded", description: "SOLVEEK launched as a digital studio focused on premium web experiences.", sort_order: 1 },
    { year: "2017", title: "Product Expansion", description: "Expanded into SaaS UX, e-commerce platforms, and growth systems.", sort_order: 2 },
    { year: "2020", title: "Full-stack Delivery", description: "Built integrated design-engineering teams for end-to-end delivery.", sort_order: 3 },
    { year: "2023", title: "Social & Growth Desk", description: "Added dedicated social media and performance marketing capabilities.", sort_order: 4 },
    { year: "2025", title: "AI-assisted Workflows", description: "Introduced AI-augmented design and content systems with human quality control.", sort_order: 5 },
    { year: "2026", title: "Enterprise Partnerships", description: "Supporting ambitious brands and product teams across multiple industries.", sort_order: 6 },
  ]);
  console.log("✓ timeline");

  await supabase.from("offices").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("offices").insert([
    { city: "San Francisco", country: "USA", address: "100 Pine Street, Suite 1250", phone: "+1 (415) 555-0142", email: "sf@solveek.com", sort_order: 1 },
    { city: "London", country: "UK", address: "22 Bishopsgate, Level 18", phone: "+44 20 7946 0958", email: "uk@solveek.com", sort_order: 2 },
    { city: "Dubai", country: "UAE", address: "Sheikh Zayed Road, Tower 4", phone: "+971 4 555 0177", email: "mea@solveek.com", sort_order: 3 },
    { city: "Singapore", country: "Singapore", address: "12 Marina Boulevard, Level 28", phone: "+65 6123 4500", email: "apac@solveek.com", sort_order: 4 },
  ]);
  console.log("✓ offices");

  await supabase.from("why_choose").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("why_choose").insert([
    { title: "Strategy-led Design", description: "Every interface starts with business goals, audience clarity, and measurable outcomes.", icon: "Target", sort_order: 1 },
    { title: "Full-stack Delivery", description: "Design, engineering, and growth operate as one team.", icon: "Layers", sort_order: 2 },
    { title: "Premium Craft", description: "Typography, motion, and spacing are treated as brand assets.", icon: "Sparkles", sort_order: 3 },
    { title: "Conversion Focus", description: "Beautiful experiences engineered to move users toward action.", icon: "Gauge", sort_order: 4 },
    { title: "Transparent Process", description: "Clear milestones, demos, and decision logs keep stakeholders aligned.", icon: "ClipboardCheck", sort_order: 5 },
    { title: "Scalable Systems", description: "Design systems and modular builds that grow with your product.", icon: "Boxes", sort_order: 6 },
    { title: "Growth Partnership", description: "We stay after launch to optimize performance and conversion.", icon: "TrendingUp", sort_order: 7 },
    { title: "Trusted Specialists", description: "Senior practitioners across design, product, social, and engineering.", icon: "Users", sort_order: 8 },
  ]);
  console.log("✓ why_choose");

  const { error: siteContentError } = await supabase.from("site_content").upsert(
    [
      {
        key: "brand_values",
        value: [
          { title: "Clarity", description: "We simplify complexity so teams and customers know what to do next." },
          { title: "Craft", description: "Details matter. Visual quality, motion, and performance are non-negotiable." },
          { title: "Momentum", description: "We ship thoughtfully and iterate with evidence, not guesswork." },
          { title: "Partnership", description: "We operate as an extension of your team, accountable to outcomes." },
        ],
      },
      {
        key: "about_highlights",
        value: [
          "Solving complex digital problems",
          "We guarantee trusted delivery",
          "Experts across design & technology",
        ],
      },
      {
        key: "trust_items",
        value: [
          "Website Design",
          "Social Media",
          "E-commerce",
          "Branding",
          "SEO & Content",
          "Maintenance & Support",
        ],
      },
      {
        key: "website_design_packages",
        value: [
          {
            name: "Starter",
            tagline: "Launch with clarity",
            price: "GHS 4,000",
            priceNote: "from",
            description: "A focused marketing site for brands that need a credible online presence fast.",
            features: [
              "Up to 5 pages",
              "Mobile-responsive design",
              "Basic CMS for updates",
              "Contact form + WhatsApp CTA",
              "SEO essentials & analytics",
              "2 revision rounds",
            ],
            cta: "Choose Starter",
            highlighted: false,
          },
          {
            name: "Business",
            tagline: "Grow with a conversion system",
            price: "GHS 6,000",
            priceNote: "from",
            description: "A full business website with stronger storytelling, lead capture, and performance polish.",
            features: [
              "Up to 12 pages",
              "Custom UI direction",
              "CMS with structured content",
              "Lead capture & quote flows",
              "Blog or resources section",
              "Performance & accessibility pass",
              "3 revision rounds",
              "30 days post-launch support",
            ],
            cta: "Choose Business",
            highlighted: true,
          },
          {
            name: "Premium",
            tagline: "Design systems that scale",
            price: "GHS 12,000",
            priceNote: "from",
            description: "A premium web product experience for ambitious brands that need depth, motion, and flexibility.",
            features: [
              "Unlimited key pages in scope",
              "Custom design system",
              "Advanced interactions & motion",
              "CMS workflows for your team",
              "Integrations (CRM, payments, booking)",
              "CRO-ready page architecture",
              "Priority delivery support",
              "60 days post-launch support",
            ],
            cta: "Choose Premium",
            highlighted: false,
          },
        ],
      },
      {
        key: "ecommerce_packages",
        value: [
          {
            name: "Starter",
            tagline: "Open your store",
            price: "GHS 5,000",
            priceNote: "from",
            description: "A clean storefront for brands ready to sell a focused catalog online.",
            features: [
              "Up to 25 products",
              "Mobile-ready storefront",
              "Product pages & cart",
              "Payment gateway setup",
              "Order notification emails",
              "Basic inventory tracking",
              "2 revision rounds",
            ],
            cta: "Choose Starter",
            highlighted: false,
          },
          {
            name: "Business",
            tagline: "Sell with confidence",
            price: "GHS 8,000",
            priceNote: "from",
            description: "A conversion-focused store with richer merchandising and smoother checkout.",
            features: [
              "Up to 150 products",
              "Custom storefront design",
              "Collections & filters",
              "Optimized checkout flow",
              "Discounts & promo codes",
              "Shipping rules setup",
              "Analytics & conversion tracking",
              "3 revision rounds",
              "30 days post-launch support",
            ],
            cta: "Choose Business",
            highlighted: true,
          },
          {
            name: "Premium",
            tagline: "Scale your commerce system",
            price: "GHS 15,000",
            priceNote: "from",
            description: "An advanced commerce experience for growing brands that need depth and automation.",
            features: [
              "Unlimited products in scope",
              "Custom design system",
              "Advanced product options & variants",
              "CRM / email marketing integrations",
              "Abandoned cart recovery",
              "Multi-payment & delivery options",
              "CRO-ready landing templates",
              "Priority delivery support",
              "60 days post-launch support",
            ],
            cta: "Choose Premium",
            highlighted: false,
          },
        ],
      },
      {
        key: "social_media_packages",
        value: [
          {
            name: "Starter",
            tagline: "Show up consistently",
            price: "GHS 2,500",
            priceNote: "/month",
            description: "A focused monthly rhythm for brands building presence on core channels.",
            features: [
              "Up to 2 platforms",
              "8 posts per month",
              "Caption writing & scheduling",
              "Basic brand-aligned visuals",
              "Monthly performance summary",
            ],
            cta: "Choose Starter",
            highlighted: false,
          },
          {
            name: "Business",
            tagline: "Grow with a content system",
            price: "GHS 4,500",
            priceNote: "/month",
            description: "Strategy-led content and community management for brands ready to engage.",
            features: [
              "Up to 3 platforms",
              "16 posts per month",
              "Content calendar & themes",
              "Community replies (business hours)",
              "Stories / short-form support",
              "Bi-weekly reporting",
            ],
            cta: "Choose Business",
            highlighted: true,
          },
          {
            name: "Premium",
            tagline: "Run social as a growth engine",
            price: "GHS 8,000",
            priceNote: "/month",
            description: "A full social operating system with creative depth and clear growth loops.",
            features: [
              "Up to 5 platforms",
              "24+ posts per month",
              "Campaign planning & creative direction",
              "Community management",
              "Influencer / collab coordination",
              "Ads creative support",
              "Weekly reporting & recommendations",
            ],
            cta: "Choose Premium",
            highlighted: false,
          },
        ],
      },
      {
        key: "branding_packages",
        value: [
          {
            name: "Starter",
            tagline: "A clear visual identity",
            price: "GHS 3,000",
            priceNote: "from",
            description: "A focused brand foundation for new businesses and early-stage launches.",
            features: [
              "Logo design (primary + mark)",
              "Color palette & typography",
              "Basic brand usage rules",
              "Social profile kit",
              "2 revision rounds",
            ],
            cta: "Choose Starter",
            highlighted: false,
          },
          {
            name: "Business",
            tagline: "A brand kit your team can use",
            price: "GHS 5,500",
            priceNote: "from",
            description: "A complete identity system for brands that need consistency across channels.",
            features: [
              "Full logo suite",
              "Color, type, and spacing system",
              "Brand guidelines PDF",
              "Business card & letterhead",
              "Social templates",
              "3 revision rounds",
            ],
            cta: "Choose Business",
            highlighted: true,
          },
          {
            name: "Premium",
            tagline: "A brand system that scales",
            price: "GHS 10,000",
            priceNote: "from",
            description: "An expanded brand system with messaging and collateral for growth.",
            features: [
              "Complete visual identity system",
              "Tone of voice & messaging pillars",
              "Extended guidelines & templates",
              "Launch collateral pack",
              "Presentation / pitch deck styling",
              "Brand workshop session",
              "Priority delivery support",
            ],
            cta: "Choose Premium",
            highlighted: false,
          },
        ],
      },
      {
        key: "seo_content_packages",
        value: [
          {
            name: "Starter",
            tagline: "Get the foundations right",
            price: "GHS 2,000",
            priceNote: "/month",
            description: "Technical and on-page essentials for sites that need stronger search visibility.",
            features: [
              "Technical SEO audit",
              "On-page optimization for key pages",
              "Keyword research starter set",
              "Google Search Console setup",
              "Monthly progress report",
            ],
            cta: "Choose Starter",
            highlighted: false,
          },
          {
            name: "Business",
            tagline: "Publish with intent",
            price: "GHS 3,500",
            priceNote: "/month",
            description: "Ongoing SEO and content production that builds topical authority.",
            features: [
              "Technical + content SEO roadmap",
              "4 SEO articles per month",
              "On-page optimization",
              "Internal linking improvements",
              "Competitor snapshot",
              "Monthly reporting",
            ],
            cta: "Choose Business",
            highlighted: true,
          },
          {
            name: "Premium",
            tagline: "Compound organic growth",
            price: "GHS 6,000",
            priceNote: "/month",
            description: "A fuller search and content system for brands competing for demand.",
            features: [
              "Full SEO strategy & content calendar",
              "8 SEO articles per month",
              "Landing page copy support",
              "Technical SEO monitoring",
              "Schema & CRO recommendations",
              "Priority support & monthly workshop",
            ],
            cta: "Choose Premium",
            highlighted: false,
          },
        ],
      },
      {
        key: "maintenance_packages",
        value: [
          {
            name: "Starter",
            tagline: "Stay secure and online",
            price: "GHS 800",
            priceNote: "/month",
            description: "Essential care for websites that need reliable updates and monitoring.",
            features: [
              "Uptime monitoring",
              "Core software updates",
              "Weekly backups",
              "Security patches",
              "Monthly health report",
            ],
            cta: "Choose Starter",
            highlighted: false,
          },
          {
            name: "Business",
            tagline: "Keep improving after launch",
            price: "GHS 1,500",
            priceNote: "/month",
            description: "Ongoing maintenance plus light improvements for active digital products.",
            features: [
              "Everything in Starter",
              "Performance checks",
              "2 hours of minor updates",
              "Content / copy tweaks",
              "Priority email support",
              "Monthly recommendations",
            ],
            cta: "Choose Business",
            highlighted: true,
          },
          {
            name: "Premium",
            tagline: "A retainer that ships",
            price: "GHS 3,000",
            priceNote: "/month",
            description: "A proactive care plan for teams that want continuous iteration.",
            features: [
              "Everything in Business",
              "8 hours of development / design",
              "Feature polish & A/B support",
              "Incident response priority",
              "Quarterly growth review",
              "Dedicated support channel",
            ],
            cta: "Choose Premium",
            highlighted: false,
          },
        ],
      },
    ],
    { onConflict: "key" }
  );
  if (siteContentError) throw new Error(`site_content: ${siteContentError.message}`);
  console.log("✓ site_content");

  console.log("\nSeed complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
