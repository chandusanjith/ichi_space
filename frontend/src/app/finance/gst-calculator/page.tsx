"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function GSTCalculator() {
  const [amount, setAmount] = useState<number | "">(1000);
  const [gstRate, setGstRate] = useState<number>(18);
  const [calculationType, setCalculationType] = useState<"exclusive" | "inclusive">("exclusive");

  const calculateGST = () => {
    const validAmount = Number(amount) || 0;
    let netAmount = 0;
    let gstAmount = 0;
    let totalAmount = 0;

    if (calculationType === "exclusive") {
      netAmount = validAmount;
      gstAmount = (validAmount * gstRate) / 100;
      totalAmount = validAmount + gstAmount;
    } else {
      totalAmount = validAmount;
      gstAmount = validAmount - (validAmount * (100 / (100 + gstRate)));
      netAmount = validAmount - gstAmount;
    }

    return {
      netAmount: netAmount.toFixed(2),
      gstAmount: gstAmount.toFixed(2),
      cgstAmount: (gstAmount / 2).toFixed(2),
      sgstAmount: (gstAmount / 2).toFixed(2),
      totalAmount: totalAmount.toFixed(2)
    };
  };

  const results = calculateGST();

  return (
    <ToolLayout
      title="GST Calculator"
      description="Calculate GST inclusive and exclusive prices instantly"
      categoryName="Finance"
      categoryPath="/finance"
      slug="gst-calculator"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle>Calculation Details</CardTitle>
            <CardDescription>Enter the amount and select GST slab</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            
            <div className="space-y-4">
              <Label>GST Calculation Type</Label>
              <div className="flex gap-6 pt-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="calcType"
                    value="exclusive"
                    checked={calculationType === "exclusive"}
                    onChange={() => setCalculationType("exclusive")}
                    className="w-4 h-4 text-amber-600 focus:ring-amber-500"
                  />
                  <span>GST Exclusive (Add GST)</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="calcType"
                    value="inclusive"
                    checked={calculationType === "inclusive"}
                    onChange={() => setCalculationType("inclusive")}
                    className="w-4 h-4 text-amber-600 focus:ring-amber-500"
                  />
                  <span>GST Inclusive (Remove GST)</span>
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
                  className="pl-8 text-lg"
                  min={0}
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label>GST Slab</Label>
              <div className="grid grid-cols-5 gap-2">
                {[0.25, 3, 5, 12, 18, 28].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setGstRate(rate)}
                    className={`py-2 px-1 text-sm font-medium rounded-md transition-colors border ${
                      gstRate === rate 
                        ? 'bg-amber-500 text-white border-amber-600' 
                        : 'bg-muted/50 hover:bg-muted text-foreground'
                    }`}
                  >
                    {rate}%
                  </button>
                ))}
              </div>
            </div>

          </CardContent>
        </Card>

        <Card className="bg-amber-500 text-white shadow-md border-0">
          <CardHeader>
            <CardTitle className="text-white">Tax Breakdown</CardTitle>
            <CardDescription className="text-amber-100">At {gstRate}% GST Rate</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div className="bg-amber-600/50 p-4 rounded-xl border border-amber-400/30 backdrop-blur-sm flex justify-between items-center">
                <p className="text-amber-100 font-medium">Net Amount (Base Price)</p>
                <p className="text-xl font-bold">₹{results.netAmount}</p>
              </div>
              
              <div className="bg-amber-600/50 p-4 rounded-xl border border-amber-400/30 backdrop-blur-sm space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-amber-100 font-medium">Total GST</p>
                  <p className="text-xl font-bold">₹{results.gstAmount}</p>
                </div>
                <div className="flex justify-between items-center text-sm text-amber-200 border-t border-amber-500/50 pt-2">
                  <p>CGST ({(gstRate/2).toFixed(1)}%)</p>
                  <p>₹{results.cgstAmount}</p>
                </div>
                <div className="flex justify-between items-center text-sm text-amber-200">
                  <p>SGST ({(gstRate/2).toFixed(1)}%)</p>
                  <p>₹{results.sgstAmount}</p>
                </div>
              </div>

              <div className="bg-white/10 p-4 rounded-xl border border-white/20 backdrop-blur-md flex flex-col items-center py-6">
                <p className="text-sm text-amber-100 font-medium mb-1">Total Final Amount</p>
                <p className="text-5xl font-extrabold text-white tracking-tight">₹{results.totalAmount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
