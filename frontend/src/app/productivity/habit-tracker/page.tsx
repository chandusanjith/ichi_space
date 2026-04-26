"use client";
import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Flame, CalendarCheck } from "lucide-react";
import { toast } from "sonner";

type Habit = { id: string; name: string; color: string; completions: Record<string, boolean> };
const COLORS = ["bg-violet-500","bg-pink-500","bg-amber-500","bg-emerald-500","bg-sky-500","bg-orange-500","bg-teal-500","bg-rose-500"];

function getDayKey(d: Date) { return d.toISOString().split("T")[0]; }
function getLast28Days(): string[] {
  return Array.from({ length: 28 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (27 - i)); return getDayKey(d);
  });
}
function getStreak(completions: Record<string, boolean>): number {
  let streak = 0; const today = new Date();
  for (let i = 0; ; i++) {
    const d = new Date(today); d.setDate(today.getDate() - i);
    if (completions[getDayKey(d)]) streak++; else break;
  }
  return streak;
}

export default function HabitTrackerPage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newName, setNewName] = useState("");
  const [colorIdx, setColorIdx] = useState(0);
  const [mounted, setMounted] = useState(false);
  const today = getDayKey(new Date());
  const days28 = getLast28Days();

  useEffect(() => {
    setMounted(true);
    try { const s = localStorage.getItem("habitTracker"); if (s) setHabits(JSON.parse(s)); } catch {}
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem("habitTracker", JSON.stringify(habits));
  }, [habits, mounted]);

  const addHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    if (habits.length >= 10) { toast.error("Maximum 10 habits"); return; }
    setHabits(h => [...h, { id: Date.now().toString(), name: newName.trim(), color: COLORS[colorIdx % COLORS.length], completions: {} }]);
    setNewName(""); setColorIdx(i => i + 1);
  };

  const toggle = (habitId: string, day: string) => {
    setHabits(h => h.map(habit => habit.id === habitId
      ? { ...habit, completions: { ...habit.completions, [day]: !habit.completions[day] } }
      : habit
    ));
  };

  const deleteHabit = (id: string) => setHabits(h => h.filter(x => x.id !== id));

  if (!mounted) return null;

  return (
    <ToolLayout
      title="Habit Streak Tracker"
      description="Track your daily habits with streaks and a 28-day heatmap. No login — everything stored in your browser."
      categoryName="Productivity" categoryPath="/productivity" slug="habit-tracker"
      about={<div className="space-y-2"><p>Add up to 10 habits and check them off each day. See your streaks and 28-day completion heatmap at a glance. All data is stored locally in your browser — no account needed.</p></div>}
      faq={[
        { question: "Is my data saved?", answer: "Yes, everything is stored in your browser's localStorage. It persists between visits but clearing browser data will reset it." },
        { question: "Can I track more than 10 habits?", answer: "The limit is 10 to keep the interface clean and effective. Focus on your core habits!" },
      ]}
    >
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Add habit */}
        <form onSubmit={addHabit} className="flex gap-3">
          <Input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Add a new habit... (e.g. Read 30 min, Exercise, Meditate)" className="flex-1 h-12" />
          <Button type="submit" size="icon" className="h-12 w-12 shrink-0"><Plus className="w-5 h-5" /></Button>
        </form>

        {habits.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <CalendarCheck className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="font-semibold">No habits yet. Add your first habit above!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Today's check-off */}
            <div>
              <h3 className="font-bold text-sm uppercase tracking-widest text-muted-foreground mb-3">Today</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {habits.map(h => (
                  <motion.button
                    key={h.id} whileTap={{ scale: 0.97 }}
                    onClick={() => toggle(h.id, today)}
                    className={`flex items-center gap-3 p-4 rounded-2xl border transition-all text-left ${h.completions[today] ? "bg-primary/10 border-primary/30" : "bg-card border-border hover:border-primary/30"}`}
                  >
                    <div className={`w-4 h-4 rounded-full shrink-0 ${h.color}`} />
                    <span className={`flex-1 font-semibold text-sm ${h.completions[today] ? "line-through text-muted-foreground" : ""}`}>{h.name}</span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <Flame className={`w-4 h-4 ${getStreak(h.completions) > 0 ? "text-amber-500" : "text-muted-foreground/30"}`} />
                      <span className="text-xs font-bold text-amber-500">{getStreak(h.completions)}</span>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${h.completions[today] ? "bg-primary border-primary" : "border-muted-foreground/30"}`}>
                      {h.completions[today] && <span className="text-white text-xs font-black">✓</span>}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* 28-day heatmap */}
            <div>
              <h3 className="font-bold text-sm uppercase tracking-widest text-muted-foreground mb-3">28-Day History</h3>
              <div className="bg-card border rounded-2xl p-4 overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr>
                      <th className="text-left pr-3 text-muted-foreground font-semibold w-32">Habit</th>
                      {days28.slice(-14).map(d => (
                        <th key={d} className="text-center text-muted-foreground/60 font-normal pb-2" style={{ minWidth: 24 }}>
                          {new Date(d).getDate()}
                        </th>
                      ))}
                      <th className="pl-2 text-muted-foreground font-semibold">Streak</th>
                    </tr>
                  </thead>
                  <tbody>
                    {habits.map(h => (
                      <tr key={h.id} className="group">
                        <td className="pr-3 py-1">
                          <div className="flex items-center gap-2">
                            <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${h.color}`} />
                            <span className="truncate font-medium max-w-24">{h.name}</span>
                          </div>
                        </td>
                        {days28.slice(-14).map(d => (
                          <td key={d} className="text-center py-1">
                            <button onClick={() => toggle(h.id, d)} title={d}
                              className={`w-5 h-5 rounded transition-all mx-auto block ${h.completions[d] ? h.color + " opacity-90" : "bg-muted/50 hover:bg-muted"}`} />
                          </td>
                        ))}
                        <td className="pl-2">
                          <div className="flex items-center gap-1">
                            <Flame className={`w-3.5 h-3.5 ${getStreak(h.completions) > 0 ? "text-amber-500" : "text-muted-foreground/20"}`} />
                            <span className="font-bold text-amber-500">{getStreak(h.completions)}d</span>
                          </div>
                        </td>
                        <td>
                          <button onClick={() => deleteHabit(h.id)} className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive p-1 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
