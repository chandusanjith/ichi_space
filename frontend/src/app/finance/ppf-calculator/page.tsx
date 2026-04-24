"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export default function PPFCalculator() {
  const [yearlyInvestment, setYearlyInvestment] = useState(150000);
  const [years, setYears] = useState(15);
  const returnRate = 7.1; // PPF standard rate

  const calculatePPF = () => {
    const rate = returnRate / 100;
    const totalInvestment = yearlyInvestment * years;
    
    let maturityValue = yearlyInvestment * ((Math.pow(1 + rate, years) - 1) / rate) * (1 + rate);
    const wealthGained = maturityValue - totalInvestment;

    return {
      totalInvestment: totalInvestment.toFixed(0),
      maturityValue: maturityValue.toFixed(0),
      wealthGained: wealthGained.toFixed(0)
    };
  };

  const results = calculatePPF();

  return (
    <ToolLayout
      title="PPF Calculator"
      description="Estimate your Public Provident Fund maturity amount"
      categoryName="Finance"
      categoryPath="/finance"
      slug="ppf-calculator"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle>Investment Details</CardTitle>
            <CardDescription>PPF Interest rate is fixed at {returnRate}%</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>Yearly Investment (₹500 - ₹1.5L)</Label>
                <span className="font-semibold text-blue-600 dark:text-blue-400">₹{yearlyInvestment.toLocaleString()}</span>
              </div>
              <Slider
                value={[yearlyInvestment]}
                onValueChange={(val) => setYearlyInvestment(Array.isArray(val) ? val[0] : val)}
                min={500}
                max={150000}
                step={500}
                className="[&_[role=slider]]:bg-blue-600"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>Time Period (Years)</Label>
                <span className="font-semibold text-blue-600 dark:text-blue-400">{years} Years</span>
              </div>
              <Slider
                value={[years]}
                onValueChange={(val) => setYears(Array.isArray(val) ? val[0] : val)}
                min={15}
                max={50}
                step={5}
                className="[&_[role=slider]]:bg-blue-600"
              />
            </div>
            
            <div className="p-4 bg-muted/50 rounded-xl border">
              <p className="text-sm text-muted-foreground text-center">
                Investments over ₹1,50,000 do not earn interest and are not eligible for tax deductions under section 80C.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-600 text-white shadow-md border-0">
          <CardHeader>
            <CardTitle className="text-white">PPF Returns</CardTitle>
            <CardDescription className="text-blue-100">Tax-free maturity value after {years} years</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div className="bg-blue-700/50 p-4 rounded-xl border border-blue-500/30 backdrop-blur-sm">
                <p className="text-sm text-blue-100 font-medium mb-1">Total Investment</p>
                <p className="text-3xl font-bold">₹{Number(results.totalInvestment).toLocaleString()}</p>
              </div>
              
              <div className="bg-blue-700/50 p-4 rounded-xl border border-blue-500/30 backdrop-blur-sm">
                <p className="text-sm text-blue-100 font-medium mb-1">Total Interest Earned</p>
                <p className="text-3xl font-bold">₹{Number(results.wealthGained).toLocaleString()}</p>
              </div>

              <div className="bg-white/10 p-4 rounded-xl border border-white/20 backdrop-blur-md">
                <p className="text-sm text-blue-100 font-medium mb-1">Maturity Value</p>
                <p className="text-4xl font-extrabold text-white tracking-tight">₹{Number(results.maturityValue).toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
