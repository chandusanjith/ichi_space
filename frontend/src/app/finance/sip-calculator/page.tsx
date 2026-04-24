"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export default function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [returnRate, setReturnRate] = useState(12);
  const [years, setYears] = useState(10);

  const calculateSIP = () => {
    const monthlyRate = returnRate / 12 / 100;
    const months = years * 12;
    const totalInvestment = monthlyInvestment * months;
    
    let maturityValue = 0;
    if (monthlyRate === 0) {
      maturityValue = totalInvestment;
    } else {
      maturityValue = monthlyInvestment * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate * (1 + monthlyRate);
    }
    
    const wealthGained = maturityValue - totalInvestment;

    return {
      totalInvestment: totalInvestment.toFixed(0),
      maturityValue: maturityValue.toFixed(0),
      wealthGained: wealthGained.toFixed(0)
    };
  };

  const results = calculateSIP();

  return (
    <ToolLayout
      title="SIP Calculator"
      description="Calculate mutual fund SIP returns and wealth generation"
      categoryName="Finance"
      categoryPath="/finance"
      slug="sip-calculator"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle>Investment Details</CardTitle>
            <CardDescription>Adjust the sliders to estimate your returns</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>Monthly Investment</Label>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">₹{monthlyInvestment.toLocaleString()}</span>
              </div>
              <Slider
                value={[monthlyInvestment]}
                onValueChange={(val) => setMonthlyInvestment(Array.isArray(val) ? val[0] : val)}
                min={500}
                max={100000}
                step={500}
                className="[&_[role=slider]]:bg-emerald-600"
              />
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>Expected Return Rate (p.a)</Label>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">{returnRate}%</span>
              </div>
              <Slider
                value={[returnRate]}
                onValueChange={(val) => setReturnRate(Array.isArray(val) ? val[0] : val)}
                min={1}
                max={30}
                step={0.5}
                className="[&_[role=slider]]:bg-emerald-600"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>Time Period</Label>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">{years} Years</span>
              </div>
              <Slider
                value={[years]}
                onValueChange={(val) => setYears(Array.isArray(val) ? val[0] : val)}
                min={1}
                max={40}
                step={1}
                className="[&_[role=slider]]:bg-emerald-600"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-emerald-500 text-white shadow-md border-0">
          <CardHeader>
            <CardTitle className="text-white">Estimated Returns</CardTitle>
            <CardDescription className="text-emerald-100">Projected wealth after {years} years</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div className="bg-emerald-600/50 p-4 rounded-xl border border-emerald-400/30 backdrop-blur-sm">
                <p className="text-sm text-emerald-100 font-medium mb-1">Total Investment</p>
                <p className="text-3xl font-bold">₹{Number(results.totalInvestment).toLocaleString()}</p>
              </div>
              
              <div className="bg-emerald-600/50 p-4 rounded-xl border border-emerald-400/30 backdrop-blur-sm">
                <p className="text-sm text-emerald-100 font-medium mb-1">Est. Returns</p>
                <p className="text-3xl font-bold">₹{Number(results.wealthGained).toLocaleString()}</p>
              </div>

              <div className="bg-white/10 p-4 rounded-xl border border-white/20 backdrop-blur-md">
                <p className="text-sm text-emerald-100 font-medium mb-1">Total Value</p>
                <p className="text-4xl font-extrabold text-white tracking-tight">₹{Number(results.maturityValue).toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
