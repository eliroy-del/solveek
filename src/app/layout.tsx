import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import { SiteShell } from "@/components/layout/site-shell";
import { SITE } from "@/constants/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : SITE.url);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE.name} | Digital Growth Partner`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "digital growth partner Ghana",
    "digital growth agency Ghana",
    "website development Ghana",
    "web application development Ghana",
    "SEO Ghana",
    "business automation Ghana",
    "bulk SMS Ghana",
    "social media management Ghana",
    "digital solutions for SMEs Ghana",
    "SOLVEEK",
  ],
  authors: [{ name: SITE.legalName }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_GH",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} | Digital Growth Partner`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | Digital Growth Partner`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE.url,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE.url,
  logo: `${SITE.url}/solveek-logo.png`,
  description: SITE.description,
  email: SITE.email,
  telephone: SITE.phone,
  sameAs: Object.values(SITE.social),
  slogan: SITE.tagline,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  publisher: {
    "@type": "Organization",
    name: SITE.name,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationJsonLd, websiteJsonLd]),
          }}
        />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
