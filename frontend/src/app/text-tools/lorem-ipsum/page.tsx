"use client";

import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, RefreshCw, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do",
  "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "enim",
  "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi",
  "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "in", "reprehenderit",
  "voluptate", "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia", "deserunt",
  "mollit", "anim", "id", "est", "laborum"
];

function generateWord() {
  return LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
}

function generateSentence(wordCount: number = 8) {
  const words = Array.from({ length: wordCount }, generateWord);
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
}

function generateParagraph(sentenceCount: number = 5) {
  return Array.from({ length: sentenceCount }, () => generateSentence(Math.floor(Math.random() * 8) + 5)).join(" ");
}

export default function LoremIpsumGenerator() {
  const [type, setType] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const [count, setCount] = useState(5);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    let result = "";
    if (type === "paragraphs") {
      result = Array.from({ length: count }, () => generateParagraph()).join("\n\n");
    } else if (type === "sentences") {
      result = Array.from({ length: count }, () => generateSentence()).join(" ");
    } else if (type === "words") {
      const words = Array.from({ length: count }, generateWord);
      words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
      result = words.join(" ") + ".";
    }
    setOutput(result);
    setCopied(false);
  };

  useEffect(() => {
    generate();
  }, [type, count]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="Lorem Ipsum Generator"
      description="Generate custom placeholder text for your designs and mockups."
      categoryName="Text Tools"
      categoryPath="/text-tools"
      slug="lorem-ipsum"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-end">
              <div className="flex-1 space-y-2 w-full">
                <Label htmlFor="count">Count</Label>
                <Input
                  id="count"
                  type="number"
                  min="1"
                  max="1000"
                  value={count}
                  onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full"
                />
              </div>
              <div className="flex-1 space-y-2 w-full">
                <Label>Generate Type</Label>
                <Select value={type} onValueChange={(val: any) => setType(val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paragraphs">Paragraphs</SelectItem>
                    <SelectItem value="sentences">Sentences</SelectItem>
                    <SelectItem value="words">Words</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={generate} size="lg" className="w-full md:w-auto">
                <RefreshCw className="w-4 h-4 mr-2" />
                Regenerate
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <div className="p-4 border-b bg-muted/20 flex justify-between items-center">
              <h3 className="font-medium">Output</h3>
              <Button variant="secondary" size="sm" onClick={copyToClipboard}>
                {copied ? <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" /> : <Copy className="w-4 h-4 mr-2" />}
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
            <div className="p-6 bg-muted/5 min-h-[300px] max-h-[600px] overflow-y-auto font-serif leading-relaxed whitespace-pre-wrap text-lg">
              {output}
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
