import type { Metadata } from "next";
import Script from "next/script";
import { Manrope, Space_Grotesk } from "next/font/google";
import { ConsentProvider } from "@/components/analytics/consent-provider";
import { CookieConsentBanner } from "@/components/analytics/cookie-consent-banner";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { WebVitals } from "@/components/analytics/web-vitals";
import { SiteShell } from "@/components/layout/site-shell";
import { StructuredData } from "@/components/seo/structured-data";
import { SITE } from "@/constants/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
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

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

/**
 * Never use VERCEL_URL here — it rewrites canonicals/OG to *.vercel.app and
 * splits ranking signals away from https://www.solveek.com.
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE.name} | Digital Growth Partner`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
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
  authors: [{ name: SITE.legalName, url: SITE.url }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  category: "technology",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_GH",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} | Digital Growth Partner`,
    description: SITE.description,
    images: [
      {
        url: `${SITE.url}${SITE.ogImage}`,
        width: 1200,
        height: 630,
        alt: "SOLVEEK — Build. Connect. Grow. Digital Growth Partner",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | Digital Growth Partner`,
    description: SITE.description,
    images: [`${SITE.url}${SITE.ogImage}`],
  },
  robots: {
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
  alternates: {
    canonical: SITE.url,
  },
  ...(googleVerification
    ? { verification: { google: googleVerification } }
    : {}),
};

const globalJsonLd = [organizationJsonLd(), websiteJsonLd()];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GH"
      className={`${manrope.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Script id="ga-consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = window.gtag || gtag;
            gtag('consent', 'default', {
              ad_storage: 'denied',
              analytics_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              wait_for_update: 500
            });
          `}
        </Script>
        <StructuredData data={globalJsonLd} />
        <ConsentProvider>
          <SiteShell>{children}</SiteShell>
          <GoogleAnalytics />
          <WebVitals />
          <CookieConsentBanner />
        </ConsentProvider>
      </body>
    </html>
  );
}
