"use client";

import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Copy, RefreshCw, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function UuidGenerator() {
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [uppercase, setUppercase] = useState(false);
  const [removeHyphens, setRemoveHyphens] = useState(false);

  const generate = () => {
    const newUuids = Array.from({ length: count }, () => {
      let id = crypto.randomUUID();
      if (uppercase) id = id.toUpperCase();
      if (removeHyphens) id = id.replace(/-/g, '');
      return id;
    });
    setUuids(newUuids);
    setCopied(false);
  };

  useEffect(() => {
    generate();
  }, [count, uppercase, removeHyphens]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(uuids.join("\n"));
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="UUID / GUID Generator"
      description="Generate bulk v4 UUIDs instantly for your databases, testing, or development needs."
      categoryName="Developer Tools"
      categoryPath="/developer-tools"
      slug="uuid-generator"
    >
      <div className="max-w-3xl mx-auto space-y-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col md:flex-row gap-6 items-end">
                <div className="flex-1 space-y-2 w-full">
                  <Label htmlFor="count">Number of UUIDs</Label>
                  <Input
                    id="count"
                    type="number"
                    min="1"
                    max="1000"
                    value={count}
                    onChange={(e) => setCount(Math.max(1, Math.min(1000, parseInt(e.target.value) || 1)))}
                    className="w-full"
                  />
                </div>
                <Button onClick={generate} size="lg" className="w-full md:w-auto">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Generate UUIDs
                </Button>
              </div>

              <div className="flex gap-8 pt-2">
                <div className="flex items-center space-x-2">
                  <Switch id="uppercase" checked={uppercase} onCheckedChange={setUppercase} />
                  <Label htmlFor="uppercase">Uppercase</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="removeHyphens" checked={removeHyphens} onCheckedChange={setRemoveHyphens} />
                  <Label htmlFor="removeHyphens">Remove Hyphens</Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <div className="p-4 border-b bg-muted/20 flex justify-between items-center">
              <h3 className="font-medium">Generated UUIDs ({uuids.length})</h3>
              <Button variant="secondary" size="sm" onClick={copyToClipboard}>
                {copied ? <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" /> : <Copy className="w-4 h-4 mr-2" />}
                {copied ? "Copied All!" : "Copy All"}
              </Button>
            </div>
            <div className="p-4 bg-muted/5 min-h-[200px] max-h-[500px] overflow-y-auto">
              <pre className="font-mono text-sm leading-loose">
                {uuids.join("\n")}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
