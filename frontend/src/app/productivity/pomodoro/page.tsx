"use client";

import { useState, useEffect, useRef } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Play, Pause, RotateCcw, SkipForward, Coffee, Brain, Settings, Plus, CheckCircle2, Circle, Trash2, BarChart2, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";

type TimerMode = "work" | "shortBreak" | "longBreak";

type Task = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
};

type DailyStats = {
  date: string;
  tasksCompleted: number;
  tasksIncomplete: number;
  focusMinutes: number;
};

const DEFAULT_SETTINGS = {
  work: 25, // in minutes
  shortBreak: 5,
  longBreak: 15,
  longBreakInterval: 4,
};

export default function PomodoroPage() {
  // State
  const [mode, setMode] = useState<TimerMode>("work");
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [timeLeft, setTimeLeft] = useState(DEFAULT_SETTINGS.work * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [totalWorkSeconds, setTotalWorkSeconds] = useState(0);
  
  // Tasks state
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState("");
  
  // Stats state
  const [dailyStats, setDailyStats] = useState<DailyStats[]>([]);
  
  // UI State
  const [showSettings, setShowSettings] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize
  useEffect(() => {
    setIsMounted(true);
    // Audio setup
    audioRef.current = typeof Audio !== 'undefined' ? new Audio('/notification.mp3') : null; // If not available, it won't play
    
    // Load local storage
    const savedSettings = localStorage.getItem("pomodoroSettings");
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(parsed);
        setTimeLeft(parsed.work * 60);
      } catch (e) {}
    }
    
    const savedTasks = localStorage.getItem("pomodoroTasks");
    if (savedTasks) {
      try { setTasks(JSON.parse(savedTasks)); } catch (e) {}
    }
    
    const savedStats = localStorage.getItem("pomodoroStats");
    if (savedStats) {
      try { setDailyStats(JSON.parse(savedStats)); } catch (e) {}
    }
  }, []);

  // Timer logic
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev: number) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setIsRunning(false);
            
            // Try to play sound
            if (audioRef.current) {
              audioRef.current.play().catch(e => console.log('Audio play blocked:', e));
            }

            if (mode === "work") {
              const newSessions = sessions + 1;
              setSessions(newSessions);
              updateStatsForSession(settings.work);
              
              if (newSessions % settings.longBreakInterval === 0) {
                setMode("longBreak");
                return settings.longBreak * 60;
              } else {
                setMode("shortBreak");
                return settings.shortBreak * 60;
              }
            } else {
              setMode("work");
              return settings.work * 60;
            }
          }
          if (mode === "work") {
            setTotalWorkSeconds((t: number) => t + 1);
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, mode, sessions, settings]);
  
  // Save tasks and stats to local storage
  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem("pomodoroTasks", JSON.stringify(tasks));
    
    // Compute current stats
    const today = new Date().toISOString().split('T')[0];
    const completed = tasks.filter(t => t.completed).length;
    const incomplete = tasks.filter(t => !t.completed).length;
    
    const currentStats = [...dailyStats];
    const todayIndex = currentStats.findIndex(s => s.date === today);
    
    if (todayIndex >= 0) {
      if (
        currentStats[todayIndex].tasksCompleted !== completed || 
        currentStats[todayIndex].tasksIncomplete !== incomplete
      ) {
        currentStats[todayIndex] = {
          ...currentStats[todayIndex],
          tasksCompleted: completed,
          tasksIncomplete: incomplete,
        };
        setDailyStats(currentStats);
      }
    } else if (tasks.length > 0) {
      currentStats.push({
        date: today,
        tasksCompleted: completed,
        tasksIncomplete: incomplete,
        focusMinutes: 0
      });
      setDailyStats(currentStats);
    }
  }, [tasks, dailyStats, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem("pomodoroStats", JSON.stringify(dailyStats));
  }, [dailyStats, isMounted]);

  const updateStatsForSession = (minutes: number) => {
    const today = new Date().toISOString().split('T')[0];
    setDailyStats((prev: DailyStats[]) => {
      const newStats = [...prev];
      const todayIndex = newStats.findIndex((s: DailyStats) => s.date === today);
      if (todayIndex >= 0) {
        newStats[todayIndex] = {
          ...newStats[todayIndex],
          focusMinutes: newStats[todayIndex].focusMinutes + minutes
        };
      } else {
        newStats.push({
          date: today,
          tasksCompleted: 0,
          tasksIncomplete: 0,
          focusMinutes: minutes
        });
      }
      return newStats;
    });
  };

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimeLeft(settings[mode] * 60);
  };

  const switchMode = (newMode: TimerMode) => {
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setMode(newMode);
    setTimeLeft(settings[newMode] * 60);
  };

  const skipToNext = () => {
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (mode === "work") {
      const newSessions = sessions + 1;
      setSessions(newSessions);
      updateStatsForSession(Math.floor((settings.work * 60 - timeLeft)/60)); // Add partial minutes
      if (newSessions % settings.longBreakInterval === 0) {
        switchMode("longBreak");
      } else {
        switchMode("shortBreak");
      }
    } else {
      switchMode("work");
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const saveSettings = (newSettings: typeof settings) => {
    setSettings(newSettings);
    localStorage.setItem("pomodoroSettings", JSON.stringify(newSettings));
    setShowSettings(false);
    if (!isRunning) {
      setTimeLeft(newSettings[mode] * 60);
    }
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    setTasks([{
      id: Date.now().toString(),
      text: newTaskText.trim(),
      completed: false,
      createdAt: Date.now()
    }, ...tasks]);
    setNewTaskText("");
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const totalMinutes = Math.floor(totalWorkSeconds / 60);
  const progress = 1 - timeLeft / (settings[mode] * 60);
  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference * (1 - progress);

  const modeConfig = {
    work: { label: "Focus Time", color: "text-primary", stroke: "stroke-primary", bgColor: "bg-primary", icon: Brain },
    shortBreak: { label: "Short Break", color: "text-emerald-500", stroke: "stroke-emerald-500", bgColor: "bg-emerald-500", icon: Coffee },
    longBreak: { label: "Long Break", color: "text-blue-500", stroke: "stroke-blue-500", bgColor: "bg-blue-500", icon: Coffee },
  };

  const config = modeConfig[mode];
  const ModeIcon = config.icon;
  
  // Custom Recharts Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 backdrop-blur-md border border-border p-3 rounded-lg shadow-xl">
          <p className="font-medium text-foreground mb-2 pb-2 border-b border-border/50">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm mt-1">
              <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: entry.color }} />
              <span className="text-muted-foreground">{entry.name}:</span>
              <span className="font-bold" style={{ color: entry.color }}>{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  if (!isMounted) return null;

  return (
    <ToolLayout
      title="Pomodoro Timer"
      description="Focus timer with 25/5 minute work/break cycles. Track your tasks and analyze your productivity."
      categoryName="Productivity"
      categoryPath="/productivity"
      slug="pomodoro"
      about={
        <div className="space-y-4">
          <p>
            The <strong>Pomodoro Technique</strong> is a time management method developed by Francesco Cirillo in the late 1980s. 
            It uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks.
          </p>
          <p>
            Our Pomodoro Timer is built to help you stay in the "flow state" by providing:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Customizable Cycles:</strong> Adjust work and break durations to fit your personal rhythm.</li>
            <li><strong>Integrated Task Management:</strong> Link your focus sessions directly to the tasks you're working on.</li>
            <li><strong>Productivity Analytics:</strong> Visualize your focus time over the past week with detailed charts.</li>
            <li><strong>Auto-Start Breaks:</strong> Smooth transitions between work and rest to keep your momentum going.</li>
          </ul>
        </div>
      }
      faq={[
        {
          question: "What is the Pomodoro Technique?",
          answer: "It's a productivity method where you work for 25 minutes (one 'Pomodoro') and then take a 5-minute break. After four Pomodoros, you take a longer break of 15-30 minutes."
        },
        {
          question: "Can I change the timer duration?",
          answer: "Yes! You can fully customize the work time, short break, and long break durations in the settings panel."
        },
        {
          question: "Will my progress be saved?",
          answer: "Your task list and daily focus statistics are saved locally in your browser, so they'll be there when you come back."
        }
      ]}
    >
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left Column: Timer & Controls */}
        <div className="md:col-span-7 space-y-8">
          
          {/* Mode selector */}
          <div className="flex justify-center">
            <div className="inline-flex bg-muted/50 rounded-full p-1.5 border shadow-inner backdrop-blur-sm">
              {(["work", "shortBreak", "longBreak"] as const).map((m) => {
                const mc = modeConfig[m];
                return (
                  <button
                    key={m}
                    onClick={() => switchMode(m)}
                    className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                      mode === m
                        ? "text-background shadow-md"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {mode === m && (
                      <motion.div
                        layoutId="activeMode"
                        className={`absolute inset-0 rounded-full ${mc.bgColor}`}
                        initial={false}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      {m === "work" ? "Focus" : m === "shortBreak" ? "Short Break" : "Long Break"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Timer Card */}
          <Card className="overflow-hidden border-border/50 bg-card/40 backdrop-blur-xl shadow-2xl relative">
            {/* Decorative background gradients */}
            <div className={`absolute -top-32 -right-32 w-64 h-64 rounded-full blur-3xl opacity-20 ${config.bgColor}`} />
            <div className={`absolute -bottom-32 -left-32 w-64 h-64 rounded-full blur-3xl opacity-20 ${config.bgColor}`} />
            
            <CardContent className="p-10 flex flex-col items-center relative z-10">
              <div className="absolute top-4 right-4">
                <Button variant="ghost" size="icon" onClick={() => setShowSettings(!showSettings)} className="text-muted-foreground hover:text-foreground hover:bg-muted/50">
                  <Settings className="w-5 h-5" />
                </Button>
              </div>

              {/* Timer Circle */}
              <div className="relative w-[320px] h-[320px] mb-10 group">
                <svg className="w-full h-full -rotate-90 drop-shadow-xl" viewBox="0 0 260 260">
                  <circle
                    cx="130"
                    cy="130"
                    r="120"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-muted/20"
                  />
                  <motion.circle
                    cx="130"
                    cy="130"
                    r="120"
                    fill="none"
                    strokeWidth="8"
                    strokeLinecap="round"
                    className={`${config.stroke} transition-all duration-1000 ease-linear`}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    key={mode}
                    className="flex flex-col items-center"
                  >
                    <ModeIcon className={`h-8 w-8 mb-4 ${config.color} drop-shadow-sm`} />
                    <p className={`text-8xl font-extrabold tracking-tighter tabular-nums ${config.color} drop-shadow-md`}>
                      {formatTime(timeLeft)}
                    </p>
                    <p className="text-base font-semibold text-muted-foreground mt-2 uppercase tracking-widest">{config.label}</p>
                  </motion.div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-6">
                <Button variant="outline" size="icon" className="w-16 h-16 rounded-full border-border/50 hover:bg-muted/50 shadow-sm" onClick={resetTimer}>
                  <RotateCcw className="h-6 w-6" />
                </Button>
                
                <Button
                  size="lg"
                  className={`w-44 h-20 rounded-full text-xl font-bold shadow-xl transition-transform hover:scale-105 active:scale-95 ${
                    mode !== "work" ? "bg-emerald-500 hover:bg-emerald-600 text-white" : ""
                  }`}
                  onClick={toggleTimer}
                >
                  {isRunning ? (
                    <><Pause className="mr-3 h-7 w-7 fill-current" /> Pause</>
                  ) : (
                    <><Play className="mr-3 h-7 w-7 fill-current" /> Start</>
                  )}
                </Button>
                
                <Button variant="outline" size="icon" className="w-16 h-16 rounded-full border-border/50 hover:bg-muted/50 shadow-sm" onClick={skipToNext}>
                  <SkipForward className="h-6 w-6" />
                </Button>
              </div>
            </CardContent>
            
            {/* Settings Overlay */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ opacity: 0, y: "10%" }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: "10%" }}
                  transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                  className="absolute inset-0 bg-background/95 backdrop-blur-md z-20 flex flex-col p-8 rounded-xl"
                >
                  <div className="flex items-center justify-between mb-8 border-b border-border/50 pb-4">
                    <h3 className="text-2xl font-bold flex items-center gap-3">
                      <Settings className="w-6 h-6 text-primary" /> Timer Settings
                    </h3>
                    <Button variant="ghost" size="icon" onClick={() => setShowSettings(false)} className="rounded-full hover:bg-muted">
                      <X className="w-6 h-6" />
                    </Button>
                  </div>
                  
                  <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    <div className="space-y-5">
                      <div className="bg-muted/20 p-4 rounded-xl border border-border/50 flex justify-between items-center group hover:border-primary/30 transition-colors">
                        <Label htmlFor="work" className="text-base font-medium cursor-pointer">Focus Duration (min)</Label>
                        <Input 
                          id="work" 
                          type="number" 
                          min="1" 
                          max="120" 
                          value={settings.work}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSettings({...settings, work: parseInt(e.target.value) || 25})}
                          className="w-24 text-lg text-center font-semibold bg-background border-border/50"
                        />
                      </div>
                      <div className="bg-muted/20 p-4 rounded-xl border border-border/50 flex justify-between items-center group hover:border-emerald-500/30 transition-colors">
                        <Label htmlFor="shortBreak" className="text-base font-medium cursor-pointer">Short Break (min)</Label>
                        <Input 
                          id="shortBreak" 
                          type="number" 
                          min="1" 
                          max="60" 
                          value={settings.shortBreak}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSettings({...settings, shortBreak: parseInt(e.target.value) || 5})}
                          className="w-24 text-lg text-center font-semibold bg-background border-border/50"
                        />
                      </div>
                      <div className="bg-muted/20 p-4 rounded-xl border border-border/50 flex justify-between items-center group hover:border-blue-500/30 transition-colors">
                        <Label htmlFor="longBreak" className="text-base font-medium cursor-pointer">Long Break (min)</Label>
                        <Input 
                          id="longBreak" 
                          type="number" 
                          min="1" 
                          max="60" 
                          value={settings.longBreak}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSettings({...settings, longBreak: parseInt(e.target.value) || 15})}
                          className="w-24 text-lg text-center font-semibold bg-background border-border/50"
                        />
                      </div>
                      <div className="bg-muted/20 p-4 rounded-xl border border-border/50 flex justify-between items-center group hover:border-primary/30 transition-colors">
                        <Label htmlFor="longBreakInterval" className="text-base font-medium cursor-pointer">Long Break Interval</Label>
                        <Input 
                          id="longBreakInterval" 
                          type="number" 
                          min="1" 
                          max="10" 
                          value={settings.longBreakInterval}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSettings({...settings, longBreakInterval: parseInt(e.target.value) || 4})}
                          className="w-24 text-lg text-center font-semibold bg-background border-border/50"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 mt-auto">
                    <Button size="lg" className="w-full h-14 text-lg font-bold rounded-xl shadow-md" onClick={() => saveSettings(settings)}>
                      Save Changes
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>

          {/* Mini Stats (Current Session) */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="bg-card/40 backdrop-blur-sm border-border/50 hover:bg-card/60 transition-colors overflow-hidden relative group">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardContent className="p-4 flex flex-col items-center justify-center h-full relative z-10">
                <p className="text-3xl font-black text-primary drop-shadow-sm">{sessions}</p>
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Sessions</p>
              </CardContent>
            </Card>
            <Card className="bg-card/40 backdrop-blur-sm border-border/50 hover:bg-card/60 transition-colors overflow-hidden relative group">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardContent className="p-4 flex flex-col items-center justify-center h-full relative z-10">
                <p className="text-3xl font-black drop-shadow-sm">{totalMinutes}</p>
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Focus Min</p>
              </CardContent>
            </Card>
            <Card className="bg-card/40 backdrop-blur-sm border-border/50 hover:bg-card/60 transition-colors overflow-hidden relative group">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardContent className="p-4 flex flex-col items-center justify-center h-full relative z-10">
                <div className="flex items-center justify-center gap-1.5 mb-2 h-8">
                  {Array.from({ length: settings.longBreakInterval }).map((_, i) => {
                    const isCompleted = i < sessions % settings.longBreakInterval;
                    const isCurrent = i === sessions % settings.longBreakInterval && mode === "work";
                    return (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-full transition-all duration-500 ${
                          isCompleted
                            ? "bg-primary shadow-[0_0_10px_rgba(var(--primary),0.8)] scale-110"
                            : isCurrent
                            ? "border-2 border-primary animate-pulse scale-100"
                            : "bg-muted/50 scale-90"
                        }`}
                      />
                    );
                  })}
                </div>
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest text-center leading-tight">Until Break</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column: Tasks & Analytics */}
        <div className="md:col-span-5 h-[850px] flex flex-col">
          <Tabs defaultValue="tasks" className="flex-1 flex flex-col w-full h-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 h-10">
              <TabsTrigger value="tasks" className="text-sm font-bold">
                Tasks
              </TabsTrigger>
              <TabsTrigger value="analytics" className="text-sm font-bold">
                <BarChart2 className="w-4 h-4 mr-2" />
                Analytics
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="tasks" className="flex-1 flex flex-col min-h-0 mt-0 data-[state=inactive]:hidden border-none p-0 outline-none">
              <Card className="flex-1 flex flex-col bg-card/40 backdrop-blur-sm border-border/50 shadow-xl overflow-hidden rounded-2xl">
                <div className="p-6 border-b border-border/50 bg-muted/20">
                  <h3 className="text-xl font-bold mb-4">Focus Tasks</h3>
                  <form onSubmit={addTask} className="flex gap-3">
                    <Input
                      value={newTaskText}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTaskText(e.target.value)}
                      placeholder="What needs to be done?"
                      className="flex-1 bg-background border-border/50 focus-visible:ring-primary h-12 text-base shadow-sm rounded-xl"
                    />
                    <Button type="submit" size="icon" className="shrink-0 h-12 w-12 bg-primary hover:bg-primary/90 shadow-md rounded-xl">
                      <Plus className="h-6 w-6" />
                    </Button>
                  </form>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar bg-background/20">
                  <AnimatePresence mode="popLayout">
                    {tasks.length === 0 ? (
                      <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
                        className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-60 p-8 text-center"
                      >
                        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
                          <CheckCircle2 className="w-10 h-10 stroke-[1.5]" />
                        </div>
                        <h4 className="text-lg font-bold text-foreground mb-1">No tasks yet</h4>
                        <p className="text-sm">Add a task to stay focused during your pomodoro sessions.</p>
                      </motion.div>
                    ) : (
                      tasks.map((task) => (
                        <motion.div
                          layout
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                          key={task.id}
                          className={`group flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${
                            task.completed 
                              ? "bg-muted/40 border-transparent opacity-75" 
                              : "bg-background border-border/50 shadow-sm hover:border-primary/40 hover:shadow-md"
                          }`}
                        >
                          <div className="flex items-center gap-4 flex-1 overflow-hidden cursor-pointer" onClick={() => toggleTask(task.id)}>
                            <div className="shrink-0 transition-transform active:scale-90 relative flex items-center justify-center">
                              {task.completed ? (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="relative z-10">
                                  <CheckCircle2 className="w-7 h-7 text-emerald-500 fill-emerald-500/20" />
                                </motion.div>
                              ) : (
                                <Circle className="w-7 h-7 text-muted-foreground group-hover:text-primary transition-colors" />
                              )}
                            </div>
                            <span className={`text-[15px] font-medium truncate transition-all duration-300 ${
                              task.completed ? "text-muted-foreground line-through decoration-muted-foreground/50" : "text-foreground"
                            }`}>
                              {task.text}
                            </span>
                          </div>
                          <button 
                            onClick={() => deleteTask(task.id)}
                            className="opacity-0 group-hover:opacity-100 p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all shrink-0 ml-2 focus:opacity-100"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="flex-1 flex flex-col min-h-0 mt-0 data-[state=inactive]:hidden border-none p-0 outline-none">
              <Card className="flex-1 flex flex-col bg-card/40 backdrop-blur-sm border-border/50 shadow-xl overflow-hidden p-6 rounded-2xl">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold">Activity Analytics</h3>
                  <p className="text-sm text-muted-foreground mt-1">Your productivity trends over the last 7 days</p>
                </div>
                
                {dailyStats.length > 0 ? (
                  <div className="flex-1 min-h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={dailyStats.slice(-7)} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.08} vertical={false} />
                        <XAxis 
                          dataKey="date" 
                          stroke="currentColor" 
                          opacity={0.6}
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                          tickMargin={10}
                          tickFormatter={(val: string | number) => {
                            const date = new Date(val);
                            return `${date.getMonth()+1}/${date.getDate()}`;
                          }}
                        />
                        <YAxis 
                          stroke="currentColor" 
                          opacity={0.6}
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                          tickMargin={10}
                        />
                        <RechartsTooltip content={<CustomTooltip />} cursor={{ stroke: 'currentColor', strokeOpacity: 0.1, strokeWidth: 2 }} />
                        <Line 
                          type="monotone" 
                          dataKey="tasksCompleted" 
                          name="Tasks Done"
                          stroke="#10b981" 
                          strokeWidth={4}
                          dot={{ r: 5, strokeWidth: 2, fill: 'hsl(var(--background))' }}
                          activeDot={{ r: 8, strokeWidth: 0, fill: '#10b981' }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="focusMinutes" 
                          name="Focus Min"
                          stroke="hsl(var(--primary))" 
                          strokeWidth={4}
                          dot={{ r: 5, strokeWidth: 2, fill: 'hsl(var(--background))' }}
                          activeDot={{ r: 8, strokeWidth: 0, fill: 'hsl(var(--primary))' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground opacity-60">
                    <div className="w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center mb-6">
                      <BarChart2 className="w-12 h-12 stroke-[1.5]" />
                    </div>
                    <h4 className="text-lg font-bold text-foreground mb-1">No activity data</h4>
                    <p className="text-sm">Complete a focus session to see your stats here.</p>
                  </div>
                )}
                
                <div className="mt-8 grid grid-cols-2 gap-5">
                  <div className="bg-muted/30 rounded-2xl p-5 border border-border/50 flex flex-col justify-center relative overflow-hidden group hover:border-primary/30 transition-colors">
                    <div className="absolute top-0 right-0 p-3 opacity-10">
                      <Brain className="w-12 h-12" />
                    </div>
                    <span className="text-sm text-muted-foreground font-bold mb-1 uppercase tracking-wider relative z-10">Total Focus</span>
                    <span className="text-3xl font-black text-primary relative z-10">
                      {dailyStats.reduce((acc: number, curr: DailyStats) => acc + curr.focusMinutes, 0)}m
                    </span>
                  </div>
                  <div className="bg-emerald-500/5 rounded-2xl p-5 border border-emerald-500/20 flex flex-col justify-center relative overflow-hidden group hover:border-emerald-500/40 transition-colors">
                    <div className="absolute top-0 right-0 p-3 opacity-10">
                      <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                    </div>
                    <span className="text-sm text-emerald-600/80 dark:text-emerald-400/80 font-bold mb-1 uppercase tracking-wider relative z-10">Tasks Done</span>
                    <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400 relative z-10">
                      {tasks.filter(t => t.completed).length}
                    </span>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
      
      {/* Global CSS required for hiding scrollbars nicely if needed */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: hsl(var(--muted-foreground) / 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: hsl(var(--muted-foreground) / 0.4);
        }
      `}} />
    </ToolLayout>
  );
}
