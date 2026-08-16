import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type PreviewKind = "ecommerce" | "branding" | "social" | "website" | "bookstore";

function resolveKind(slug: string, industry: string): PreviewKind {
  const key = `${slug} ${industry}`.toLowerCase();
  if (key.includes("booksandyou") || key.includes("bookstore") || key.includes("books & you")) {
    return "bookstore";
  }
  if (key.includes("commerce") || key.includes("e-commerce") || key.includes("ecommerce")) {
    return "ecommerce";
  }
  if (key.includes("brand") || key.includes("lumen") || key.includes("identity")) {
    return "branding";
  }
  if (key.includes("social") || key.includes("atelier")) {
    return "social";
  }
  return "website";
}

function EcommercePreview() {
  return (
    <div className="relative h-full w-full bg-[#F7F4EF]">
      <Image
        src="/images/project-northline-commerce.png"
        alt="Customer shopping an apparel storefront on a laptop"
        fill
        sizes="(max-width: 1024px) 100vw, 33vw"
        className="object-cover"
      />
    </div>
  );
}

function BrandingPreview() {
  return (
    <div className="relative h-full w-full bg-[#F7F4EF]">
      <Image
        src="/images/project-lumen-branding.png"
        alt="Chalkboard mind map with a lightbulb for brand ideation"
        fill
        sizes="(max-width: 1024px) 100vw, 33vw"
        className="object-cover"
      />
    </div>
  );
}

function SocialPreview() {
  return (
    <div className="relative h-full w-full bg-[#F4F6FB]">
      <Image
        src="/images/project-atelier-social.png"
        alt="Social media strategy desk with analytics report and keyboard"
        fill
        sizes="(max-width: 1024px) 100vw, 33vw"
        className="object-cover"
      />
    </div>
  );
}

function WebsitePreview() {
  return (
    <div className="relative h-full w-full bg-[#0B1220]">
      <Image
        src="/images/project-brightpath-website.png"
        alt="Developer working on website code on a laptop"
        fill
        sizes="(max-width: 1024px) 100vw, 33vw"
        className="object-cover"
      />
    </div>
  );
}

function BookstorePreview() {
  return (
    <div className="relative h-full w-full bg-[#F7F4EF]">
      <Image
        src="/images/project-booksandyou.png"
        alt="Books & You school textbooks and classroom supplies collage"
        fill
        sizes="(max-width: 1024px) 100vw, 33vw"
        className="object-cover"
      />
    </div>
  );
}

const PREVIEWS: Record<PreviewKind, () => ReactNode> = {
  ecommerce: EcommercePreview,
  branding: BrandingPreview,
  social: SocialPreview,
  website: WebsitePreview,
  bookstore: BookstorePreview,
};

export function ProjectProductPreview({
  slug,
  industry,
  className,
}: {
  slug: string;
  industry: string;
  className?: string;
}) {
  const Preview = PREVIEWS[resolveKind(slug, industry)];

  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      <Preview />
    </div>
  );
}
