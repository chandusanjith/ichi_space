"use client";

import { useState, useCallback } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Copy, Check, RefreshCw, KeyRound, Eye, EyeOff } from "lucide-react";

const CHARS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

function generatePassword(
  length: number,
  options: { uppercase: boolean; lowercase: boolean; numbers: boolean; symbols: boolean }
): string {
  let chars = "";
  if (options.uppercase) chars += CHARS.uppercase;
  if (options.lowercase) chars += CHARS.lowercase;
  if (options.numbers) chars += CHARS.numbers;
  if (options.symbols) chars += CHARS.symbols;
  if (!chars) chars = CHARS.lowercase;

  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (x) => chars[x % chars.length]).join("");
}

function getStrength(password: string): { label: string; color: string; score: number } {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score <= 2) return { label: "Weak", color: "bg-red-500", score };
  if (score <= 4) return { label: "Medium", color: "bg-yellow-500", score };
  return { label: "Strong", color: "bg-emerald-500", score };
}

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [password, setPassword] = useState(() =>
    generatePassword(16, { uppercase: true, lowercase: true, numbers: true, symbols: true })
  );
  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [history, setHistory] = useState<string[]>([]);

  const generate = useCallback(() => {
    const newPass = generatePassword(length, options);
    setPassword(newPass);
    setHistory((prev) => [newPass, ...prev].slice(0, 5));
    setCopied(false);
  }, [length, options]);

  const copyToClipboard = async (text?: string) => {
    await navigator.clipboard.writeText(text || password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const strength = getStrength(password);

  return (
    <ToolLayout
      title="Password Generator"
      description="Generate strong, secure passwords"
      categoryName="Security"
      categoryPath="/security"
      slug="password-generator"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              {/* Password display */}
              <div className="bg-muted/50 rounded-xl p-6 border">
                <div className="flex items-center gap-3">
                  <p className={`text-xl md:text-2xl font-mono flex-1 break-all tracking-wide ${!showPassword ? 'blur-sm select-none' : ''}`}>
                    {password}
                  </p>
                  <div className="flex gap-1 shrink-0">
                    <Button variant="ghost" size="icon" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => copyToClipboard()}>
                      {copied ? (
                        <Check className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Strength indicator */}
                <div className="mt-4 space-y-2">
                  <div className="flex gap-1">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-colors ${
                          i < strength.score ? strength.color : "bg-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">Strength: {strength.label}</p>
                </div>
              </div>

              {/* Length slider */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label>Password Length</Label>
                  <span className="font-semibold">{length}</span>
                </div>
                <Slider min={4} max={64} step={1} value={[length]} onValueChange={(v) => { setLength((v as number[])[0]); }} />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>4</span>
                  <span>64</span>
                </div>
              </div>

              {/* Options */}
              <div className="grid grid-cols-2 gap-4">
                {(Object.entries(options) as [keyof typeof options, boolean][]).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between bg-muted/30 p-3 rounded-lg border">
                    <Label htmlFor={key} className="text-sm capitalize cursor-pointer">{key}</Label>
                    <Switch
                      id={key}
                      checked={value}
                      onCheckedChange={(v) => setOptions({ ...options, [key]: v })}
                    />
                  </div>
                ))}
              </div>

              <Button onClick={generate} className="w-full" size="lg">
                <RefreshCw className="mr-2 h-4 w-4" />
                Generate Password
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* History */}
        <Card className="bg-muted/30">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Recent Passwords</h3>
            <div className="space-y-2">
              {history.length > 0 ? (
                history.map((pass, i) => (
                  <div key={i} className="flex items-center gap-2 bg-background p-2 rounded-lg border group">
                    <p className="text-xs font-mono flex-1 truncate">{pass}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => copyToClipboard(pass)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                  <KeyRound className="h-8 w-8 mb-2 opacity-20" />
                  <p className="text-sm">Generated passwords will appear here</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
