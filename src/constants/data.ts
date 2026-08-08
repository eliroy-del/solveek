import type {
  FaqItem,
  Industry,
  Insight,
  Job,
  Office,
  ProcessStep,
  Project,
  Service,
  Stat,
  Testimonial,
  TimelineItem,
} from "@/types";
import { IMAGES } from "@/constants/site";

export const featuredCapabilities = [
  {
    slug: "website-design",
    title: "Website Design",
    description:
      "Conversion-focused websites with premium craft, performance, and clear brand presence.",
    icon: "MonitorSmartphone",
  },
  {
    slug: "social-media-management",
    title: "Social Growth",
    description:
      "Content systems and community management that build trust and consistent engagement.",
    icon: "Share2",
  },
  {
    slug: "ecommerce",
    title: "E-commerce",
    description:
      "Online stores engineered for product discovery, checkout speed, and revenue growth.",
    icon: "ShoppingBag",
  },
  {
    slug: "saas-products",
    title: "SaaS Products",
    description:
      "Product strategy, UX, and engineering for scalable software platforms customers love.",
    icon: "Layers",
  },
];

export const services: Service[] = [
  {
    slug: "website-design",
    title: "Website Design",
    shortTitle: "Web",
    description:
      "Premium, responsive websites that communicate credibility and convert visitors into customers.",
    longDescription:
      "SOLVEEK designs and builds websites that feel intentional—from first impression to final conversion. We combine brand storytelling, UX architecture, and modern engineering so your digital presence performs as well as it looks.",
    icon: "MonitorSmartphone",
    image: IMAGES.design,
    features: [
      "Custom UI systems & design systems",
      "Next.js / modern web stacks",
      "CMS-ready content architecture",
      "Performance & accessibility built in",
    ],
    benefits: [
      "Stronger first impressions",
      "Higher conversion rates",
      "Faster publishing workflows",
    ],
  },
  {
    slug: "social-media-management",
    title: "Social Media Management",
    shortTitle: "Social",
    description:
      "Strategy, content, and community management that grow brand authority across channels.",
    longDescription:
      "We run social as a growth engine—not a content calendar afterthought. SOLVEEK builds channel strategy, creative systems, and reporting loops that keep your brand visible and relevant.",
    icon: "Share2",
    image: IMAGES.social,
    features: [
      "Channel strategy & positioning",
      "Content production systems",
      "Community engagement",
      "Performance reporting",
    ],
    benefits: [
      "Consistent brand presence",
      "Audience growth with intent",
      "Clear ROI visibility",
    ],
  },
  {
    slug: "ecommerce",
    title: "E-commerce",
    shortTitle: "Commerce",
    description:
      "High-converting storefronts, product experiences, and checkout flows built for sales.",
    longDescription:
      "From boutique brands to scaling catalogs, SOLVEEK builds e-commerce experiences that reduce friction and increase average order value—on Shopify, headless, or custom stacks.",
    icon: "ShoppingBag",
    image: IMAGES.ecommerce,
    features: [
      "Store design & development",
      "Payment & logistics integrations",
      "Conversion rate optimization",
      "Catalog & inventory workflows",
    ],
    benefits: [
      "Faster path to purchase",
      "Improved cart recovery",
      "Scalable commerce operations",
    ],
  },
  {
    slug: "saas-products",
    title: "SaaS Products",
    shortTitle: "SaaS",
    description:
      "End-to-end product design and engineering for SaaS platforms ready to scale.",
    longDescription:
      "We partner with founders and product teams to shape SaaS experiences that onboard well, retain users, and support subscription growth—from MVP to mature platform.",
    icon: "Layers",
    image: IMAGES.saas,
    features: [
      "Product discovery & roadmapping",
      "UX for complex workflows",
      "Frontend & backend engineering",
      "Analytics & iteration loops",
    ],
    benefits: [
      "Faster product-market learning",
      "Higher activation & retention",
      "Architecture ready to scale",
    ],
  },
  {
    slug: "branding-identity",
    title: "Branding & Identity",
    shortTitle: "Brand",
    description:
      "Visual identities and brand systems that make your company unmistakable.",
    longDescription:
      "SOLVEEK crafts brand foundations—logo systems, typography, color, voice, and guidelines—so every digital touchpoint feels coherent and premium.",
    icon: "Palette",
    image: IMAGES.meeting,
    features: [
      "Logo & visual identity",
      "Brand guidelines",
      "Tone of voice systems",
      "Launch collateral",
    ],
    benefits: [
      "Memorable market presence",
      "Consistent multi-channel brand",
      "Faster creative production",
    ],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    shortTitle: "UX",
    description:
      "Human-centered interfaces that reduce friction and elevate product experience.",
    longDescription:
      "Our UX practice maps journeys, validates flows, and designs interfaces that help users complete tasks with confidence—across web and product environments.",
    icon: "PenTool",
    image: IMAGES.design,
    features: [
      "Journey mapping & wireframes",
      "Interactive prototyping",
      "Usability testing",
      "Design system components",
    ],
    benefits: [
      "Lower drop-off rates",
      "Clearer product usability",
      "Reusable design systems",
    ],
  },
  {
    slug: "mobile-apps",
    title: "Mobile Apps",
    shortTitle: "Apps",
    description:
      "Native-feeling mobile products for iOS and Android with polished UX.",
    longDescription:
      "SOLVEEK designs and builds mobile applications that feel fast, intuitive, and brand-true—whether you need a companion app or a full product experience.",
    icon: "Smartphone",
    image: IMAGES.product,
    features: [
      "iOS & Android development",
      "Cross-platform options",
      "App Store launch support",
      "Push & analytics integrations",
    ],
    benefits: [
      "Extended customer reach",
      "Sticky product engagement",
      "Reliable release cadence",
    ],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    shortTitle: "Growth",
    description:
      "Paid and organic growth programs aligned to clear acquisition goals.",
    longDescription:
      "We connect creative, media, and measurement so campaigns drive pipeline—not vanity metrics. SOLVEEK builds growth systems your team can scale.",
    icon: "Megaphone",
    image: IMAGES.analytics,
    features: [
      "Paid media strategy",
      "Landing page optimization",
      "Funnel analytics",
      "Creative testing frameworks",
    ],
    benefits: [
      "Lower acquisition cost",
      "Better qualified leads",
      "Transparent performance reporting",
    ],
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    shortTitle: "Cloud",
    description:
      "Secure, scalable infrastructure and delivery pipelines for modern products.",
    longDescription:
      "From cloud architecture to CI/CD, SOLVEEK helps teams ship faster with environments that stay stable under growth.",
    icon: "Cloud",
    image: IMAGES.code,
    features: [
      "Cloud architecture",
      "CI/CD pipelines",
      "Monitoring & reliability",
      "Security best practices",
    ],
    benefits: [
      "Faster release cycles",
      "Fewer production incidents",
      "Infrastructure that scales",
    ],
  },
  {
    slug: "seo-content",
    title: "SEO & Content",
    shortTitle: "SEO",
    description:
      "Search strategy and content systems that compound organic visibility.",
    longDescription:
      "We align technical SEO, content architecture, and editorial quality so your brand earns durable discovery across search.",
    icon: "Search",
    image: IMAGES.analytics,
    features: [
      "Technical SEO audits",
      "Keyword & content strategy",
      "On-page optimization",
      "Editorial systems",
    ],
    benefits: [
      "Sustainable organic traffic",
      "Stronger topical authority",
      "Content that supports sales",
    ],
  },
  {
    slug: "custom-software",
    title: "Custom Software",
    shortTitle: "Software",
    description:
      "Bespoke platforms and internal tools designed around how your business actually works.",
    longDescription:
      "When off-the-shelf tools fall short, SOLVEEK builds software that fits your workflows—dashboards, portals, automation, and operational systems.",
    icon: "Code2",
    image: IMAGES.code,
    features: [
      "Requirements discovery",
      "Custom web applications",
      "API & system integrations",
      "Admin & reporting tools",
    ],
    benefits: [
      "Processes tailored to you",
      "Reduced manual work",
      "Systems your team owns",
    ],
  },
  {
    slug: "maintenance-support",
    title: "Maintenance & Support",
    shortTitle: "Support",
    description:
      "Proactive care, updates, and optimization for websites and digital products.",
    longDescription:
      "Launch is only the beginning. SOLVEEK provides ongoing maintenance, performance monitoring, and iterative improvements so your digital assets stay sharp.",
    icon: "Headset",
    image: IMAGES.office,
    features: [
      "Uptime monitoring",
      "Security updates",
      "Performance tuning",
      "Feature iteration retainers",
    ],
    benefits: [
      "Fewer emergencies",
      "Continuous improvement",
      "A partner after launch",
    ],
  },
];

export const industries: Industry[] = [
  {
    slug: "startups",
    title: "Startups",
    description: "MVPs, brand launches, and growth systems built for speed.",
    icon: "Rocket",
    image: IMAGES.product,
  },
  {
    slug: "ecommerce-brands",
    title: "E-commerce Brands",
    description: "Storefronts and campaigns designed to increase revenue.",
    icon: "ShoppingBag",
    image: IMAGES.ecommerce,
  },
  {
    slug: "saas-companies",
    title: "SaaS Companies",
    description: "Product UX, websites, and acquisition funnels that convert.",
    icon: "Layers",
    image: IMAGES.saas,
  },
  {
    slug: "professional-services",
    title: "Professional Services",
    description: "Authority-building websites for firms that sell expertise.",
    icon: "Briefcase",
    image: IMAGES.meeting,
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    description: "Compliant digital experiences that build patient trust.",
    icon: "HeartPulse",
    image: IMAGES.team,
  },
  {
    slug: "education",
    title: "Education",
    description: "Learning platforms and enrollment experiences that engage.",
    icon: "GraduationCap",
    image: IMAGES.office,
  },
  {
    slug: "real-estate",
    title: "Real Estate",
    description: "Property platforms and lead systems for modern agencies.",
    icon: "Building2",
    image: IMAGES.analytics,
  },
  {
    slug: "hospitality",
    title: "Hospitality",
    description: "Brand sites and booking journeys with premium polish.",
    icon: "Hotel",
    image: IMAGES.design,
  },
  {
    slug: "fintech",
    title: "Fintech",
    description: "Secure product interfaces and trust-first brand systems.",
    icon: "Wallet",
    image: IMAGES.code,
  },
  {
    slug: "nonprofits",
    title: "Nonprofits",
    description: "Mission-driven digital platforms that inspire action.",
    icon: "HeartHandshake",
    image: IMAGES.teamAlt,
  },
];

export const projects: Project[] = [
  {
    slug: "northline-commerce-rebuild",
    title: "Northline Commerce Rebuild",
    industry: "E-commerce",
    location: "Direct-to-consumer brand",
    challenge:
      "An apparel brand needed a faster storefront and clearer product storytelling to lift conversion during peak season.",
    solution:
      "SOLVEEK redesigned the brand system, rebuilt the storefront on a modern stack, and optimized the checkout journey with focused CRO experiments.",
    results: [
      "38% increase in conversion rate",
      "22% higher average order value",
      "Page load under 1.8s on mobile",
    ],
    image: IMAGES.ecommerce,
    gallery: [IMAGES.ecommerce, IMAGES.design, IMAGES.analytics],
  },
  {
    slug: "pulseboard-saas-platform",
    title: "Pulseboard SaaS Platform",
    industry: "SaaS",
    location: "B2B analytics product",
    challenge:
      "A founding team had a powerful data engine but an onboarding experience that confused new users.",
    solution:
      "We mapped critical workflows, redesigned the product UX, and shipped a guided activation experience with clearer information architecture.",
    results: [
      "41% improvement in trial activation",
      "27% reduction in support tickets",
      "Design system adopted across product",
    ],
    image: IMAGES.saas,
    gallery: [IMAGES.saas, IMAGES.product, IMAGES.code],
  },
  {
    slug: "atelier-social-system",
    title: "Atelier Social Growth System",
    industry: "Lifestyle brand",
    location: "Multi-channel social",
    challenge:
      "A lifestyle brand had inconsistent content and no operating rhythm across Instagram, TikTok, and LinkedIn.",
    solution:
      "SOLVEEK built a content operating system, production pipeline, and performance dashboard tied to brand and revenue goals.",
    results: [
      "3.2x increase in engagement rate",
      "Consistent weekly publishing cadence",
      "Clear attribution to campaign traffic",
    ],
    image: IMAGES.social,
    gallery: [IMAGES.social, IMAGES.meeting, IMAGES.design],
  },
  {
    slug: "brightpath-website-platform",
    title: "BrightPath Website Platform",
    industry: "Education",
    location: "EdTech company",
    challenge:
      "An education company needed a credible digital presence that could support enrollments and content marketing at once.",
    solution:
      "We delivered a modular website with CMS workflows, SEO foundations, and conversion paths tailored to student and partner journeys.",
    results: [
      "64% more qualified inquiries",
      "Editorial publishing 5x faster",
      "Topical search visibility expanded",
    ],
    image: IMAGES.design,
    gallery: [IMAGES.design, IMAGES.office, IMAGES.analytics],
  },
];

export const insights: Insight[] = [
  {
    slug: "conversion-first-website-design",
    title: "Conversion-First Website Design Without Sacrificing Craft",
    excerpt:
      "How premium visual design and clear UX architecture work together to drive measurable business outcomes.",
    category: "Design",
    author: "Amara Okonkwo",
    date: "2026-06-12",
    readTime: "7 min",
    image: IMAGES.design,
    featured: true,
  },
  {
    slug: "saas-onboarding-that-sticks",
    title: "SaaS Onboarding That Sticks: Patterns That Lift Activation",
    excerpt:
      "Practical UX patterns that help new users reach value faster—and stay longer.",
    category: "Product",
    author: "Daniel Reyes",
    date: "2026-05-28",
    readTime: "6 min",
    image: IMAGES.saas,
  },
  {
    slug: "social-systems-not-posts",
    title: "Build Social Systems, Not Just Posts",
    excerpt:
      "Why high-performing brands treat social as an operating system with strategy, cadence, and measurement.",
    category: "Marketing",
    author: "Priya Nair",
    date: "2026-05-04",
    readTime: "8 min",
    image: IMAGES.social,
  },
  {
    slug: "ecommerce-checkout-friction",
    title: "Where Checkout Friction Quietly Kills Revenue",
    excerpt:
      "A practical checklist for finding and fixing the silent leaks between product page and purchase.",
    category: "E-commerce",
    author: "James Whitfield",
    date: "2026-04-18",
    readTime: "5 min",
    image: IMAGES.ecommerce,
  },
  {
    slug: "design-systems-for-scale",
    title: "Design Systems That Keep Growing Brands Coherent",
    excerpt:
      "How reusable components and brand rules accelerate shipping without diluting quality.",
    category: "Design",
    author: "Elena Markov",
    date: "2026-03-30",
    readTime: "9 min",
    image: IMAGES.product,
  },
  {
    slug: "ai-in-digital-products",
    title: "Using AI in Digital Products Without Losing Trust",
    excerpt:
      "A grounded approach to adding AI features that feel useful, transparent, and brand-aligned.",
    category: "Technology",
    author: "Sophie Laurent",
    date: "2026-03-09",
    readTime: "6 min",
    image: IMAGES.code,
  },
];

export const faqs: FaqItem[] = [
  {
    id: "1",
    category: "General",
    question: "What does SOLVEEK do?",
    answer:
      "SOLVEEK is an IT solutions company specializing in website design, social media management, e-commerce, SaaS products, branding, UX, and digital growth systems for modern businesses.",
  },
  {
    id: "2",
    category: "Services",
    question: "Can you build both marketing websites and SaaS products?",
    answer:
      "Yes. We design and engineer marketing websites, e-commerce platforms, and full SaaS products—often connecting brand experience and product UX under one cohesive system.",
  },
  {
    id: "3",
    category: "Process",
    question: "What does a typical project process look like?",
    answer:
      "Most engagements move through discovery, strategy, design, build, launch, and optimization. We keep communication clear with milestones, demos, and shared decision logs.",
  },
  {
    id: "4",
    category: "Pricing",
    question: "How do engagements typically start?",
    answer:
      "Start with a quote request or strategy call. We scope outcomes, timeline, and commercial model—fixed project, phased delivery, or ongoing retainer depending on your needs.",
  },
  {
    id: "5",
    category: "Services",
    question: "Do you offer ongoing social media management?",
    answer:
      "Yes. We provide strategy, content production, publishing, community management, and reporting as a continuous growth partnership.",
  },
  {
    id: "6",
    category: "Technology",
    question: "Which technologies do you work with?",
    answer:
      "We commonly work with modern web stacks like Next.js, TypeScript, headless CMS platforms, Shopify and commerce APIs, cloud infrastructure, and analytics tooling selected for your goals.",
  },
  {
    id: "7",
    category: "Support",
    question: "Do you support products after launch?",
    answer:
      "Absolutely. Maintenance, performance monitoring, feature iteration, and growth retainers are available so your digital assets keep improving after go-live.",
  },
  {
    id: "8",
    category: "General",
    question: "Who do you typically work with?",
    answer:
      "We partner with startups, growing brands, SaaS companies, professional services firms, and established organizations that want premium digital execution with clear business outcomes.",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Caroline Meyer",
    role: "Founder",
    company: "Northline Apparel",
    quote:
      "SOLVEEK rebuilt our storefront with clarity and craft. Conversion improved within weeks—and the brand finally feels as premium online as it does in product.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "2",
    name: "Kwame Mensah",
    role: "CEO",
    company: "Pulseboard",
    quote:
      "They didn't just polish screens—they redesigned how users reach value. Activation jumped, and our team finally has a design system we can ship from.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "3",
    name: "Helena Costa",
    role: "Marketing Director",
    company: "Atelier Collective",
    quote:
      "Our social presence went from inconsistent to intentional. SOLVEEK brought strategy, creative rhythm, and reporting we actually use.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
  },
];

export const stats: Stat[] = [
  { value: 180, suffix: "+", label: "Projects Delivered" },
  { value: 60, suffix: "+", label: "Active Clients" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 12, suffix: "+", label: "Years Experience" },
  { value: 40, suffix: "+", label: "Specialists" },
];

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Discover",
    description: "We clarify goals, audiences, constraints, and the outcomes that matter.",
  },
  {
    step: 2,
    title: "Strategize",
    description: "Positioning, information architecture, and delivery plans are defined with intent.",
  },
  {
    step: 3,
    title: "Design",
    description: "Interfaces, brand systems, and prototypes are crafted for clarity and conversion.",
  },
  {
    step: 4,
    title: "Build",
    description: "Engineering brings the experience to life with performance and scalability in mind.",
  },
  {
    step: 5,
    title: "Launch",
    description: "We ship with QA, analytics, and a rollout plan your team can trust.",
  },
  {
    step: 6,
    title: "Optimize",
    description: "Measurement and iteration keep improving results after launch.",
  },
];

export const timeline: TimelineItem[] = [
  {
    year: "2014",
    title: "Founded",
    description: "SOLVEEK launched as a digital studio focused on premium web experiences.",
  },
  {
    year: "2017",
    title: "Product Expansion",
    description: "Expanded into SaaS UX, e-commerce platforms, and growth systems.",
  },
  {
    year: "2020",
    title: "Full-stack Delivery",
    description: "Built integrated design-engineering teams for end-to-end product delivery.",
  },
  {
    year: "2023",
    title: "Social & Growth Desk",
    description: "Added dedicated social media and performance marketing capabilities.",
  },
  {
    year: "2025",
    title: "AI-assisted Workflows",
    description: "Introduced AI-augmented design and content systems with human quality control.",
  },
  {
    year: "2026",
    title: "Enterprise Partnerships",
    description: "Supporting ambitious brands and product teams across multiple industries.",
  },
];

export const offices: Office[] = [
  {
    city: "San Francisco",
    country: "USA",
    address: "100 Pine Street, Suite 1250",
    phone: "+1 (415) 555-0142",
    email: "sf@solveek.com",
  },
  {
    city: "London",
    country: "UK",
    address: "22 Bishopsgate, Level 18",
    phone: "+44 20 7946 0958",
    email: "uk@solveek.com",
  },
  {
    city: "Dubai",
    country: "UAE",
    address: "Sheikh Zayed Road, Tower 4",
    phone: "+971 4 555 0177",
    email: "mea@solveek.com",
  },
  {
    city: "Singapore",
    country: "Singapore",
    address: "12 Marina Boulevard, Level 28",
    phone: "+65 6123 4500",
    email: "apac@solveek.com",
  },
];

export const jobs: Job[] = [
  {
    id: "des-001",
    title: "Senior Product Designer",
    department: "Design",
    location: "Remote / San Francisco",
    type: "Full-time",
    description:
      "Lead UX and visual design for SaaS and web platforms with a strong systems mindset.",
  },
  {
    id: "eng-002",
    title: "Frontend Engineer (Next.js)",
    department: "Engineering",
    location: "Remote / London",
    type: "Full-time",
    description:
      "Build performant, accessible interfaces for marketing sites and product experiences.",
  },
  {
    id: "mkt-003",
    title: "Social Media Strategist",
    department: "Growth",
    location: "Dubai",
    type: "Full-time",
    description:
      "Own channel strategy, content systems, and performance reporting for key accounts.",
  },
  {
    id: "pm-004",
    title: "Digital Project Manager",
    department: "Delivery",
    location: "Singapore",
    type: "Full-time",
    description:
      "Orchestrate cross-functional delivery across design, engineering, and marketing workstreams.",
  },
];

export const whyChoose = [
  {
    title: "Strategy-led Design",
    description: "Every interface starts with business goals, audience clarity, and measurable outcomes.",
    icon: "Target",
  },
  {
    title: "Full-stack Delivery",
    description: "Design, engineering, and growth operate as one team—not disconnected vendors.",
    icon: "Layers",
  },
  {
    title: "Premium Craft",
    description: "Typography, motion, and spacing are treated as brand assets, not afterthoughts.",
    icon: "Sparkles",
  },
  {
    title: "Conversion Focus",
    description: "Beautiful experiences engineered to move users toward action.",
    icon: "Gauge",
  },
  {
    title: "Transparent Process",
    description: "Clear milestones, demos, and decision logs keep stakeholders aligned.",
    icon: "ClipboardCheck",
  },
  {
    title: "Scalable Systems",
    description: "Design systems and modular builds that grow with your product and team.",
    icon: "Boxes",
  },
  {
    title: "Growth Partnership",
    description: "We stay after launch to optimize performance, content, and conversion.",
    icon: "TrendingUp",
  },
  {
    title: "Trusted Specialists",
    description: "Senior practitioners across design, product, social, and engineering.",
    icon: "Users",
  },
];

export const trustItems = [
  "Website Design",
  "Social Media",
  "E-commerce",
  "SaaS Products",
  "UI/UX Design",
  "Branding",
  "Digital Marketing",
  "Cloud & DevOps",
];

export const values = [
  {
    title: "Clarity",
    description: "We simplify complexity so teams and customers know what to do next.",
  },
  {
    title: "Craft",
    description: "Details matter—visual quality, motion, and performance are non-negotiable.",
  },
  {
    title: "Momentum",
    description: "We ship thoughtfully and iterate with evidence, not guesswork.",
  },
  {
    title: "Partnership",
    description: "We operate as an extension of your team, accountable to outcomes.",
  },
];

export const aboutHighlights = [
  "Solving complex digital problems",
  "We guarantee trusted delivery",
  "Experts across design & technology",
];
