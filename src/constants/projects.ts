import type { Project } from "@/types";

/** Local featured work used when CMS/Supabase is unavailable. */
export const FALLBACK_PROJECTS: Project[] = [
  {
    slug: "royalhouse-baltimore",
    title: "Royalhouse Baltimore",
    industry: "Church & Nonprofit",
    location: "Baltimore, Maryland",
    challenge:
      "Royalhouse Baltimore needed a clear, welcoming digital home that helps people plan a visit, find gathering times, and connect with a growing Spirit-filled church campus.",
    solution:
      "Solveek designed and built royalhousebaltimore.org—a modern church website with clear CTAs, gathering schedules, vision storytelling, events, and easy paths to visit, give, and connect.",
    results: [
      "Clear first-visit journey for newcomers",
      "Gathering times and location front and center",
      "A brand presence that matches the church’s warmth and energy",
    ],
    image: "/images/project-royalhouse-baltimore-home.jpg",
    gallery: [
      "/images/project-royalhouse-baltimore-home.jpg",
      "/images/project-royalhouse-baltimore-hero.jpg",
    ],
    websiteUrl: "https://www.royalhousebaltimore.org/",
  },
  {
    slug: "booksandyou-bookstore",
    title: "Books and You",
    industry: "Education",
    location: "Ghana school bookstore",
    challenge:
      "Parents and schools needed a trusted place to find Nursery through SHS textbooks, stationery, and classroom essentials online.",
    solution:
      "Solveek designed and built Books and You—a premium e-commerce storefront with level browsing, secure checkout, and delivery workflows for Ghana families and schools.",
    results: [
      "Catalog spanning Nursery to SHS",
      "Guest checkout with secure payments",
      "Same-day Accra and nationwide delivery options",
    ],
    image: "/images/project-booksandyou-home.jpg",
    gallery: [
      "/images/project-booksandyou-home.jpg",
      "/images/project-booksandyou.png",
    ],
    websiteUrl: "https://booksandyou.shop/",
  },
  {
    slug: "chili-haus",
    title: "Chili Haus",
    industry: "Hospitality",
    location: "Accra meals and catering",
    challenge:
      "Chili Haus needed a clearer digital storefront for meals, catering, and WhatsApp-led ordering without losing the brand’s heat and personality.",
    solution:
      "Solveek built a conversion-focused website with menu storytelling, clear ordering paths, and mobile-first layouts that make it easy to browse and buy.",
    results: [
      "Stronger first impression for new customers",
      "Clearer path from menu to WhatsApp order",
      "A site that matches the energy of the brand",
    ],
    image: "/images/project-chili-haus-home.jpg",
    gallery: [
      "/images/project-chili-haus-home.jpg",
      "/images/project-chili-haus-menu.jpg",
      "/images/project-chili-haus.jpg",
    ],
  },
  {
    slug: "luxury-strand",
    title: "Luxury Strand",
    industry: "E-commerce",
    location: "Premium hair brand",
    challenge:
      "The brand needed a premium online presence that felt as considered as the product and made buying simple.",
    solution:
      "Solveek designed and built a refined commerce experience with product-focused storytelling, clear categories, and a checkout flow built for confidence.",
    results: [
      "Premium brand presence online",
      "Clearer product discovery",
      "A storefront ready for growth",
    ],
    image: "/images/project-luxury-strand-home.jpg",
    gallery: ["/images/project-luxury-strand-home.jpg"],
  },
  {
    slug: "stepup-footwear",
    title: "StepUp Footwear",
    industry: "E-commerce",
    location: "Footwear retail",
    challenge:
      "StepUp needed a modern storefront that showcases footwear collections and makes browsing and buying feel effortless.",
    solution:
      "Solveek delivered a clean commerce site with product focus, mobile-friendly browsing, and a shopping journey built for retail conversion.",
    results: [
      "Modern retail presence",
      "Faster product browsing on mobile",
      "A clearer path from browse to purchase",
    ],
    image: "/images/project-stepup-footwear-home.jpg",
    gallery: ["/images/project-stepup-footwear-home.jpg"],
  },
  {
    slug: "dzi-foods",
    title: "Dzi Foods",
    industry: "Food & Beverage",
    location: "Ghana food brand",
    challenge:
      "Dzi Foods needed a digital home that communicates quality, origin, and trust while making the brand easy to discover.",
    solution:
      "Solveek crafted a brand-forward website with clear product storytelling and a layout that feels warm, credible, and ready for growth.",
    results: [
      "Clearer brand story online",
      "Stronger product presentation",
      "A foundation for marketing and sales",
    ],
    image: "/images/project-dzi-foods-home.jpg",
    gallery: ["/images/project-dzi-foods-home.jpg"],
  },
];
