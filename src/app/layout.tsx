import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ClientLayout from "./client-layout";

const solaimanLipi = localFont({
  src: [
    { path: "./fonts/SolaimanLipi-Regular.woff", weight: "400", style: "normal" },
    { path: "./fonts/SolaimanLipi-Bold.woff", weight: "700", style: "normal" },
  ],
  display: "swap",
  preload: true,
  variable: "--font-bengali",
});

export const metadata: Metadata = {
  title: "Jobayer Group Career - Build Your Career With Us",
  description: "A premium JG Career and e-commerce platform for career growth. Join the most rewarding partnership platform.",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Jobayer Group Career",
    description: "Build Your Career With Us",
    type: "website",
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "JG Career",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0F1E36",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" className={`${solaimanLipi.variable}`}>
      <head>
        <link rel="preload" href="/favicon.svg" as="image" />
      </head>
      <body className="min-h-screen bg-bg font-bengali antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
