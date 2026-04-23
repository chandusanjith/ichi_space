"use client";

import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

function hexToRgb(hex: string) {
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex.substring(1, 3), 16);
    g = parseInt(hex.substring(3, 5), 16);
    b = parseInt(hex.substring(5, 7), 16);
  }
  return { r, g, b };
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export default function ColorConverter() {
  const [hex, setHex] = useState("#3B82F6");
  const [rgb, setRgb] = useState("rgb(59, 130, 246)");
  const [hsl, setHsl] = useState("hsl(217, 90%, 60%)");
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (/^#([0-9A-F]{3}){1,2}$/i.test(hex)) {
      const rgbObj = hexToRgb(hex);
      const hslObj = rgbToHsl(rgbObj.r, rgbObj.g, rgbObj.b);
      setRgb(`rgb(${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b})`);
      setHsl(`hsl(${hslObj.h}, ${hslObj.s}%, ${hslObj.l}%)`);
    }
  }, [hex]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(null), 2000);
  };

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith("#")) val = "#" + val;
    setHex(val);
  };

  return (
    <ToolLayout
      title="Color Converter"
      description="Convert colors between HEX, RGB, and HSL formats instantly."
      categoryName="Developer Tools"
      categoryPath="/developer-tools"
      slug="color-converter"
    >
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-8 flex flex-col items-center justify-center space-y-6">
              <div 
                className="w-full h-48 rounded-2xl shadow-inner border border-border/50 transition-colors duration-300"
                style={{ backgroundColor: /^#([0-9A-F]{3}){1,2}$/i.test(hex) ? hex : "transparent" }}
              />
              <div className="w-full relative">
                <Label htmlFor="colorPicker" className="sr-only">Choose Color</Label>
                <div className="flex h-12 w-full rounded-xl overflow-hidden border border-border">
                  <div className="w-16 h-full flex-shrink-0 bg-muted border-r border-border">
                    <input 
                      type="color" 
                      id="colorPicker"
                      value={/^#([0-9A-F]{3}){1,2}$/i.test(hex) ? hex : "#000000"} 
                      onChange={handleHexChange}
                      className="w-full h-full p-0 border-0 opacity-0 cursor-pointer absolute inset-0"
                    />
                    <div className="w-full h-full flex items-center justify-center pointer-events-none">
                      <div className="w-8 h-8 rounded-full border shadow-sm" style={{ backgroundColor: /^#([0-9A-F]{3}){1,2}$/i.test(hex) ? hex : "transparent" }} />
                    </div>
                  </div>
                  <Input 
                    value={hex}
                    onChange={handleHexChange}
                    className="flex-1 h-full border-0 rounded-none focus-visible:ring-0 px-4 text-lg font-mono uppercase tracking-wider"
                    placeholder="#000000"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardContent className="p-4 flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <Label className="text-muted-foreground text-xs font-bold uppercase tracking-wider">HEX</Label>
                  <p className="text-lg font-mono truncate">{hex}</p>
                </div>
                <Button variant="secondary" size="icon" onClick={() => handleCopy(hex, "hex")}>
                  {copied === "hex" ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <Label className="text-muted-foreground text-xs font-bold uppercase tracking-wider">RGB</Label>
                  <p className="text-lg font-mono truncate">{rgb}</p>
                </div>
                <Button variant="secondary" size="icon" onClick={() => handleCopy(rgb, "rgb")}>
                  {copied === "rgb" ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <Label className="text-muted-foreground text-xs font-bold uppercase tracking-wider">HSL</Label>
                  <p className="text-lg font-mono truncate">{hsl}</p>
                </div>
                <Button variant="secondary" size="icon" onClick={() => handleCopy(hsl, "hsl")}>
                  {copied === "hsl" ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
