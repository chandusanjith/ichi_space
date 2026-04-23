"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PercentageCalculatorPage() {
  // What is X% of Y?
  const [pOf, setPOf] = useState({ percent: 10, number: 200 });
  // X is what % of Y?
  const [pIs, setPIs] = useState({ part: 25, whole: 200 });
  // % increase/decrease from X to Y
  const [pChange, setPChange] = useState({ from: 100, to: 150 });

  const resultOf = (pOf.percent / 100) * pOf.number;
  const resultIs = (pIs.part / pIs.whole) * 100;
  const changePercent = ((pChange.to - pChange.from) / pChange.from) * 100;

  return (
    <ToolLayout
      title="Percentage Calculator"
      description="Calculate percentages, increases, and decreases"
      categoryName="Calculators"
      categoryPath="/calculators"
      slug="percentage"
    >
      <Tabs defaultValue="of" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="of">X% of Y</TabsTrigger>
          <TabsTrigger value="is">X is what %</TabsTrigger>
          <TabsTrigger value="change">% Change</TabsTrigger>
        </TabsList>

        <TabsContent value="of">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6 space-y-6">
                <h3 className="text-lg font-semibold">What is X% of Y?</h3>
                <div className="space-y-2">
                  <Label>Percentage (%)</Label>
                  <Input
                    type="number"
                    value={pOf.percent}
                    onChange={(e) => setPOf({ ...pOf, percent: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Number</Label>
                  <Input
                    type="number"
                    value={pOf.number}
                    onChange={(e) => setPOf({ ...pOf, number: Number(e.target.value) })}
                  />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-muted/30">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                <p className="text-sm text-muted-foreground mb-2">Result</p>
                <p className="text-5xl font-bold text-primary tracking-tight">
                  {isNaN(resultOf) ? "—" : resultOf.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                </p>
                <p className="text-muted-foreground mt-3 text-sm">
                  {pOf.percent}% of {pOf.number} = {resultOf.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="is">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6 space-y-6">
                <h3 className="text-lg font-semibold">X is what % of Y?</h3>
                <div className="space-y-2">
                  <Label>Part (X)</Label>
                  <Input
                    type="number"
                    value={pIs.part}
                    onChange={(e) => setPIs({ ...pIs, part: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Whole (Y)</Label>
                  <Input
                    type="number"
                    value={pIs.whole}
                    onChange={(e) => setPIs({ ...pIs, whole: Number(e.target.value) })}
                  />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-muted/30">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                <p className="text-sm text-muted-foreground mb-2">Result</p>
                <p className="text-5xl font-bold text-primary tracking-tight">
                  {isNaN(resultIs) ? "—" : resultIs.toFixed(2)}%
                </p>
                <p className="text-muted-foreground mt-3 text-sm">
                  {pIs.part} is {resultIs.toFixed(2)}% of {pIs.whole}
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="change">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6 space-y-6">
                <h3 className="text-lg font-semibold">Percentage Change</h3>
                <div className="space-y-2">
                  <Label>From</Label>
                  <Input
                    type="number"
                    value={pChange.from}
                    onChange={(e) => setPChange({ ...pChange, from: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>To</Label>
                  <Input
                    type="number"
                    value={pChange.to}
                    onChange={(e) => setPChange({ ...pChange, to: Number(e.target.value) })}
                  />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-muted/30">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                <p className="text-sm text-muted-foreground mb-2">
                  {changePercent >= 0 ? "Increase" : "Decrease"}
                </p>
                <p className={`text-5xl font-bold tracking-tight ${changePercent >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                  {isNaN(changePercent) ? "—" : `${changePercent >= 0 ? "+" : ""}${changePercent.toFixed(2)}%`}
                </p>
                <p className="text-muted-foreground mt-3 text-sm">
                  Difference: {isNaN(pChange.to - pChange.from) ? "—" : (pChange.to - pChange.from).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </ToolLayout>
  );
}
