"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw, Share2, CheckCircle2, Code2, Quote, Zap } from "lucide-react";
import { toast } from "sonner";

type Theme = "code" | "quotes" | "facts";

const TEXTS: Record<Theme, string[]> = {
  code: [
    `const fibonacci = (n) => n <= 1 ? n : fibonacci(n - 1) + fibonacci(n - 2);`,
    `async function fetchData(url) { const res = await fetch(url); return res.json(); }`,
    `const debounce = (fn, delay) => { let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); }; };`,
    `const deepClone = (obj) => JSON.parse(JSON.stringify(obj));`,
    `const uniqueArr = (arr) => [...new Set(arr)];`,
    `const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);`,
    `const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));`,
    `const memoize = (fn) => { const cache = {}; return (...args) => { const key = JSON.stringify(args); return cache[key] ?? (cache[key] = fn(...args)); }; };`,
  ],
  quotes: [
    `The best way to predict the future is to invent it. — Alan Kay`,
    `Simplicity is the soul of efficiency. — Austin Freeman`,
    `First, solve the problem. Then, write the code. — John Johnson`,
    `Code is like humor. When you have to explain it, it is bad. — Cory House`,
    `The function of good software is to make the complex appear simple. — Grady Booch`,
    `Programs must be written for people to read, and only incidentally for machines to execute.`,
    `Any fool can write code that a computer can understand. Good programmers write code that humans can understand.`,
    `It is not enough for code to work. — Robert C. Martin`,
  ],
  facts: [
    `The first computer bug was an actual bug — a moth found in a relay of the Harvard Mark II computer in 1947.`,
    `India's stock market BSE was established in 1875, making it the oldest stock exchange in Asia.`,
    `The term debugging was popularized by Grace Hopper after removing a moth from a computer relay.`,
    `Bitcoin's source code was published in January 2009 with only 8 pages of documentation.`,
    `The average developer writes around 10 to 12 lines of production code per day after accounting for meetings and reviews.`,
    `Python was named after Monty Python's Flying Circus, not the snake.`,
    `The first version of JavaScript was created in just 10 days by Brendan Eich in 1995.`,
    `More than 70 percent of all websites use JavaScript according to web technology surveys.`,
  ],
};

const THEME_CONFIG = {
  code: { label: "Code", icon: Code2, color: "text-orange-500", bg: "bg-orange-500/10 border-orange-500/30" },
  quotes: { label: "Quotes", icon: Quote, color: "text-blue-500", bg: "bg-blue-500/10 border-blue-500/30" },
  facts: { label: "Facts", icon: Zap, color: "text-emerald-500", bg: "bg-emerald-500/10 border-emerald-500/30" },
};

export default function TypingSpeedPage() {
  const [theme, setTheme] = useState<Theme>("code");
  const [textIndex, setTextIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [gameState, setGameState] = useState<"idle" | "running" | "done">("idle");
  const [startTime, setStartTime] = useState<number>(0);
  const [elapsed, setElapsed] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [errors, setErrors] = useState(0);
  const [bestWpm, setBestWpm] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const TARGET = TEXTS[theme][textIndex];

  useEffect(() => {
    const saved = parseInt(localStorage.getItem("typingBestWpm") || "0");
    setBestWpm(saved);
  }, []);

  useEffect(() => {
    if (gameState === "running") {
      timerRef.current = setInterval(() => setElapsed(Date.now() - startTime), 200);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [gameState, startTime]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (gameState === "idle" && val.length === 1) { setGameState("running"); setStartTime(Date.now()); }
    if (gameState === "done") return;
    setTyped(val);
    let errs = 0;
    for (let i = 0; i < val.length; i++) { if (val[i] !== TARGET[i]) errs++; }
    setErrors(errs);
    const acc = val.length > 0 ? Math.max(0, Math.round(((val.length - errs) / val.length) * 100)) : 100;
    setAccuracy(acc);
    if (val === TARGET) {
      if (timerRef.current) clearInterval(timerRef.current);
      const totalTime = (Date.now() - startTime) / 60000;
      const words = TARGET.trim().split(/\s+/).length;
      const finalWpm = Math.round(words / totalTime);
      setWpm(finalWpm);
      setGameState("done");
      if (finalWpm > bestWpm) { setBestWpm(finalWpm); localStorage.setItem("typingBestWpm", String(finalWpm)); }
    }
  };

  const reset = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTyped(""); setGameState("idle"); setElapsed(0); setWpm(0); setAccuracy(100); setErrors(0);
    const nextIdx = (textIndex + 1) % TEXTS[theme].length;
    setTextIndex(nextIdx);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [textIndex, theme]);

  const shareResult = () => {
    const text = `I just typed at ${wpm} WPM with ${accuracy}% accuracy on Ichi Space!\nTheme: ${THEME_CONFIG[theme].label}\n\nhttps://ichispace.tech/games/typing-speed`;
    navigator.clipboard.writeText(text).then(() => toast.success("Result copied!"));
  };

  const elapsedSecs = Math.floor(elapsed / 1000);
  const liveWpm = gameState === "running" && elapsed > 0
    ? Math.round((typed.trim().split(/\s+/).length / (elapsed / 60000)))
    : 0;

  const renderText = () => TARGET.split("").map((char, i) => {
    let cls = "text-muted-foreground/50";
    if (i < typed.length) cls = typed[i] === char ? "text-foreground" : "bg-red-500/30 text-red-400 rounded";
    else if (i === typed.length) cls = "border-b-2 border-primary text-muted-foreground";
    return <span key={i} className={cls}>{char}</span>;
  });

  return (
    <ToolLayout
      title="Typing Speed Test"
      description="Test your typing speed with themed content — code snippets, quotes, or random facts. Get your WPM score."
      categoryName="Games"
      categoryPath="/games"
      slug="typing-speed"
      about={<div className="space-y-2"><p>Choose a theme and start typing. Timer starts on your first keystroke. Results include WPM (words per minute) and accuracy percentage.</p></div>}
      faq={[
        { question: "How is WPM calculated?", answer: "WPM = total words in the text ÷ time taken in minutes. Each word is approximately 5 characters." },
        { question: "What is a good WPM score?", answer: "Average is 40 WPM. Good typists reach 70-80 WPM. Professionals often exceed 100 WPM." },
      ]}
    >
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Theme selector */}
        <div className="flex gap-2 justify-center">
          {(Object.keys(THEME_CONFIG) as Theme[]).map(t => {
            const { label, icon: Icon, bg } = THEME_CONFIG[t];
            return (
              <button
                key={t}
                onClick={() => { setTheme(t); setTextIndex(0); reset(); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${theme === t ? bg + " " + THEME_CONFIG[t].color : "border-border text-muted-foreground hover:border-foreground/30"}`}
              >
                <Icon className="w-4 h-4" /> {label}
              </button>
            );
          })}
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: "WPM", value: gameState === "done" ? wpm : liveWpm, color: "text-primary" },
            { label: "Accuracy", value: `${accuracy}%`, color: "text-emerald-500" },
            { label: "Errors", value: errors, color: "text-red-400" },
            { label: "Best WPM", value: bestWpm, color: "text-amber-500" },
          ].map(stat => (
            <div key={stat.label} className="bg-card border rounded-xl p-3 text-center">
              <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Text display */}
        <div className="bg-card border rounded-2xl p-6 font-mono text-lg leading-relaxed tracking-wide select-none">
          {renderText()}
        </div>

        {/* Input */}
        <textarea
          ref={inputRef}
          value={typed}
          onChange={handleInput}
          disabled={gameState === "done"}
          placeholder={gameState === "idle" ? "Start typing to begin the timer..." : ""}
          className="w-full h-28 bg-muted/30 border rounded-xl p-4 font-mono text-base resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          spellCheck={false}
          autoComplete="off"
        />

        {/* Actions */}
        <div className="flex gap-3 justify-center">
          <Button onClick={reset} variant="outline" className="gap-2 rounded-full">
            <RotateCcw className="w-4 h-4" /> New Text
          </Button>
          {gameState === "done" && (
            <Button onClick={shareResult} className="gap-2 rounded-full">
              <Share2 className="w-4 h-4" /> Share Result
            </Button>
          )}
        </div>

        {/* Result card */}
        <AnimatePresence>
          {gameState === "done" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-primary/10 to-emerald-500/10 border border-primary/20 rounded-2xl p-6 text-center space-y-2"
            >
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
              <h3 className="text-2xl font-black">
                {wpm >= 80 ? "🔥 Speed Demon!" : wpm >= 60 ? "⚡ Great Job!" : wpm >= 40 ? "👍 Not Bad!" : "💪 Keep Practicing!"}
              </h3>
              <p className="text-muted-foreground">{wpm} WPM · {accuracy}% Accuracy · {elapsedSecs}s</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToolLayout>
  );
}
