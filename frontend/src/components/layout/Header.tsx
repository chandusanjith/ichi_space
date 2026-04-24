"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { SmartSearch } from "@/components/search/SmartSearch";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { Logo } from "@/components/shared/Logo";
import { cn } from "@/lib/utils";

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

      <div className="flex lg:hidden">
        <Link href="/">
          <Logo showText={false} iconClassName="h-8 w-8" />
        </Link>
      </div>
      
      <div className="w-full flex items-center justify-between">
        <div className="hidden lg:flex w-[300px]">
          {/* Empty space for balance */}
        </div>
        <div className="flex-1 flex justify-center max-w-xl mx-auto px-4 md:px-0">
          <SmartSearch />
        </div>
        <div className="flex items-center gap-2 lg:w-[300px] justify-end">
          <a
            href="https://www.linkedin.com/company/ichi-space/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-9 w-9 text-muted-foreground hover:text-[#0077B5] transition-colors"
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-[1.2rem] w-[1.2rem]"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>

          <a
            href="https://wa.me/916360723237"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-9 w-9 text-muted-foreground hover:text-[#25D366] transition-colors"
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-[1.2rem] w-[1.2rem]"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </a>
          
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
