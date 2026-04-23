"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SpellCheck, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

interface GrammarIssue {
  original: string;
  suggestion: string;
  type: "spelling" | "grammar" | "style";
  description: string;
}

// Client-side rules-based grammar checker
function checkGrammar(text: string): GrammarIssue[] {
  const issues: GrammarIssue[] = [];

  const rules: { pattern: RegExp; suggestion: string; type: GrammarIssue["type"]; description: string }[] = [
    { pattern: /\bi\b(?=[^'])/g, suggestion: "I", type: "grammar", description: "Capitalize the pronoun 'I'" },
    { pattern: /\byour\s+welcome\b/gi, suggestion: "you're welcome", type: "grammar", description: "Use 'you're' (you are) instead of 'your' (possessive)" },
    { pattern: /\bits\s+a\s+(?:great|good|nice)/gi, suggestion: "it's a", type: "grammar", description: "Use 'it's' (it is) instead of 'its' (possessive)" },
    { pattern: /\btheir\s+(?:is|are|was|were|going)\b/gi, suggestion: "there", type: "grammar", description: "Use 'there' instead of 'their'" },
    { pattern: /\bthen\b(?=\s+(?:you|we|they|he|she|it)\b)/gi, suggestion: "than", type: "grammar", description: "Use 'than' for comparisons" },
    { pattern: /\bcould\s+of\b/gi, suggestion: "could have", type: "grammar", description: "Use 'could have' instead of 'could of'" },
    { pattern: /\bshould\s+of\b/gi, suggestion: "should have", type: "grammar", description: "Use 'should have' instead of 'should of'" },
    { pattern: /\bwould\s+of\b/gi, suggestion: "would have", type: "grammar", description: "Use 'would have' instead of 'would of'" },
    { pattern: /\balot\b/gi, suggestion: "a lot", type: "spelling", description: "'A lot' should be two words" },
    { pattern: /\bdefinate\b/gi, suggestion: "definite", type: "spelling", description: "Correct spelling is 'definite'" },
    { pattern: /\brecieve\b/gi, suggestion: "receive", type: "spelling", description: "Correct spelling is 'receive' (i before e except after c)" },
    { pattern: /\boccured\b/gi, suggestion: "occurred", type: "spelling", description: "Correct spelling is 'occurred' (double r)" },
    { pattern: /\bseperate\b/gi, suggestion: "separate", type: "spelling", description: "Correct spelling is 'separate'" },
    { pattern: /\buntill\b/gi, suggestion: "until", type: "spelling", description: "Correct spelling is 'until' (one l)" },
    { pattern: /\bneccessary\b/gi, suggestion: "necessary", type: "spelling", description: "Correct spelling is 'necessary'" },
    { pattern: /\baccommodate\b/gi, suggestion: "accommodate", type: "spelling", description: "Correct spelling is 'accommodate'" },
    { pattern: /\s{2,}/g, suggestion: " ", type: "style", description: "Remove extra spaces" },
    { pattern: /\b(very|really|extremely)\s+(very|really|extremely)\b/gi, suggestion: "$1", type: "style", description: "Remove redundant intensifier" },
  ];

  // Check for sentences not starting with capital letter
  const sentences = text.split(/(?<=[.!?])\s+/);
  sentences.forEach((sentence) => {
    if (sentence.length > 0 && /^[a-z]/.test(sentence)) {
      issues.push({
        original: sentence.substring(0, 20) + "...",
        suggestion: sentence.charAt(0).toUpperCase() + sentence.slice(1, 20) + "...",
        type: "grammar",
        description: "Sentences should start with a capital letter",
      });
    }
  });

  rules.forEach((rule) => {
    const matches = text.matchAll(rule.pattern);
    for (const match of matches) {
      issues.push({
        original: match[0],
        suggestion: rule.suggestion,
        type: rule.type,
        description: rule.description,
      });
    }
  });

  return issues;
}

export default function GrammarCheckerPage() {
  const [input, setInput] = useState("");
  const [issues, setIssues] = useState<GrammarIssue[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = () => {
    if (!input.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setIssues(checkGrammar(input));
      setLoading(false);
    }, 600);
  };

  const typeColors = {
    spelling: "text-red-500 bg-red-500/10 border-red-200 dark:border-red-900",
    grammar: "text-amber-500 bg-amber-500/10 border-amber-200 dark:border-amber-900",
    style: "text-blue-500 bg-blue-500/10 border-blue-200 dark:border-blue-900",
  };

  return (
    <ToolLayout
      title="Grammar Checker"
      description="Check and fix grammar mistakes in your text"
      categoryName="Text Tools"
      categoryPath="/text-tools"
      slug="grammar-checker"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-6 space-y-4">
            <Label>Your Text</Label>
            <Textarea
              placeholder="Type or paste your text here to check for grammar errors..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[350px] text-sm resize-none"
            />
            <Button onClick={handleCheck} className="w-full" size="lg" disabled={!input.trim() || loading}>
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <SpellCheck className="mr-2 h-4 w-4" />
              )}
              Check Grammar
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-muted/30">
          <CardContent className="p-6">
            {issues !== null ? (
              issues.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center py-12">
                  <CheckCircle2 className="h-16 w-16 text-emerald-500 mb-4" />
                  <p className="text-lg font-semibold">No issues found!</p>
                  <p className="text-sm text-muted-foreground">Your text looks great.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{issues.length} issue{issues.length !== 1 ? 's' : ''} found</p>
                    <div className="flex gap-2 text-[10px]">
                      <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-500">Spelling</span>
                      <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-500">Grammar</span>
                      <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-500">Style</span>
                    </div>
                  </div>
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                    {issues.map((issue, i) => (
                      <div key={i} className={`rounded-lg p-3 border ${typeColors[issue.type]}`}>
                        <div className="flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                          <div className="space-y-1 flex-1">
                            <p className="text-xs font-medium">{issue.description}</p>
                            <div className="flex gap-2 items-center text-sm">
                              <span className="line-through opacity-60">{issue.original}</span>
                              <span>→</span>
                              <span className="font-medium">{issue.suggestion}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground py-12">
                <SpellCheck className="h-12 w-12 mb-4 opacity-20" />
                <p>Results will appear here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
