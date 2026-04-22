"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gem, TrendingUp, Calculator } from "lucide-react";

// Static data - in production, this would be fetched from an API
const GOLD_PRICES = {
  "24K": { per_gram: 7150, per_10g: 71500, per_oz: 222350 },
  "22K": { per_gram: 6555, per_10g: 65550, per_oz: 203850 },
  "18K": { per_gram: 5363, per_10g: 53630, per_oz: 166750 },
};

const CITIES = [
  { name: "Mumbai", diff: 0 },
  { name: "Delhi", diff: -50 },
  { name: "Bangalore", diff: 30 },
  { name: "Chennai", diff: 20 },
  { name: "Kolkata", diff: -30 },
  { name: "Hyderabad", diff: 10 },
];

export default function GoldPricePage() {
  const [purity, setPurity] = useState<"24K" | "22K" | "18K">("24K");
  const [weight, setWeight] = useState(10);

  const prices = GOLD_PRICES[purity];
  const totalValue = prices.per_gram * weight;

  return (
    <ToolLayout
      title="Gold Price Tracker"
      description="Track live gold prices and calculate value"
      categoryName="Finance"
      categoryPath="/finance"
    >
      <div className="space-y-8">
        {/* Price cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {(["24K", "22K", "18K"] as const).map((p) => (
            <Card key={p} className={`cursor-pointer transition-all ${purity === p ? "border-primary shadow-md" : "hover:border-primary/30"}`} onClick={() => setPurity(p)}>
              <CardContent className="p-5 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Gem className={`h-5 w-5 ${p === "24K" ? "text-yellow-500" : p === "22K" ? "text-amber-500" : "text-orange-400"}`} />
                  <span className="font-semibold">{p} Gold</span>
                </div>
                <p className="text-3xl font-bold tracking-tight">₹{GOLD_PRICES[p].per_gram.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">per gram</p>
                <p className="text-sm text-muted-foreground mt-2">
                  ₹{GOLD_PRICES[p].per_10g.toLocaleString()}/10g
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator */}
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <Calculator className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Gold Value Calculator</h3>
              </div>

              <div className="space-y-2">
                <Label>Weight (grams)</Label>
                <Input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} min={0.1} step={0.5} />
              </div>

              <Tabs value={purity} onValueChange={(v) => setPurity(v as "24K" | "22K" | "18K")}>
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="24K">24K</TabsTrigger>
                  <TabsTrigger value="22K">22K</TabsTrigger>
                  <TabsTrigger value="18K">18K</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="bg-muted/50 rounded-xl p-6 border text-center">
                <p className="text-sm text-muted-foreground mb-1">Estimated Value</p>
                <p className="text-4xl font-bold text-primary">
                  ₹{totalValue.toLocaleString("en-IN")}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {weight}g × ₹{prices.per_gram.toLocaleString()} ({purity})
                </p>
              </div>
            </CardContent>
          </Card>

          {/* City-wise prices */}
          <Card className="bg-muted/30">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold">City-wise Prices ({purity})</h3>
              <div className="space-y-3">
                {CITIES.map((city) => (
                  <div key={city.name} className="flex items-center justify-between bg-background rounded-lg p-3 border">
                    <span className="text-sm font-medium">{city.name}</span>
                    <div className="text-right">
                      <p className="font-semibold text-sm">
                        ₹{(prices.per_gram + city.diff).toLocaleString()}/g
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ₹{((prices.per_gram + city.diff) * 10).toLocaleString()}/10g
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground text-center">
                * Prices are indicative and may vary. Last updated: Today
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
