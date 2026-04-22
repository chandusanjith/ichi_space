"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import {
  Calculator, Clock, Type, Code, FileText, 
  Shield, DollarSign, Zap, Landmark, Cake, 
  Heart, Percent, ArrowLeftRight, Globe, CalendarDays,
  Timer, CaseSensitive, Sparkles, SpellCheck, Braces,
  Binary, Regex, Database, Files, Image as ImageIcon,
  KeyRound, Hash, Tag, Fuel, Gem, StickyNote, ListTodo, AlarmClock
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { searchTools, Tool } from "@/lib/tools-registry";
import { useDebounce } from "@/hooks/useDebounce";

// Icon mapping to allow storing icon names as strings in registry but rendering actual React components
export const IconMap: Record<string, React.ElementType> = {
  Calculator, Clock, Type, Code, FileText, 
  Shield, DollarSign, Zap, Landmark, Cake, 
  Heart, Percent, ArrowLeftRight, Globe, CalendarDays,
  Timer, CaseSensitive, Sparkles, SpellCheck, Braces,
  Binary, Regex, Database, Files, ImageIcon,
  KeyRound, Hash, Tag, Fuel, Gem, StickyNote, ListTodo, AlarmClock
};

export function SmartSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Tool[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  const debouncedQuery = useDebounce(query, 150);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    // Slight artificial delay to feel more "smart"
    const timer = setTimeout(() => {
      setResults(searchTools(debouncedQuery));
      setIsSearching(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [debouncedQuery]);

  const onSelect = (path: string) => {
    setOpen(false);
    router.push(path);
    setQuery("");
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground px-4 py-2 relative h-9 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-64 lg:w-80"
      >
        <span className="hidden lg:inline-flex">Search tools or specific tasks...</span>
        <span className="inline-flex lg:hidden">Search tools...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder="Type 'convert usd to inr' or 'format json'..." 
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty>
            {isSearching ? (
              <div className="flex flex-col items-center justify-center p-6 text-sm text-muted-foreground gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Searching tools...</span>
              </div>
            ) : (
              "No tools found matching your search. Try different keywords."
            )}
          </CommandEmpty>
          
          {results.length > 0 && (
            <CommandGroup heading="Suggestions">
              {results.slice(0, 7).map((tool) => {
                const Icon = IconMap[tool.icon] || Code;
                return (
                  <CommandItem
                    key={tool.slug}
                    value={`${tool.name} ${tool.description} ${tool.keywords.join(' ')}`}
                    onSelect={() => onSelect(tool.path)}
                    className="flex flex-row items-center cursor-pointer py-3"
                  >
                    <div className="flex items-center justify-center h-8 w-8 rounded-md bg-primary/10 text-primary mr-3 shrink-0">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col flex-1 overflow-hidden">
                      <span className="font-medium text-sm truncate">{tool.name}</span>
                      <span className="text-xs text-muted-foreground truncate">{tool.description}</span>
                    </div>
                    <div className="ml-2 pl-2 border-l shrink-0">
                      <span className="text-[10px] text-muted-foreground capitalize bg-muted px-1.5 py-0.5 rounded-sm">
                        {tool.category.replace('-', ' ')}
                      </span>
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}
          
          {!query && (
            <CommandGroup heading="Try searching for...">
              <CommandItem onSelect={() => setQuery("calculate emi")} className="text-muted-foreground cursor-pointer">
                <Search className="mr-2 h-3.5 w-3.5" /> calculate emi
              </CommandItem>
              <CommandItem onSelect={() => setQuery("convert usd")} className="text-muted-foreground cursor-pointer">
                <Search className="mr-2 h-3.5 w-3.5" /> convert usd
              </CommandItem>
              <CommandItem onSelect={() => setQuery("format json")} className="text-muted-foreground cursor-pointer">
                <Search className="mr-2 h-3.5 w-3.5" /> format json
              </CommandItem>
              <CommandItem onSelect={() => setQuery("generate password")} className="text-muted-foreground cursor-pointer">
                <Search className="mr-2 h-3.5 w-3.5" /> generate password
              </CommandItem>
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
