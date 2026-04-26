"use client";
import { useState } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { FileSearch, CheckCircle2, AlertCircle, Lightbulb } from "lucide-react";

function extractKeywords(text: string): Set<string> {
  const stopWords = new Set(["the","and","for","are","with","that","have","this","from","they","will","been","were","your","more","also","into","some","than","then","when","which","about","their","would","could","should","these","those","there","being","after","other","years","each","most","just","like","only","over","such","make","take","well","many","much","very","still","even","both","under","here","while","where","both","through","between","during","before","without","because","provide","required","strong","ability","work","team","using","based"]);
  return new Set(
    text.toLowerCase().replace(/[^a-z0-9\s+#.]/g, " ").split(/\s+/)
      .filter(w => w.length > 2 && !stopWords.has(w))
  );
}

function scoreMatch(jdKws: Set<string>, resumeKws: Set<string>) {
  const matched: string[] = [];
  const missing: string[] = [];
  jdKws.forEach(kw => { if (resumeKws.has(kw)) matched.push(kw); else missing.push(kw); });
  const score = jdKws.size > 0 ? Math.round((matched.length / jdKws.size) * 100) : 0;
  return { score, matched, missing };
}

const TIPS = [
  "Add missing keywords naturally in your summary, skills, or experience sections.",
  "Tailor each resume version specifically to the job description.",
  "Use exact phrases from the JD — ATS systems match exact terms.",
  "Include both spelled-out and abbreviated versions (e.g. 'Machine Learning' and 'ML').",
  "Quantify achievements: 'Improved performance by 40%' ranks better than 'Improved performance'.",
];

export default function AtsCheckerPage() {
  const [jd, setJd] = useState("");
  const [resume, setResume] = useState("");
  const [result, setResult] = useState<{ score: number; matched: string[]; missing: string[] } | null>(null);

  const analyze = () => {
    if (!jd.trim() || !resume.trim()) return;
    const jdKws = extractKeywords(jd);
    const resumeKws = extractKeywords(resume);
    setResult(scoreMatch(jdKws, resumeKws));
  };

  const scoreColor = !result ? "" : result.score >= 75 ? "text-emerald-500" : result.score >= 50 ? "text-amber-500" : "text-red-400";
  const scoreLabel = !result ? "" : result.score >= 75 ? "Strong Match 🎉" : result.score >= 50 ? "Moderate Match ⚡" : "Weak Match ⚠️";

  return (
    <ToolLayout
      title="Resume ATS Score Checker"
      description="Paste a job description and your resume text to get an ATS keyword match score with missing keywords highlighted."
      categoryName="Text Tools" categoryPath="/text-tools" slug="ats-checker"
      about={<div className="space-y-2"><p>ATS (Applicant Tracking Systems) filter resumes by keyword matching. This tool extracts key terms from a job description and checks how many appear in your resume, giving a match score from 0–100.</p><p className="text-muted-foreground text-sm">All processing is done locally in your browser — no data is sent to any server.</p></div>}
      faq={[
        { question: "What is ATS?", answer: "Applicant Tracking System — software companies use to filter resumes before a human sees them, primarily based on keyword matching." },
        { question: "How accurate is this?", answer: "It uses keyword extraction and matching similar to basic ATS logic. Real ATS systems vary but this gives a solid directional score." },
      ]}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-bold flex items-center gap-2"><FileSearch className="w-4 h-4 text-primary" /> Job Description</label>
            <Textarea value={jd} onChange={e => setJd(e.target.value)} placeholder="Paste the job description here..." className="min-h-52 resize-none font-mono text-sm" />
            <p className="text-xs text-muted-foreground">{jd.trim().split(/\s+/).filter(Boolean).length} words</p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold flex items-center gap-2"><FileSearch className="w-4 h-4 text-emerald-500" /> Your Resume</label>
            <Textarea value={resume} onChange={e => setResume(e.target.value)} placeholder="Paste your resume text here..." className="min-h-52 resize-none font-mono text-sm" />
            <p className="text-xs text-muted-foreground">{resume.trim().split(/\s+/).filter(Boolean).length} words</p>
          </div>
        </div>
        <Button onClick={analyze} size="lg" className="w-full rounded-xl" disabled={!jd.trim() || !resume.trim()}>
          Analyze Match Score
        </Button>

        <AnimatePresence>
          {result && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {/* Score */}
              <div className="bg-card border rounded-3xl p-8 text-center">
                <p className={`text-7xl font-black ${scoreColor}`}>{result.score}%</p>
                <p className="text-xl font-bold mt-2">{scoreLabel}</p>
                <p className="text-sm text-muted-foreground mt-1">{result.matched.length} of {result.matched.length + result.missing.length} JD keywords found</p>
                <div className="mt-4 bg-muted rounded-full h-3 overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${result.score}%` }} transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full rounded-full ${result.score >= 75 ? "bg-emerald-500" : result.score >= 50 ? "bg-amber-400" : "bg-red-400"}`} />
                </div>
              </div>
              {/* Matched */}
              {result.matched.length > 0 && (
                <div className="bg-card border rounded-2xl p-5">
                  <h3 className="font-bold flex items-center gap-2 mb-3 text-emerald-600 dark:text-emerald-400"><CheckCircle2 className="w-4 h-4" /> Matched Keywords ({result.matched.length})</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.matched.slice(0, 40).map(kw => <span key={kw} className="px-2 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-semibold">{kw}</span>)}
                  </div>
                </div>
              )}
              {/* Missing */}
              {result.missing.length > 0 && (
                <div className="bg-card border rounded-2xl p-5">
                  <h3 className="font-bold flex items-center gap-2 mb-3 text-red-500"><AlertCircle className="w-4 h-4" /> Missing Keywords ({result.missing.length})</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.missing.slice(0, 40).map(kw => <span key={kw} className="px-2 py-1 bg-red-400/10 text-red-500 border border-red-400/20 rounded-full text-xs font-semibold">{kw}</span>)}
                  </div>
                </div>
              )}
              {/* Tips */}
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5">
                <h3 className="font-bold flex items-center gap-2 mb-3 text-amber-600 dark:text-amber-400"><Lightbulb className="w-4 h-4" /> Tips to Improve</h3>
                <ul className="space-y-2">
                  {TIPS.map((t, i) => <li key={i} className="text-sm text-muted-foreground flex gap-2"><span className="text-amber-500 font-bold shrink-0">{i+1}.</span>{t}</li>)}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToolLayout>
  );
}
