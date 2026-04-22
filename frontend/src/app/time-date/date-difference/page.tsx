"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";

export default function DateDifferencePage() {
  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [result, setResult] = useState<{
    days: number;
    weeks: number;
    months: number;
    years: number;
    hours: number;
    minutes: number;
    weekdays: number;
    weekends: number;
  } | null>(null);

  const calculate = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffMs = Math.abs(end.getTime() - start.getTime());
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor(diffMs / (1000 * 60));

    // Calculate months and years
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    if (months < 0) { years--; months += 12; }
    const totalMonths = years * 12 + months;

    // Calculate weekdays vs weekends
    let weekdays = 0;
    let weekends = 0;
    const earlier = start < end ? start : end;
    const later = start < end ? end : start;
    const current = new Date(earlier);
    while (current < later) {
      const day = current.getDay();
      if (day === 0 || day === 6) weekends++;
      else weekdays++;
      current.setDate(current.getDate() + 1);
    }

    setResult({ days, weeks, months: totalMonths, years, hours, minutes, weekdays, weekends });
  };

  return (
    <ToolLayout
      title="Date Difference"
      description="Calculate the difference between two dates"
      categoryName="Time & Date"
      categoryPath="/time-date"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date">End Date</Label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <Button onClick={calculate} className="w-full" size="lg">
              <CalendarDays className="mr-2 h-4 w-4" />
              Calculate Difference
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-muted/30">
          <CardContent className="p-6">
            {result ? (
              <div className="space-y-4">
                <div className="bg-background rounded-xl p-6 border shadow-sm text-center">
                  <p className="text-sm text-muted-foreground mb-2">Total Days</p>
                  <p className="text-5xl font-bold text-primary tracking-tight">
                    {result.days.toLocaleString()}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Years", value: result.years },
                    { label: "Months", value: result.months },
                    { label: "Weeks", value: result.weeks },
                    { label: "Hours", value: result.hours.toLocaleString() },
                    { label: "Minutes", value: result.minutes.toLocaleString() },
                    { label: "Weekdays", value: result.weekdays.toLocaleString() },
                    { label: "Weekends", value: result.weekends.toLocaleString() },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-background rounded-lg p-3 border text-center">
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                      <p className="font-bold text-lg">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground py-12">
                <CalendarDays className="h-12 w-12 mb-4 opacity-20" />
                <p>Select dates and click calculate</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
