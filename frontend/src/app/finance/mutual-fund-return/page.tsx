"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export default function MutualFundReturn() {
  const [lumpsumInvestment, setLumpsumInvestment] = useState(100000);
  const [returnRate, setReturnRate] = useState(12);
  const [years, setYears] = useState(10);

  const calculateReturn = () => {
    const rate = returnRate / 100;
    
    const maturityValue = lumpsumInvestment * Math.pow(1 + rate, years);
    const wealthGained = maturityValue - lumpsumInvestment;

    return {
      totalInvestment: lumpsumInvestment.toFixed(0),
      maturityValue: maturityValue.toFixed(0),
      wealthGained: wealthGained.toFixed(0)
    };
  };

  const results = calculateReturn();

  return (
    <ToolLayout
      title="Mutual Fund Return Estimator"
      description="Estimate returns on your lumpsum mutual fund investments"
      categoryName="Finance"
      categoryPath="/finance"
      slug="mutual-fund-return"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle>Investment Details</CardTitle>
            <CardDescription>Adjust for a one-time (lumpsum) investment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>Total Investment</Label>
                <span className="font-semibold text-rose-600 dark:text-rose-400">₹{lumpsumInvestment.toLocaleString()}</span>
              </div>
              <Slider
                value={[lumpsumInvestment]}
                onValueChange={(val) => setLumpsumInvestment(Array.isArray(val) ? val[0] : val)}
                min={5000}
                max={5000000}
                step={5000}
                className="[&_[role=slider]]:bg-rose-600"
              />
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>Expected Return Rate (p.a)</Label>
                <span className="font-semibold text-rose-600 dark:text-rose-400">{returnRate}%</span>
              </div>
              <Slider
                value={[returnRate]}
                onValueChange={(val) => setReturnRate(Array.isArray(val) ? val[0] : val)}
                min={1}
                max={30}
                step={0.5}
                className="[&_[role=slider]]:bg-rose-600"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>Time Period</Label>
                <span className="font-semibold text-rose-600 dark:text-rose-400">{years} Years</span>
              </div>
              <Slider
                value={[years]}
                onValueChange={(val) => setYears(Array.isArray(val) ? val[0] : val)}
                min={1}
                max={40}
                step={1}
                className="[&_[role=slider]]:bg-rose-600"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-rose-500 text-white shadow-md border-0">
          <CardHeader>
            <CardTitle className="text-white">Estimated Returns</CardTitle>
            <CardDescription className="text-rose-100">Projected wealth after {years} years</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div className="bg-rose-600/50 p-4 rounded-xl border border-rose-400/30 backdrop-blur-sm">
                <p className="text-sm text-rose-100 font-medium mb-1">Total Investment</p>
                <p className="text-3xl font-bold">₹{Number(results.totalInvestment).toLocaleString()}</p>
              </div>
              
              <div className="bg-rose-600/50 p-4 rounded-xl border border-rose-400/30 backdrop-blur-sm">
                <p className="text-sm text-rose-100 font-medium mb-1">Est. Returns</p>
                <p className="text-3xl font-bold">₹{Number(results.wealthGained).toLocaleString()}</p>
              </div>

              <div className="bg-white/10 p-4 rounded-xl border border-white/20 backdrop-blur-md">
                <p className="text-sm text-rose-100 font-medium mb-1">Total Value</p>
                <p className="text-4xl font-extrabold text-white tracking-tight">₹{Number(results.maturityValue).toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
