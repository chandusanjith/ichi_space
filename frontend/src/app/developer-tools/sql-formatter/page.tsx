"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Check, Database } from "lucide-react";
import { format as formatSQLLib } from "sql-formatter";

export default function SQLFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleFormat = () => {
    if (!input.trim()) return;
    try {
      const formatted = formatSQLLib(input, {
        language: "sql",
        tabWidth: 2,
        keywordCase: "upper",
      });
      setOutput(formatted);
      setError("");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Formatting failed");
      setOutput("");
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="SQL Formatter"
      description="Format and beautify SQL queries"
      categoryName="Developer Tools"
      categoryPath="/developer-tools"
      slug="sql-formatter"
    >
      <div className="space-y-6">
        <div className="flex gap-3">
          <Button onClick={handleFormat} size="lg">
            <Database className="mr-2 h-4 w-4" />
            Format SQL
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => { setInput(""); setOutput(""); setError(""); }}
          >
            Clear
          </Button>
        </div>

        {error && (
          <div className="bg-red-500/10 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-4 space-y-3">
              <Label className="text-xs text-muted-foreground">Input SQL</Label>
              <Textarea
                placeholder="Paste your SQL query here...&#10;&#10;e.g., SELECT u.name, u.email FROM users u INNER JOIN orders o ON u.id = o.user_id WHERE o.status = 'active' AND u.created_at > '2024-01-01' ORDER BY u.name ASC LIMIT 100"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[400px] font-mono text-sm resize-none"
              />
            </CardContent>
          </Card>

          <Card className="bg-muted/30">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-muted-foreground">Formatted SQL</Label>
                {output && (
                  <Button variant="ghost" size="sm" className="h-6" onClick={copyToClipboard}>
                    {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                  </Button>
                )}
              </div>
              <Textarea
                value={output}
                readOnly
                className="min-h-[400px] font-mono text-sm resize-none bg-background"
                placeholder="Formatted SQL will appear here..."
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
