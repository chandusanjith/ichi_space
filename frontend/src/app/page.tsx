"use client";

import { useEffect, useState } from "react";
import { tools, categories, getPopularTools } from "@/lib/tools-registry";
import { ToolCard } from "@/components/dashboard/ToolCard";
import { AdComponent } from "@/components/ads/AdComponent";
import { useRecentTools } from "@/hooks/useRecentTools";
import { SmartSearch } from "@/components/search/SmartSearch";
import { Waves } from "lucide-react";

export default function Home() {
  const { recent } = useRecentTools();
  const popularTools = getPopularTools();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const recentTools = mounted 
    ? recent.map(slug => tools.find(t => t.slug === slug)).filter(Boolean)
    : [];

  return (
    <div className="flex flex-col gap-10 pb-12 w-full max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-background to-muted p-8 md:p-16 border shadow-sm flex flex-col items-center text-center">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)] dark:bg-grid-black/10" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/20 text-primary mb-6 shadow-sm border border-primary/20">
            <Waves className="h-8 w-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Everything you need. <br className="hidden md:inline" />
            <span className="text-primary">In one space.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Access over 30+ premium quality daily utility tools, calculators, and developer utilities instantly. No fuss, just results.
          </p>
          
          <div className="w-full max-w-xl mx-auto backdrop-blur-md bg-background/50 p-2 rounded-xl border shadow-sm">
            <SmartSearch />
          </div>
        </div>
      </section>

      {/* Primary Ad */}
      {/* <AdComponent slot="top-banner" /> */}

      {/* Recently Used (if any) */}
      {recentTools.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold tracking-tight">Recently Used</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {recentTools.map((tool) => tool && (
              <ToolCard key={`recent-${tool.slug}`} tool={tool} />
            ))}
          </div>
        </section>
      )}

      {/* Popular Tools */}
      <section>
        <div className="flex items-center justify-between mb-4 mt-4">
          <h2 className="text-xl font-bold tracking-tight">Popular Tools</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {popularTools.slice(0, 10).map((tool) => (
            <ToolCard key={`popular-${tool.slug}`} tool={tool} />
          ))}
        </div>
      </section>

      {/* <AdComponent slot="in-content" /> */}

      {/* Categories listing */}
      <div className="space-y-16 mt-8">
        {categories.map((category) => {
          const catTools = tools.filter(t => t.category === category.id);
          if (catTools.length === 0) return null;
          
          return (
            <section key={category.id} id={`category-${category.id}`} className="scroll-mt-24">
              <div className="mb-6">
                <h3 className="text-2xl font-bold tracking-tight capitalize">{category.name}</h3>
                <p className="text-muted-foreground mt-1">{category.description}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {catTools.map((tool) => (
                  <ToolCard key={`cat-${tool.slug}`} tool={tool} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
