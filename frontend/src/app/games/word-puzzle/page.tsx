"use client";

import { useState, useEffect, useCallback } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Trophy, RotateCcw, Share2, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

const WORD_LIST = [
  "PROXY","REGEX","CACHE","AGILE","YIELD","TOKEN","STACK","QUEUE","PATCH","SCRUM",
  "PIVOT","CLOUD","BYTES","ARRAY","CLASS","CLONE","DEBUG","FLOAT","HOOKS","INDEX",
  "LOGIC","MERGE","MODEL","PARSE","QUERY","REACT","REDUX","ROUTE","SCOPE","SHELL",
  "SLICE","STATE","STORE","SWIFT","TABLE","TRACE","TUPLE","TYPES","UNION","VALID",
  "FETCH","CONST","LOOPS","ASYNC","AWAIT","THROW","CATCH","BONDS","STOCK","FOREX",
  "DEBIT","AUDIT","LEASE","RALLY","RATIO","RATES","TRADE","TRUST","VAULT","FUNDS",
  "HEDGE","QUOTA","ASSET","BEARS","BULLS","GRANT","LOANS","TERMS","BATCH","LAYER",
];

const VALID_WORDS = new Set(WORD_LIST);

function getDailyWord(): string {
  const start = new Date("2024-01-01").getTime();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dayIndex = Math.floor((today.getTime() - start) / 86400000) % WORD_LIST.length;
  return WORD_LIST[Math.abs(dayIndex)];
}

type TileState = "empty" | "tbd" | "correct" | "present" | "absent";

const KEYBOARD_ROWS = [
  ["Q","W","E","R","T","Y","U","I","O","P"],
  ["A","S","D","F","G","H","J","K","L"],
  ["ENTER","Z","X","C","V","B","N","M","⌫"],
];

const TILE_COLORS: Record<TileState, string> = {
  empty: "border-border bg-transparent",
  tbd: "border-foreground/60 bg-transparent",
  correct: "border-emerald-500 bg-emerald-500 text-white",
  present: "border-amber-400 bg-amber-400 text-white",
  absent: "border-muted bg-muted text-muted-foreground",
};

const KEY_COLORS: Record<string, string> = {
  correct: "bg-emerald-500 text-white border-emerald-500",
  present: "bg-amber-400 text-white border-amber-400",
  absent: "bg-muted text-muted-foreground border-muted",
};

export default function WordPuzzlePage() {
  const TARGET = getDailyWord();
  const [guesses, setGuesses] = useState<string[][]>([]);
  const [currentGuess, setCurrentGuess] = useState<string[]>([]);
  const [gameState, setGameState] = useState<"playing" | "won" | "lost">("playing");
  const [keyStates, setKeyStates] = useState<Record<string, TileState>>({});
  const [streak, setStreak] = useState(0);
  const [shakeRow, setShakeRow] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const today = new Date().toISOString().split("T")[0];
    const saved = localStorage.getItem("wordPuzzle");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.date === today) {
          setGuesses(data.guesses || []);
          setGameState(data.gameState || "playing");
          setKeyStates(data.keyStates || {});
        }
      } catch {}
    }
    const savedStreak = parseInt(localStorage.getItem("wordPuzzleStreak") || "0");
    setStreak(savedStreak);
  }, []);

  const saveState = useCallback((newGuesses: string[][], newGameState: typeof gameState, newKeyStates: Record<string, TileState>) => {
    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem("wordPuzzle", JSON.stringify({ date: today, guesses: newGuesses, gameState: newGameState, keyStates: newKeyStates }));
  }, []);

  const getTileStates = (guess: string[]): TileState[] => {
    const result: TileState[] = Array(5).fill("absent");
    const targetArr = TARGET.split("");
    const remaining: (string | null)[] = [...targetArr];
    guess.forEach((l, i) => { if (l === targetArr[i]) { result[i] = "correct"; remaining[i] = null; } });
    guess.forEach((l, i) => {
      if (result[i] === "correct") return;
      const ri = remaining.indexOf(l);
      if (ri !== -1) { result[i] = "present"; remaining[ri] = null; }
    });
    return result;
  };

  const submitGuess = useCallback(() => {
    if (currentGuess.length !== 5) { toast.error("Word must be 5 letters"); return; }
    const word = currentGuess.join("");
    if (!VALID_WORDS.has(word) && !WORD_LIST.includes(word)) {
      setShakeRow(guesses.length);
      setTimeout(() => setShakeRow(null), 600);
      toast.error("Not in word list");
      return;
    }
    const states = getTileStates(currentGuess);
    const newGuesses = [...guesses, currentGuess];
    const newKeys = { ...keyStates };
    currentGuess.forEach((l, i) => {
      const priority: Record<TileState, number> = { correct: 3, present: 2, absent: 1, tbd: 0, empty: -1 };
      if (!newKeys[l] || priority[states[i]] > priority[newKeys[l]]) newKeys[l] = states[i];
    });
    let newGameState: typeof gameState = "playing";
    if (word === TARGET) {
      newGameState = "won";
      const today = new Date().toISOString().split("T")[0];
      const lastWin = localStorage.getItem("wordPuzzleLastWin");
      const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
      const newStreak = lastWin === yesterday || lastWin === today ? streak + 1 : 1;
      setStreak(newStreak);
      localStorage.setItem("wordPuzzleStreak", String(newStreak));
      localStorage.setItem("wordPuzzleLastWin", today);
      toast.success(`🎉 Brilliant! You got it in ${newGuesses.length} ${newGuesses.length === 1 ? "guess" : "guesses"}!`);
    } else if (newGuesses.length >= 6) {
      newGameState = "lost";
      toast.error(`The word was ${TARGET}`);
    }
    setGuesses(newGuesses);
    setCurrentGuess([]);
    setGameState(newGameState);
    setKeyStates(newKeys);
    saveState(newGuesses, newGameState, newKeys);
  }, [currentGuess, guesses, keyStates, TARGET, streak, saveState]);

  const handleKey = useCallback((key: string) => {
    if (gameState !== "playing") return;
    if (key === "ENTER") { submitGuess(); return; }
    if (key === "⌫" || key === "BACKSPACE") { setCurrentGuess(prev => prev.slice(0, -1)); return; }
    if (/^[A-Z]$/.test(key) && currentGuess.length < 5) { setCurrentGuess(prev => [...prev, key]); }
  }, [gameState, currentGuess, submitGuess]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => handleKey(e.key.toUpperCase());
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleKey]);

  const shareResult = () => {
    const emojiMap: Record<TileState, string> = { correct: "🟩", present: "🟨", absent: "⬛", tbd: "⬜", empty: "⬜" };
    const lines = guesses.map(g => getTileStates(g).map(s => emojiMap[s]).join("")).join("\n");
    const today = new Date().toISOString().split("T")[0];
    const text = `Dev Jargon Puzzle ${today}\n${guesses.length}/6\n\n${lines}\n\nhttps://ichispace.tech/games/word-puzzle`;
    navigator.clipboard.writeText(text).then(() => toast.success("Result copied!"));
  };

  if (!isMounted) return null;

  const allRows = Array(6).fill(null).map((_, i) => {
    if (i < guesses.length) return { letters: guesses[i], states: getTileStates(guesses[i]), isSubmitted: true };
    if (i === guesses.length && gameState === "playing") return { letters: currentGuess, states: currentGuess.map(() => "tbd" as TileState), isSubmitted: false, isCurrent: true };
    return { letters: [], states: [], isSubmitted: false };
  });

  return (
    <ToolLayout
      title="Dev Jargon Word Puzzle"
      description="Guess the daily 5-letter tech or finance word in 6 attempts. A new challenge every day."
      categoryName="Games"
      categoryPath="/games"
      slug="word-puzzle"
      about={<div className="space-y-3"><p>A daily word puzzle where all words are tech and finance jargon. The game resets every midnight with a new word — same word for everyone.</p><ul className="list-disc pl-6 space-y-1"><li><span className="text-emerald-500 font-bold">Green</span> = correct letter, correct position</li><li><span className="text-amber-400 font-bold">Yellow</span> = correct letter, wrong position</li><li className="text-muted-foreground">Gray = letter not in the word</li></ul></div>}
      faq={[
        { question: "Is it the same word for everyone?", answer: "Yes! The word is seeded by date, so all players get the same word each day." },
        { question: "Does my streak save?", answer: "Yes, your streak is stored locally in your browser." },
      ]}
    >
      <div className="max-w-lg mx-auto space-y-6">
        {/* Streak */}
        <div className="flex items-center justify-center gap-3">
          <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-1.5">
            <Flame className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-bold text-amber-600 dark:text-amber-400">{streak} day streak</span>
          </div>
          {gameState !== "playing" && (
            <Button size="sm" variant="outline" onClick={shareResult} className="rounded-full gap-2">
              <Share2 className="w-4 h-4" /> Share
            </Button>
          )}
        </div>

        {/* Grid */}
        <div className="flex flex-col items-center gap-1.5">
          {allRows.map((row, ri) => (
            <motion.div
              key={ri}
              className="flex gap-1.5"
              animate={shakeRow === ri ? { x: [0, -8, 8, -8, 8, 0] } : {}}
              transition={{ duration: 0.5 }}
            >
              {Array(5).fill(null).map((_, ci) => {
                const letter = row.letters[ci] ?? "";
                const state: TileState = row.isSubmitted ? row.states[ci] : (letter ? "tbd" : "empty");
                return (
                  <motion.div
                    key={ci}
                    className={`w-14 h-14 border-2 rounded-lg flex items-center justify-center text-2xl font-extrabold uppercase select-none transition-colors duration-300 ${TILE_COLORS[state]}`}
                    animate={row.isSubmitted ? { rotateX: [0, 90, 0], scale: [1, 1.05, 1] } : letter && !row.isSubmitted ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.4, delay: row.isSubmitted ? ci * 0.1 : 0 }}
                  >
                    {letter}
                  </motion.div>
                );
              })}
            </motion.div>
          ))}
        </div>

        {/* Result banner */}
        <AnimatePresence>
          {gameState !== "playing" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-center p-4 rounded-2xl border ${gameState === "won" ? "bg-emerald-500/10 border-emerald-500/30" : "bg-destructive/10 border-destructive/30"}`}
            >
              <div className="flex items-center justify-center gap-2 mb-1">
                {gameState === "won" ? <Trophy className="w-5 h-5 text-emerald-500" /> : null}
                <span className="font-bold text-lg">{gameState === "won" ? "Excellent!" : `The answer was ${TARGET}`}</span>
              </div>
              <p className="text-sm text-muted-foreground">Come back tomorrow for a new word!</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Keyboard */}
        <div className="space-y-1.5">
          {KEYBOARD_ROWS.map((row, ri) => (
            <div key={ri} className="flex justify-center gap-1">
              {row.map(key => {
                const kState = keyStates[key];
                const isWide = key === "ENTER" || key === "⌫";
                return (
                  <button
                    key={key}
                    onClick={() => handleKey(key)}
                    className={`${isWide ? "px-3 text-xs" : "w-10"} h-14 rounded-lg font-bold text-sm border transition-all duration-200 active:scale-95 ${kState ? KEY_COLORS[kState] : "bg-muted/60 hover:bg-muted border-border text-foreground"}`}
                  >
                    {key}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
