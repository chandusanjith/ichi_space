"use client";

import { useState, useMemo, useRef } from "react";
import axios from "axios";
import { 
  FileCode, 
  Layout, 
  Table as TableIcon, 
  Search, 
  Download, 
  Copy, 
  Trash2, 
  Maximize2, 
  Minimize2,
  Settings2,
  Code,
  PieChart,
  Terminal,
  Upload,
  Link as LinkIcon,
  Wand2,
  ListFilter
} from "lucide-react";
import { cn } from "@/lib/utils";
import { JsonTreeView } from "./JsonTreeView";
import { JsonTableView } from "./JsonTableView";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

// We will create these components later
// import { JsonStats } from "./JsonStats";
// import { JsonQuery } from "./JsonQuery";
// import { JsonToolbar } from "./JsonToolbar";

interface JsonExplorerProps {
  data: any;
  onDataChange: (newData: any) => void;
  rawInput: string;
  onRawInputChange: (value: string) => void;
}

export const JsonExplorer = ({ data, onDataChange, rawInput, onRawInputChange }: JsonExplorerProps) => {
  const [rightViewMode, setRightViewMode] = useState<"tree" | "table" | "stats" | "query">("tree");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Simple handler functions (we will expand these)
  const handleDownload = () => {
    try {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `data-${new Date().getTime()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("JSON file downloaded");
    } catch (err) {
      toast.error("Failed to download file");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    toast.success("Copied to clipboard");
  };

  const handleClear = () => {
    onRawInputChange("");
    onDataChange(null);
    toast.info("Cleared all data");
  };

  const handlePrettify = () => {
    try {
      const parsed = JSON.parse(rawInput);
      onRawInputChange(JSON.stringify(parsed, null, 2));
      toast.success("Formatted successfully");
    } catch (e) {
      toast.error("Invalid JSON format");
    }
  };

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(rawInput);
      onRawInputChange(JSON.stringify(parsed));
      toast.success("Minified successfully");
    } catch (e) {
      toast.error("Invalid JSON format");
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      onRawInputChange(content);
      try {
        const parsed = JSON.parse(content);
        onDataChange(parsed);
        toast.success("File imported successfully");
      } catch (err) {
        toast.error("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  };

  const handleFetchUrl = async () => {
    const url = prompt("Enter JSON URL:");
    if (!url) return;

    const toastId = toast.loading("Fetching JSON...");
    try {
      const response = await axios.get(url);
      const content = JSON.stringify(response.data, null, 2);
      onRawInputChange(content);
      onDataChange(response.data);
      toast.success("JSON fetched successfully", { id: toastId });
    } catch (err) {
      toast.error("Failed to fetch JSON. Make sure the URL is valid and supports CORS.", { id: toastId });
    }
  };

  const handleTransform = (type: "sort" | "camelToSnake" | "snakeToCamel") => {
    if (!data) {
      toast.error("No JSON data to transform");
      return;
    }

    try {
      let transformed = data;
      if (type === "sort") {
        transformed = sortObjectKeys(data);
      } else if (type === "camelToSnake") {
        transformed = transformKeys(data, camelToSnake);
      } else if (type === "snakeToCamel") {
        transformed = transformKeys(data, snakeToCamel);
      }

      const content = JSON.stringify(transformed, null, 2);
      onRawInputChange(content);
      onDataChange(transformed);
      toast.success(`Transformed: ${type}`);
    } catch (err) {
      toast.error("Transformation failed");
    }
  };

  // Helper functions for transformation
  const sortObjectKeys = (obj: any): any => {
    if (Array.isArray(obj)) return obj.map(sortObjectKeys);
    if (obj !== null && typeof obj === "object") {
      return Object.keys(obj)
        .sort()
        .reduce((acc: any, key) => {
          acc[key] = sortObjectKeys(obj[key]);
          return acc;
        }, {});
    }
    return obj;
  };

  const transformKeys = (obj: any, fn: (s: string) => string): any => {
    if (Array.isArray(obj)) return obj.map((v) => transformKeys(v, fn));
    if (obj !== null && typeof obj === "object") {
      return Object.keys(obj).reduce((acc: any, key) => {
        acc[fn(key)] = transformKeys(obj[key], fn);
        return acc;
      }, {});
    }
    return obj;
  };

  const camelToSnake = (str: string) => str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  const snakeToCamel = (str: string) => str.replace(/(_\w)/g, (m) => m[1].toUpperCase());

  return (
    <div className={cn(
      "flex flex-col gap-4 transition-all duration-300",
      isFullscreen ? "fixed inset-0 z-50 bg-background p-4 lg:p-6" : "relative h-full"
    )}>
      {/* Global Toolbar */}
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept=".json" 
        onChange={handleImportFile} 
      />
      <div className="flex flex-wrap items-center justify-between gap-4 bg-muted/30 p-2 rounded-xl border border-border/50">
        <div className="flex items-center gap-2">
          {/* File Operations */}
          <Button variant="secondary" size="sm" className="h-8 gap-2" onClick={() => fileInputRef.current?.click()}>
            <Upload size={14} /> Import File
          </Button>
          <Button variant="secondary" size="sm" className="h-8 gap-2" onClick={handleFetchUrl}>
            <LinkIcon size={14} /> Fetch URL
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Transform & Export Menus */}
          <DropdownMenu>
            <DropdownMenuTrigger className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-8 gap-2 border-dashed")}>
              <Wand2 size={14} /> Transform
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Transformations</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleTransform("sort")}>
                Sort Keys Alphabetically
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleTransform("camelToSnake")}>
                camelCase to snake_case
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleTransform("snakeToCamel")}>
                snake_case to camelCase
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-8 gap-2 border-dashed")}>
              <Download size={14} /> Export
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Export Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleDownload}>
                Download as JSON
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleCopy}>
                Copy to Clipboard
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <TooltipProvider>
            <div className="flex items-center p-1 bg-background rounded-lg border border-border/50 ml-2">
              <Tooltip>
                <TooltipTrigger 
                  type="button"
                  className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }), "h-7 w-7")} 
                  onClick={(e) => {
                    e.preventDefault();
                    handleCopy();
                  }}
                >
                  <Copy size={14} />
                </TooltipTrigger>
                <TooltipContent>Copy JSON</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger 
                  type="button"
                  className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }), "h-7 w-7 text-destructive hover:bg-destructive/10 hover:text-destructive")} 
                  onClick={(e) => {
                    e.preventDefault();
                    handleClear();
                  }}
                >
                  <Trash2 size={14} />
                </TooltipTrigger>
                <TooltipContent>Clear All</TooltipContent>
              </Tooltip>
              <div className="w-px h-4 bg-border/50 mx-1" />
              <Tooltip>
                <TooltipTrigger 
                  type="button"
                  className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }), "h-7 w-7")} 
                  onClick={(e) => {
                    e.preventDefault();
                    setIsFullscreen(!isFullscreen);
                  }}
                >
                  {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                </TooltipTrigger>
                <TooltipContent>{isFullscreen ? "Exit Fullscreen" : "Fullscreen"}</TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-[600px]">
        {/* Left Pane: Raw Text Editor */}
        <Card className="border-border/50 shadow-sm flex flex-col overflow-hidden">
          <div className="flex items-center justify-between p-2 border-b bg-muted/10">
            <div className="flex items-center gap-2 px-2 text-sm font-medium text-muted-foreground">
              <FileCode size={16} />
              Raw JSON
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" onClick={handleMinify} className="h-7 text-xs">
                Minify
              </Button>
              <Button variant="ghost" size="sm" onClick={handlePrettify} className="h-7 text-xs">
                Prettify
              </Button>
            </div>
          </div>
          <CardContent className="p-0 flex-1 relative bg-muted/5">
            <Textarea 
              className="w-full h-full min-h-[500px] font-mono text-sm p-4 resize-none border-none focus-visible:ring-0 bg-transparent custom-scrollbar leading-relaxed"
              placeholder="Paste your JSON data here..."
              value={rawInput}
              onChange={(e) => onRawInputChange(e.target.value)}
              spellCheck={false}
            />
          </CardContent>
        </Card>

        {/* Right Pane: Visualizers & Tools */}
        <Card className="border-border/50 shadow-sm flex flex-col overflow-hidden">
          <div className="flex flex-wrap items-center justify-between p-2 border-b bg-muted/10 gap-2">
            <Tabs value={rightViewMode} onValueChange={(v) => setRightViewMode(v as any)} className="w-full sm:w-auto">
              <TabsList className="h-9">
                <TabsTrigger value="tree" className="flex items-center gap-2 text-xs">
                  <Layout size={14} /> Tree
                </TabsTrigger>
                <TabsTrigger value="table" className="flex items-center gap-2 text-xs">
                  <TableIcon size={14} /> Table
                </TabsTrigger>
                <TabsTrigger value="query" className="flex items-center gap-2 text-xs">
                  <Terminal size={14} /> Query
                </TabsTrigger>
                <TabsTrigger value="stats" className="flex items-center gap-2 text-xs">
                  <PieChart size={14} /> Stats
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex-1 min-w-[200px] relative max-w-xs ml-auto">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search nodes..." 
                className="pl-8 h-8 text-xs w-full bg-background focus-visible:ring-primary/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <CardContent className="p-0 flex-1 flex flex-col bg-background/50 overflow-auto">
            {!data ? (
              <EmptyState onPaste={() => document.querySelector('textarea')?.focus()} />
            ) : (
              <div className="p-4 flex-1">
                {rightViewMode === "tree" && (
                  <JsonTreeView 
                    data={data} 
                    onDataChange={onDataChange} 
                    searchQuery={searchQuery}
                  />
                )}
                {rightViewMode === "table" && (
                  <JsonTableView data={data} searchQuery={searchQuery} />
                )}
                {rightViewMode === "query" && (
                  <div className="flex items-center justify-center h-full text-muted-foreground italic">
                    Query tool coming soon...
                  </div>
                )}
                {rightViewMode === "stats" && (
                  <div className="flex items-center justify-center h-full text-muted-foreground italic">
                    Statistics coming soon...
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const EmptyState = ({ onPaste }: { onPaste: () => void }) => (
  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center m-4">
    <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-4">
      <FileCode size={32} className="text-muted-foreground opacity-40" />
    </div>
    <h3 className="text-lg font-bold mb-2">Awaiting JSON Data</h3>
    <p className="text-xs text-muted-foreground max-w-sm mb-6 leading-relaxed">
      Paste your JSON in the editor on the left, or upload a file to start exploring.
    </p>
    <Button onClick={onPaste} variant="outline" size="sm" className="rounded-full">
      Focus Editor
    </Button>
  </div>
);
