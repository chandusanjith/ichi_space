"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CronGenerator() {
  const [minute, setMinute] = useState("*");
  const [hour, setHour] = useState("*");
  const [dayOfMonth, setDayOfMonth] = useState("*");
  const [month, setMonth] = useState("*");
  const [dayOfWeek, setDayOfWeek] = useState("*");

  const parts = [minute, hour, dayOfMonth, month, dayOfWeek];
  const cronString = parts.join(" ");

  // Simple heuristic based translation
  const translateCron = () => {
    if (cronString === "* * * * *") return "Every minute";
    if (cronString === "0 * * * *") return "Every hour, on the hour";
    if (cronString === "0 0 * * *") return "Every day at midnight";
    if (cronString === "0 0 * * 0") return "Every Sunday at midnight";
    if (cronString === "0 0 1 * *") return "At midnight on the 1st of every month";
    
    let timePart = "At ";
    if (minute !== "*" && hour !== "*" && !minute.includes("/") && !hour.includes("/") && !minute.includes("-") && !hour.includes("-") && !minute.includes(",") && !hour.includes(",")) {
      timePart += `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`;
    } else if (minute !== "*" && hour === "*") {
      timePart = `At minute ${minute} past every hour`;
    } else if (minute === "*" && hour !== "*") {
      timePart = `Every minute past hour ${hour}`;
    } else {
      timePart = "Every minute";
    }

    let dayPart = "";
    if (dayOfWeek !== "*") {
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const dNum = parseInt(dayOfWeek);
      dayPart = ` on ${!isNaN(dNum) && dNum >= 0 && dNum <= 6 ? days[dNum] : dayOfWeek}`;
    } else if (dayOfMonth !== "*") {
      dayPart = ` on day ${dayOfMonth} of the month`;
    }

    let monthPart = "";
    if (month !== "*") {
      monthPart = ` in month ${month}`;
    }

    if (timePart === "Every minute" && !dayPart && !monthPart) return "Every minute";

    return `${timePart}${dayPart}${monthPart}`.replace("At Every minute", "Every minute");
  };

  const commonPresets = [
    { label: "Every Minute", value: ["*", "*", "*", "*", "*"] },
    { label: "Every 5 Minutes", value: ["*/5", "*", "*", "*", "*"] },
    { label: "Every Hour", value: ["0", "*", "*", "*", "*"] },
    { label: "Every Day at Midnight", value: ["0", "0", "*", "*", "*"] },
    { label: "Every Sunday", value: ["0", "0", "*", "*", "0"] },
  ];

  const applyPreset = (vals: string[]) => {
    setMinute(vals[0]);
    setHour(vals[1]);
    setDayOfMonth(vals[2]);
    setMonth(vals[3]);
    setDayOfWeek(vals[4]);
  };

  return (
    <ToolLayout
      title="Cron Expression Generator"
      description="Generate and translate cron schedule expressions"
      categoryName="Developer Tools"
      categoryPath="/developer-tools"
      slug="cron-generator"
    >
      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-8 space-y-6">
          <Card className="bg-slate-900 text-white shadow-xl border-0 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-32 bg-cyan-500/10 rounded-full blur-3xl"></div>
            <CardContent className="p-10 relative z-10 flex flex-col items-center text-center space-y-6">
              <div className="flex gap-4 md:gap-8 justify-center text-5xl md:text-7xl font-mono font-bold tracking-widest text-cyan-400">
                <span>{minute}</span>
                <span>{hour}</span>
                <span>{dayOfMonth}</span>
                <span>{month}</span>
                <span>{dayOfWeek}</span>
              </div>
              
              <div className="bg-white/10 p-4 rounded-xl border border-white/20 backdrop-blur-md w-full max-w-lg mt-8">
                <p className="text-xl font-medium">{translateCron()}</p>
                <p className="text-sm text-cyan-200/70 mt-2">Human Readable Translation (Approximation)</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle>Edit Expression</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-5 gap-4">
              <div className="space-y-2">
                <Label>Minute</Label>
                <Input value={minute} onChange={(e) => setMinute(e.target.value)} className="font-mono text-center" />
                <p className="text-xs text-muted-foreground text-center">0-59</p>
              </div>
              <div className="space-y-2">
                <Label>Hour</Label>
                <Input value={hour} onChange={(e) => setHour(e.target.value)} className="font-mono text-center" />
                <p className="text-xs text-muted-foreground text-center">0-23</p>
              </div>
              <div className="space-y-2">
                <Label>Day (Month)</Label>
                <Input value={dayOfMonth} onChange={(e) => setDayOfMonth(e.target.value)} className="font-mono text-center" />
                <p className="text-xs text-muted-foreground text-center">1-31</p>
              </div>
              <div className="space-y-2">
                <Label>Month</Label>
                <Input value={month} onChange={(e) => setMonth(e.target.value)} className="font-mono text-center" />
                <p className="text-xs text-muted-foreground text-center">1-12</p>
              </div>
              <div className="space-y-2">
                <Label>Day (Week)</Label>
                <Input value={dayOfWeek} onChange={(e) => setDayOfWeek(e.target.value)} className="font-mono text-center" />
                <p className="text-xs text-muted-foreground text-center">0-6 (Sun-Sat)</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-4">
          <Card className="border-border shadow-sm h-full">
            <CardHeader>
              <CardTitle>Common Presets</CardTitle>
              <CardDescription>Quick start templates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {commonPresets.map((preset, i) => (
                <button
                  key={i}
                  onClick={() => applyPreset(preset.value)}
                  className="w-full text-left p-3 rounded-lg hover:bg-muted border border-transparent hover:border-border transition-colors group flex justify-between items-center"
                >
                  <span className="font-medium text-sm">{preset.label}</span>
                  <span className="font-mono text-xs text-muted-foreground bg-muted group-hover:bg-background px-2 py-1 rounded">
                    {preset.value.join(" ")}
                  </span>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
