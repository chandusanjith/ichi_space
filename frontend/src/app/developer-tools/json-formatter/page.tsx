"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check, Braces, Minimize2, CheckCircle2, XCircle } from "lucide-react";

export default function JSONFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [indent, setIndent] = useState(2);

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
      setError("");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setOutput("");
    }
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setOutput("");
    }
  };

  const validate = () => {
    try {
      JSON.parse(input);
      setOutput("");
      setError("");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isValid = (() => {
    if (!input.trim()) return null;
    try { JSON.parse(input); return true; } catch { return false; }
  })();

  return (
    <ToolLayout
      title="JSON Formatter"
      description="Format, validate, and minify JSON data"
      categoryName="Developer Tools"
      categoryPath="/developer-tools"
    >
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 items-center">
          <Button onClick={format} size="lg">
            <Braces className="mr-2 h-4 w-4" />
            Format
          </Button>
          <Button onClick={minify} variant="outline" size="lg">
            <Minimize2 className="mr-2 h-4 w-4" />
            Minify
          </Button>
          <Button onClick={validate} variant="outline" size="lg">
            {isValid === true ? (
              <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-500" />
            ) : isValid === false ? (
              <XCircle className="mr-2 h-4 w-4 text-red-500" />
            ) : null}
            Validate
          </Button>
          <div className="ml-auto flex items-center gap-2">
            <Label className="text-sm text-muted-foreground">Indent:</Label>
            <Tabs value={String(indent)} onValueChange={(v) => setIndent(Number(v))}>
              <TabsList className="h-8">
                <TabsTrigger value="2" className="text-xs px-2 h-6">2</TabsTrigger>
                <TabsTrigger value="4" className="text-xs px-2 h-6">4</TabsTrigger>
                <TabsTrigger value="8" className="text-xs px-2 h-6">8</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {isValid !== null && (
          <div className={`flex items-center gap-2 text-sm px-4 py-2 rounded-lg ${
            isValid 
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" 
              : "bg-red-500/10 text-red-600 dark:text-red-400"
          }`}>
            {isValid ? (
              <><CheckCircle2 className="h-4 w-4" /> Valid JSON</>
            ) : (
              <><XCircle className="h-4 w-4" /> Invalid: {error}</>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-xs text-muted-foreground">Input</Label>
                <span className="text-[10px] text-muted-foreground">{input.length} chars</span>
              </div>
              <Textarea
                placeholder='{"key": "value", "numbers": [1, 2, 3]}'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[400px] font-mono text-sm resize-none"
              />
            </CardContent>
          </Card>

          <Card className="bg-muted/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-xs text-muted-foreground">Output</Label>
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
                placeholder="Formatted JSON will appear here..."
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
