"use client";

import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { JsonExplorer } from "./components/JsonExplorer";

export default function JSONFormatterPage() {
  const [rawInput, setRawInput] = useState("");
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");

  // Sync parsed data when raw input changes
  useEffect(() => {
    if (!rawInput.trim()) {
      setData(null);
      setError("");
      return;
    }

    try {
      const parsed = JSON.parse(rawInput);
      setData(parsed);
      setError("");
    } catch (e: any) {
      setError(e.message || "Invalid JSON");
      // Don't clear data immediately to allow fixing the typo
    }
  }, [rawInput]);

  const handleDataChange = (newData: any) => {
    setData(newData);
    setRawInput(JSON.stringify(newData, null, 2));
  };

  return (
    <ToolLayout
      title="JSON Formatter & Editor"
      description="Modern JSON explorer with Tree, Table, and Text modes. Edit and search through complex data structures effortlessly."
      categoryName="Developer Tools"
      categoryPath="/developer-tools"
    >
      <div className="space-y-6 max-w-7xl mx-auto">
        {error && (
          <div className="bg-destructive/10 text-destructive text-xs py-2 px-4 rounded-lg border border-destructive/20 animate-in fade-in slide-in-from-top-1">
            <span className="font-bold uppercase mr-2 tracking-widest text-[10px]">Syntax Error:</span>
            {error}
          </div>
        )}
        
        <JsonExplorer 
          data={data} 
          onDataChange={handleDataChange}
          rawInput={rawInput}
          onRawInputChange={setRawInput}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <FeatureCard 
            title="Tree Explorer" 
            description="Navigate deeply nested objects with ease, featuring inline editing and type-specific icons."
          />
          <FeatureCard 
            title="Table View" 
            description="Perfect for large arrays of data. Compare objects side-by-side in a structured grid."
          />
          <FeatureCard 
            title="Smart Search" 
            description="Find keys or values instantly across all nodes. Filters both tree and table views."
          />
        </div>
      </div>
    </ToolLayout>
  );
}

const FeatureCard = ({ title, description }: { title: string, description: string }) => (
  <div className="p-6 rounded-2xl border border-border/50 bg-muted/20 hover:bg-muted/30 transition-all hover:shadow-md group">
    <h4 className="font-bold mb-2 group-hover:text-primary transition-colors tracking-tight">{title}</h4>
    <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
  </div>
);
