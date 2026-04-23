"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function BasicCalculatorPage() {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");
  const [isNewValue, setIsNewValue] = useState(true);

  const handleNumber = (num: string) => {
    if (isNewValue) {
      setDisplay(num);
      setIsNewValue(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleOperator = (op: string) => {
    setEquation(display + " " + op);
    setIsNewValue(true);
  };

  const calculate = () => {
    if (!equation) return;
    try {
      const fullEquation = equation + " " + display;
      // Note: Using eval for a simple client calculator
      // eslint-disable-next-line no-eval
      const result = eval(fullEquation.replace("×", "*").replace("÷", "/"));
      setDisplay(String(result));
      setEquation("");
      setIsNewValue(true);
    } catch {
      setDisplay("Error");
      setIsNewValue(true);
    }
  };

  const clear = () => {
    setDisplay("0");
    setEquation("");
    setIsNewValue(true);
  };

  return (
    <ToolLayout
      title="Basic Calculator"
      description="Perform basic arithmetic calculations with a clean interface"
      categoryName="Calculators"
      categoryPath="/calculators"
      slug="basic"
    >
      <div className="flex justify-center w-full">
        <Card className="w-full max-w-sm p-6 bg-card">
          <div className="bg-muted/50 p-4 rounded-xl mb-6 text-right space-y-1 h-24 flex flex-col justify-end">
            <div className="text-muted-foreground text-sm tracking-wider h-5">
              {equation}
            </div>
            <div className="text-4xl font-light tracking-tight truncate">
              {display}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <Button variant="secondary" onClick={clear} className="col-span-2 hover:bg-destructive/10 hover:text-destructive">AC</Button>
            <Button variant="secondary" onClick={() => handleOperator("%")}>%</Button>
            <Button variant="outline" className="text-primary border-primary/20 bg-primary/5 hover:bg-primary/10" onClick={() => handleOperator("/")}>÷</Button>

            <Button variant="ghost" className="text-lg bg-card hover:bg-accent" onClick={() => handleNumber("7")}>7</Button>
            <Button variant="ghost" className="text-lg bg-card hover:bg-accent" onClick={() => handleNumber("8")}>8</Button>
            <Button variant="ghost" className="text-lg bg-card hover:bg-accent" onClick={() => handleNumber("9")}>9</Button>
            <Button variant="outline" className="text-primary border-primary/20 bg-primary/5 hover:bg-primary/10" onClick={() => handleOperator("*")}>×</Button>

            <Button variant="ghost" className="text-lg bg-card hover:bg-accent" onClick={() => handleNumber("4")}>4</Button>
            <Button variant="ghost" className="text-lg bg-card hover:bg-accent" onClick={() => handleNumber("5")}>5</Button>
            <Button variant="ghost" className="text-lg bg-card hover:bg-accent" onClick={() => handleNumber("6")}>6</Button>
            <Button variant="outline" className="text-primary border-primary/20 bg-primary/5 hover:bg-primary/10" onClick={() => handleOperator("-")}>-</Button>

            <Button variant="ghost" className="text-lg bg-card hover:bg-accent" onClick={() => handleNumber("1")}>1</Button>
            <Button variant="ghost" className="text-lg bg-card hover:bg-accent" onClick={() => handleNumber("2")}>2</Button>
            <Button variant="ghost" className="text-lg bg-card hover:bg-accent" onClick={() => handleNumber("3")}>3</Button>
            <Button variant="outline" className="text-primary border-primary/20 bg-primary/5 hover:bg-primary/10" onClick={() => handleOperator("+")}>+</Button>

            <Button variant="ghost" className="col-span-2 text-lg bg-card hover:bg-accent" onClick={() => handleNumber("0")}>0</Button>
            <Button variant="ghost" className="text-lg bg-card hover:bg-accent" onClick={() => handleNumber(".")}>.</Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg shadow-sm" onClick={calculate}>=</Button>
          </div>
        </Card>
      </div>
    </ToolLayout>
  );
}
