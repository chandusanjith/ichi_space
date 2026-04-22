"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Calculator, Clock, Type, Code, FileText, 
  Shield, DollarSign, Zap, Menu, PanelsTopLeft,
  Settings, LogOut, Search
} from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { categories } from "@/lib/tools-registry";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  className?: string;
}

export function Sidebar({ isOpen, setIsOpen, className }: SidebarProps) {
  const pathname = usePathname();

  // Re-use IconMap logic for Categories
  const CatIconMap: Record<string, React.ElementType> = {
    Calculator, Clock, Type, Code, FileText, 
    Shield, DollarSign, Zap
  };

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r bg-background transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        !isOpen && "-translate-x-full",
        className
      )}
    >
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold" onClick={() => setIsOpen(false)}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <PanelsTopLeft className="h-5 w-5" />
          </div>
          <span className="text-xl tracking-tight">Ichi Space</span>
        </Link>
        <Button 
          variant="outline" 
          size="icon" 
          className="ml-auto h-8 w-8 lg:hidden"
          onClick={() => setIsOpen(false)}
        >
          <Menu className="h-4 w-4" />
          <span className="sr-only">Toggle navigation</span>
        </Button>
      </div>

      <ScrollArea className="flex-1 py-4">
        <div className="px-4 py-2">
          <Link href="/">
            <Button
              variant={pathname === "/" ? "secondary" : "ghost"}
              className="w-full justify-start gap-2 mb-2"
              onClick={() => setIsOpen(false)}
            >
              <Search className="h-4 w-4" />
              <span>Dashboard</span>
            </Button>
          </Link>
          
          <div className="py-2">
            <h3 className="mb-1 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Tool Categories
            </h3>
            <div className="space-y-1">
              {categories.map((cat) => {
                const Icon = CatIconMap[cat.icon] || Code;
                const isActive = pathname.startsWith(`/${cat.id}`);
                return (
                  <Link key={cat.id} href={`/#category-${cat.id}`}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start gap-3 relative",
                        isActive && "bg-secondary/60 font-medium"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <div className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-md bg-muted/50 text-muted-foreground",
                        isActive && "bg-background text-foreground shadow-sm ring-1 ring-border"
                      )}>
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <span className="truncate">{cat.name}</span>
                      {isActive && (
                        <span className="absolute left-0 top-1/2 -mt-3 h-6 w-1 rounded-r bg-primary" />
                      )}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </ScrollArea>

      <div className="mt-auto border-t p-4">
        <div className="flex items-center gap-2 mb-2">
          <ThemeToggle />
          <span className="text-sm font-medium text-muted-foreground">Appearance</span>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground px-2 py-4">
          <span>&copy; {new Date().getFullYear()} Ichi Space</span>
          <span className="flex items-center gap-1 group cursor-pointer hover:text-primary transition-colors">
            <Settings className="w-3 h-3 group-hover:rotate-45 transition-transform" /> 
            v1.0.0
          </span>
        </div>
      </div>
    </aside>
  );
}
