import type { NavItem } from "@/types";

export const mainNav: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    children: [
      {
        label: "Website Design",
        href: "/services/website-design",
        description: "Premium websites that convert",
      },
      {
        label: "Social Media Management",
        href: "/services/social-media-management",
        description: "Brand presence that grows audiences",
      },
      {
        label: "E-commerce",
        href: "/services/ecommerce",
        description: "Stores built for revenue",
      },
      {
        label: "SaaS Products",
        href: "/services/saas-products",
        description: "Product design & development",
      },
      {
        label: "Branding & Identity",
        href: "/services/branding-identity",
        description: "Distinctive visual systems",
      },
      {
        label: "UI/UX Design",
        href: "/services/ui-ux-design",
        description: "Interfaces people love to use",
      },
      {
        label: "Mobile Apps",
        href: "/services/mobile-apps",
        description: "iOS & Android product builds",
      },
      {
        label: "Digital Marketing",
        href: "/services/digital-marketing",
        description: "Performance-driven growth",
      },
      {
        label: "Cloud & DevOps",
        href: "/services/cloud-devops",
        description: "Reliable infrastructure at scale",
      },
      {
        label: "SEO & Content",
        href: "/services/seo-content",
        description: "Search visibility that compounds",
      },
      {
        label: "Custom Software",
        href: "/services/custom-software",
        description: "Tailored business platforms",
      },
      {
        label: "Maintenance & Support",
        href: "/services/maintenance-support",
        description: "Ongoing care for digital products",
      },
    ],
  },
  { label: "Solutions", href: "/industries" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  company: [
    { label: "About SOLVEEK", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Insights", href: "/insights" },
    { label: "FAQs", href: "/faqs" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    { label: "Website Design", href: "/services/website-design" },
    { label: "Social Media", href: "/services/social-media-management" },
    { label: "E-commerce", href: "/services/ecommerce" },
    { label: "SaaS Products", href: "/services/saas-products" },
    { label: "UI/UX Design", href: "/services/ui-ux-design" },
    { label: "Digital Marketing", href: "/services/digital-marketing" },
  ],
  resources: [
    { label: "Get a Quote", href: "/quote" },
    { label: "Case Studies", href: "/projects" },
    { label: "Solutions", href: "/industries" },
    { label: "Insights", href: "/insights" },
    { label: "FAQs", href: "/faqs" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/faqs" },
    { label: "Terms of Service", href: "/faqs" },
    { label: "Cookie Policy", href: "/faqs" },
  ],
};
