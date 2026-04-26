"use client";

import { useState, useEffect, useCallback } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Brain, Heart, Trophy, RotateCcw, Share2 } from "lucide-react";
import { toast } from "sonner";

type GameState = "idle" | "showing" | "input" | "correct" | "wrong" | "gameover";

function generateNumber(digits: number): string {
  let num = "";
  for (let i = 0; i < digits; i++) num += i === 0 ? String(Math.floor(Math.random() * 9) + 1) : String(Math.floor(Math.random() * 10));
  return num;
}

export default function NumberMemoryPage() {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [level, setLevel] = useState(1);
  const [currentNumber, setCurrentNumber] = useState("");
  const [userInput, setUserInput] = useState("");
  const [lives, setLives] = useState(3);
  const [bestScore, setBestScore] = useState(0);
  const [countdown, setCountdown] = useState(2);

  useEffect(() => {
    const saved = parseInt(localStorage.getItem("numberMemoryBest") || "0");
    setBestScore(saved);
  }, []);

  const startLevel = useCallback((lvl: number) => {
    const digits = lvl + 2; // start at 3 digits
    const num = generateNumber(digits);
    setCurrentNumber(num);
    setUserInput("");
    setGameState("showing");
    setCountdown(2);
    const interval = setInterval(() => setCountdown(c => {
      if (c <= 1) { clearInterval(interval); setGameState("input"); return 0; }
      return c - 1;
    }), 1000);
  }, []);

  const startGame = () => { setLevel(1); setLives(3); startLevel(1); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput === currentNumber) {
      setGameState("correct");
      const newLevel = level + 1;
      if (newLevel - 1 > bestScore) { setBestScore(newLevel - 1); localStorage.setItem("numberMemoryBest", String(newLevel - 1)); }
      setTimeout(() => { setLevel(newLevel); startLevel(newLevel); }, 1200);
    } else {
      const newLives = lives - 1;
      setLives(newLives);
      setGameState("wrong");
      if (newLives <= 0) {
        setTimeout(() => setGameState("gameover"), 1200);
      } else {
        setTimeout(() => startLevel(level), 1500);
      }
    }
  };

  const shareResult = () => {
    const text = `I reached Level ${level} in the Number Memory Game on Ichi Space!\nBest: ${bestScore} levels 🧠\n\nhttps://ichispace.tech/games/number-memory`;
    navigator.clipboard.writeText(text).then(() => toast.success("Result copied!"));
  };

  const digits = level + 2;

  return (
    <ToolLayout
      title="Number Memory Game"
      description="A number flashes for 2 seconds. Memorize it, then type it back. Each correct answer adds another digit."
      categoryName="Games"
      categoryPath="/games"
      slug="number-memory"
      about={<div className="space-y-2"><p>A deceptively simple memory challenge. A number appears briefly, then disappears. Type it back exactly to advance. Each level adds one more digit. You have 3 lives.</p></div>}
      faq={[
        { question: "How long is the number shown?", answer: "Exactly 2 seconds regardless of length — the challenge increases as digits grow." },
        { question: "Is my best score saved?", answer: "Yes, your best level is saved locally in your browser." },
      ]}
    >
      <div className="max-w-md mx-auto space-y-6 text-center">
        {/* Header stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-card border rounded-xl p-3">
            <p className="text-2xl font-black text-primary">{level}</p>
            <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Level</p>
          </div>
          <div className="bg-card border rounded-xl p-3">
            <p className="text-2xl font-black text-amber-500">{bestScore}</p>
            <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Best</p>
          </div>
          <div className="bg-card border rounded-xl p-3 flex flex-col items-center justify-center">
            <div className="flex gap-1 mb-1">
              {Array(3).fill(null).map((_, i) => (
                <Heart key={i} className={`w-5 h-5 ${i < lives ? "text-red-500 fill-red-500" : "text-muted-foreground/30"}`} />
              ))}
            </div>
            <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Lives</p>
          </div>
        </div>

        {/* Game area */}
        <div className="bg-gradient-to-br from-card to-muted/30 border rounded-3xl p-10 min-h-64 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

          <AnimatePresence mode="wait">
            {gameState === "idle" && (
              <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <Brain className="w-16 h-16 text-primary mx-auto opacity-80" />
                <p className="text-muted-foreground text-sm">Memorize the number before it disappears!</p>
                <Button onClick={startGame} size="lg" className="rounded-full px-8">Start Game</Button>
              </motion.div>
            )}

            {gameState === "showing" && (
              <motion.div key="showing" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.2 }} className="space-y-4">
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Memorize this! ({countdown}s)</p>
                <motion.p
                  className="text-5xl md:text-6xl font-black tracking-widest text-primary font-mono"
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                >
                  {currentNumber}
                </motion.p>
                <p className="text-sm text-muted-foreground">{digits} digits · Level {level}</p>
              </motion.div>
            )}

            {gameState === "input" && (
              <motion.div key="input" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full space-y-4">
                <p className="text-sm text-muted-foreground font-semibold">What was the number?</p>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <Input
                    type="text"
                    inputMode="numeric"
                    autoFocus
                    value={userInput}
                    onChange={e => setUserInput(e.target.value.replace(/\D/g, ""))}
                    placeholder="Type the number..."
                    className="text-center text-2xl font-mono font-bold h-14 rounded-xl tracking-widest"
                    maxLength={20}
                  />
                  <Button type="submit" size="lg" className="w-full rounded-xl" disabled={!userInput}>
                    Submit
                  </Button>
                </form>
              </motion.div>
            )}

            {gameState === "correct" && (
              <motion.div key="correct" initial={{ scale: 0 }} animate={{ scale: [0, 1.2, 1] }} className="space-y-2">
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-3xl text-white">✓</span>
                </div>
                <p className="text-xl font-black text-emerald-500">Correct!</p>
                <p className="text-sm text-muted-foreground">Next level loading…</p>
              </motion.div>
            )}

            {gameState === "wrong" && (
              <motion.div key="wrong" initial={{ scale: 0 }} animate={{ scale: [0, 1.2, 1] }} className="space-y-2">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-3xl text-white">✗</span>
                </div>
                <p className="text-xl font-black text-red-500">Wrong!</p>
                <p className="text-base font-mono font-bold text-muted-foreground">Answer: {currentNumber}</p>
                {lives > 0 && <p className="text-sm text-muted-foreground">{lives} lives left…</p>}
              </motion.div>
            )}

            {gameState === "gameover" && (
              <motion.div key="gameover" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <Trophy className="w-14 h-14 text-amber-500 mx-auto" />
                <h3 className="text-2xl font-black">Game Over!</h3>
                <p className="text-muted-foreground">You reached <strong className="text-foreground">Level {level}</strong> ({digits} digits)</p>
                {level > bestScore && <p className="text-emerald-500 font-bold text-sm">🎉 New personal best!</p>}
                <div className="flex gap-3 justify-center flex-wrap">
                  <Button onClick={startGame} className="rounded-full gap-2"><RotateCcw className="w-4 h-4" /> Try Again</Button>
                  <Button variant="outline" onClick={shareResult} className="rounded-full gap-2"><Share2 className="w-4 h-4" /> Share</Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {gameState === "input" && (
          <p className="text-xs text-muted-foreground">Level {level} · {digits} digits</p>
        )}
      </div>
    </ToolLayout>
  );
}
