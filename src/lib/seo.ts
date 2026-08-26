import type { Metadata } from "next";
import { CAPABILITIES } from "@/constants/brand";
import { SITE } from "@/constants/site";

type JsonLd = Record<string, unknown>;

type PageSeoInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  keywords?: string[];
};

export function absoluteUrl(path = ""): string {
  if (!path) return SITE.url;
  if (path.startsWith("http")) return path;
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createPageMetadata({
  title,
  description,
  path = "/",
  image = SITE.ogImage,
  type = "website",
  noIndex = false,
  keywords,
}: PageSeoInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = absoluteUrl(image);

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: url },
    openGraph: {
      type,
      locale: "en_GH",
      url,
      siteName: SITE.name,
      title: `${title} | ${SITE.name}`,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} — ${SITE.name}`,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE.name}`,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

/** Bundle schemas into a single @graph block (Google treats this the same as multiple tags). */
export function toJsonLdGraph(schemas: JsonLd[]) {
  return {
    "@context": "https://schema.org",
    "@graph": schemas.map((schema) => {
      const { "@context": _context, ...rest } = schema;
      return rest;
    }),
  };
}

export function organizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/icon.png"),
      width: 512,
      height: 512,
    },
    image: absoluteUrl(SITE.ogImage),
    description: SITE.description,
    email: SITE.email,
    telephone: SITE.phone,
    slogan: SITE.tagline,
    sameAs: Object.values(SITE.social),
    address: {
      "@type": "PostalAddress",
      addressCountry: "GH",
    },
    areaServed: {
      "@type": "Country",
      name: "Ghana",
    },
    knowsAbout: [
      "Website development",
      "SEO",
      "Web applications",
      "Business automation",
      "Bulk SMS",
      "Social media management",
      "Digital growth systems",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: SITE.salesEmail,
        telephone: SITE.phone,
        url: absoluteUrl("/contact"),
        areaServed: "GH",
        availableLanguage: ["English"],
      },
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: SITE.supportEmail,
        telephone: SITE.phone,
        areaServed: "GH",
        availableLanguage: ["English"],
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Solveek Growth Capabilities",
      itemListElement: CAPABILITIES.map((capability) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: capability.title,
          description: capability.description,
          provider: {
            "@type": "Organization",
            name: SITE.name,
            url: SITE.url,
          },
        },
      })),
    },
  };
}

export function websiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    inLanguage: "en-GH",
    publisher: {
      "@id": `${SITE.url}/#organization`,
    },
  };
}

/**
 * BreadcrumbList for inner pages.
 * Omits `item` on the final crumb (current page) per Google guidance.
 */
export function buildBreadcrumbs(
  crumbs: Array<{ name: string; path?: string }>
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => {
      const isLast = index === crumbs.length - 1;
      return {
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        ...(!isLast && crumb.path ? { item: absoluteUrl(crumb.path) } : {}),
      };
    }),
  };
}

/** @deprecated Prefer buildBreadcrumbs */
export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>
): JsonLd {
  return buildBreadcrumbs(items);
}

export function webPageJsonLd(input: {
  name: string;
  description: string;
  path: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": absoluteUrl(input.path),
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    isPartOf: { "@id": `${SITE.url}/#website` },
    about: { "@id": `${SITE.url}/#organization` },
    inLanguage: "en-GH",
  };
}

export function creativeWorkJsonLd(input: {
  name: string;
  description: string;
  path: string;
  image?: string;
  industry?: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    ...(input.image ? { image: absoluteUrl(input.image) } : {}),
    ...(input.industry ? { about: input.industry } : {}),
    creator: {
      "@id": `${SITE.url}/#organization`,
    },
    isPartOf: { "@id": `${SITE.url}/#website` },
  };
}

export function serviceCatalogJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Solveek Growth Capabilities",
    itemListElement: CAPABILITIES.map((capability, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: capability.title,
        description: capability.description,
        provider: {
          "@id": `${SITE.url}/#organization`,
        },
      },
    })),
  };
}
