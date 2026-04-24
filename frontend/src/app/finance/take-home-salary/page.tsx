"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function TakeHomeSalary() {
  const [grossSalary, setGrossSalary] = useState<number | "">(1200000);
  const [pfDeduction, setPfDeduction] = useState<number | "">(21600);
  const [taxDeduction, setTaxDeduction] = useState<number | "">(100000);
  const [otherDeductions, setOtherDeductions] = useState<number | "">(0);

  const calculateSalary = () => {
    const gross = Number(grossSalary) || 0;
    const pf = Number(pfDeduction) || 0;
    const tax = Number(taxDeduction) || 0;
    const other = Number(otherDeductions) || 0;

    const totalDeductions = pf + tax + other;
    const netYearly = gross - totalDeductions;
    
    return {
      grossMonthly: (gross / 12).toFixed(0),
      pfMonthly: (pf / 12).toFixed(0),
      taxMonthly: (tax / 12).toFixed(0),
      otherMonthly: (other / 12).toFixed(0),
      totalDeductionsYearly: totalDeductions.toFixed(0),
      totalDeductionsMonthly: (totalDeductions / 12).toFixed(0),
      netYearly: netYearly.toFixed(0),
      netMonthly: (netYearly / 12).toFixed(0)
    };
  };

  const res = calculateSalary();

  return (
    <ToolLayout
      title="Take-Home Salary Calculator"
      description="Calculate your net take-home pay from gross salary"
      categoryName="Finance"
      categoryPath="/finance"
      slug="take-home-salary"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle>Salary Details</CardTitle>
            <CardDescription>Enter your annual figures</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label>Gross Annual Salary (CTC/Gross)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                <Input
                  type="number"
                  value={grossSalary}
                  onChange={(e) => setGrossSalary(e.target.value === "" ? "" : Number(e.target.value))}
                  className="pl-8 font-medium"
                />
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t">
              <h4 className="text-sm font-semibold mb-2">Annual Deductions</h4>
              
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Provident Fund (PF)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                    <Input
                      type="number"
                      value={pfDeduction}
                      onChange={(e) => setPfDeduction(e.target.value === "" ? "" : Number(e.target.value))}
                      className="pl-8"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Income Tax (TDS)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                    <Input
                      type="number"
                      value={taxDeduction}
                      onChange={(e) => setTaxDeduction(e.target.value === "" ? "" : Number(e.target.value))}
                      className="pl-8"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Other Deductions (Insurance, etc.)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                    <Input
                      type="number"
                      value={otherDeductions}
                      onChange={(e) => setOtherDeductions(e.target.value === "" ? "" : Number(e.target.value))}
                      className="pl-8"
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 text-white shadow-xl border-0 overflow-hidden">
          <div className="absolute top-0 right-0 p-32 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <CardHeader className="relative z-10">
            <CardTitle className="text-slate-100">Your Take-Home Pay</CardTitle>
            <CardDescription className="text-slate-400">Monthly breakdown</CardDescription>
          </CardHeader>
          <CardContent className="relative z-10 space-y-6">
            
            <div className="bg-emerald-500/20 border border-emerald-500/30 p-6 rounded-2xl flex flex-col items-center">
              <p className="text-emerald-200 font-medium mb-1">Monthly In-Hand Salary</p>
              <p className="text-5xl font-extrabold tracking-tight text-white">₹{Number(res.netMonthly).toLocaleString()}</p>
              <p className="text-sm text-emerald-300 mt-2">₹{Number(res.netYearly).toLocaleString()} / year</p>
            </div>

            <div className="space-y-3 bg-slate-800/50 p-5 rounded-xl border border-slate-700/50">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300">Gross Monthly</span>
                <span className="font-semibold">₹{Number(res.grossMonthly).toLocaleString()}</span>
              </div>
              
              <div className="pt-2 pb-2 border-y border-slate-700 space-y-2 text-sm">
                <div className="flex justify-between items-center text-red-300/80">
                  <span>- Tax (TDS)</span>
                  <span>₹{Number(res.taxMonthly).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-red-300/80">
                  <span>- PF Deduction</span>
                  <span>₹{Number(res.pfMonthly).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-red-300/80">
                  <span>- Other Deductions</span>
                  <span>₹{Number(res.otherMonthly).toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm font-medium text-slate-300">
                <span>Total Monthly Deductions</span>
                <span>₹{Number(res.totalDeductionsMonthly).toLocaleString()}</span>
              </div>
            </div>

          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
