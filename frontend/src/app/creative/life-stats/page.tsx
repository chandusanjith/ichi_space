"use client";
import { useState } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, HeartPulse } from "lucide-react";
import { toast } from "sonner";

type Stat = { label: string; value: string; emoji: string; color: string; desc: string };

function calcStats(dob: string): Stat[] {
  const birth = new Date(dob);
  const now = new Date();
  const diffMs = now.getTime() - birth.getTime();
  const diffSec = diffMs / 1000;
  const diffMin = diffSec / 60;
  const diffHours = diffMin / 60;
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30.44);
  const diffYears = now.getFullYear() - birth.getFullYear() - (now < new Date(now.getFullYear(), birth.getMonth(), birth.getDate()) ? 1 : 0);

  const fmt = (n: number) => Math.round(n).toLocaleString("en-IN");

  return [
    { label: "Days Lived", value: fmt(diffDays), emoji: "📅", color: "from-violet-500/10 to-purple-500/10 border-violet-500/20 text-violet-600 dark:text-violet-400", desc: `${fmt(diffWeeks)} weeks · ${diffMonths} months · ${diffYears} years` },
    { label: "Heartbeats", value: fmt(diffMin * 72), emoji: "❤️", color: "from-red-500/10 to-rose-500/10 border-red-500/20 text-red-500", desc: "at avg 72 BPM" },
    { label: "Breaths Taken", value: fmt(diffMin * 16), emoji: "🌬️", color: "from-sky-500/10 to-blue-500/10 border-sky-500/20 text-sky-500", desc: "at avg 16 breaths/min" },
    { label: "Times You Blinked", value: fmt(diffHours * 60 * 17), emoji: "👁️", color: "from-amber-500/10 to-orange-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400", desc: "at avg 17 blinks/min" },
    { label: "Steps Walked", value: fmt(diffDays * 8000), emoji: "👟", color: "from-emerald-500/10 to-teal-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400", desc: "at avg 8,000 steps/day" },
    { label: "Hours Slept", value: fmt(diffDays * 7), emoji: "😴", color: "from-indigo-500/10 to-violet-500/10 border-indigo-500/20 text-indigo-600 dark:text-indigo-400", desc: "at avg 7 hours/day" },
    { label: "Meals Eaten", value: fmt(diffDays * 3), emoji: "🍽️", color: "from-orange-500/10 to-amber-500/10 border-orange-500/20 text-orange-500", desc: "at avg 3 meals/day" },
    { label: "Laughs", value: fmt(diffDays * 17), emoji: "😂", color: "from-yellow-500/10 to-amber-500/10 border-yellow-500/20 text-yellow-600 dark:text-yellow-400", desc: "avg 17 laughs/day" },
    { label: "Words Spoken", value: fmt(diffDays * 16000), emoji: "🗣️", color: "from-pink-500/10 to-rose-500/10 border-pink-500/20 text-pink-500", desc: "avg 16,000 words/day" },
    { label: "Cups of Water", value: fmt(diffDays * 8), emoji: "💧", color: "from-cyan-500/10 to-sky-500/10 border-cyan-500/20 text-cyan-500", desc: "at recommended 8 glasses/day" },
    { label: "Hours Online", value: fmt(diffDays * 6.5), emoji: "📱", color: "from-fuchsia-500/10 to-purple-500/10 border-fuchsia-500/20 text-fuchsia-500", desc: "avg 6.5 hrs/day (India avg)" },
    { label: "Dreams Dreamed", value: fmt(diffDays * 5), emoji: "🌙", color: "from-slate-500/10 to-gray-500/10 border-slate-500/20 text-slate-500", desc: "avg 5 dreams per night" },
  ];
}

export default function LifeStatsPage() {
  const [dob, setDob] = useState("");
  const [stats, setStats] = useState<Stat[] | null>(null);

  const calculate = () => {
    if (!dob) return;
    const birth = new Date(dob);
    if (isNaN(birth.getTime()) || birth > new Date()) { toast.error("Please enter a valid past date"); return; }
    setStats(calcStats(dob));
  };

  const share = () => {
    if (!stats) return;
    const text = `🌍 My Life Stats:\n❤️ Heartbeats: ${stats[1].value}\n📅 Days lived: ${stats[0].value}\n😴 Hours slept: ${stats[5].value}\n\nDiscover yours: https://ichispace.tech/creative/life-stats`;
    navigator.clipboard.writeText(text).then(() => toast.success("Stats copied!"));
  };

  const maxAge = new Date().toISOString().split("T")[0];

  return (
    <ToolLayout
      title="Life Stats Calculator"
      description="Enter your birthdate and discover mind-blowing stats about your life — heartbeats, blinks, steps, and more."
      categoryName="Creative" categoryPath="/creative" slug="life-stats"
      about={<div className="space-y-2"><p>A fun, viral-worthy calculator that estimates how much of everything you've done since birth. All stats use well-researched average rates for a human life.</p><p className="text-muted-foreground text-sm">Your birthdate is never sent to any server — all calculations happen in your browser.</p></div>}
      faq={[
        { question: "How accurate are the stats?", answer: "These are estimates based on average human physiological rates (heartbeats, breaths, blinks). They're scientifically grounded but vary by individual." },
        { question: "Is my birthdate stored?", answer: "No. Your date of birth is only used for the calculation and never leaves your browser." },
      ]}
    >
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Input */}
        <div className="bg-card border rounded-2xl p-6 flex flex-col items-center gap-4 text-center">
          <HeartPulse className="w-12 h-12 text-red-500 opacity-80" />
          <div>
            <h3 className="text-xl font-bold mb-1">When were you born?</h3>
            <p className="text-sm text-muted-foreground">Enter your birthdate to discover your life stats</p>
          </div>
          <div className="flex gap-3 w-full max-w-sm">
            <Input type="date" value={dob} onChange={e => setDob(e.target.value)} max={maxAge} className="flex-1 h-12 text-base" />
            <Button onClick={calculate} size="lg" className="rounded-xl h-12" disabled={!dob}>Calculate</Button>
          </div>
        </div>

        <AnimatePresence>
          {stats && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-2xl">Your Life in Numbers</h3>
                <Button onClick={share} variant="outline" className="gap-2 rounded-full"><Share2 className="w-4 h-4" /> Share</Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`bg-gradient-to-br ${stat.color} border rounded-2xl p-5 space-y-1`}
                  >
                    <p className="text-2xl">{stat.emoji}</p>
                    <p className="text-2xl font-black">{stat.value}</p>
                    <p className="text-sm font-bold">{stat.label}</p>
                    <p className="text-xs text-muted-foreground">{stat.desc}</p>
                  </motion.div>
                ))}
              </div>
              <p className="text-xs text-center text-muted-foreground">Stats are estimates based on average human physiological rates. Individual values vary.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToolLayout>
  );
}
