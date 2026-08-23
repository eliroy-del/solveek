/** Solveek Growth Ecosystem — strategic content source of truth */

export const BRAND = {
  category: "Digital Growth Partner",
  idea: "Build. Connect. Grow.",
  promise:
    "We build the digital infrastructure that helps businesses get discovered, connect with customers and grow.",
  primaryCta: {
    label: "Book a Digital Growth Audit",
    href: "/contact",
  },
  secondaryCta: {
    label: "Explore the Growth Ecosystem",
    href: "/ecosystem",
  },
} as const;

export const ECOSYSTEM_LAYERS = [
  {
    id: "foundation",
    number: "01",
    title: "Foundation",
    verb: "Build",
    headline: "Build your digital presence.",
    description:
      "Your website and digital foundation are more than a place to exist online. They are the infrastructure for credibility, discovery, conversion and measurement.",
    capabilities: [
      "Website Development",
      "Technical SEO",
      "Analytics & Tracking",
      "Conversion Infrastructure",
    ],
  },
  {
    id: "automation",
    number: "02",
    title: "Automation",
    verb: "Connect",
    headline: "Connect your business.",
    description:
      "Reduce manual processes and create better customer journeys with digital systems built around how your business actually operates.",
    capabilities: [
      "Web Applications",
      "CRM Integration",
      "Bulk SMS Systems",
      "Workflow Automation",
    ],
  },
  {
    id: "visibility",
    number: "03",
    title: "Visibility",
    verb: "Grow",
    headline: "Grow your reach.",
    description:
      "Get discovered, stay relevant and turn attention into meaningful customer opportunities through search, social and strategic content.",
    capabilities: [
      "SEO Growth",
      "Social Media Management",
      "Content Strategy",
      "Lead Generation",
    ],
  },
] as const;

export const CAPABILITIES = [
  {
    title: "Website Development",
    description:
      "Digital experiences built to establish credibility, capture attention and turn visitors into opportunities.",
  },
  {
    title: "SEO",
    description:
      "Search visibility built around how your customers actually find and evaluate businesses.",
  },
  {
    title: "Web Applications",
    description:
      "Custom digital systems built around the way your business operates.",
  },
  {
    title: "Bulk SMS",
    description:
      "Customer communication systems that help businesses reach, notify and retain customers at scale.",
  },
  {
    title: "Social Media Management",
    description:
      "Strategic content and social presence designed to build visibility, trust and demand.",
  },
] as const;

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Diagnose",
    description:
      "Understand the business, its digital gaps and its growth constraints.",
  },
  {
    step: "02",
    title: "Strategize",
    description:
      "Turn the findings into a practical digital growth roadmap.",
  },
  {
    step: "03",
    title: "Build",
    description:
      "Design and develop the required digital infrastructure.",
  },
  {
    step: "04",
    title: "Connect",
    description:
      "Integrate systems, communication channels and customer journeys.",
  },
  {
    step: "05",
    title: "Grow",
    description:
      "Measure, optimize and continuously improve performance.",
  },
] as const;

export const PRINCIPLES = [
  "Strategy before execution.",
  "Technology connected to business objectives.",
  "One partner across your digital ecosystem.",
  "Built for measurable growth.",
] as const;

export const AUDIT = {
  headline: "Not sure where your digital growth is getting stuck?",
  body: "Start with a Solveek Digital Growth Audit. We assess your digital presence, visibility, customer journey and systems to identify the highest-impact opportunities for improvement.",
  cta: "Book your Digital Growth Audit",
  contactHeadline: "Let's identify what your business needs to grow digitally.",
  contactBody:
    "Tell us where you're trying to go. We'll help identify the digital infrastructure required to get there.",
} as const;

export const PROBLEM = {
  headline:
    "Your business doesn't need more disconnected digital services. It needs a system.",
  body: "Your website, search visibility, customer communication and business systems should work together. Solveek connects the digital pieces that help businesses build a stronger presence, operate smarter and create room for growth.",
} as const;
