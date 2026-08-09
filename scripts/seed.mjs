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
  design: "https://images.unsplash.com/photo-1648328168368-3a25f2152802?auto=format&fit=crop&w=1600&q=80",
  social: "https://images.unsplash.com/photo-1727023663928-1772e2c7e679?auto=format&fit=crop&w=1600&q=80",
  ecommerce: "https://images.unsplash.com/photo-1730963628435-4972f0607016?auto=format&fit=crop&w=1600&q=80",
  saas: "https://images.unsplash.com/photo-1718242567909-882a8bf5f7ea?auto=format&fit=crop&w=1600&q=80",
  meeting: "https://images.unsplash.com/photo-1568484347083-5b324b9bab92?auto=format&fit=crop&w=1600&q=80",
  product: "https://images.unsplash.com/photo-1605945269197-07ba944c5c0e?auto=format&fit=crop&w=1600&q=80",
  analytics: "https://images.unsplash.com/photo-1742476126735-cba186771cf2?auto=format&fit=crop&w=1600&q=80",
  code: "https://images.unsplash.com/photo-1605945269197-07ba944c5c0e?auto=format&fit=crop&w=1600&q=80",
  office: "https://images.unsplash.com/photo-1727023663921-967d01f69c7e?auto=format&fit=crop&w=1600&q=80",
  team: "https://images.unsplash.com/photo-1718242567909-882a8bf5f7ea?auto=format&fit=crop&w=1600&q=80",
  teamAlt: "https://images.unsplash.com/photo-1568484347083-5b324b9bab92?auto=format&fit=crop&w=1600&q=80",
  landmark: "https://images.unsplash.com/photo-1669040178874-19d6fd6c9ff6?auto=format&fit=crop&w=1600&q=80",
  city: "https://images.unsplash.com/photo-1677804444783-3bb00c73750c?auto=format&fit=crop&w=1600&q=80",
  memorial: "https://images.unsplash.com/photo-1759448540391-fef2fa3bb158?auto=format&fit=crop&w=1600&q=80",
  portrait: "https://images.unsplash.com/photo-1610465830784-ac7d29fa1905?auto=format&fit=crop&w=400&q=80",
  portraitAlt: "https://images.unsplash.com/photo-1605945269197-07ba944c5c0e?auto=format&fit=crop&w=400&q=80",
  portraitSoft: "https://images.unsplash.com/photo-1718242567909-882a8bf5f7ea?auto=format&fit=crop&w=400&q=80",
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
    long_description: "SOLVEEK designs and builds websites that feel intentional—from first impression to final conversion.",
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
    slug: "saas-products",
    title: "SaaS Products",
    short_title: "SaaS",
    description: "End-to-end product design and engineering for SaaS platforms ready to scale.",
    long_description: "We partner with founders and product teams to shape SaaS experiences that onboard well and retain users.",
    icon: "Layers",
    image: IMAGES.saas,
    features: ["Product discovery", "UX for complex workflows", "Full-stack engineering", "Analytics loops"],
    benefits: ["Faster learning", "Higher retention", "Architecture ready to scale"],
    featured: true,
    sort_order: 4,
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
    featured: false,
    sort_order: 5,
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    short_title: "UX",
    description: "Human-centered interfaces that reduce friction and elevate product experience.",
    long_description: "Our UX practice maps journeys and designs interfaces that help users complete tasks with confidence.",
    icon: "PenTool",
    image: IMAGES.design,
    features: ["Journey mapping", "Prototyping", "Usability testing", "Design systems"],
    benefits: ["Lower drop-off", "Clearer usability", "Reusable systems"],
    featured: false,
    sort_order: 6,
  },
  {
    slug: "mobile-apps",
    title: "Mobile Apps",
    short_title: "Apps",
    description: "Native-feeling mobile products for iOS and Android with polished UX.",
    long_description: "SOLVEEK designs and builds mobile applications that feel fast, intuitive, and brand-true.",
    icon: "Smartphone",
    image: IMAGES.product,
    features: ["iOS & Android", "Cross-platform options", "App Store support", "Analytics integrations"],
    benefits: ["Extended reach", "Sticky engagement", "Reliable releases"],
    featured: false,
    sort_order: 7,
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    short_title: "Growth",
    description: "Paid and organic growth programs aligned to clear acquisition goals.",
    long_description: "We connect creative, media, and measurement so campaigns drive pipeline—not vanity metrics.",
    icon: "Megaphone",
    image: IMAGES.analytics,
    features: ["Paid media", "Landing page optimization", "Funnel analytics", "Creative testing"],
    benefits: ["Lower acquisition cost", "Better leads", "Transparent reporting"],
    featured: false,
    sort_order: 8,
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    short_title: "Cloud",
    description: "Secure, scalable infrastructure and delivery pipelines for modern products.",
    long_description: "From cloud architecture to CI/CD, SOLVEEK helps teams ship faster with stable environments.",
    icon: "Cloud",
    image: IMAGES.code,
    features: ["Cloud architecture", "CI/CD", "Monitoring", "Security practices"],
    benefits: ["Faster releases", "Fewer incidents", "Infrastructure that scales"],
    featured: false,
    sort_order: 9,
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
    sort_order: 10,
  },
  {
    slug: "custom-software",
    title: "Custom Software",
    short_title: "Software",
    description: "Bespoke platforms and internal tools designed around how your business actually works.",
    long_description: "When off-the-shelf tools fall short, SOLVEEK builds software that fits your workflows.",
    icon: "Code2",
    image: IMAGES.code,
    features: ["Requirements discovery", "Custom web apps", "API integrations", "Admin tools"],
    benefits: ["Tailored processes", "Less manual work", "Systems you own"],
    featured: false,
    sort_order: 11,
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
    sort_order: 12,
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

  await upsert("industries", [
    { slug: "startups", title: "Startups", description: "MVPs, brand launches, and growth systems built for speed.", icon: "Rocket", image: IMAGES.product, sort_order: 1 },
    { slug: "ecommerce-brands", title: "E-commerce Brands", description: "Storefronts and campaigns designed to increase revenue.", icon: "ShoppingBag", image: IMAGES.ecommerce, sort_order: 2 },
    { slug: "saas-companies", title: "SaaS Companies", description: "Product UX, websites, and acquisition funnels that convert.", icon: "Layers", image: IMAGES.saas, sort_order: 3 },
    { slug: "professional-services", title: "Professional Services", description: "Authority-building websites for firms that sell expertise.", icon: "Briefcase", image: IMAGES.meeting, sort_order: 4 },
    { slug: "healthcare", title: "Healthcare", description: "Compliant digital experiences that build patient trust.", icon: "HeartPulse", image: IMAGES.team, sort_order: 5 },
    { slug: "education", title: "Education", description: "Learning platforms and enrollment experiences that engage.", icon: "GraduationCap", image: IMAGES.office, sort_order: 6 },
    { slug: "real-estate", title: "Real Estate", description: "Property platforms and lead systems for modern agencies.", icon: "Building2", image: IMAGES.city, sort_order: 7 },
    { slug: "hospitality", title: "Hospitality", description: "Brand sites and booking journeys with premium polish.", icon: "Hotel", image: IMAGES.social, sort_order: 8 },
    { slug: "fintech", title: "Fintech", description: "Secure product interfaces and trust-first brand systems.", icon: "Wallet", image: IMAGES.landmark, sort_order: 9 },
    { slug: "nonprofits", title: "Nonprofits", description: "Mission-driven digital platforms that inspire action.", icon: "HeartHandshake", image: IMAGES.memorial, sort_order: 10 },
  ]);

  await upsert("projects", [
    {
      slug: "northline-commerce-rebuild",
      title: "Northline Commerce Rebuild",
      industry: "E-commerce",
      location: "Direct-to-consumer brand",
      challenge: "An apparel brand needed a faster storefront and clearer product storytelling.",
      solution: "SOLVEEK redesigned the brand system and rebuilt the storefront with focused CRO experiments.",
      results: ["38% increase in conversion rate", "22% higher average order value", "Page load under 1.8s on mobile"],
      image: IMAGES.ecommerce,
      gallery: [IMAGES.ecommerce, IMAGES.design, IMAGES.analytics],
      featured: true,
      sort_order: 1,
    },
    {
      slug: "pulseboard-saas-platform",
      title: "Pulseboard SaaS Platform",
      industry: "SaaS",
      location: "B2B analytics product",
      challenge: "A founding team had a powerful data engine but confusing onboarding.",
      solution: "We redesigned product UX and shipped a guided activation experience.",
      results: ["41% improvement in trial activation", "27% reduction in support tickets", "Design system adopted across product"],
      image: IMAGES.saas,
      gallery: [IMAGES.saas, IMAGES.product, IMAGES.code],
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
      image: IMAGES.social,
      gallery: [IMAGES.social, IMAGES.meeting, IMAGES.design],
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
      image: IMAGES.design,
      gallery: [IMAGES.design, IMAGES.office, IMAGES.analytics],
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
          { title: "Craft", description: "Details matter—visual quality, motion, and performance are non-negotiable." },
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
          "SaaS Products",
          "UI/UX Design",
          "Branding",
          "Digital Marketing",
          "Cloud & DevOps",
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
