"use client";
import { useState } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

// Embedded minimal ASCII font tables (Big style)
const BIG: Record<string, string[]> = {
  "A":["  /\\  "," /  \\ ","/ -- \\","      "], "B":["|\\ \\ ","| -< ","| _/ ","     "],
  "C":[" /-\\","|   ","\\.-","    "], "D":["|\\ ","| \\","| /","|\/ "],
  "E":["|===","|== ","|===","    "], "F":["|===","|== ","|   ","    "],
  "G":[" /-\\"," |  "," \\-|","     "], "H":["|  |","|-< ","| \\|","     "],
  "I":["=|=","  |  ","=|=","    "], "J":["  |","  |","\\-/","   "],
  "K":["|/ ","|-\\ ","|  \\","    "], "L":["|   ","|   ","|___","    "],
  "M":["|\\  /|","| \\/ |","|    |","      "], "N":["|\\  |","| \\ |","| \\|","     "],
  "O":[" /-\\ ","|   |"," \\-/ ","     "], "P":["|\\ ","| < ","| ","   "],
  "Q":[" /-\\ ","|   |"," \\-/\\","     "], "R":["|\\ ","| < ","| \\","   "],
  "S":[" /==","|   "," \\==","    "], "T":["=|=","  |  ","  |  ","    "],
  "U":["|   |","|   |"," \\-/ ","     "], "V":["\\ /","\\/ ","   ","   "],
  "W":["\\    /","\\/  \\/","       ","      "], "X":["\\ /","  X","/ \\","   "],
  "Y":["\\ /","  Y","  |","   "], "Z":["====","  /","====","    "],
  "0":[" 0 ","| |"," 0 ","   "], "1":["  1"," /1","===","   "],
  "2":["=2 ","  /","=/ ","   "], "3":["=3","-3","=3","  "],
  "4":["| |","=4 ","  |","   "], "5":["5=","\\ ","=5","  "],
  "6":[" 6","|= ","\\ /","   "], "7":["==7","  |","  |","   "],
  "8":[" 8 ","|X|"," 8 ","   "], "9":[" 9 ","\\=|","  9","   "],
  " ":["    ","    ","    ","    "], "!":["!","!",". ","  "],
  ".":["  ","  ",". ","  "], "?":["?","  ","? ","  "],
};

const FONTS: Record<string, (text: string) => string> = {
  "Big Banner": (text) => {
    const chars = text.toUpperCase().split("").slice(0, 15);
    const rows = 4;
    const lines = Array(rows).fill("");
    chars.forEach(c => {
      const glyph = BIG[c] || BIG[" "];
      glyph.forEach((row, i) => { lines[i] += (row || "   ") + "  "; });
    });
    return lines.join("\n");
  },
  "Block": (text) => {
    return text.toUpperCase().split("").map(c => {
      const map: Record<string,string> = { A:"█▀█",B:"█▀▄",C:"█▀",D:"█▀▄",E:"█▀▀",F:"█▀",G:"█▀▀",H:"█ █",I:"█",J:" █",K:"█▀▄",L:"█  ",M:"█▀▄▀█",N:"█▄ █",O:"█▀█",P:"█▀▄",Q:"█▀█",R:"█▀▄",S:"█▀",T:"▀█▀",U:"█ █",V:"▀▄▀",W:"█ █ █",X:"▀▄▀",Y:"▀▄▀",Z:"▀▀▄"," ":"  " };
      const map2: Record<string,string> = { A:"█▀█",B:"█▄▀",C:"█▄",D:"█▄▀",E:"█▄▄",F:"█ ",G:"█▄█",H:"█▀█",I:"█",J:"▄█",K:"█▀▄",L:"█▄▄",M:"█ ▀ █",N:"█ ▀█",O:"▀▄▀",P:"█ ",Q:"▀▄█",R:"█ █",S:"▄█",T:" █ ",U:"▀▄▀",V:"▄▀▄",W:"▀ ▀ ▀",X:"▄▀▄",Y:" █ ",Z:"▀▀▀"," ":"  " };
      return (map[c]||c) + "\n" + (map2[c]||c);
    }).join("  ");
  },
  "Dots": (text) => text.split("").map(c => {
    const m: Record<string,string> = {a:"·:·",b:"l:>",c:"(·",d:"l>",e:"[=",f:"[·",g:"(·]",h:"l:l",i:"|",j:".|",k:"l<",l:"l_",m:"lVl",n:"lV",o:"(·)",p:"[>",q:"(?)",r:"l>",s:"S",t:"T",u:"U",v:"V",w:"W",x:"X",y:"Y",z:"Z"," ":"  "};
    return m[c.toLowerCase()] || c;
  }).join(" "),
  "Stars": (text) => "✦ " + text.split("").join(" ★ ") + " ✦",
  "Arrows": (text) => "» " + text.toUpperCase().split("").join(" » ") + " «",
  "Emoji Box": (text) => {
    const top = "╔" + "═".repeat(text.length + 2) + "╗";
    const mid = "║ " + text.toUpperCase() + " ║";
    const bot = "╚" + "═".repeat(text.length + 2) + "╝";
    return [top, mid, bot].join("\n");
  },
  "Wave": (text) => {
    return "~·~·~·~\n  " + text.toUpperCase().split("").join("~") + "\n~·~·~·~";
  },
  "Double": (text) => {
    const t = text.toUpperCase();
    return t + "\n" + t.split("").map(() => "═").join("") + "\n" + t;
  },
};

const FONT_NAMES = Object.keys(FONTS);

export default function AsciiArtPage() {
  const [text, setText] = useState("Hello");
  const [font, setFont] = useState("Big Banner");
  const [output, setOutput] = useState("");

  const generate = () => {
    if (!text.trim()) return;
    setOutput(FONTS[font](text.slice(0, 20)));
  };

  const copy = () => { navigator.clipboard.writeText(output).then(() => toast.success("Copied!")); };

  return (
    <ToolLayout
      title="ASCII Art Generator"
      description="Convert any text into ASCII art with multiple font styles. Perfect for terminal banners, social media, and nostalgia."
      categoryName="Creative" categoryPath="/creative" slug="ascii-art"
      about={<p>Type any text and choose from 8 ASCII art styles — from classic big banners to block letters and creative patterns. Copy the result to use anywhere.</p>}
      faq={[
        { question: "How long can the text be?", answer: "Up to 20 characters for best results with banner styles." },
        { question: "Can I use this in my terminal?", answer: "Yes! ASCII art works perfectly in terminal welcome messages, READMEs, and code comments." },
      ]}
    >
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-card border rounded-2xl p-5 space-y-4">
          <div className="flex gap-3">
            <Input value={text} onChange={e => setText(e.target.value)} placeholder="Type your text..." maxLength={20} className="flex-1 h-12 text-lg font-bold" />
            <Button onClick={generate} size="lg" className="gap-2 rounded-xl h-12"><RefreshCw className="w-4 h-4" /> Generate</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {FONT_NAMES.map(f => (
              <button key={f} onClick={() => setFont(f)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${font === f ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-foreground/30"}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {output && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              <div className="bg-[#1a1b26] border border-border/50 rounded-2xl p-6 overflow-x-auto font-mono">
                <div className="flex items-center gap-1.5 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <pre className="text-emerald-400 text-sm whitespace-pre leading-relaxed">{output}</pre>
              </div>
              <Button onClick={copy} variant="outline" className="gap-2 rounded-full"><Copy className="w-4 h-4" /> Copy ASCII Art</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToolLayout>
  );
}
