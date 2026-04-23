"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Fuel, TrendingUp, TrendingDown, MapPin } from "lucide-react";

// Static data - in production, this would come from an API
const FUEL_DATA = [
  { city: "Mumbai", petrol: 103.44, diesel: 89.97, change: -0.16 },
  { city: "Delhi", petrol: 94.72, diesel: 87.62, change: 0.00 },
  { city: "Bangalore", petrol: 101.94, diesel: 87.89, change: -0.10 },
  { city: "Chennai", petrol: 102.63, diesel: 94.24, change: 0.00 },
  { city: "Kolkata", petrol: 104.95, diesel: 91.76, change: 0.12 },
  { city: "Hyderabad", petrol: 109.66, diesel: 97.82, change: -0.05 },
  { city: "Pune", petrol: 103.31, diesel: 89.82, change: -0.16 },
  { city: "Ahmedabad", petrol: 94.27, diesel: 90.32, change: 0.00 },
  { city: "Jaipur", petrol: 104.88, diesel: 90.36, change: 0.08 },
  { city: "Lucknow", petrol: 94.63, diesel: 87.40, change: 0.00 },
  { city: "Chandigarh", petrol: 96.20, diesel: 84.26, change: -0.05 },
  { city: "Bhopal", petrol: 108.65, diesel: 93.71, change: 0.00 },
];

export default function FuelPricePage() {
  const [fuelType, setFuelType] = useState<"petrol" | "diesel">("petrol");

  const avgPrice = FUEL_DATA.reduce((sum, d) => sum + d[fuelType], 0) / FUEL_DATA.length;
  const maxPrice = Math.max(...FUEL_DATA.map(d => d[fuelType]));
  const minPrice = Math.min(...FUEL_DATA.map(d => d[fuelType]));

  return (
    <ToolLayout
      title="Fuel Price Tracker"
      description="Track fuel prices across Indian cities"
      categoryName="Finance"
      categoryPath="/finance"
      slug="fuel-price"
    >
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Tabs value={fuelType} onValueChange={(v) => setFuelType(v as "petrol" | "diesel")}>
            <TabsList>
              <TabsTrigger value="petrol">⛽ Petrol</TabsTrigger>
              <TabsTrigger value="diesel">🛢️ Diesel</TabsTrigger>
            </TabsList>
          </Tabs>
          <p className="text-xs text-muted-foreground">Prices in ₹ per litre • Indicative rates</p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-5 text-center">
              <p className="text-sm text-muted-foreground mb-1">Average Price</p>
              <p className="text-3xl font-bold text-primary">₹{avgPrice.toFixed(2)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5 text-center">
              <p className="text-sm text-muted-foreground mb-1">Lowest</p>
              <p className="text-3xl font-bold text-emerald-500">₹{minPrice.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground">{FUEL_DATA.find(d => d[fuelType] === minPrice)?.city}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5 text-center">
              <p className="text-sm text-muted-foreground mb-1">Highest</p>
              <p className="text-3xl font-bold text-red-500">₹{maxPrice.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground">{FUEL_DATA.find(d => d[fuelType] === maxPrice)?.city}</p>
            </CardContent>
          </Card>
        </div>

        {/* City-wise prices */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-3">
              {FUEL_DATA.sort((a, b) => a[fuelType] - b[fuelType]).map((data) => {
                const widthPercent = ((data[fuelType] - minPrice) / (maxPrice - minPrice)) * 100;
                return (
                  <div key={data.city} className="flex items-center gap-4 group">
                    <div className="w-28 shrink-0 flex items-center gap-2">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm font-medium">{data.city}</span>
                    </div>
                    <div className="flex-1 bg-muted/50 rounded-full h-6 overflow-hidden relative">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary/40 to-primary transition-all duration-500"
                        style={{ width: `${Math.max(widthPercent, 8)}%` }}
                      />
                    </div>
                    <div className="w-20 text-right shrink-0">
                      <span className="font-semibold text-sm">₹{data[fuelType].toFixed(2)}</span>
                    </div>
                    <div className="w-16 text-right shrink-0">
                      {data.change !== 0 ? (
                        <span className={`text-xs flex items-center justify-end gap-0.5 ${data.change > 0 ? "text-red-500" : "text-emerald-500"}`}>
                          {data.change > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                          {Math.abs(data.change).toFixed(2)}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
