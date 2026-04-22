"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Tool } from "@/lib/tools-registry";
import { IconMap } from "@/components/search/SmartSearch";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ToolCardProps {
  tool: Tool;
  onClick?: () => void;
}

export function ToolCard({ tool, onClick }: ToolCardProps) {
  const IconComponent = IconMap[tool.icon] || Sparkles;

  return (
    <Link href={tool.path} onClick={onClick}>
      <Card className="h-full group hover:border-primary/50 hover:shadow-md transition-all overflow-hidden flex flex-col cursor-pointer bg-card/60 backdrop-blur-sm border-border/50">
        <CardHeader className="p-4 pb-2">
          <div className="flex items-start justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
              <IconComponent className="h-5 w-5" />
            </div>
            
            <div className="flex flex-col gap-1 items-end">
              {tool.isPopular && (
                <Badge variant="secondary" className="px-1.5 py-0 text-[10px] font-medium bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 dark:text-amber-400">
                  Popular
                </Badge>
              )}
              {tool.isNew && (
                <Badge variant="secondary" className="px-1.5 py-0 text-[10px] font-medium bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 dark:text-emerald-400">
                  New
                </Badge>
              )}
            </div>
          </div>
          <CardTitle className="mt-3 text-base">{tool.name}</CardTitle>
          <CardDescription className="line-clamp-2 text-xs mt-1 min-h-[32px]">
            {tool.description}
          </CardDescription>
        </CardHeader>
        <CardFooter className="p-4 pt-0 mt-auto">
          <div className="flex w-full items-center justify-between mt-4 text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors">
            <span className="capitalize">{tool.category.replace("-", " ")}</span>
            <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
