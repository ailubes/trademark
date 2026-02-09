import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { generateOrganizationLD, generateWebSiteLD, renderJSONLD } from "@/lib/structured-data";

// Tectonic Design System Fonts with Cyrillic Support
const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-playfair",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  weight: ["400", "600", "700"],
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  variable: "--font-source-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "700"],
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://trademark.com.ua"),
  title: {
    default: "TRADEMARK.COM.UA | Реєстрація торгових марок в Україні",
    template: "%s | TRADEMARK.COM.UA",
  },
  description:
    "Професійна реєстрація торгових марок, патентів та авторських прав в Україні. Перевірка доступності марки онлайн. 25+ років досвіду, 2500+ зареєстрованих марок.",
  keywords: [
    "реєстрація торгової марки",
    "торгова марка Україна",
    "зареєструвати торгову марку",
    "перевірка торгової марки",
    "патент на винахід",
    "авторське право",
    "класи МКТУ",
    "інтелектуальна власність",
    "TMview пошук",
    "WIPO реєстрація",
  ],
  authors: [{ name: "TRADEMARK.COM.UA" }],
  creator: "TRADEMARK.COM.UA",
  publisher: "TRADEMARK.COM.UA",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: "https://trademark.com.ua",
    siteName: "TRADEMARK.COM.UA",
    title: "TRADEMARK.COM.UA | Реєстрація торгових марок в Україні",
    description:
      "Професійна реєстрація торгових марок, патентів та авторських прав в Україні. Перевірка доступності марки онлайн.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TRADEMARK.COM.UA - Реєстрація торгових марок",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TRADEMARK.COM.UA | Реєстрація торгових марок",
    description:
      "Професійна реєстрація торгових марок в Україні. Перевірка доступності, оцінка ризиків, юридичний супровід.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://trademark.com.ua",
    languages: {
      "uk-UA": "https://trademark.com.ua",
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0D1B2A" />
        {renderJSONLD([generateOrganizationLD(), generateWebSiteLD()])}
      </head>
      <body
        className={`${playfair.variable} ${sourceSans.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <div className="bg-grid" aria-hidden="true" />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
