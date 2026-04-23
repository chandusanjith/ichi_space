"use client";

import { useState, useEffect, useCallback } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight, Loader2, RefreshCw } from "lucide-react";

const POPULAR_CURRENCIES = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$" },
];

// Fallback static rates (relative to USD)
const FALLBACK_RATES: Record<string, number> = {
  USD: 1, EUR: 0.92, GBP: 0.79, INR: 83.5, JPY: 149.5,
  AUD: 1.53, CAD: 1.36, CHF: 0.88, CNY: 7.24, AED: 3.67,
  SGD: 1.34, BRL: 4.97,
};

export default function CurrencyConverterPage() {
  const [amount, setAmount] = useState(1000);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [rates, setRates] = useState<Record<string, number>>(FALLBACK_RATES);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>("Using offline rates");

  const fetchRates = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);
      const data = await res.json();
      setRates(data.rates);
      setLastUpdated(`Updated: ${new Date().toLocaleTimeString()}`);
    } catch {
      setRates(FALLBACK_RATES);
      setLastUpdated("Using offline rates");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRates();
  }, [fetchRates]);

  const convert = (amt: number, fromCur: string, toCur: string) => {
    if (!rates[fromCur] || !rates[toCur]) return 0;
    return (amt / rates[fromCur]) * rates[toCur];
  };

  const result = convert(amount, from, to);
  const rate1 = convert(1, from, to);
  const rateInverse = convert(1, to, from);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <ToolLayout
      title="Currency Converter"
      description="Convert between 160+ world currencies with live rates"
      categoryName="Calculators"
      categoryPath="/calculators"
      slug="currency-converter"
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <Card className="lg:col-span-3">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Convert Currency</h3>
              <Button variant="ghost" size="sm" onClick={fetchRates} disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                <span className="ml-2 text-xs">{lastUpdated}</span>
              </Button>
            </div>

            <div className="space-y-2">
              <Label>Amount</Label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="text-2xl h-14 font-semibold"
              />
            </div>

            <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-end">
              <div className="space-y-2">
                <Label>From</Label>
                <select
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {POPULAR_CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
                  ))}
                </select>
              </div>

              <Button variant="outline" size="icon" onClick={swap} className="mb-0.5">
                <ArrowLeftRight className="h-4 w-4" />
              </Button>

              <div className="space-y-2">
                <Label>To</Label>
                <select
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {POPULAR_CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 bg-muted/30">
          <CardContent className="p-6 h-full flex flex-col justify-center space-y-6">
            <div className="bg-background rounded-xl p-6 border shadow-sm text-center">
              <p className="text-sm text-muted-foreground">
                {amount.toLocaleString()} {from} =
              </p>
              <p className="text-4xl font-bold text-primary mt-2 tracking-tight">
                {result.toLocaleString(undefined, { maximumFractionDigits: 2 })} {to}
              </p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between bg-background rounded-lg p-3 border">
                <span className="text-muted-foreground">1 {from}</span>
                <span className="font-medium">{rate1.toFixed(4)} {to}</span>
              </div>
              <div className="flex justify-between bg-background rounded-lg p-3 border">
                <span className="text-muted-foreground">1 {to}</span>
                <span className="font-medium">{rateInverse.toFixed(4)} {from}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
