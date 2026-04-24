"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function IncomeTaxCalculator() {
  const [income, setIncome] = useState<number | "">(800000);
  const [deductions80C, setDeductions80C] = useState<number | "">(150000);
  const [otherDeductions, setOtherDeductions] = useState<number | "">(50000);
  
  const standardDeduction = 50000;

  const calculateOldRegime = (grossIncome: number) => {
    let taxable = grossIncome - standardDeduction - Number(deductions80C) - Number(otherDeductions);
    if (taxable < 0) taxable = 0;
    
    if (taxable <= 500000) return 0; // 87A Rebate

    let tax = 0;
    if (taxable > 1000000) {
      tax += (taxable - 1000000) * 0.3;
      tax += 500000 * 0.2;
      tax += 250000 * 0.05;
    } else if (taxable > 500000) {
      tax += (taxable - 500000) * 0.2;
      tax += 250000 * 0.05;
    } else if (taxable > 250000) {
      tax += (taxable - 250000) * 0.05;
    }

    return tax * 1.04; // 4% Health & Education Cess
  };

  const calculateNewRegime = (grossIncome: number) => {
    // New regime FY 2023-24 onwards
    let taxable = grossIncome - standardDeduction;
    if (taxable < 0) taxable = 0;

    if (taxable <= 700000) return 0; // 87A Rebate for New Regime

    let tax = 0;
    if (taxable > 1500000) {
      tax += (taxable - 1500000) * 0.3;
      tax += 300000 * 0.2;
      tax += 300000 * 0.15;
      tax += 300000 * 0.1;
      tax += 300000 * 0.05;
    } else if (taxable > 1200000) {
      tax += (taxable - 1200000) * 0.2;
      tax += 300000 * 0.15;
      tax += 300000 * 0.1;
      tax += 300000 * 0.05;
    } else if (taxable > 900000) {
      tax += (taxable - 900000) * 0.15;
      tax += 300000 * 0.1;
      tax += 300000 * 0.05;
    } else if (taxable > 600000) {
      tax += (taxable - 600000) * 0.1;
      tax += 300000 * 0.05;
    } else if (taxable > 300000) {
      tax += (taxable - 300000) * 0.05;
    }

    return tax * 1.04; // 4% Health & Education Cess
  };

  const validIncome = Number(income) || 0;
  const oldTax = Math.round(calculateOldRegime(validIncome));
  const newTax = Math.round(calculateNewRegime(validIncome));

  const difference = Math.abs(oldTax - newTax);
  const betterRegime = oldTax < newTax ? "Old Regime" : newTax < oldTax ? "New Regime" : "Both are equal";

  return (
    <ToolLayout
      title="Income Tax Calculator"
      description="Compare tax liabilities under Old vs New tax regimes"
      categoryName="Finance"
      categoryPath="/finance"
      slug="income-tax"
    >
      <div className="grid gap-6 lg:grid-cols-12">
        <Card className="lg:col-span-5 border-border shadow-sm">
          <CardHeader>
            <CardTitle>Income & Deductions</CardTitle>
            <CardDescription>Enter details for FY 2024-25</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label>Gross Annual Income</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                <Input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(e.target.value === "" ? "" : Number(e.target.value))}
                  className="pl-8"
                  min={0}
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label>80C Deductions (Max 1.5L)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                <Input
                  type="number"
                  value={deductions80C}
                  onChange={(e) => setDeductions80C(e.target.value === "" ? "" : Number(e.target.value))}
                  className="pl-8"
                  min={0}
                />
              </div>
              <p className="text-xs text-muted-foreground">PPF, ELSS, Life Insurance, EPF, etc.</p>
            </div>

            <div className="space-y-3">
              <Label>Other Deductions (80D, HRA, etc.)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                <Input
                  type="number"
                  value={otherDeductions}
                  onChange={(e) => setOtherDeductions(e.target.value === "" ? "" : Number(e.target.value))}
                  className="pl-8"
                  min={0}
                />
              </div>
              <p className="text-xs text-muted-foreground">Standard Deduction of ₹50,000 is applied automatically to both regimes.</p>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-7 grid gap-6">
          <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md border-0">
            <CardHeader>
              <CardTitle className="text-white">Tax Comparison</CardTitle>
              <CardDescription className="text-indigo-100">Estimated Total Tax (including Cess)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className={`p-6 rounded-2xl border ${oldTax <= newTax ? 'bg-white/20 border-white/40 ring-2 ring-white' : 'bg-black/10 border-black/10'}`}>
                  <p className="text-sm font-medium text-indigo-100 mb-2">Old Regime</p>
                  <p className="text-4xl font-bold tracking-tight">₹{oldTax.toLocaleString()}</p>
                </div>
                
                <div className={`p-6 rounded-2xl border ${newTax <= oldTax ? 'bg-white/20 border-white/40 ring-2 ring-white' : 'bg-black/10 border-black/10'}`}>
                  <p className="text-sm font-medium text-indigo-100 mb-2">New Regime</p>
                  <p className="text-4xl font-bold tracking-tight">₹{newTax.toLocaleString()}</p>
                </div>
              </div>

              {difference > 0 && (
                <div className="mt-6 text-center bg-white/10 p-4 rounded-xl">
                  <p className="font-medium">
                    You save <span className="font-bold text-xl text-green-300">₹{difference.toLocaleString()}</span> with the {betterRegime}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
