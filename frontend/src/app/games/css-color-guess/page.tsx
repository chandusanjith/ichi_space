"use client";
import { useState, useEffect, useCallback } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trophy, RotateCcw, Share2 } from "lucide-react";
import { toast } from "sonner";

function randomHex(): string {
  return "#" + Array.from({ length: 6 }, () => Math.floor(Math.random() * 16).toString(16)).join("").toUpperCase();
}

function hexDiff(a: string, b: string): number {
  const parse = (h: string) => [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)];
  const [r1,g1,b1] = parse(a); const [r2,g2,b2] = parse(b);
  return Math.round(Math.sqrt(((r1-r2)**2 + (g1-g2)**2 + (b1-b2)**2) / 3));
}

function scoreFromDiff(diff: number): number {
  if (diff === 0) return 100;
  if (diff <= 5) return 95;
  if (diff <= 15) return 80;
  if (diff <= 30) return 60;
  if (diff <= 50) return 40;
  if (diff <= 80) return 20;
  return 5;
}

export default function CssColorGuessPage() {
  const [target, setTarget] = useState("");
  const [input, setInput] = useState("");
  const [round, setRound] = useState(1);
  const [totalScore, setTotalScore] = useState(0);
  const [gameState, setGameState] = useState<"guessing" | "revealed" | "done">("guessing");
  const [lastScore, setLastScore] = useState(0);
  const [lastDiff, setLastDiff] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [history, setHistory] = useState<{ target: string; guess: string; score: number }[]>([]);
  const ROUNDS = 5;

  useEffect(() => {
    setBestScore(parseInt(localStorage.getItem("cssColorBest") || "0"));
    setTarget(randomHex());
  }, []);

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = input.trim().toUpperCase();
    const hex = raw.startsWith("#") ? raw : "#" + raw;
    if (!/^#[0-9A-F]{6}$/.test(hex)) { toast.error("Enter a valid 6-digit hex code (e.g. #FF5733)"); return; }
    const diff = hexDiff(target, hex);
    const pts = scoreFromDiff(diff);
    setLastScore(pts); setLastDiff(diff);
    setHistory(h => [...h, { target, guess: hex, score: pts }]);
    setTotalScore(s => s + pts);
    setGameState("revealed");
  };

  const nextRound = useCallback(() => {
    if (round >= ROUNDS) {
      const finalScore = totalScore + lastScore;
      if (finalScore > bestScore) { setBestScore(finalScore); localStorage.setItem("cssColorBest", String(finalScore)); }
      setGameState("done");
    } else {
      setRound(r => r + 1);
      setTarget(randomHex());
      setInput("");
      setGameState("guessing");
    }
  }, [round, totalScore, lastScore, bestScore]);

  const restart = () => {
    setRound(1); setTotalScore(0); setLastScore(0); setHistory([]);
    setTarget(randomHex()); setInput(""); setGameState("guessing");
  };

  const shareResult = () => {
    const total = history.reduce((s, h) => s + h.score, 0) + (gameState === "revealed" ? lastScore : 0);
    navigator.clipboard.writeText(`Guess the CSS Color 🎨\nScore: ${total}/${ROUNDS * 100}\nBest: ${bestScore}\n\nhttps://ichispace.tech/games/css-color-guess`).then(() => toast.success("Copied!"));
  };

  return (
    <ToolLayout
      title="Guess the CSS Color"
      description="A color block appears — type its hex code as accurately as possible. Scored by color distance."
      categoryName="Games" categoryPath="/games" slug="css-color-guess"
      about={<div className="space-y-2"><p>A color swatch is displayed. Type the 6-digit hex code that matches it as closely as possible. Your score is based on the color distance — exact match = 100 points.</p></div>}
      faq={[{ question: "How is the score calculated?", answer: "By the RGB distance between your guess and the actual color. Exact match = 100, very close = 80-95, rough = 20-60." }]}
    >
      <div className="max-w-md mx-auto space-y-6 text-center">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[{ label: "Round", val: `${round}/${ROUNDS}`, col: "text-primary" }, { label: "Score", val: totalScore, col: "text-emerald-500" }, { label: "Best", val: bestScore, col: "text-amber-500" }].map(s => (
            <div key={s.label} className="bg-card border rounded-xl p-3">
              <p className={`text-2xl font-black ${s.col}`}>{s.val}</p>
              <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {gameState !== "done" && (
            <motion.div key="game" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              {/* Color swatch */}
              <motion.div
                key={target}
                initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="w-full h-52 rounded-3xl shadow-2xl border border-white/10"
                style={{ backgroundColor: target }}
              />

              {gameState === "guessing" && (
                <form onSubmit={handleGuess} className="space-y-3">
                  <p className="text-sm text-muted-foreground font-semibold">What's the hex code of this color?</p>
                  <Input
                    value={input} onChange={e => setInput(e.target.value)}
                    placeholder="#FF5733" maxLength={7} autoFocus
                    className="text-center text-xl font-mono font-bold h-14 rounded-xl tracking-widest uppercase"
                  />
                  <Button type="submit" size="lg" className="w-full rounded-xl" disabled={!input}>Submit Guess</Button>
                </form>
              )}

              {gameState === "revealed" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="h-16 rounded-xl border" style={{ backgroundColor: history[history.length - 1]?.guess || "" }} />
                      <p className="text-xs text-muted-foreground font-bold">Your Guess</p>
                      <p className="font-mono font-black">{history[history.length-1]?.guess}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-16 rounded-xl border" style={{ backgroundColor: target }} />
                      <p className="text-xs text-muted-foreground font-bold">Actual</p>
                      <p className="font-mono font-black">{target}</p>
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl font-bold text-lg ${lastScore >= 80 ? "bg-emerald-500/10 text-emerald-500" : lastScore >= 50 ? "bg-amber-400/10 text-amber-500" : "bg-red-400/10 text-red-400"}`}>
                    +{lastScore} points · diff: {lastDiff}
                  </div>
                  <Button onClick={nextRound} size="lg" className="w-full rounded-xl">
                    {round < ROUNDS ? "Next Round →" : "See Results"}
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}

          {gameState === "done" && (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-5">
              <div className="bg-gradient-to-br from-primary/10 to-fuchsia-500/10 border rounded-3xl p-8 space-y-3">
                <Trophy className="w-14 h-14 text-amber-500 mx-auto" />
                <h3 className="text-2xl font-black">Game Over!</h3>
                <p className="text-5xl font-black text-primary">{totalScore}<span className="text-xl text-muted-foreground">/{ROUNDS * 100}</span></p>
                {totalScore > bestScore - totalScore && <p className="text-sm text-emerald-500 font-bold">🎉 New best!</p>}
              </div>
              <div className="space-y-2">
                {history.map((h, i) => (
                  <div key={i} className="flex items-center gap-3 bg-card border rounded-xl p-3">
                    <div className="w-8 h-8 rounded-lg flex-shrink-0" style={{ backgroundColor: h.target }} />
                    <div className="flex-1 text-left">
                      <p className="font-mono text-xs text-muted-foreground">Target: {h.target}</p>
                      <p className="font-mono text-xs">Guess: {h.guess}</p>
                    </div>
                    <span className={`font-black text-sm ${h.score >= 80 ? "text-emerald-500" : h.score >= 50 ? "text-amber-500" : "text-red-400"}`}>+{h.score}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 justify-center">
                <Button onClick={restart} variant="outline" className="gap-2 rounded-full"><RotateCcw className="w-4 h-4" /> Play Again</Button>
                <Button onClick={shareResult} className="gap-2 rounded-full"><Share2 className="w-4 h-4" /> Share</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToolLayout>
  );
}
