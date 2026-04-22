"use client";

import { useState, useEffect, useRef } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Play, Pause, RotateCcw, SkipForward, Coffee, Brain, Settings } from "lucide-react";

type TimerMode = "work" | "shortBreak" | "longBreak";

const DEFAULT_SETTINGS = {
  work: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
  longBreakInterval: 4,
};

export default function PomodoroPage() {
  const [mode, setMode] = useState<TimerMode>("work");
  const [timeLeft, setTimeLeft] = useState(DEFAULT_SETTINGS.work);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [totalWorkSeconds, setTotalWorkSeconds] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create a simple beep sound without external files
    audioRef.current = typeof Audio !== 'undefined' ? new Audio() : null;
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Timer finished
            clearInterval(intervalRef.current!);
            setIsRunning(false);

            if (mode === "work") {
              const newSessions = sessions + 1;
              setSessions(newSessions);
              // Switch to break
              if (newSessions % DEFAULT_SETTINGS.longBreakInterval === 0) {
                setMode("longBreak");
                return DEFAULT_SETTINGS.longBreak;
              } else {
                setMode("shortBreak");
                return DEFAULT_SETTINGS.shortBreak;
              }
            } else {
              // Switch back to work
              setMode("work");
              return DEFAULT_SETTINGS.work;
            }
          }
          if (mode === "work") {
            setTotalWorkSeconds((t) => t + 1);
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, mode, sessions]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimeLeft(DEFAULT_SETTINGS[mode]);
  };

  const switchMode = (newMode: TimerMode) => {
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setMode(newMode);
    setTimeLeft(DEFAULT_SETTINGS[newMode]);
  };

  const skipToNext = () => {
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (mode === "work") {
      const newSessions = sessions + 1;
      setSessions(newSessions);
      if (newSessions % DEFAULT_SETTINGS.longBreakInterval === 0) {
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

  const totalMinutes = Math.floor(totalWorkSeconds / 60);
  const progress = 1 - timeLeft / DEFAULT_SETTINGS[mode];
  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference * (1 - progress);

  const modeConfig = {
    work: { label: "Focus Time", color: "text-primary", bgColor: "bg-primary", icon: Brain },
    shortBreak: { label: "Short Break", color: "text-emerald-500", bgColor: "bg-emerald-500", icon: Coffee },
    longBreak: { label: "Long Break", color: "text-blue-500", bgColor: "bg-blue-500", icon: Coffee },
  };

  const config = modeConfig[mode];
  const ModeIcon = config.icon;

  return (
    <ToolLayout
      title="Pomodoro Timer"
      description="Focus timer with 25/5 minute work/break cycles"
      categoryName="Productivity"
      categoryPath="/productivity"
    >
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Mode selector */}
        <div className="flex justify-center">
          <div className="inline-flex bg-muted/50 rounded-xl p-1 border">
            {(["work", "shortBreak", "longBreak"] as const).map((m) => {
              const mc = modeConfig[m];
              return (
                <button
                  key={m}
                  onClick={() => switchMode(m)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    mode === m
                      ? "bg-background shadow-sm border"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {m === "work" ? "Focus" : m === "shortBreak" ? "Short Break" : "Long Break"}
                </button>
              );
            })}
          </div>
        </div>

        {/* Timer */}
        <Card>
          <CardContent className="p-8 flex flex-col items-center">
            <div className="relative w-64 h-64 mb-6">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 260 260">
                <circle
                  cx="130"
                  cy="130"
                  r="120"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  className="text-muted/30"
                />
                <circle
                  cx="130"
                  cy="130"
                  r="120"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className={`${config.color} transition-all duration-1000`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <ModeIcon className={`h-6 w-6 mb-2 ${config.color}`} />
                <p className={`text-6xl font-bold tracking-tight tabular-nums ${config.color}`}>
                  {formatTime(timeLeft)}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{config.label}</p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" onClick={resetTimer}>
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                className={`w-32 ${mode !== "work" ? "bg-emerald-500 hover:bg-emerald-600" : ""}`}
                onClick={toggleTimer}
              >
                {isRunning ? (
                  <><Pause className="mr-2 h-4 w-4" /> Pause</>
                ) : (
                  <><Play className="mr-2 h-4 w-4" /> Start</>
                )}
              </Button>
              <Button variant="outline" size="icon" onClick={skipToNext}>
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-primary">{sessions}</p>
              <p className="text-xs text-muted-foreground">Sessions</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold">{totalMinutes}</p>
              <p className="text-xs text-muted-foreground">Focus Minutes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-1">
                {Array.from({ length: DEFAULT_SETTINGS.longBreakInterval }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-4 h-4 rounded-full border-2 transition-colors ${
                      i < sessions % DEFAULT_SETTINGS.longBreakInterval
                        ? "bg-primary border-primary"
                        : "border-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">Until long break</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
