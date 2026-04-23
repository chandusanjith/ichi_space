"use client";

import { useState, useEffect, useRef } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

export default function CountdownTimerPage() {
  const [targetDate, setTargetDate] = useState("");
  const [targetTime, setTargetTime] = useState("00:00");
  const [eventName, setEventName] = useState("");
  const [countdown, setCountdown] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    total: number;
  } | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startCountdown = () => {
    if (!targetDate) return;
    const target = new Date(`${targetDate}T${targetTime || "00:00"}:00`);
    if (target.getTime() <= Date.now()) return;

    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      const now = Date.now();
      const diff = target.getTime() - now;

      if (diff <= 0) {
        clearInterval(intervalRef.current!);
        setIsRunning(false);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds, total: diff });
    }, 1000);
  };

  const stopCountdown = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const resetCountdown = () => {
    stopCountdown();
    setCountdown(null);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <div className="bg-background rounded-xl p-4 md:p-6 border shadow-sm text-center flex-1">
      <p className="text-4xl md:text-6xl font-bold tracking-tight text-primary tabular-nums">
        {String(value).padStart(2, "0")}
      </p>
      <p className="text-xs md:text-sm text-muted-foreground mt-2 uppercase tracking-wider">
        {label}
      </p>
    </div>
  );

  return (
    <ToolLayout
      title="Countdown Timer"
      description="Set a countdown to any future date or event"
      categoryName="Time & Date"
      categoryPath="/time-date"
      slug="countdown-timer"
    >
      <div className="space-y-8">
        {countdown !== null && (
          <div className="space-y-4">
            {eventName && (
              <h2 className="text-2xl font-bold text-center text-muted-foreground">
                {eventName}
              </h2>
            )}
            <div className="flex gap-3 md:gap-4">
              <TimeBlock value={countdown.days} label="Days" />
              <TimeBlock value={countdown.hours} label="Hours" />
              <TimeBlock value={countdown.minutes} label="Minutes" />
              <TimeBlock value={countdown.seconds} label="Seconds" />
            </div>
            {countdown.total === 0 && (
              <div className="text-center bg-primary/10 rounded-xl p-6 border border-primary/20">
                <p className="text-2xl font-bold text-primary">🎉 Time&apos;s Up!</p>
                <p className="text-muted-foreground mt-1">The countdown has finished.</p>
              </div>
            )}
          </div>
        )}

        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="event-name">Event Name (optional)</Label>
              <Input
                id="event-name"
                placeholder="e.g., New Year's Eve"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                disabled={isRunning}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="target-date">Target Date</Label>
                <Input
                  id="target-date"
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  disabled={isRunning}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="target-time">Target Time</Label>
                <Input
                  id="target-time"
                  type="time"
                  value={targetTime}
                  onChange={(e) => setTargetTime(e.target.value)}
                  disabled={isRunning}
                />
              </div>
            </div>
            <div className="flex gap-3">
              {!isRunning ? (
                <Button onClick={startCountdown} className="flex-1" size="lg">
                  <Play className="mr-2 h-4 w-4" />
                  Start Countdown
                </Button>
              ) : (
                <Button onClick={stopCountdown} variant="outline" className="flex-1" size="lg">
                  <Pause className="mr-2 h-4 w-4" />
                  Pause
                </Button>
              )}
              <Button onClick={resetCountdown} variant="ghost" size="lg">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
