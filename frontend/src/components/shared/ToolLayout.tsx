"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, ArrowLeft } from "lucide-react";

import { AdComponent } from "@/components/ads/AdComponent";
import { Button } from "@/components/ui/button";

import { tools } from "@/lib/tools-registry";

interface ToolLayoutProps {
  title: string;
  description: string;
  categoryName: string;
  categoryPath: string;
  children: ReactNode;
  about?: ReactNode;
  faq?: Array<{ question: string; answer: string }>;
  slug?: string;
}

export function ToolLayout({
  title,
  description,
  categoryName,
  categoryPath,
  children,
  about,
  faq,
  slug,
}: ToolLayoutProps) {
  const router = useRouter();
  
  // Auto-lookup SEO content from registry if slug is provided and local props are empty
  const toolFromRegistry = slug ? tools.find(t => t.slug === slug) : null;
  const finalAbout = about || toolFromRegistry?.seoAbout;
  const finalFaq = faq || toolFromRegistry?.seoFaq;

  return (
    <div className="flex w-full flex-col max-w-5xl mx-auto pb-12">
      <div className="mb-6">
        <nav className="flex items-center space-x-1 text-sm text-muted-foreground bg-muted/30 p-2 rounded-lg inline-flex w-full md:w-auto overflow-x-auto border">
          <Link
            href="/"
            className="hover:text-foreground hover:bg-background px-2 py-1 rounded-md transition-colors whitespace-nowrap"
          >
            Dashboard
          </Link>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <span className="px-2 py-1 whitespace-nowrap">
            {categoryName}
          </span>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <span className="font-medium text-foreground px-2 py-1 whitespace-nowrap">
            {title}
          </span>
        </nav>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 hidden md:flex shrink-0"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          </div>
          <p className="text-muted-foreground mt-2 md:ml-11">{description}</p>
        </div>
      </div>

      <main className="min-h-[400px]">
        {children}
      </main>

      {/* SEO Content Sections */}
      {(finalAbout || (finalFaq && finalFaq.length > 0)) && (
        <div className="mt-20 space-y-16 border-t pt-16">
          {finalAbout && (
            <section className="prose prose-slate dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold mb-6">About {title}</h2>
              <div className="text-muted-foreground leading-relaxed text-lg">
                {finalAbout}
              </div>
            </section>
          )}

          {finalFaq && finalFaq.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
              <div className="grid gap-6">
                {finalFaq.map((item, index) => (
                  <div key={index} className="bg-muted/30 p-6 rounded-2xl border">
                    <h3 className="font-bold text-lg mb-2">{item.question}</h3>
                    <p className="text-muted-foreground">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
