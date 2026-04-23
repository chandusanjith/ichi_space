"use client";

import { useState, useMemo } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Clock, Type, AlignLeft, Hash } from "lucide-react";

export default function WordCounterPage() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const characters = text.length;
    const charactersNoSpace = text.replace(/\s/g, "").length;
    const sentences = trimmed ? (trimmed.match(/[.!?]+/g) || []).length || (trimmed.length > 0 ? 1 : 0) : 0;
    const paragraphs = trimmed ? trimmed.split(/\n\s*\n/).filter(Boolean).length : 0;
    const readingTime = Math.ceil(words / 200);
    const speakingTime = Math.ceil(words / 130);
    const lines = text ? text.split("\n").length : 0;

    return { words, characters, charactersNoSpace, sentences, paragraphs, readingTime, speakingTime, lines };
  }, [text]);

  const StatCard = ({ icon: Icon, label, value, sub }: { icon: React.ElementType; label: string; value: string | number; sub?: string }) => (
    <div className="bg-background rounded-lg p-4 border flex items-center gap-3">
      <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-2xl font-bold tracking-tight">{value}</p>
        <p className="text-xs text-muted-foreground">{label} {sub && <span>· {sub}</span>}</p>
      </div>
    </div>
  );

  return (
    <ToolLayout
      title="Word Counter"
      description="Count words, characters, and analyze your text instantly."
      categoryName="Text Tools"
      categoryPath="/text-tools"
      slug="word-counter"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <Textarea
                placeholder="Start typing or paste your text here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[400px] text-base resize-none border-0 focus-visible:ring-0 p-0 shadow-none"
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-3">
          <StatCard icon={Type} label="Words" value={stats.words} />
          <StatCard icon={Hash} label="Characters" value={stats.characters} sub={`${stats.charactersNoSpace} without spaces`} />
          <StatCard icon={AlignLeft} label="Sentences" value={stats.sentences} />
          <StatCard icon={FileText} label="Paragraphs" value={stats.paragraphs} />
          <StatCard icon={Clock} label="Reading Time" value={`${stats.readingTime} min`} sub="@ 200 wpm" />
          <StatCard icon={Clock} label="Speaking Time" value={`${stats.speakingTime} min`} sub="@ 130 wpm" />
          <div className="bg-background rounded-lg p-4 border text-center">
            <p className="text-xs text-muted-foreground">{stats.lines} lines</p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
