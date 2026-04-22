"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, ArrowLeft } from "lucide-react";

import { AdComponent } from "@/components/ads/AdComponent";
import { Button } from "@/components/ui/button";

interface ToolLayoutProps {
  title: string;
  description: string;
  categoryName: string;
  categoryPath: string;
  children: ReactNode;
}

export function ToolLayout({
  title,
  description,
  categoryName,
  categoryPath,
  children,
}: ToolLayoutProps) {
  const router = useRouter();

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

      {/* 
      <div className="mb-8">
        <AdComponent slot="top-banner" />
      </div>
      */}

      <main className="min-h-[400px]">
        {children}
      </main>

      {/* 
      <div className="mt-12">
        <AdComponent slot="in-content" />
      </div>
      */}
    </div>
  );
}
