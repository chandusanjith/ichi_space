"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, CheckCircle2 } from "lucide-react";

export default function SvgToJsx() {
  const [svgInput, setSvgInput] = useState("");
  const [copied, setCopied] = useState(false);

  const convertSvgToJsx = (svg: string) => {
    if (!svg.trim()) return "";

    let jsx = svg;

    // Remove XML declaration and doctype if present
    jsx = jsx.replace(/<\\?xml.*\\?>/gi, "");
    jsx = jsx.replace(/<!DOCTYPE.*>/gi, "");

    // Convert class to className
    jsx = jsx.replace(/class=/g, "className=");

    // Convert dashed attributes to camelCase
    jsx = jsx.replace(/([a-z]+)-([a-z]+)=/gi, (match, p1, p2) => {
      // Don't convert data-* or aria-* attributes
      if (p1.toLowerCase() === "data" || p1.toLowerCase() === "aria") {
        return match;
      }
      return `${p1}${p2.charAt(0).toUpperCase()}${p2.slice(1)}=`;
    });

    // Special case for style attributes (basic conversion)
    // A robust style converter is complex, but we'll try a simple string to object conversion
    jsx = jsx.replace(/style="([^"]+)"/g, (match, styleString) => {
      const styles = styleString.split(';').filter(Boolean).map((s: string) => {
        const [key, value] = s.split(':');
        if (!key || !value) return '';
        const camelKey = key.trim().replace(/-([a-z])/g, (m, g) => g.toUpperCase());
        return `${camelKey}: '${value.trim()}'`;
      });
      return `style={{ ${styles.join(', ')} }}`;
    });

    // Replace standard SVG tags with self-closing if they are empty
    // e.g. <path d="..."></path> -> <path d="..." />
    jsx = jsx.replace(/<([a-zA-Z0-9]+)([^>]*)><\/\1>/g, "<$1$2 />");

    const componentWrapper = `const SvgIcon = (props) => (\n  ${jsx.trim()}\n);\n\nexport default SvgIcon;`;
    
    return componentWrapper;
  };

  const jsxOutput = convertSvgToJsx(svgInput);

  const handleCopy = () => {
    if (!jsxOutput) return;
    navigator.clipboard.writeText(jsxOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="SVG to JSX Converter"
      description="Convert raw SVG code into React/Next.js components"
      categoryName="Developer Tools"
      categoryPath="/developer-tools"
      slug="svg-to-jsx"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border shadow-sm flex flex-col min-h-[500px]">
          <CardHeader>
            <CardTitle>Raw SVG</CardTitle>
            <CardDescription>Paste your HTML/SVG code here</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <Textarea
              placeholder={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <path d="M12 2L2 22h20L12 2z" stroke-width="2" stroke-linecap="round"/>\n</svg>`}
              className="flex-1 font-mono text-sm resize-none p-4"
              value={svgInput}
              onChange={(e) => setSvgInput(e.target.value)}
              spellCheck={false}
            />
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm flex flex-col min-h-[500px]">
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div>
              <CardTitle>React JSX Component</CardTitle>
              <CardDescription>Ready to use in your project</CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 gap-2"
              onClick={handleCopy}
              disabled={!jsxOutput}
            >
              {copied ? (
                <><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Copied</>
              ) : (
                <><Copy className="h-4 w-4" /> Copy JSX</>
              )}
            </Button>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <Textarea
              readOnly
              className="flex-1 font-mono text-sm resize-none p-4 bg-muted/30 focus-visible:ring-0"
              value={jsxOutput}
              placeholder="Converted JSX will appear here..."
              spellCheck={false}
            />
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
