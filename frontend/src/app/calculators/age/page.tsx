"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Cake, Calendar, Clock, CalendarDays } from "lucide-react";

interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
  nextBirthday: number;
}

function calculateAge(birthDate: Date, toDate: Date): AgeResult {
  let years = toDate.getFullYear() - birthDate.getFullYear();
  let months = toDate.getMonth() - birthDate.getMonth();
  let days = toDate.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(toDate.getFullYear(), toDate.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const totalDays = Math.floor(
    (toDate.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;

  // Next birthday
  let nextBirthday = new Date(
    toDate.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );
  if (nextBirthday <= toDate) {
    nextBirthday = new Date(
      toDate.getFullYear() + 1,
      birthDate.getMonth(),
      birthDate.getDate()
    );
  }
  const daysUntilBirthday = Math.ceil(
    (nextBirthday.getTime() - toDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  return { years, months, days, totalDays, totalWeeks, totalMonths, nextBirthday: daysUntilBirthday };
}

export default function AgeCalculatorPage() {
  const [birthDate, setBirthDate] = useState("");
  const [toDate, setToDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [result, setResult] = useState<AgeResult | null>(null);

  const handleCalculate = () => {
    if (!birthDate) return;
    const birth = new Date(birthDate);
    const to = new Date(toDate);
    if (birth > to) return;
    setResult(calculateAge(birth, to));
  };

  return (
    <ToolLayout
      title="Age Calculator"
      description="Calculate exact age in years, months, and days"
      categoryName="Calculators"
      categoryPath="/calculators"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="birth-date">Date of Birth</Label>
              <Input
                id="birth-date"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="to-date">Calculate Age As Of</Label>
              <Input
                id="to-date"
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
            <Button onClick={handleCalculate} className="w-full" size="lg">
              <Cake className="mr-2 h-4 w-4" />
              Calculate Age
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-muted/30">
          <CardContent className="p-6">
            {result ? (
              <div className="space-y-6">
                <div className="bg-background rounded-xl p-6 border shadow-sm text-center">
                  <p className="text-sm text-muted-foreground mb-2">Your Age</p>
                  <div className="flex items-center justify-center gap-4">
                    <div className="text-center">
                      <p className="text-4xl font-bold text-primary">{result.years}</p>
                      <p className="text-xs text-muted-foreground">Years</p>
                    </div>
                    <div className="text-center">
                      <p className="text-4xl font-bold text-primary">{result.months}</p>
                      <p className="text-xs text-muted-foreground">Months</p>
                    </div>
                    <div className="text-center">
                      <p className="text-4xl font-bold text-primary">{result.days}</p>
                      <p className="text-xs text-muted-foreground">Days</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-background rounded-lg p-4 border flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Total Days</p>
                      <p className="font-semibold">{result.totalDays.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="bg-background rounded-lg p-4 border flex items-center gap-3">
                    <CalendarDays className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Total Weeks</p>
                      <p className="font-semibold">{result.totalWeeks.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="bg-background rounded-lg p-4 border flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Total Months</p>
                      <p className="font-semibold">{result.totalMonths.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="bg-background rounded-lg p-4 border flex items-center gap-3">
                    <Cake className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Next Birthday</p>
                      <p className="font-semibold">{result.nextBirthday} days</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground py-12">
                <Cake className="h-12 w-12 mb-4 opacity-20" />
                <p>Enter your date of birth to see results</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
