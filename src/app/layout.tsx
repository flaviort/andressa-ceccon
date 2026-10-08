import type { Metadata, Viewport } from "next";
import { Inter_Tight } from "next/font/google";
import { Header } from "@/components/layout/header";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { JsonLd } from "@/components/ui/json-ld";
import { siteGraph } from "@/lib/schema";
import { site } from "@/lib/site";
import "./globals.css";

// Inter Tight is the closest free match to the reference's ABC Diatype (a paid
// Dinamo face). Headlines use 500/600 instead of the reference's 700.
const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Andressa Ceccon | Advogada Previdenciária em Curitiba",
    template: "%s | Andressa Ceccon",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.lawyer }],
  keywords: [
    "advogada previdenciária",
    "advogado INSS Curitiba",
    "planejamento previdenciário",
    "aposentadoria",
    "direito previdenciário",
    "BPC LOAS",
    "pensão por morte",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.name,
    title: "Andressa Ceccon | Advogada Previdenciária",
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  creator: site.lawyer,
  publisher: site.name,
  category: "legal",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  formatDetection: { telephone: false, email: false, address: false },
  appleWebApp: { title: site.shortName, statusBarStyle: "black-translucent" },
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#1b2848",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={interTight.variable} suppressHydrationWarning>
      <head>
        <noscript>
          <style>{'[data-split="load"]{visibility:visible!important}'}</style>
        </noscript>
        <JsonLd data={siteGraph} />
      </head>
      <body>
        <SmoothScroll>
          <Header />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
