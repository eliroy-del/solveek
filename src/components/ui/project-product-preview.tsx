import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type PreviewKind =
  | "ecommerce"
  | "branding"
  | "social"
  | "website"
  | "bookstore"
  | "chilihaus"
  | "dzifoods"
  | "luxurystrand";

function resolveKind(slug: string, industry: string): PreviewKind {
  const key = `${slug} ${industry}`.toLowerCase();
  if (key.includes("chili-haus") || key.includes("chili haus")) {
    return "chilihaus";
  }
  if (key.includes("dzi-foods") || key.includes("dzi foods")) {
    return "dzifoods";
  }
  if (key.includes("luxury-strand") || key.includes("luxury strand")) {
    return "luxurystrand";
  }
  if (
    key.includes("booksandyou") ||
    key.includes("bookstore") ||
    key.includes("books & you") ||
    key.includes("books-and-you")
  ) {
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

function CoverImage({
  src,
  alt,
  bg,
}: {
  src: string;
  alt: string;
  bg: string;
}) {
  return (
    <div className={cn("relative h-full w-full", bg)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 33vw"
        className="object-cover object-top"
      />
    </div>
  );
}

function EcommercePreview() {
  return (
    <CoverImage
      src="/images/project-northline-commerce.png"
      alt="Customer shopping an apparel storefront on a laptop"
      bg="bg-[#F7F4EF]"
    />
  );
}

function BrandingPreview() {
  return (
    <CoverImage
      src="/images/project-lumen-branding.png"
      alt="Chalkboard mind map with a lightbulb for brand ideation"
      bg="bg-[#F7F4EF]"
    />
  );
}

function SocialPreview() {
  return (
    <CoverImage
      src="/images/project-atelier-social.png"
      alt="Social media strategy desk with analytics report and keyboard"
      bg="bg-[#F4F6FB]"
    />
  );
}

function WebsitePreview() {
  return (
    <CoverImage
      src="/images/project-brightpath-website.png"
      alt="Developer working on website code on a laptop"
      bg="bg-[#0B1220]"
    />
  );
}

function BookstorePreview() {
  return (
    <CoverImage
      src="/images/project-booksandyou-home.jpg"
      alt="Books & You bookstore website homepage"
      bg="bg-[#F7F4EF]"
    />
  );
}

function ChiliHausPreview() {
  return (
    <CoverImage
      src="/images/project-chili-haus-home.jpg"
      alt="Chili Haus meals and catering website homepage"
      bg="bg-[#1A0F0A]"
    />
  );
}

function DziFoodsPreview() {
  return (
    <CoverImage
      src="/images/project-dzi-foods-home.jpg"
      alt="Dzi Foods website homepage"
      bg="bg-[#FFF8F0]"
    />
  );
}

function LuxuryStrandPreview() {
  return (
    <CoverImage
      src="/images/project-luxury-strand-home.jpg"
      alt="Luxury Strand website homepage"
      bg="bg-[#F7F4EF]"
    />
  );
}

const PREVIEWS: Record<PreviewKind, () => ReactNode> = {
  ecommerce: EcommercePreview,
  branding: BrandingPreview,
  social: SocialPreview,
  website: WebsitePreview,
  bookstore: BookstorePreview,
  chilihaus: ChiliHausPreview,
  dzifoods: DziFoodsPreview,
  luxurystrand: LuxuryStrandPreview,
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
