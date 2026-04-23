"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Sparkles, Copy, Check, Loader2 } from "lucide-react";

export default function TextSummarizerPage() {
  const [input, setInput] = useState("");
  const [summary, setSummary] = useState("");
  const [sentences, setSentences] = useState(3);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const summarize = () => {
    if (!input.trim()) return;
    setLoading(true);

    // Client-side extractive summarization
    setTimeout(() => {
      const cleaned = input.replace(/\s+/g, ' ').trim();
      const allSentences = cleaned.match(/[^.!?]+[.!?]+/g) || [cleaned];
      
      // Score sentences by word frequency
      const words = cleaned.toLowerCase().split(/\s+/);
      const freq: Record<string, number> = {};
      words.forEach(w => { freq[w] = (freq[w] || 0) + 1; });

      const scored = allSentences.map((s, idx) => {
        const sWords = s.toLowerCase().split(/\s+/);
        const score = sWords.reduce((acc, w) => acc + (freq[w] || 0), 0) / sWords.length;
        // Boost first and last sentences
        const posBoost = idx === 0 ? 1.5 : idx === allSentences.length - 1 ? 1.2 : 1;
        return { sentence: s.trim(), score: score * posBoost, index: idx };
      });

      scored.sort((a, b) => b.score - a.score);
      const selected = scored
        .slice(0, Math.min(sentences, allSentences.length))
        .sort((a, b) => a.index - b.index)
        .map(s => s.sentence);

      setSummary(selected.join(' '));
      setLoading(false);
    }, 800);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0;
  const summaryWordCount = summary.trim() ? summary.trim().split(/\s+/).length : 0;
  const reduction = wordCount > 0 ? Math.round((1 - summaryWordCount / wordCount) * 100) : 0;

  return (
    <ToolLayout
      title="Text Summarizer"
      description="Summarize long text using extractive summarization"
      categoryName="Text Tools"
      categoryPath="/text-tools"
      slug="text-summarizer"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Label>Input Text</Label>
              <span className="text-xs text-muted-foreground">{wordCount} words</span>
            </div>
            <Textarea
              placeholder="Paste or type a long text to summarize..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[300px] text-sm resize-none"
            />
            <div className="space-y-3">
              <div className="flex justify-between">
                <Label className="text-sm text-muted-foreground">Summary Length</Label>
                <span className="text-sm font-medium">{sentences} sentences</span>
              </div>
              <Slider min={1} max={10} step={1} value={[sentences]} onValueChange={(v) => setSentences((v as number[])[0])} />
            </div>
            <Button onClick={summarize} className="w-full" size="lg" disabled={!input.trim() || loading}>
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Summarize
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-muted/30">
          <CardContent className="p-6">
            {summary ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Summary</Label>
                  <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                    {copied ? (
                      <Check className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <div className="bg-background rounded-xl p-4 border text-sm leading-relaxed">
                  {summary}
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-background rounded-lg p-3 border">
                    <p className="text-lg font-bold text-primary">{summaryWordCount}</p>
                    <p className="text-[10px] text-muted-foreground">Words</p>
                  </div>
                  <div className="bg-background rounded-lg p-3 border">
                    <p className="text-lg font-bold text-emerald-500">{reduction}%</p>
                    <p className="text-[10px] text-muted-foreground">Reduction</p>
                  </div>
                  <div className="bg-background rounded-lg p-3 border">
                    <p className="text-lg font-bold">{sentences}</p>
                    <p className="text-[10px] text-muted-foreground">Sentences</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground py-12">
                <Sparkles className="h-12 w-12 mb-4 opacity-20" />
                <p>Your summary will appear here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
