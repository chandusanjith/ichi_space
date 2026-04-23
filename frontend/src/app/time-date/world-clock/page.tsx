"use client";

import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X, Search } from "lucide-react";

const TIMEZONES = [
  { label: "New York", tz: "America/New_York", flag: "🇺🇸" },
  { label: "London", tz: "Europe/London", flag: "🇬🇧" },
  { label: "Paris", tz: "Europe/Paris", flag: "🇫🇷" },
  { label: "Dubai", tz: "Asia/Dubai", flag: "🇦🇪" },
  { label: "Mumbai", tz: "Asia/Kolkata", flag: "🇮🇳" },
  { label: "Singapore", tz: "Asia/Singapore", flag: "🇸🇬" },
  { label: "Tokyo", tz: "Asia/Tokyo", flag: "🇯🇵" },
  { label: "Sydney", tz: "Australia/Sydney", flag: "🇦🇺" },
  { label: "Los Angeles", tz: "America/Los_Angeles", flag: "🇺🇸" },
  { label: "Chicago", tz: "America/Chicago", flag: "🇺🇸" },
  { label: "Berlin", tz: "Europe/Berlin", flag: "🇩🇪" },
  { label: "Moscow", tz: "Europe/Moscow", flag: "🇷🇺" },
  { label: "Shanghai", tz: "Asia/Shanghai", flag: "🇨🇳" },
  { label: "Seoul", tz: "Asia/Seoul", flag: "🇰🇷" },
  { label: "Istanbul", tz: "Europe/Istanbul", flag: "🇹🇷" },
  { label: "São Paulo", tz: "America/Sao_Paulo", flag: "🇧🇷" },
  { label: "Toronto", tz: "America/Toronto", flag: "🇨🇦" },
  { label: "Hong Kong", tz: "Asia/Hong_Kong", flag: "🇭🇰" },
];

const DEFAULT_SELECTED = ["America/New_York", "Europe/London", "Asia/Kolkata", "Asia/Tokyo"];

export default function WorldClockPage() {
  const [selected, setSelected] = useState<string[]>(DEFAULT_SELECTED);
  const [now, setNow] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (tz: string) => {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(now);
  };

  const formatDate = (tz: string) => {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      weekday: "short",
      month: "short",
      day: "numeric",
    }).format(now);
  };

  const getOffset = (tz: string) => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      timeZoneName: "shortOffset",
    });
    const parts = formatter.formatToParts(now);
    const offsetPart = parts.find((p) => p.type === "timeZoneName");
    return offsetPart?.value || "";
  };

  const addTimezone = (tz: string) => {
    if (!selected.includes(tz)) {
      setSelected([...selected, tz]);
    }
    setShowPicker(false);
    setSearch("");
  };

  const removeTimezone = (tz: string) => {
    setSelected(selected.filter((s) => s !== tz));
  };

  const filteredTimezones = TIMEZONES.filter(
    (t) =>
      !selected.includes(t.tz) &&
      (t.label.toLowerCase().includes(search.toLowerCase()) ||
        t.tz.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <ToolLayout
      title="World Clock"
      description="View current time across multiple time zones"
      categoryName="Time & Date"
      categoryPath="/time-date"
      slug="world-clock"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {selected.map((tz) => {
            const info = TIMEZONES.find((t) => t.tz === tz);
            return (
              <Card key={tz} className="group relative overflow-hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeTimezone(tz)}
                >
                  <X className="h-3 w-3" />
                </Button>
                <CardContent className="p-6 text-center">
                  <p className="text-2xl mb-1">{info?.flag || "🌍"}</p>
                  <p className="font-semibold text-sm">{info?.label || tz}</p>
                  <p className="text-3xl font-bold tracking-tight mt-3 text-primary">
                    {formatTime(tz)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {formatDate(tz)} &middot; {getOffset(tz)}
                  </p>
                </CardContent>
              </Card>
            );
          })}

          {/* Add button */}
          <Card
            className="border-dashed cursor-pointer hover:border-primary/50 hover:bg-muted/30 transition-colors"
            onClick={() => setShowPicker(true)}
          >
            <CardContent className="p-6 flex flex-col items-center justify-center h-full text-muted-foreground">
              <Plus className="h-8 w-8 mb-2" />
              <p className="text-sm">Add Timezone</p>
            </CardContent>
          </Card>
        </div>

        {/* Timezone picker */}
        {showPicker && (
          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search city or timezone..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                  autoFocus
                />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 max-h-60 overflow-y-auto">
                {filteredTimezones.map((t) => (
                  <Button
                    key={t.tz}
                    variant="ghost"
                    className="justify-start h-auto py-2"
                    onClick={() => addTimezone(t.tz)}
                  >
                    <span className="mr-2">{t.flag}</span>
                    <span className="text-sm">{t.label}</span>
                  </Button>
                ))}
              </div>
              <div className="flex justify-end">
                <Button variant="ghost" size="sm" onClick={() => setShowPicker(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}
