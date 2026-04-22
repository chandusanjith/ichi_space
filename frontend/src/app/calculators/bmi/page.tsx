"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function getBMICategory(bmi: number) {
  if (bmi < 16) return { label: "Severe Thinness", color: "text-red-500", bg: "bg-red-500" };
  if (bmi < 17) return { label: "Moderate Thinness", color: "text-orange-500", bg: "bg-orange-500" };
  if (bmi < 18.5) return { label: "Mild Thinness", color: "text-yellow-500", bg: "bg-yellow-500" };
  if (bmi < 25) return { label: "Normal", color: "text-emerald-500", bg: "bg-emerald-500" };
  if (bmi < 30) return { label: "Overweight", color: "text-yellow-500", bg: "bg-yellow-500" };
  if (bmi < 35) return { label: "Obese Class I", color: "text-orange-500", bg: "bg-orange-500" };
  if (bmi < 40) return { label: "Obese Class II", color: "text-red-500", bg: "bg-red-500" };
  return { label: "Obese Class III", color: "text-red-600", bg: "bg-red-600" };
}

export default function BMICalculatorPage() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [feet, setFeet] = useState(5);
  const [inches, setInches] = useState(7);
  const [lbs, setLbs] = useState(154);

  const calculateBMI = () => {
    if (unit === "metric") {
      const heightM = height / 100;
      return weight / (heightM * heightM);
    } else {
      const totalInches = feet * 12 + inches;
      return (lbs / (totalInches * totalInches)) * 703;
    }
  };

  const bmi = calculateBMI();
  const category = getBMICategory(bmi);

  // Ideal weight range (BMI 18.5-25) in current unit
  const idealRange =
    unit === "metric"
      ? {
          min: (18.5 * (height / 100) * (height / 100)).toFixed(1),
          max: (25 * (height / 100) * (height / 100)).toFixed(1),
        }
      : {
          min: ((18.5 * (feet * 12 + inches) * (feet * 12 + inches)) / 703).toFixed(1),
          max: ((25 * (feet * 12 + inches) * (feet * 12 + inches)) / 703).toFixed(1),
        };

  // Gauge position (clamped between 10 and 50)
  const gaugePercent = Math.min(Math.max(((bmi - 10) / 40) * 100, 0), 100);

  return (
    <ToolLayout
      title="BMI Calculator"
      description="Calculate your Body Mass Index and health category"
      categoryName="Calculators"
      categoryPath="/calculators"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-6 space-y-6">
            <Tabs value={unit} onValueChange={(v) => setUnit(v as "metric" | "imperial")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="metric">Metric (kg/cm)</TabsTrigger>
                <TabsTrigger value="imperial">Imperial (lb/ft)</TabsTrigger>
              </TabsList>

              <TabsContent value="metric" className="space-y-6 mt-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Label>Weight</Label>
                    <span className="font-semibold">{weight} kg</span>
                  </div>
                  <Slider min={30} max={200} step={1} value={[weight]} onValueChange={(v) => setWeight((v as number[])[0])} />
                  <Input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Label>Height</Label>
                    <span className="font-semibold">{height} cm</span>
                  </div>
                  <Slider min={100} max={250} step={1} value={[height]} onValueChange={(v) => setHeight((v as number[])[0])} />
                  <Input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} />
                </div>
              </TabsContent>

              <TabsContent value="imperial" className="space-y-6 mt-6">
                <div className="space-y-4">
                  <Label>Weight (lbs)</Label>
                  <Input type="number" value={lbs} onChange={(e) => setLbs(Number(e.target.value))} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Feet</Label>
                    <Input type="number" value={feet} onChange={(e) => setFeet(Number(e.target.value))} />
                  </div>
                  <div className="space-y-2">
                    <Label>Inches</Label>
                    <Input type="number" value={inches} onChange={(e) => setInches(Number(e.target.value))} />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="bg-muted/30">
          <CardContent className="p-6 space-y-6">
            <div className="bg-background rounded-xl p-6 border shadow-sm text-center">
              <p className="text-sm text-muted-foreground mb-2">Your BMI</p>
              <p className="text-5xl font-bold tracking-tight mb-2">
                <span className={category.color}>{bmi.toFixed(1)}</span>
              </p>
              <p className={`text-sm font-medium ${category.color}`}>{category.label}</p>
            </div>

            {/* BMI Gauge */}
            <div className="space-y-2">
              <div className="relative h-4 rounded-full overflow-hidden flex">
                <div className="flex-1 bg-blue-400" />
                <div className="flex-1 bg-emerald-400" />
                <div className="flex-1 bg-yellow-400" />
                <div className="flex-1 bg-orange-400" />
                <div className="flex-1 bg-red-400" />
              </div>
              <div className="relative h-4">
                <div
                  className="absolute top-0 w-3 h-3 rounded-full bg-foreground border-2 border-background shadow-md -translate-x-1/2"
                  style={{ left: `${gaugePercent}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>Underweight</span>
                <span>Normal</span>
                <span>Overweight</span>
                <span>Obese</span>
              </div>
            </div>

            <div className="bg-background rounded-lg p-4 border space-y-2">
              <p className="text-sm font-medium">Healthy Weight Range</p>
              <p className="text-muted-foreground text-sm">
                {idealRange.min} – {idealRange.max} {unit === "metric" ? "kg" : "lbs"}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                { range: "< 18.5", label: "Underweight", color: "bg-blue-400" },
                { range: "18.5 – 25", label: "Normal", color: "bg-emerald-400" },
                { range: "25 – 30", label: "Overweight", color: "bg-yellow-400" },
                { range: "> 30", label: "Obese", color: "bg-red-400" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="ml-auto font-medium">{item.range}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
