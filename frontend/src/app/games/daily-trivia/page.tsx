"use client";
import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Flame, Trophy, Share2, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";

const QUESTION_BANK = [
  { q: "What does API stand for?", options: ["Application Programming Interface","Advanced Protocol Integration","Automated Process Interface","Application Protocol Index"], answer: 0, cat: "Tech" },
  { q: "Which language is the language of the web?", options: ["Python","Java","JavaScript","C++"], answer: 2, cat: "Tech" },
  { q: "What is Git primarily used for?", options: ["Database management","Version control","Graphic design","Network monitoring"], answer: 1, cat: "Tech" },
  { q: "Which company created React?", options: ["Google","Microsoft","Meta","Apple"], answer: 2, cat: "Tech" },
  { q: "What does HTTP stand for?", options: ["HyperText Transfer Protocol","High-Tech Transfer Platform","Hyperlink Transfer Process","HyperText Terminal Program"], answer: 0, cat: "Tech" },
  { q: "Which data structure uses LIFO?", options: ["Queue","Stack","Array","LinkedList"], answer: 1, cat: "Tech" },
  { q: "What does CSS stand for?", options: ["Creative Style Sheets","Cascading Style Sheets","Computer Style System","Coding Sheet Standard"], answer: 1, cat: "Tech" },
  { q: "What does RAM stand for?", options: ["Random Access Memory","Read And Modify","Runtime Application Memory","Rapid Access Module"], answer: 0, cat: "Tech" },
  { q: "Which is NOT a JS framework?", options: ["Vue.js","Angular","Django","Svelte"], answer: 2, cat: "Tech" },
  { q: "What is time complexity of binary search?", options: ["O(n)","O(n²)","O(log n)","O(1)"], answer: 2, cat: "Tech" },
  { q: "What does SIP stand for in Indian finance?", options: ["Systematic Investment Plan","Secure Interest Payment","Standard Index Plan","Stock Investment Portfolio"], answer: 0, cat: "Finance" },
  { q: "What is the full form of SEBI?", options: ["Securities Exchange Board of India","Stock Exchange Bureau of India","Securities Equity Board of India","Standard Exchange Body of India"], answer: 0, cat: "Finance" },
  { q: "Which is a tax-saving instrument under Section 80C?", options: ["SIP in any mutual fund","PPF","FD for 1 year","Savings Account"], answer: 1, cat: "Finance" },
  { q: "What does EMI stand for?", options: ["Equated Monthly Installment","Equal Monthly Interest","Estimated Monthly Income","Every Month Income"], answer: 0, cat: "Finance" },
  { q: "What is the full form of GST?", options: ["General Sales Tax","Government Service Tax","Goods and Services Tax","Gross Standard Tax"], answer: 2, cat: "Finance" },
  { q: "Which index tracks the top 50 companies on NSE?", options: ["BSE Sensex","Nifty 50","Bank Nifty","Dow Jones"], answer: 1, cat: "Finance" },
  { q: "What does CTC stand for in Indian HR?", options: ["Cost To Company","Current Total Compensation","Company Tax Certificate","Compensation Transfer Credit"], answer: 0, cat: "Finance" },
  { q: "What does ROI stand for?", options: ["Rate of Index","Return On Investment","Risk of Inflation","Return On Income"], answer: 1, cat: "Finance" },
  { q: "How many bits are in a byte?", options: ["4","6","8","16"], answer: 2, cat: "General" },
  { q: "Who invented the World Wide Web?", options: ["Bill Gates","Tim Berners-Lee","Steve Jobs","Linus Torvalds"], answer: 1, cat: "General" },
  { q: "In what year was the first iPhone released?", options: ["2005","2007","2009","2010"], answer: 1, cat: "General" },
  { q: "Python was named after:", options: ["A snake","Monty Python's Flying Circus","A Greek myth","Its creator's dog"], answer: 1, cat: "General" },
  { q: "How many zeros are in one billion?", options: ["6","7","8","9"], answer: 3, cat: "General" },
  { q: "Who is the founder of Tesla?", options: ["Bill Gates","Jeff Bezos","Elon Musk","Larry Page"], answer: 2, cat: "General" },
  { q: "The first computer bug was literally a:", options: ["Beetle","Moth","Ant","Fly"], answer: 1, cat: "General" },
];

function getDailyQuestions() {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const arr = [...QUESTION_BANK];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = (seed * (i + 1)) % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, 5);
}

const CAT_COLORS: Record<string, string> = {
  Tech: "bg-blue-500/10 text-blue-500 border-blue-500/30",
  Finance: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
  General: "bg-purple-500/10 text-purple-500 border-purple-500/30",
};

export default function DailyTriviaPage() {
  const [questions] = useState(() => getDailyQuestions());
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([null, null, null, null, null]);
  const [gameState, setGameState] = useState<"playing" | "done" | "already-done">("playing");
  const [streak, setStreak] = useState(0);
  const [score, setScore] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const today = new Date().toISOString().split("T")[0];
    const saved = localStorage.getItem("dailyTrivia");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.date === today) { setGameState("already-done"); setScore(data.score); setAnswers(data.answers); }
      } catch {}
    }
    setStreak(parseInt(localStorage.getItem("triviaStreak") || "0"));
  }, []);

  const handleSelect = (optIdx: number) => {
    if (selected !== null || gameState !== "playing") return;
    setSelected(optIdx);
    const newAnswers = [...answers]; newAnswers[current] = optIdx; setAnswers(newAnswers);
    setTimeout(() => {
      if (current < 4) { setCurrent(c => c + 1); setSelected(null); }
      else {
        const finalScore = newAnswers.filter((a, i) => a === questions[i].answer).length;
        setScore(finalScore); setGameState("done");
        const today = new Date().toISOString().split("T")[0];
        const lastPlayed = localStorage.getItem("triviaLastPlayed");
        const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
        const newStreak = lastPlayed === yesterday ? streak + 1 : 1;
        setStreak(newStreak);
        localStorage.setItem("dailyTrivia", JSON.stringify({ date: today, score: finalScore, answers: newAnswers }));
        localStorage.setItem("triviaStreak", String(newStreak));
        localStorage.setItem("triviaLastPlayed", today);
      }
    }, 800);
  };

  const shareResult = () => {
    const emo = answers.map((a, i) => a === questions[i].answer ? "✅" : "❌").join("");
    const today = new Date().toISOString().split("T")[0];
    navigator.clipboard.writeText(`Daily Trivia ${today}\n${score}/5 ${emo}\n🔥 ${streak} day streak\n\nhttps://ichispace.tech/games/daily-trivia`).then(() => toast.success("Result copied!"));
  };

  if (!mounted) return null;

  const q = questions[current];

  const layoutProps = {
    title: "Daily Trivia Quiz",
    description: "5 fresh questions every day on tech, finance & general knowledge. Build your streak!",
    categoryName: "Games", categoryPath: "/games", slug: "daily-trivia",
    about: <p>5 questions seeded by date — everyone gets the same questions each day. Build your streak by playing every day!</p>,
    faq: [{ question: "Can I replay today's quiz?", answer: "No, once you complete it you wait until tomorrow for a new one." }],
  };

  if (gameState === "already-done") return (
    <ToolLayout {...layoutProps}>
      <div className="max-w-md mx-auto text-center space-y-6">
        <div className="bg-primary/5 border rounded-3xl p-10 space-y-4">
          <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
          <h3 className="text-2xl font-black">Already completed today!</h3>
          <p className="text-5xl font-black text-primary">{score}/5</p>
          <div className="flex items-center justify-center gap-2"><Flame className="w-5 h-5 text-amber-500" /><span className="font-bold">{streak} day streak</span></div>
          <Button onClick={shareResult} className="gap-2 rounded-full"><Share2 className="w-4 h-4" /> Share</Button>
          <p className="text-sm text-muted-foreground">Come back tomorrow for new questions!</p>
        </div>
      </div>
    </ToolLayout>
  );

  return (
    <ToolLayout {...layoutProps}>
      <div className="max-w-xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">{questions.map((_, i) => <div key={i} className={`w-8 h-2 rounded-full transition-all ${i < current ? "bg-primary" : i === current ? "bg-primary/50" : "bg-muted"}`} />)}</div>
          <div className="flex items-center gap-1.5 text-sm font-bold text-amber-500"><Flame className="w-4 h-4" /> {streak}</div>
        </div>
        <AnimatePresence mode="wait">
          {gameState === "playing" && (
            <motion.div key={current} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-4">
              <div className="bg-card border rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full border ${CAT_COLORS[q.cat]}`}>{q.cat}</span>
                  <span className="text-xs text-muted-foreground">{current + 1} / 5</span>
                </div>
                <h3 className="text-xl font-bold leading-snug">{q.q}</h3>
              </div>
              <div className="grid gap-3">
                {q.options.map((opt, i) => {
                  let cls = "border-border bg-card hover:border-primary/50 hover:bg-primary/5 cursor-pointer";
                  if (selected !== null) {
                    if (i === q.answer) cls = "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
                    else if (i === selected) cls = "border-red-400 bg-red-400/10 text-red-500";
                    else cls = "border-border bg-muted/30 opacity-50";
                  }
                  return (
                    <motion.button key={i} whileTap={{ scale: 0.98 }} onClick={() => handleSelect(i)} disabled={selected !== null}
                      className={`w-full text-left p-4 rounded-xl border font-medium transition-all ${cls}`}>
                      <span className="font-bold mr-3 text-muted-foreground">{String.fromCharCode(65+i)}.</span>{opt}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
          {gameState === "done" && (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6 text-center">
              <div className="bg-gradient-to-br from-primary/10 to-purple-500/10 border rounded-3xl p-8 space-y-4">
                {score >= 4 ? <Trophy className="w-16 h-16 text-amber-500 mx-auto" /> : <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />}
                <h3 className="text-2xl font-black">{score >= 4 ? "Outstanding!" : score >= 2 ? "Good Job!" : "Keep Practicing!"}</h3>
                <p className="text-5xl font-black text-primary">{score}/5</p>
                <div className="flex items-center justify-center gap-2 text-amber-500 font-bold"><Flame className="w-5 h-5" /> {streak} day streak</div>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {questions.map((q, i) => (
                  <div key={i} className={`aspect-square rounded-xl flex items-center justify-center text-lg ${answers[i] === q.answer ? "bg-emerald-500/20 text-emerald-500" : "bg-red-400/20 text-red-400"}`}>
                    {answers[i] === q.answer ? "✓" : "✗"}
                  </div>
                ))}
              </div>
              <Button onClick={shareResult} className="gap-2 rounded-full"><Share2 className="w-4 h-4" /> Share Result</Button>
              <p className="text-sm text-muted-foreground">Come back tomorrow!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToolLayout>
  );
}
