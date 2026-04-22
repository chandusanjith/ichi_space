"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check, ArrowLeftRight } from "lucide-react";

export default function Base64Page() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const process = () => {
    try {
      if (mode === "encode") {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input))));
      }
      setError("");
    } catch {
      setError(mode === "decode" ? "Invalid Base64 string" : "Encoding failed");
      setOutput("");
    }
  };

  const swap = () => {
    setMode(mode === "encode" ? "decode" : "encode");
    setInput(output);
    setOutput("");
    setError("");
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="Base64 Encode/Decode"
      description="Encode and decode Base64 strings"
      categoryName="Developer Tools"
      categoryPath="/developer-tools"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Tabs value={mode} onValueChange={(v) => { setMode(v as "encode" | "decode"); setOutput(""); setError(""); }}>
            <TabsList>
              <TabsTrigger value="encode">Encode</TabsTrigger>
              <TabsTrigger value="decode">Decode</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="ghost" size="sm" onClick={swap} disabled={!output}>
            <ArrowLeftRight className="h-4 w-4 mr-2" />
            Swap
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
              <Label className="text-xs text-muted-foreground">
                {mode === "encode" ? "Plain Text" : "Base64 String"}
              </Label>
              <Textarea
                placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 string to decode..."}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[300px] font-mono text-sm resize-none"
              />
              <Button onClick={process} className="w-full">
                {mode === "encode" ? "Encode to Base64" : "Decode from Base64"}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-muted/30">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-muted-foreground">
                  {mode === "encode" ? "Base64 Output" : "Decoded Text"}
                </Label>
                {output && (
                  <Button variant="ghost" size="sm" className="h-6" onClick={copyToClipboard}>
                    {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                  </Button>
                )}
              </div>
              <Textarea
                value={output}
                readOnly
                className="min-h-[300px] font-mono text-sm resize-none bg-background"
                placeholder="Output will appear here..."
              />
              {output && (
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Input: {input.length} chars</span>
                  <span>Output: {output.length} chars</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
