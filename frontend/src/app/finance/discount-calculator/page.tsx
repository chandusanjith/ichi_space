"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tag, Percent } from "lucide-react";

export default function DiscountCalculatorPage() {
  const [price, setPrice] = useState(1000);
  const [discount, setDiscount] = useState(20);

  const savings = (price * discount) / 100;
  const finalPrice = price - savings;

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(val);

  return (
    <ToolLayout
      title="Discount Calculator"
      description="Calculate discounts and savings instantly"
      categoryName="Finance"
      categoryPath="/finance"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-6 space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>Original Price</Label>
                <span className="font-semibold">{formatCurrency(price)}</span>
              </div>
              <Slider min={1} max={100000} step={100} value={[price]} onValueChange={(v) => setPrice((v as number[])[0])} />
              <Input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>Discount</Label>
                <span className="font-semibold">{discount}%</span>
              </div>
              <Slider min={0} max={100} step={1} value={[discount]} onValueChange={(v) => setDiscount((v as number[])[0])} />
              <Input type="number" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} />
            </div>

            {/* Quick discount buttons */}
            <div className="flex flex-wrap gap-2">
              {[5, 10, 15, 20, 25, 30, 40, 50, 60, 75].map((d) => (
                <button
                  key={d}
                  onClick={() => setDiscount(d)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                    discount === d
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted/50 hover:bg-muted border-border"
                  }`}
                >
                  {d}%
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted/30">
          <CardContent className="p-6 h-full flex flex-col justify-center space-y-6">
            <div className="bg-background rounded-xl p-6 border shadow-sm text-center">
              <p className="text-sm text-muted-foreground mb-1">Final Price</p>
              <p className="text-5xl font-bold text-primary tracking-tight">{formatCurrency(finalPrice)}</p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center bg-background rounded-lg p-4 border">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Tag className="h-4 w-4" /> Original Price
                </span>
                <span className="font-medium">{formatCurrency(price)}</span>
              </div>
              <div className="flex justify-between items-center bg-background rounded-lg p-4 border">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Percent className="h-4 w-4" /> Discount ({discount}%)
                </span>
                <span className="font-medium text-emerald-500">-{formatCurrency(savings)}</span>
              </div>
              <div className="pt-2 border-t flex justify-between items-center font-bold">
                <span>You Save</span>
                <span className="text-emerald-500 text-lg">{formatCurrency(savings)}</span>
              </div>
            </div>

            {/* Visual savings bar */}
            <div className="space-y-2">
              <div className="h-4 rounded-full overflow-hidden flex bg-muted">
                <div
                  className="bg-primary h-full transition-all duration-300"
                  style={{ width: `${100 - discount}%` }}
                />
                <div
                  className="bg-emerald-500 h-full transition-all duration-300"
                  style={{ width: `${discount}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>You pay: {100 - discount}%</span>
                <span>You save: {discount}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
