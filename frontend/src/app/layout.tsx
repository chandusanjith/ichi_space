import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import ClientLayout from "@/components/layout/ClientLayout";

export const metadata: Metadata = {
  title: "Ichi Space - Premium Online Utility Tools, Calculators & Developer Utilities",
  description: "Access 30+ high-quality, fast, and free online tools including JSON Formatter, PDF Tools, Calculators, and more. All-in-one space for your daily digital needs.",
  keywords: "utility tools, online calculators, developer tools, json formatter, pdf merger, productivity tools, ichi space",
  openGraph: {
    title: "Ichi Space - All-in-One Utility Tools",
    description: "30+ premium quality daily utility tools, calculators, and developer utilities instantly.",
    url: "https://ichispace.tech",
    siteName: "Ichi Space",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ichi Space - All-in-One Utility Tools",
    description: "30+ premium quality daily utility tools, calculators, and developer utilities instantly.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google AdSense - set NEXT_PUBLIC_ADSENSE_ID in .env.local */}
        {/*
        {process.env.NEXT_PUBLIC_ADSENSE_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        */}
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <ClientLayout>{children}</ClientLayout>
            <Toaster position="bottom-right" />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
