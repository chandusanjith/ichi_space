"use client";

import { useState, useMemo } from "react";
import { 
  FileCode, 
  Layout, 
  Table, 
  Search, 
  Download, 
  Copy, 
  Trash2, 
  Maximize2, 
  Minimize2,
  Settings2,
  Code
} from "lucide-react";
import { JsonTreeView } from "./JsonTreeView";
import { JsonTableView } from "./JsonTableView";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

interface JsonExplorerProps {
  data: any;
  onDataChange: (newData: any) => void;
  rawInput: string;
  onRawInputChange: (value: string) => void;
}

export const JsonExplorer = ({ data, onDataChange, rawInput, onRawInputChange }: JsonExplorerProps) => {
  const [viewMode, setViewMode] = useState<"text" | "tree" | "table">("tree");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  return (
    <div className={cn(
      "flex flex-col gap-4 transition-all duration-300",
      isFullscreen ? "fixed inset-0 z-50 bg-background p-6" : "relative"
    )}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as any)}>
            <TabsList className="grid w-[300px] grid-cols-3">
              <TabsTrigger value="text" className="flex items-center gap-2">
                <FileCode size={14} />
                Text
              </TabsTrigger>
              <TabsTrigger value="tree" className="flex items-center gap-2">
                <Layout size={14} />
                Tree
              </TabsTrigger>
              <TabsTrigger value="table" className="flex items-center gap-2">
                <Table size={14} />
                Table
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex-1 max-w-sm relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search keys or values..." 
            className="pl-9 h-10 w-full bg-muted/30 focus-visible:ring-primary/20 transition-all border-border/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <TooltipProvider>
            <div className="flex items-center p-1 bg-muted/30 rounded-lg border border-border/50">
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handlePrettify}>
                    <Code size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Prettify (Format)</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleDownload}>
                    <Download size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Download JSON</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCopy}>
                    <Copy size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Copy All</TooltipContent>
              </Tooltip>
              <div className="w-px h-4 bg-border/50 mx-1" />
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={handleClear}>
                    <Trash2 size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Clear All</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8" 
                    onClick={() => setIsFullscreen(!isFullscreen)}
                  >
                    {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{isFullscreen ? "Exit Fullscreen" : "Fullscreen"}</TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>
      </div>

      <Card className="border-border/50 shadow-sm overflow-hidden flex-1 flex flex-col min-h-[500px]">
        <CardContent className="p-0 flex-1 flex flex-col bg-muted/5">
          {viewMode === "text" && (
            <div className="flex-1 relative group">
              <div className="absolute top-4 right-4 z-10 flex gap-2">
                 <Button variant="outline" size="sm" onClick={handleMinify} className="h-7 text-xs bg-background/50 backdrop-blur-sm">
                   Minify
                 </Button>
                 <Button variant="outline" size="sm" onClick={handlePrettify} className="h-7 text-xs bg-background/50 backdrop-blur-sm">
                   Prettify
                 </Button>
              </div>
              <Textarea 
                className="w-full h-full min-h-[500px] font-mono text-sm p-4 resize-none border-none focus-visible:ring-0 bg-transparent custom-scrollbar leading-relaxed"
                placeholder="Paste your JSON here..."
                value={rawInput}
                onChange={(e) => onRawInputChange(e.target.value)}
              />
            </div>
          )}

          {viewMode === "tree" && (
            <div className="p-4 flex-1">
              {data ? (
                <JsonTreeView 
                  data={data} 
                  onDataChange={onDataChange} 
                  searchQuery={searchQuery}
                />
              ) : (
                <EmptyState onPaste={() => setViewMode("text")} />
              )}
            </div>
          )}

          {viewMode === "table" && (
            <div className="p-4 flex-1 overflow-auto">
              {data ? (
                <JsonTableView data={data} searchQuery={searchQuery} />
              ) : (
                <EmptyState onPaste={() => setViewMode("text")} />
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex items-center justify-between px-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 grayscale opacity-70">
            <Settings2 size={12} />
            Editor Options
          </div>
          <span>Mode: {viewMode}</span>
        </div>
        <div>
          {isFullscreen && <span className="text-primary italic animate-pulse">Press ESC to exit fullscreen</span>}
        </div>
      </div>
    </div>
  );
};

const EmptyState = ({ onPaste }: { onPaste: () => void }) => (
  <div className="flex-1 flex flex-col items-center justify-center p-12 text-center border-2 border-dashed rounded-2xl border-muted-foreground/10 m-4">
    <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-6">
      <FileCode size={32} className="text-muted-foreground opacity-40" />
    </div>
    <h3 className="text-xl font-bold mb-2">No JSON Data Found</h3>
    <p className="text-sm text-muted-foreground max-w-sm mb-8 leading-relaxed">
      Switch to Text mode to paste your JSON data, or drag and drop a file here to get started.
    </p>
    <Button onClick={onPaste} className="px-8 rounded-full shadow-lg hover:shadow-primary/20 transition-all">
      Go to Text Mode
    </Button>
  </div>
);

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
