/** Links rendered before the Services mega-menu. */
export const mainNavBeforeServices = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
] as const;

/** Links rendered after the Services mega-menu. */
export const mainNavAfterServices = [
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
] as const;

export const mainNavLinks = [
  ...mainNavBeforeServices,
  ...mainNavAfterServices,
] as const;

export const footerNav = {
  company: [
    { label: "About SOLVEEK", href: "/about" },
    { label: "Insights", href: "/insights" },
    { label: "FAQs", href: "/faqs" },
    { label: "Contact", href: "/contact" },
  ],
  resources: [
    { label: "Get a Quote", href: "/quote" },
    { label: "Case Studies", href: "/projects" },
    { label: "Insights", href: "/insights" },
    { label: "FAQs", href: "/faqs" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/faqs" },
    { label: "Terms of Service", href: "/faqs" },
    { label: "Cookie Policy", href: "/faqs" },
  ],
};
