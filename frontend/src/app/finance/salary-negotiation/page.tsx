"use client";
import { useState } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { Share2 } from "lucide-react";
import { toast } from "sonner";

const ROLES = ["Software Engineer","Senior Software Engineer","Product Manager","Data Scientist","Data Analyst","DevOps Engineer","QA Engineer","UI/UX Designer","Business Analyst","Marketing Manager","HR Manager","Finance Analyst","Sales Manager","Project Manager","Tech Lead","Engineering Manager"];
const CITIES: Record<string, number> = { "Bengaluru": 1.0, "Mumbai": 1.0, "Delhi/NCR": 0.97, "Hyderabad": 0.92, "Pune": 0.90, "Chennai": 0.88, "Kolkata": 0.78, "Ahmedabad": 0.75, "Tier-2 City": 0.68 };
const ROLE_BASE: Record<string, number> = {
  "Software Engineer": 8, "Senior Software Engineer": 16, "Tech Lead": 24, "Engineering Manager": 35,
  "Product Manager": 18, "Data Scientist": 14, "Data Analyst": 8, "DevOps Engineer": 12,
  "QA Engineer": 7, "UI/UX Designer": 9, "Business Analyst": 9, "Marketing Manager": 10,
  "HR Manager": 8, "Finance Analyst": 9, "Sales Manager": 11, "Project Manager": 12,
};

function calcRange(ctc: number, role: string, city: string, yoe: number) {
  const base = ROLE_BASE[role] ?? 10;
  const cityMul = CITIES[city] ?? 0.85;
  const yoeBonus = Math.min(yoe * 0.05, 0.4);
  const marketRate = base * cityMul * (1 + yoeBonus);
  const currentRatio = ctc / marketRate;
  let hikeMin: number, hikeMax: number;
  if (currentRatio < 0.7) { hikeMin = 40; hikeMax = 60; }
  else if (currentRatio < 0.85) { hikeMin = 25; hikeMax = 40; }
  else if (currentRatio < 1.0) { hikeMin = 15; hikeMax = 25; }
  else if (currentRatio < 1.15) { hikeMin = 10; hikeMax = 18; }
  else { hikeMin = 5; hikeMax = 12; }
  const askMin = Math.round((ctc * (1 + hikeMin / 100)) * 10) / 10;
  const askMax = Math.round((ctc * (1 + hikeMax / 100)) * 10) / 10;
  const percentile = Math.min(95, Math.max(10, Math.round(currentRatio * 70)));
  return { hikeMin, hikeMax, askMin, askMax, marketRate: Math.round(marketRate * 10) / 10, percentile };
}

const TIPS = [
  "Start with 20-30% above your minimum acceptable offer to leave room for negotiation.",
  "Never accept the first offer on the spot. Ask for 24-48 hours to consider.",
  "Research company Glassdoor reviews and LinkedIn salary insights before negotiating.",
  "Emphasize impact with data: 'I shipped X which saved the team Y hours per week'.",
  "If base salary is rigid, negotiate joining bonus, remote flexibility, or extra leaves.",
];

export default function SalaryNegotiationPage() {
  const [ctc, setCtc] = useState("");
  const [role, setRole] = useState(ROLES[0]);
  const [city, setCity] = useState("Bengaluru");
  const [yoe, setYoe] = useState("");
  const [result, setResult] = useState<ReturnType<typeof calcRange> | null>(null);

  const calculate = () => {
    const c = parseFloat(ctc); const y = parseInt(yoe);
    if (isNaN(c) || c <= 0 || isNaN(y) || y < 0) { toast.error("Please fill all fields correctly"); return; }
    setResult(calcRange(c, role, city, y));
  };

  const share = () => {
    if (!result) return;
    navigator.clipboard.writeText(`My salary negotiation range: ₹${result.askMin}L – ₹${result.askMax}L LPA\nCalculated on Ichi Space: https://ichispace.tech/finance/salary-negotiation`).then(() => toast.success("Copied!"));
  };

  return (
    <ToolLayout
      title="Salary Negotiation Calculator"
      description="Get a recommended CTC negotiation range based on your current CTC, role, city, and years of experience."
      categoryName="Finance" categoryPath="/finance" slug="salary-negotiation"
      about={<div className="space-y-2"><p>Uses heuristic market benchmarks for Indian tech and business roles. Enter your current CTC and get a suggested ask range, along with negotiation tips.</p><p className="text-muted-foreground text-sm">All calculations are estimates based on aggregated market data. Always verify with Glassdoor, LinkedIn Salary, and AmbitionBox.</p></div>}
      faq={[
        { question: "How accurate is this?", answer: "It's a directional estimate using hardcoded benchmarks. Use it alongside Glassdoor, AmbitionBox, and LinkedIn Salary for best results." },
        { question: "What is CTC?", answer: "Cost to Company — the total annual compensation including base salary, bonuses, ESOP value, and other benefits." },
      ]}
    >
      <div className="max-w-xl mx-auto space-y-6">
        <div className="bg-card border rounded-2xl p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ctc">Current CTC (LPA)</Label>
              <Input id="ctc" type="number" min="1" max="500" value={ctc} onChange={e => setCtc(e.target.value)} placeholder="e.g. 12" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="yoe">Years of Experience</Label>
              <Input id="yoe" type="number" min="0" max="40" value={yoe} onChange={e => setYoe(e.target.value)} placeholder="e.g. 4" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <select id="role" value={role} onChange={e => setRole(e.target.value)} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
              {ROLES.map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <select id="city" value={city} onChange={e => setCity(e.target.value)} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
              {Object.keys(CITIES).map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <Button onClick={calculate} size="lg" className="w-full rounded-xl" disabled={!ctc || !yoe}>Calculate Range</Button>
        </div>

        <AnimatePresence>
          {result && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
              <div className="bg-gradient-to-br from-emerald-500/10 to-primary/10 border border-emerald-500/20 rounded-3xl p-8 text-center space-y-3">
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Suggested Ask Range</p>
                <p className="text-5xl font-black text-emerald-600 dark:text-emerald-400">₹{result.askMin}L – ₹{result.askMax}L</p>
                <p className="text-muted-foreground text-sm">LPA ({result.hikeMin}% – {result.hikeMax}% hike)</p>
                <Button variant="outline" onClick={share} className="gap-2 rounded-full mt-2"><Share2 className="w-4 h-4" /> Share Range</Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card border rounded-2xl p-4 text-center">
                  <p className="text-3xl font-black text-primary">₹{result.marketRate}L</p>
                  <p className="text-xs text-muted-foreground font-semibold mt-1">Market Rate</p>
                </div>
                <div className="bg-card border rounded-2xl p-4 text-center">
                  <p className="text-3xl font-black text-amber-500">{result.percentile}th</p>
                  <p className="text-xs text-muted-foreground font-semibold mt-1">Percentile Est.</p>
                </div>
              </div>
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5">
                <h3 className="font-bold text-amber-600 dark:text-amber-400 mb-3">💡 Negotiation Tips</h3>
                <ul className="space-y-2">{TIPS.map((t, i) => <li key={i} className="text-sm text-muted-foreground flex gap-2"><span className="text-amber-500 font-bold shrink-0">{i+1}.</span>{t}</li>)}</ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToolLayout>
  );
}
