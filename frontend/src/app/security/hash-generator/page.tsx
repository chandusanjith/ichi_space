"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Check, Hash } from "lucide-react";

async function generateHash(text: string, algo: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest(algo, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

const algorithms = [
  { name: "SHA-1", algo: "SHA-1" },
  { name: "SHA-256", algo: "SHA-256" },
  { name: "SHA-384", algo: "SHA-384" },
  { name: "SHA-512", algo: "SHA-512" },
];

export default function HashGeneratorPage() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<Record<string, string>>({});
  const [copiedKey, setCopiedKey] = useState("");

  const generateHashes = async () => {
    if (!input) return;
    const results: Record<string, string> = {};
    for (const algo of algorithms) {
      results[algo.name] = await generateHash(input, algo.algo);
    }
    setHashes(results);
  };

  const copyToClipboard = async (key: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(""), 2000);
  };

  return (
    <ToolLayout
      title="Hash Generator"
      description="Generate SHA-1, SHA-256, SHA-384, and SHA-512 hashes"
      categoryName="Security"
      categoryPath="/security"
      slug="hash-generator"
    >
      <div className="space-y-8">
        <Card>
          <CardContent className="p-6 space-y-4">
            <Label>Input Text</Label>
            <Textarea
              placeholder="Enter text to hash..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[150px] resize-none"
            />
            <Button onClick={generateHashes} className="w-full" size="lg" disabled={!input.trim()}>
              <Hash className="mr-2 h-4 w-4" />
              Generate Hashes
            </Button>
          </CardContent>
        </Card>

        {Object.keys(hashes).length > 0 && (
          <div className="space-y-4">
            {algorithms.map((algo) => (
              <Card key={algo.name} className="group">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {algo.name}
                    </Label>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => copyToClipboard(algo.name, hashes[algo.name])}
                    >
                      {copiedKey === algo.name ? (
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  </div>
                  <p className="font-mono text-sm break-all text-primary/80 bg-muted/30 p-3 rounded-lg border">
                    {hashes[algo.name]}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
