"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SmartSearch } from "@/components/search/SmartSearch";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:h-[60px] lg:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="shrink-0 lg:hidden -ml-2"
        onClick={onMenuClick}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle navigation menu</span>
      </Button>
      
      <div className="w-full flex items-center justify-between">
        <div className="hidden lg:flex w-[300px]">
          {/* Empty space for balance */}
        </div>
        <div className="flex-1 flex justify-center max-w-xl mx-auto px-4 md:px-0">
          <SmartSearch />
        </div>
        <div className="flex items-center gap-2 lg:w-[300px] justify-end">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
