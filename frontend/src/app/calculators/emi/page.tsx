"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export default function EMICalculatorPage() {
  const [principal, setPrincipal] = useState<number>(500000);
  const [rate, setRate] = useState<number>(8.5);
  const [tenure, setTenure] = useState<number>(5);

  // EMI Formula: P x R x (1+R)^N / [(1+R)^N-1]
  const calculateEMI = () => {
    const p = principal;
    const r = rate / 12 / 100;
    const n = tenure * 12;
    if (p === 0 || r === 0 || n === 0) return { emi: 0, totalInterest: 0, totalPayment: 0 };
    
    const emi = p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - p;
    
    return { emi, totalInterest, totalPayment };
  };

  const { emi, totalInterest, totalPayment } = calculateEMI();

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <ToolLayout
      title="EMI Calculator"
      description="Calculate your monthly loan EMI with detailed breakdown"
      categoryName="Calculators"
      categoryPath="/calculators"
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <Card className="lg:col-span-3">
          <CardContent className="p-6 space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label htmlFor="principal" className="text-base text-muted-foreground">Loan Amount</Label>
                <span className="font-semibold">{formatCurrency(principal)}</span>
              </div>
              <Slider
                id="principal"
                min={10000}
                max={10000000}
                step={10000}
                value={[principal]}
                onValueChange={(val) => setPrincipal((val as number[])[0])}
                className="py-1"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>₹10,000</span>
                <span>₹1 Cr</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <Label htmlFor="rate" className="text-base text-muted-foreground">Interest Rate (%)</Label>
                <span className="font-semibold">{rate}% p.a.</span>
              </div>
              <Slider
                id="rate"
                min={1}
                max={20}
                step={0.1}
                value={[rate]}
                onValueChange={(val) => setRate((val as number[])[0])}
                className="py-1"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1%</span>
                <span>20%</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <Label htmlFor="tenure" className="text-base text-muted-foreground">Loan Tenure (Years)</Label>
                <span className="font-semibold">{tenure} Years</span>
              </div>
              <Slider
                id="tenure"
                min={1}
                max={30}
                step={1}
                value={[tenure]}
                onValueChange={(val) => setTenure((val as number[])[0])}
                className="py-1"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1 Year</span>
                <span>30 Years</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Amount</Label>
                <Input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Rate %</Label>
                <Input type="number" value={rate} step="0.1" onChange={(e) => setRate(Number(e.target.value))} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Years</Label>
                <Input type="number" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 bg-muted/30">
          <CardContent className="p-6 h-full flex flex-col">
            <h3 className="text-lg font-semibold mb-6">EMI Breakdown</h3>
            
            <div className="flex-1 flex flex-col gap-6">
              <div className="bg-background rounded-xl p-6 border shadow-sm flex flex-col items-center justify-center text-center">
                <p className="text-sm text-muted-foreground mb-1">Monthly EMI</p>
                <p className="text-4xl font-bold text-primary tracking-tight">
                  {formatCurrency(emi)}
                </p>
              </div>

              <div className="space-y-4 flex-1 flex flex-col justify-center">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-primary/20"></span>
                    Principal Amount
                  </span>
                  <span className="font-medium">{formatCurrency(principal)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-primary"></span>
                    Total Interest
                  </span>
                  <span className="font-medium">{formatCurrency(totalInterest)}</span>
                </div>
                <div className="pt-4 border-t border-border/50 flex justify-between items-center">
                  <span className="font-medium text-foreground">Total Payment</span>
                  <span className="font-bold">{formatCurrency(totalPayment)}</span>
                </div>
              </div>

              {/* Progress bar representing ratio */}
              {totalPayment > 0 && (
                <div className="h-3 w-full rounded-full overflow-hidden flex">
                  <div 
                    className="bg-primary/30 h-full" 
                    style={{ width: `${(principal / totalPayment) * 100}%` }}
                    title="Principal"
                  />
                  <div 
                    className="bg-primary h-full" 
                    style={{ width: `${(totalInterest / totalPayment) * 100}%` }}
                    title="Interest"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
