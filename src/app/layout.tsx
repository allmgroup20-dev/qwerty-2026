import type { Metadata, Viewport } from "next";
import "./globals.css";
import ClientLayout from "./client-layout";

export const metadata: Metadata = {
  title: "Jobayer Group Career - Build Your Career With Us",
  description: "A premium JG Career and e-commerce platform for career growth. Join the most rewarding partnership platform.",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.svg",
    apple: [
      { url: "/icons/apple-touch-icon-180x180.png", sizes: "180x180", type: "image/png" },
      { url: "/icons/apple-touch-icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/icons/apple-touch-icon-120x120.png", sizes: "120x120", type: "image/png" },
    ],
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
  themeColor: "#1E3A5A",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap" rel="stylesheet" />
          <link rel="preload" href="/favicon.svg" as="image" />
      </head>
      <body className="min-h-screen bg-bg">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
