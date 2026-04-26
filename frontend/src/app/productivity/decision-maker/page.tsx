"use client";
import { useState, useRef, useEffect } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, RotateCcw, Minus } from "lucide-react";

type Option = { id: string; label: string; weight: number; pros: string[]; cons: string[] };

function weightedRandom(options: Option[]): Option {
  const total = options.reduce((s, o) => s + o.weight, 0);
  let r = Math.random() * total;
  for (const o of options) { r -= o.weight; if (r <= 0) return o; }
  return options[options.length - 1];
}

export default function DecisionMakerPage() {
  const [options, setOptions] = useState<Option[]>([
    { id: "1", label: "Option A", weight: 50, pros: [], cons: [] },
    { id: "2", label: "Option B", weight: 50, pros: [], cons: [] },
  ]);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<Option | null>(null);
  const [rotation, setRotation] = useState(0);
  const [newPro, setNewPro] = useState<Record<string, string>>({});
  const [newCon, setNewCon] = useState<Record<string, string>>({});
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const COLORS = ["#8b5cf6","#ec4899","#f59e0b","#10b981","#3b82f6","#ef4444","#06b6d4","#f97316"];

  useEffect(() => { drawWheel(); }, [options, rotation]);

  const drawWheel = () => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const cx = 140, cy = 140, r = 130;
    ctx.clearRect(0, 0, 280, 280);
    const total = options.reduce((s, o) => s + o.weight, 0);
    let start = -Math.PI / 2 + (rotation * Math.PI) / 180;
    options.forEach((opt, i) => {
      const slice = (opt.weight / total) * 2 * Math.PI;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r, start, start + slice);
      ctx.fillStyle = COLORS[i % COLORS.length]; ctx.fill();
      ctx.strokeStyle = "#1a1a2e"; ctx.lineWidth = 2; ctx.stroke();
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(start + slice / 2);
      ctx.fillStyle = "#fff"; ctx.font = "bold 13px Inter, sans-serif"; ctx.textAlign = "right";
      const label = opt.label.length > 10 ? opt.label.slice(0, 10) + "…" : opt.label;
      ctx.fillText(label, r - 10, 5); ctx.restore();
      start += slice;
    });
    // Center circle
    ctx.beginPath(); ctx.arc(cx, cy, 18, 0, 2 * Math.PI);
    ctx.fillStyle = "#1f2937"; ctx.fill(); ctx.strokeStyle = "#fff"; ctx.lineWidth = 2; ctx.stroke();
    // Pointer
    ctx.beginPath(); ctx.moveTo(cx + r + 10, cy); ctx.lineTo(cx + r - 10, cy - 10); ctx.lineTo(cx + r - 10, cy + 10);
    ctx.fillStyle = "#fff"; ctx.fill();
  };

  const spin = () => {
    if (spinning || options.length < 2) return;
    setSpinning(true); setResult(null);
    const winner = weightedRandom(options);
    const total = options.reduce((s, o) => s + o.weight, 0);
    const winnerIdx = options.indexOf(winner);
    const winnerMidAngle = options.slice(0, winnerIdx).reduce((s, o) => s + (o.weight / total) * 360, 0) + (winner.weight / total) * 180;
    const targetAngle = 360 * 8 + (360 - winnerMidAngle);
    let current = 0;
    const duration = 4000; const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start; const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      current = targetAngle * ease;
      setRotation(current);
      if (progress < 1) requestAnimationFrame(animate);
      else { setSpinning(false); setResult(winner); }
    };
    requestAnimationFrame(animate);
  };

  const addOption = () => {
    if (options.length >= 8) return;
    const id = Date.now().toString();
    setOptions(o => [...o, { id, label: `Option ${String.fromCharCode(65 + o.length)}`, weight: 50, pros: [], cons: [] }]);
  };

  const updateOption = (id: string, field: keyof Option, val: string | number) =>
    setOptions(o => o.map(x => x.id === id ? { ...x, [field]: val } : x));

  const addPro = (id: string) => {
    const val = newPro[id]?.trim(); if (!val) return;
    setOptions(o => o.map(x => x.id === id ? { ...x, pros: [...x.pros, val] } : x));
    setNewPro(p => ({ ...p, [id]: "" }));
  };
  const addCon = (id: string) => {
    const val = newCon[id]?.trim(); if (!val) return;
    setOptions(o => o.map(x => x.id === id ? { ...x, cons: [...x.cons, val] } : x));
    setNewCon(p => ({ ...p, [id]: "" }));
  };

  return (
    <ToolLayout
      title="Decision Maker Pro"
      description="Add your options with weights, spin the wheel, and build a pros/cons matrix to make better decisions."
      categoryName="Productivity" categoryPath="/productivity" slug="decision-maker"
      about={<p>Add up to 8 options with custom weights, spin the wheel for a random decision weighted by your preferences, and use the pros/cons matrix to think through each choice.</p>}
      faq={[{ question: "What does weight mean?", answer: "Higher weight = higher probability of being chosen. E.g. Option A at 70 and Option B at 30 means A is 70% likely." }]}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Wheel */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <canvas ref={canvasRef} width={280} height={280} className="rounded-full shadow-2xl" />
            </div>
            <div className="flex gap-3">
              <Button onClick={spin} disabled={spinning || options.length < 2} size="lg" className="rounded-full px-8 font-bold">
                {spinning ? "Spinning…" : "🎲 Spin!"}
              </Button>
              <Button onClick={() => setResult(null)} variant="outline" size="icon" className="rounded-full"><RotateCcw className="w-4 h-4" /></Button>
            </div>
            <AnimatePresence>
              {result && (
                <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  className="bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20 rounded-2xl p-5 text-center w-full">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">The Universe Says…</p>
                  <p className="text-2xl font-black text-primary">{result.label}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Options */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold">Options ({options.length}/8)</h3>
              <Button onClick={addOption} disabled={options.length >= 8} variant="outline" size="sm" className="gap-1 rounded-full"><Plus className="w-3.5 h-3.5" /> Add</Button>
            </div>
            {options.map((opt, i) => (
              <div key={opt.id} className="bg-card border rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                  <Input value={opt.label} onChange={e => updateOption(opt.id, "label", e.target.value)} className="h-8 text-sm font-semibold flex-1" />
                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive" onClick={() => setOptions(o => o.filter(x => x.id !== opt.id))} disabled={options.length <= 2}><Trash2 className="w-3.5 h-3.5" /></Button>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground font-semibold w-16">Weight: {opt.weight}</span>
                  <input type="range" min={1} max={100} value={opt.weight}
                    onChange={e => updateOption(opt.id, "weight", parseInt(e.target.value))}
                    className="flex-1 h-2 accent-primary" />
                </div>
                {/* Pros/Cons */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-emerald-600 dark:text-emerald-400 font-bold mb-1">Pros</p>
                    {opt.pros.map((p, pi) => <p key={pi} className="text-muted-foreground">+ {p}</p>)}
                    <div className="flex gap-1 mt-1">
                      <input value={newPro[opt.id] || ""} onChange={e => setNewPro(p => ({ ...p, [opt.id]: e.target.value }))} onKeyDown={e => e.key === "Enter" && addPro(opt.id)} placeholder="Add pro…" className="flex-1 h-6 text-xs bg-muted/30 border rounded px-2 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
                      <button onClick={() => addPro(opt.id)} className="text-emerald-500 hover:text-emerald-600 font-bold px-1"><Plus className="w-3 h-3" /></button>
                    </div>
                  </div>
                  <div>
                    <p className="text-red-500 font-bold mb-1">Cons</p>
                    {opt.cons.map((c, ci) => <p key={ci} className="text-muted-foreground">- {c}</p>)}
                    <div className="flex gap-1 mt-1">
                      <input value={newCon[opt.id] || ""} onChange={e => setNewCon(p => ({ ...p, [opt.id]: e.target.value }))} onKeyDown={e => e.key === "Enter" && addCon(opt.id)} placeholder="Add con…" className="flex-1 h-6 text-xs bg-muted/30 border rounded px-2 focus:outline-none focus:ring-1 focus:ring-red-400" />
                      <button onClick={() => addCon(opt.id)} className="text-red-400 hover:text-red-500 font-bold px-1"><Plus className="w-3 h-3" /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
