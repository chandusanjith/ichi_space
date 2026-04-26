"use client";
import { useState } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";

function analyzeText(text: string) {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  const words = text.trim().split(/\s+/).filter(Boolean);
  const syllables = words.reduce((sum, w) => sum + countSyllables(w), 0);
  const wordCount = words.length;
  const sentenceCount = Math.max(sentences.length, 1);
  const avgWordsPerSentence = wordCount / sentenceCount;
  const avgSyllablesPerWord = syllables / Math.max(wordCount, 1);
  const fleschEase = 206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord;
  const clamped = Math.max(0, Math.min(100, Math.round(fleschEase)));
  const gradeLevel = Math.max(1, Math.round(0.39 * avgWordsPerSentence + 11.8 * avgSyllablesPerWord - 15.59));
  const longSentences = sentences.filter(s => s.trim().split(/\s+/).length > 25).length;
  const passiveMatches = (text.match(/\b(is|are|was|were|be|been|being)\s+\w+ed\b/gi) || []).length;
  const passivePercent = Math.round((passiveMatches / sentenceCount) * 100);
  const charCount = text.replace(/\s/g, "").length;
  return { fleschEase: clamped, gradeLevel, wordCount, sentenceCount, avgWordsPerSentence: Math.round(avgWordsPerSentence * 10) / 10, longSentences, passivePercent, charCount, syllables };
}

function countSyllables(word: string): number {
  word = word.toLowerCase().replace(/[^a-z]/g, "");
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "").replace(/^y/, "");
  const m = word.match(/[aeiouy]{1,2}/g);
  return m ? m.length : 1;
}

function getFleschLabel(score: number): { label: string; color: string; desc: string } {
  if (score >= 90) return { label: "Very Easy", color: "text-emerald-500", desc: "Easily understood by 11-year-olds" };
  if (score >= 80) return { label: "Easy", color: "text-emerald-400", desc: "Conversational English for consumers" };
  if (score >= 70) return { label: "Fairly Easy", color: "text-teal-500", desc: "Fairly easy to read" };
  if (score >= 60) return { label: "Standard", color: "text-blue-500", desc: "Easily understood by 13-15 year olds" };
  if (score >= 50) return { label: "Fairly Difficult", color: "text-amber-500", desc: "Difficult for some audiences" };
  if (score >= 30) return { label: "Difficult", color: "text-orange-500", desc: "Best understood by college graduates" };
  return { label: "Very Difficult", color: "text-red-500", desc: "Best understood by university graduates" };
}

export default function ReadabilityPage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<ReturnType<typeof analyzeText> | null>(null);

  const analyze = () => { if (text.trim().split(/\s+/).length < 5) return; setResult(analyzeText(text)); };

  const r = result;
  const fl = r ? getFleschLabel(r.fleschEase) : null;

  return (
    <ToolLayout
      title="Readability Analyzer"
      description="Analyze any text for Flesch-Kincaid reading ease, grade level, passive voice percentage, and sentence statistics."
      categoryName="Text Tools" categoryPath="/text-tools" slug="readability-analyzer"
      about={<div className="space-y-2"><p>The Flesch Reading Ease score ranges from 0-100: higher = easier to read. The Kincaid Grade Level estimates the US school grade needed to understand the text. Useful for writers, students, and content creators.</p></div>}
      faq={[
        { question: "What is a good Flesch score?", answer: "60-70 is standard (conversational). Above 80 = easy reads. Below 30 = academic/legal text." },
        { question: "What is passive voice?", answer: "Sentences where the subject receives the action (e.g. 'The report was written by John'). Active voice is generally clearer." },
      ]}
    >
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="space-y-2">
          <Textarea value={text} onChange={e => setText(e.target.value)} placeholder="Paste your text here (minimum 5 words)..." className="min-h-52 resize-none text-sm" />
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">{text.trim().split(/\s+/).filter(Boolean).length} words</p>
            <Button onClick={analyze} disabled={text.trim().split(/\s+/).length < 5}>Analyze Text</Button>
          </div>
        </div>

        <AnimatePresence>
          {r && fl && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
              {/* Flesch Score Hero */}
              <div className="bg-card border rounded-3xl p-8 text-center">
                <p className={`text-7xl font-black ${fl.color}`}>{r.fleschEase}</p>
                <p className={`text-xl font-bold mt-1 ${fl.color}`}>{fl.label}</p>
                <p className="text-sm text-muted-foreground mt-1">{fl.desc}</p>
                <div className="mt-4 bg-muted rounded-full h-3 overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${r.fleschEase}%` }} transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-red-400 via-amber-400 to-emerald-500" />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>Difficult (0)</span><span>Easy (100)</span></div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: "Grade Level", value: `Grade ${r.gradeLevel}`, color: "text-primary", desc: "US school grade required" },
                  { label: "Words", value: r.wordCount.toLocaleString(), color: "text-foreground" },
                  { label: "Sentences", value: r.sentenceCount, color: "text-foreground" },
                  { label: "Avg Words/Sentence", value: r.avgWordsPerSentence, color: r.avgWordsPerSentence > 20 ? "text-red-400" : "text-emerald-500" },
                  { label: "Long Sentences (>25w)", value: r.longSentences, color: r.longSentences > 3 ? "text-amber-500" : "text-emerald-500" },
                  { label: "Passive Voice", value: `${r.passivePercent}%`, color: r.passivePercent > 20 ? "text-red-400" : "text-emerald-500", desc: "of sentences" },
                ].map(stat => (
                  <div key={stat.label} className="bg-card border rounded-2xl p-4">
                    <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
                    <p className="text-xs text-muted-foreground font-semibold mt-1">{stat.label}</p>
                    {stat.desc && <p className="text-xs text-muted-foreground/60">{stat.desc}</p>}
                  </div>
                ))}
              </div>

              {/* Suggestions */}
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5 space-y-2">
                <h3 className="font-bold text-amber-600 dark:text-amber-400">Suggestions</h3>
                {r.avgWordsPerSentence > 20 && <p className="text-sm text-muted-foreground">• Your average sentence length ({r.avgWordsPerSentence} words) is long. Try breaking sentences under 20 words.</p>}
                {r.passivePercent > 15 && <p className="text-sm text-muted-foreground">• {r.passivePercent}% passive voice is high. Aim for under 15% for cleaner writing.</p>}
                {r.longSentences > 3 && <p className="text-sm text-muted-foreground">• You have {r.longSentences} sentences over 25 words. Consider splitting them.</p>}
                {r.fleschEase < 60 && <p className="text-sm text-muted-foreground">• Reading ease score is below 60. Simplify vocabulary and shorten sentences.</p>}
                {r.avgWordsPerSentence <= 20 && r.passivePercent <= 15 && r.fleschEase >= 60 && <p className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold">✓ Your text is well-written and readable!</p>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToolLayout>
  );
}
