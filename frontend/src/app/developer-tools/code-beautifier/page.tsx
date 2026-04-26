"use client";
import { useState, useRef } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Download, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { toPng } from "html-to-image";
import hljs from "highlight.js";

const THEMES: Record<string, { bg: string; header: string; name: string }> = {
  "monokai": { bg: "bg-[#272822]", header: "bg-[#1e1f1c]", name: "Monokai" },
  "dracula": { bg: "bg-[#282a36]", header: "bg-[#21222c]", name: "Dracula" },
  "github-dark": { bg: "bg-[#0d1117]", header: "bg-[#161b22]", name: "GitHub Dark" },
  "nord": { bg: "bg-[#2e3440]", header: "bg-[#242933]", name: "Nord" },
  "solarized": { bg: "bg-[#002b36]", header: "bg-[#001f27]", name: "Solarized" },
  "one-dark": { bg: "bg-[#282c34]", header: "bg-[#21252b]", name: "One Dark" },
  "tokyo-night": { bg: "bg-[#1a1b26]", header: "bg-[#13131f]", name: "Tokyo Night" },
  "poimandres": { bg: "bg-[#1b1e28]", header: "bg-[#141720]", name: "Poimandres" },
};

const LANGUAGES = ["javascript","typescript","python","java","css","html","json","bash","sql","go","rust","cpp","csharp","php","ruby","swift","kotlin","yaml","dockerfile","plaintext"];
const FONTS = ["JetBrains Mono","Fira Code","Source Code Pro","Courier New","monospace"];
const BG_GRADIENTS = [
  "from-violet-500 via-purple-600 to-indigo-700",
  "from-pink-500 via-rose-500 to-red-600",
  "from-sky-500 via-blue-600 to-indigo-700",
  "from-emerald-500 via-teal-500 to-cyan-600",
  "from-amber-400 via-orange-500 to-red-500",
  "from-slate-700 via-slate-800 to-slate-900",
];

export default function CodeBeautifierPage() {
  const [code, setCode] = useState(`// Paste your code here\nconst greet = (name: string) => {\n  return \`Hello, \${name}!\`;\n};\n\nconsole.log(greet("World"));`);
  const [lang, setLang] = useState("typescript");
  const [theme, setTheme] = useState("dracula");
  const [font, setFont] = useState("JetBrains Mono");
  const [bgIdx, setBgIdx] = useState(0);
  const [fontSize, setFontSize] = useState(14);
  const cardRef = useRef<HTMLDivElement>(null);

  const highlighted = (() => {
    try {
      if (lang === "plaintext") return code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      return hljs.highlight(code, { language: lang }).value;
    } catch { return code; }
  })();

  const download = async () => {
    if (!cardRef.current) return;
    try {
      const png = await toPng(cardRef.current, { pixelRatio: 2 });
      const a = document.createElement("a"); a.href = png; a.download = "code-snippet.png"; a.click();
      toast.success("Image downloaded!");
    } catch { toast.error("Failed to capture image"); }
  };

  const copyImage = async () => {
    if (!cardRef.current) return;
    try {
      const png = await toPng(cardRef.current, { pixelRatio: 2 });
      const res = await fetch(png); const blob = await res.blob();
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      toast.success("Image copied to clipboard!");
    } catch { toast.error("Copy failed — try downloading instead"); }
  };

  const copyCode = () => { navigator.clipboard.writeText(code).then(() => toast.success("Code copied!")); };

  const t = THEMES[theme];

  return (
    <ToolLayout
      title="Code Snippet Beautifier"
      description="Paste code, choose a theme and language, then download a beautiful syntax-highlighted image to share anywhere."
      categoryName="Developer Tools" categoryPath="/developer-tools" slug="code-beautifier"
      about={<div className="space-y-2"><p>Like Carbon.now.sh but lighter and faster. Paste your code, pick a theme, language and background — then export as a PNG. No login, no ads.</p></div>}
      faq={[{ question: "Can I share the image directly?", answer: "Yes, download as PNG and share anywhere, or use Copy Image to paste directly into Slack, Twitter, etc." }]}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Controls */}
        <div className="bg-card border rounded-2xl p-4 space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Language</label>
              <select value={lang} onChange={e => setLang(e.target.value)} className="w-full h-9 rounded-lg border border-input bg-background px-2 text-sm capitalize">
                {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Theme</label>
              <select value={theme} onChange={e => setTheme(e.target.value)} className="w-full h-9 rounded-lg border border-input bg-background px-2 text-sm">
                {Object.entries(THEMES).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Font</label>
              <select value={font} onChange={e => setFont(e.target.value)} className="w-full h-9 rounded-lg border border-input bg-background px-2 text-sm">
                {FONTS.map(f => <option key={f}>{f}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Font Size</label>
              <input type="range" min={11} max={20} value={fontSize} onChange={e => setFontSize(parseInt(e.target.value))} className="w-full h-9 accent-primary" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Background</label>
            <div className="flex gap-2">
              {BG_GRADIENTS.map((g, i) => (
                <button key={i} onClick={() => setBgIdx(i)} className={`w-8 h-8 rounded-full bg-gradient-to-br ${g} transition-all ${bgIdx === i ? "ring-2 ring-offset-2 ring-primary scale-110" : "opacity-70 hover:opacity-100"}`} />
              ))}
            </div>
          </div>
          <Textarea value={code} onChange={e => setCode(e.target.value)} placeholder="Paste your code here..." className="min-h-28 resize-none font-mono text-sm" spellCheck={false} />
        </div>

        {/* Preview */}
        <div ref={cardRef} className={`p-8 bg-gradient-to-br ${BG_GRADIENTS[bgIdx]} rounded-2xl`}>
          <div className={`${t.bg} rounded-xl shadow-2xl overflow-hidden`}>
            <div className={`${t.header} px-4 py-3 flex items-center gap-2`}>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <span className="text-xs text-white/40 ml-2 font-mono">{lang}</span>
            </div>
            <pre className="p-5 overflow-x-auto">
              <code
                style={{ fontFamily: `'${font}', monospace`, fontSize: `${fontSize}px`, lineHeight: 1.7 }}
                className="hljs"
                dangerouslySetInnerHTML={{ __html: highlighted }}
              />
            </pre>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-center flex-wrap">
          <Button onClick={download} size="lg" className="gap-2 rounded-full"><Download className="w-4 h-4" /> Download PNG</Button>
          <Button onClick={copyImage} variant="outline" size="lg" className="gap-2 rounded-full"><ImageIcon className="w-4 h-4" /> Copy Image</Button>
          <Button onClick={copyCode} variant="outline" size="lg" className="gap-2 rounded-full"><Copy className="w-4 h-4" /> Copy Code</Button>
        </div>
      </div>
    </ToolLayout>
  );
}
