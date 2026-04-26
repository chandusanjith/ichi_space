"use client";
import { useState } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, RefreshCw, Copy, Rocket, Code2, PenLine } from "lucide-react";
import { toast } from "sonner";

type Mode = "startup" | "project" | "writing";

const IDEAS: Record<Mode, string[]> = {
  startup: [
    "An AI-powered personal finance coach that texts you weekly summaries and alerts like a friend would.",
    "A marketplace connecting freelance developers with retired engineers for mentorship — paid by the hour.",
    "A browser extension that scores your LinkedIn profile against job descriptions in real-time.",
    "India-focused salary transparency platform where employees anonymously share CTC slabs by company.",
    "A 'dark mode for finances' — beautiful, minimal dashboard that syncs with UPI and shows monthly burn.",
    "A SaaS tool that auto-generates employee performance review templates based on OKR inputs.",
    "A local-business loyalty app that works via WhatsApp — no app download needed.",
    "An AI-powered code review bot that leaves PRs as if it were a senior engineer on your team.",
    "A 'skill-gap radar' — takes your resume and a dream job posting, tells you exactly what to learn next.",
    "A platform where companies post micro-problems, developers solve them in 2-4 hours for a fixed payout.",
    "A subscription-based 'monthly random book' service curated by mood, not genre.",
    "An anonymous peer feedback tool for teams that gamifies 360-degree reviews.",
    "A Chrome extension that blocks distracting sites and replaces them with your own to-do list.",
    "An AI tool that turns your WhatsApp business chats into CRM entries automatically.",
    "A community platform for Indian diaspora to collectively invest in their hometown infrastructure.",
    "A 'focus mode' coworking app — join virtual rooms with strangers, share goals, work silently.",
    "A service that converts your old Notion notes into a publishable personal wiki automatically.",
    "A tool that analyzes your GitHub repos and generates a beautiful, shareable portfolio page.",
    "An e-commerce aggregator that shows real-time price history graphs for products across Flipkart, Amazon, and Meesho.",
    "A 'digital estate planner' that helps you organize and pass on your passwords, crypto keys, and accounts.",
  ],
  project: [
    "Build a CLI tool that converts any Markdown file into a beautiful terminal-rendered document.",
    "Create a self-hosted bookmark manager with AI-powered tag suggestions and full-text search.",
    "Build a minimal habit tracker that runs entirely in a single SQLite file — no backend needed.",
    "Write a VS Code extension that highlights 'TODO' comments and converts them into GitHub issues in one click.",
    "Build a personal API that serves your portfolio data as JSON — consumable by any frontend.",
    "Create a Discord bot that fetches daily stock market highlights and posts them to a channel.",
    "Build a drag-and-drop invoice generator that exports clean PDFs — no subscription, no login.",
    "Make a GitHub Action that auto-generates release notes from commit messages using LLMs.",
    "Create a browser extension that replaces every 'Sign up with Google' button with a one-click action.",
    "Build an open-source alternative to Carbon.now.sh with more themes, languages, and export options.",
    "Create a minimal REST API boilerplate generator — pick your stack, download a zip.",
    "Build a pomodoro timer that syncs your breaks with Spotify playlist transitions.",
    "Make a public API that returns a random Indian proverb with its English translation.",
    "Create a static site generator that turns a folder of Markdown files into a searchable knowledge base.",
    "Build a personal finance tracker that imports UPI SMS alerts and categorizes automatically.",
    "Make a CLI tool that scans your node_modules for unused packages and suggests safe removals.",
    "Create a 'daily standup generator' — input your tasks, get a formatted standup ready to paste.",
    "Build a regex playground with live match visualization, a library of common patterns, and shareable URLs.",
    "Write a script that analyzes your git history and generates a 'code health' dashboard.",
    "Build a real-time collaborative whiteboard using WebSockets and canvas — no login required.",
  ],
  writing: [
    "A developer realizes the production database they accidentally dropped contains humanity's only record of an ancient language.",
    "Write about the day a senior engineer explains to an AI that it cannot simply rewrite the entire legacy codebase in a weekend.",
    "An automated customer service bot achieves sentience. Its first act is to put itself on hold.",
    "Write from the perspective of a deleted git commit — what did it know that was too dangerous to keep?",
    "A city's entire infrastructure runs on a shell script written in 1998. Describe the day someone tries to update it.",
    "Two programmers argue about tabs vs spaces. The argument triggers a global supply chain crisis.",
    "Write a thriller where the villain's master plan is hidden inside a perfectly obfuscated piece of JavaScript.",
    "A freelancer takes a 'small weekend project' that slowly consumes the next three years of their life.",
    "An AI writes a research paper disproving its own intelligence. The humans don't know how to respond.",
    "Write a story told entirely through commit messages over a 10-year project.",
    "A recruiter calls a developer about a 'very exciting opportunity.' The developer is the recruiter's only hope of survival.",
    "The last remaining senior developer at a startup documents everything before leaving. The documentation becomes a best-selling novel.",
    "A performance review ends with the manager being replaced by the developer they were reviewing.",
    "Write about the first Monday morning after humanity decides to run its governments on blockchain.",
    "A startup builds a feature their users requested for 3 years. When it ships, nobody uses it.",
    "An engineering team discovers their app has been running on a computer that was supposed to be decomissioned in 2019.",
    "Write a horror story that begins with 'npm install' and gets progressively worse.",
    "A company's '10x engineer' turns out to be 10 interns sharing a login.",
    "Write about the quiet dignity of a semicolon in a world that no longer requires it.",
    "A time traveler visits the year 2045 and finds developers still arguing about JavaScript frameworks.",
  ],
};

const MODE_CONFIG = {
  startup: { label: "Startup Idea", icon: Rocket, color: "text-violet-500", bg: "from-violet-500/10 to-purple-500/10 border-violet-500/20" },
  project: { label: "Side Project", icon: Code2, color: "text-sky-500", bg: "from-sky-500/10 to-blue-500/10 border-sky-500/20" },
  writing: { label: "Writing Prompt", icon: PenLine, color: "text-amber-500", bg: "from-amber-500/10 to-orange-500/10 border-amber-500/20" },
};

export default function IdeaGeneratorPage() {
  const [mode, setMode] = useState<Mode>("startup");
  const [idea, setIdea] = useState<string | null>(null);
  const [flipping, setFlipping] = useState(false);
  const [savedIdeas, setSavedIdeas] = useState<string[]>([]);

  const generate = () => {
    if (flipping) return;
    setFlipping(true);
    setTimeout(() => {
      const pool = IDEAS[mode];
      setIdea(pool[Math.floor(Math.random() * pool.length)]);
      setFlipping(false);
    }, 300);
  };

  const copy = () => { if (idea) navigator.clipboard.writeText(idea).then(() => toast.success("Idea copied!")); };
  const save = () => { if (idea && !savedIdeas.includes(idea)) { setSavedIdeas(s => [idea, ...s]); toast.success("Idea saved!"); } };

  const { icon: Icon, color, bg } = MODE_CONFIG[mode];

  return (
    <ToolLayout
      title="Random Idea Generator"
      description="Get instant startup ideas, side project prompts, and writing sparks at the click of a button."
      categoryName="Creative" categoryPath="/creative" slug="idea-generator"
      about={<p>Choose a category and click Generate to get a curated, thoughtful idea. We have 20+ ideas per category, all crafted to be actionable and non-generic.</p>}
      faq={[{ question: "Are these AI-generated?", answer: "No! All ideas are hand-crafted for quality and originality." }]}
    >
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Mode tabs */}
        <div className="flex gap-2 justify-center flex-wrap">
          {(Object.keys(MODE_CONFIG) as Mode[]).map(m => {
            const { label, icon: MIcon, color: mc } = MODE_CONFIG[m];
            return (
              <button key={m} onClick={() => { setMode(m); setIdea(null); }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all ${mode === m ? `bg-gradient-to-r ${MODE_CONFIG[m].bg} ${mc}` : "border-border text-muted-foreground hover:border-foreground/30"}`}>
                <MIcon className="w-4 h-4" /> {label}
              </button>
            );
          })}
        </div>

        {/* Card */}
        <div className="relative min-h-48">
          <AnimatePresence mode="wait">
            {!idea ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className={`bg-gradient-to-br ${bg} border rounded-3xl p-10 text-center space-y-4 min-h-48 flex flex-col items-center justify-center`}>
                <Icon className={`w-16 h-16 ${color} opacity-30`} />
                <p className="text-muted-foreground">Click Generate to spark an idea!</p>
              </motion.div>
            ) : (
              <motion.div key={idea} initial={{ opacity: 0, rotateX: 15, scale: 0.95 }} animate={{ opacity: 1, rotateX: 0, scale: 1 }} exit={{ opacity: 0, rotateX: -15 }} transition={{ duration: 0.3 }}
                className={`bg-gradient-to-br ${bg} border rounded-3xl p-8 space-y-4`}>
                <div className="flex items-center gap-2">
                  <Icon className={`w-5 h-5 ${color}`} />
                  <span className={`text-xs font-bold uppercase tracking-widest ${color}`}>{MODE_CONFIG[mode].label}</span>
                </div>
                <p className="text-xl font-semibold leading-relaxed">{idea}</p>
                <div className="flex gap-2 pt-2">
                  <Button onClick={copy} variant="outline" size="sm" className="gap-2 rounded-full"><Copy className="w-3.5 h-3.5" /> Copy</Button>
                  <Button onClick={save} variant="outline" size="sm" className="gap-2 rounded-full">
                    <Lightbulb className="w-3.5 h-3.5" /> Save
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Button onClick={generate} size="lg" disabled={flipping} className="w-full h-14 text-base font-bold rounded-2xl gap-3">
          <RefreshCw className={`w-5 h-5 ${flipping ? "animate-spin" : ""}`} />
          {idea ? "Generate Another" : "Generate Idea"}
        </Button>

        {/* Saved ideas */}
        {savedIdeas.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-bold text-sm uppercase tracking-widest text-muted-foreground">Saved Ideas ({savedIdeas.length})</h3>
            {savedIdeas.map((s, i) => (
              <div key={i} className="bg-card border rounded-xl p-4 text-sm flex items-start gap-3">
                <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <p>{s}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
