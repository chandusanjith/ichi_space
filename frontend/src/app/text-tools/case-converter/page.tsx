"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

const conversions = [
  { label: "UPPERCASE", fn: (s: string) => s.toUpperCase() },
  { label: "lowercase", fn: (s: string) => s.toLowerCase() },
  { label: "Title Case", fn: (s: string) => s.replace(/\w\S*/g, (t) => t.charAt(0).toUpperCase() + t.substring(1).toLowerCase()) },
  { label: "Sentence case", fn: (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() },
  { label: "camelCase", fn: (s: string) => {
    const words = s.replace(/[^a-zA-Z0-9\s]/g, '').split(/\s+/).filter(Boolean);
    return words.map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
  }},
  { label: "PascalCase", fn: (s: string) => {
    const words = s.replace(/[^a-zA-Z0-9\s]/g, '').split(/\s+/).filter(Boolean);
    return words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
  }},
  { label: "snake_case", fn: (s: string) => s.replace(/[^a-zA-Z0-9\s]/g, '').trim().replace(/\s+/g, '_').toLowerCase() },
  { label: "kebab-case", fn: (s: string) => s.replace(/[^a-zA-Z0-9\s]/g, '').trim().replace(/\s+/g, '-').toLowerCase() },
  { label: "CONSTANT_CASE", fn: (s: string) => s.replace(/[^a-zA-Z0-9\s]/g, '').trim().replace(/\s+/g, '_').toUpperCase() },
  { label: "aLtErNaTiNg", fn: (s: string) => s.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('') },
  { label: "InVeRsE cAsE", fn: (s: string) => s.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join('') },
  { label: "dot.case", fn: (s: string) => s.replace(/[^a-zA-Z0-9\s]/g, '').trim().replace(/\s+/g, '.').toLowerCase() },
];

export default function CaseConverterPage() {
  const [input, setInput] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <ToolLayout
      title="Case Converter"
      description="Convert text between different cases"
      categoryName="Text Tools"
      categoryPath="/text-tools"
      slug="case-converter"
    >
      <div className="space-y-8">
        <Card>
          <CardContent className="p-6">
            <Textarea
              placeholder="Type or paste your text here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[150px] text-base resize-none"
            />
          </CardContent>
        </Card>

        {input.trim() && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {conversions.map((conv, i) => {
              const result = conv.fn(input);
              return (
                <Card key={conv.label} className="group hover:border-primary/30 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        {conv.label}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => copyToClipboard(result, i)}
                      >
                        {copiedIndex === i ? (
                          <Check className="h-3.5 w-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </Button>
                    </div>
                    <p className="text-sm font-mono truncate">{result}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
