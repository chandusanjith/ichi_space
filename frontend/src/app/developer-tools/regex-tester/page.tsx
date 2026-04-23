"use client";

import { useState, useMemo } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState({ g: true, i: false, m: false, s: false });
  const [testString, setTestString] = useState("");

  const flagStr = Object.entries(flags).filter(([, v]) => v).map(([k]) => k).join("");

  const matches = useMemo(() => {
    if (!pattern || !testString) return [];
    try {
      const re = new RegExp(pattern, flagStr);
      const results: { match: string; index: number; groups?: Record<string, string> }[] = [];
      let m;
      if (flags.g) {
        while ((m = re.exec(testString)) !== null) {
          results.push({ match: m[0], index: m.index, groups: m.groups });
          if (m[0] === '') { re.lastIndex++; }
          if (results.length > 100) break;
        }
      } else {
        m = re.exec(testString);
        if (m) results.push({ match: m[0], index: m.index, groups: m.groups });
      }
      return results;
    } catch {
      return [];
    }
  }, [pattern, testString, flagStr, flags.g]);

  const isValidRegex = useMemo(() => {
    if (!pattern) return null;
    try { new RegExp(pattern); return true; } catch { return false; }
  }, [pattern]);

  // Highlight matches in test string
  const highlightedText = useMemo(() => {
    if (!pattern || !testString || !matches.length) return null;
    try {
      const re = new RegExp(pattern, flagStr);
      const parts: { text: string; isMatch: boolean }[] = [];
      let lastIndex = 0;

      const allMatches = [...testString.matchAll(new RegExp(pattern, flagStr.includes('g') ? flagStr : flagStr + 'g'))];
      for (const match of allMatches) {
        if (match.index! > lastIndex) {
          parts.push({ text: testString.slice(lastIndex, match.index), isMatch: false });
        }
        parts.push({ text: match[0], isMatch: true });
        lastIndex = match.index! + match[0].length;
      }
      if (lastIndex < testString.length) {
        parts.push({ text: testString.slice(lastIndex), isMatch: false });
      }
      return parts;
    } catch {
      return null;
    }
  }, [pattern, testString, matches, flagStr]);

  return (
    <ToolLayout
      title="Regex Tester"
      description="Test regular expressions with live matching"
      categoryName="Developer Tools"
      categoryPath="/developer-tools"
      slug="regex-tester"
    >
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Regular Expression</Label>
                {isValidRegex !== null && (
                  <Badge variant={isValidRegex ? "secondary" : "destructive"} className="text-[10px]">
                    {isValidRegex ? "Valid" : "Invalid"}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground font-mono">/</span>
                <Input
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                  placeholder="Enter regex pattern..."
                  className="font-mono"
                />
                <span className="text-muted-foreground font-mono">/{flagStr}</span>
              </div>
            </div>

            <div className="flex items-center gap-6 flex-wrap">
              {(["g", "i", "m", "s"] as const).map((flag) => (
                <div key={flag} className="flex items-center gap-2">
                  <Switch
                    checked={flags[flag]}
                    onCheckedChange={(v) => setFlags({ ...flags, [flag]: v })}
                    id={`flag-${flag}`}
                  />
                  <Label htmlFor={`flag-${flag}`} className="text-sm font-mono cursor-pointer">
                    {flag}{" "}
                    <span className="text-muted-foreground font-sans text-xs">
                      ({flag === "g" ? "global" : flag === "i" ? "case-insensitive" : flag === "m" ? "multiline" : "dotAll"})
                    </span>
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-4 space-y-3">
              <Label className="text-xs text-muted-foreground">Test String</Label>
              <Textarea
                placeholder="Enter test string..."
                value={testString}
                onChange={(e) => setTestString(e.target.value)}
                className="min-h-[250px] font-mono text-sm resize-none"
              />
            </CardContent>
          </Card>

          <div className="space-y-4">
            {highlightedText && (
              <Card>
                <CardContent className="p-4 space-y-2">
                  <Label className="text-xs text-muted-foreground">Highlighted Matches</Label>
                  <div className="font-mono text-sm p-3 rounded-lg bg-muted/50 whitespace-pre-wrap break-all min-h-[80px]">
                    {highlightedText.map((part, i) =>
                      part.isMatch ? (
                        <mark key={i} className="bg-primary/30 text-primary rounded px-0.5">{part.text}</mark>
                      ) : (
                        <span key={i}>{part.text}</span>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="bg-muted/30">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-xs text-muted-foreground">Matches</Label>
                  <Badge variant="secondary" className="text-[10px]">
                    {matches.length} match{matches.length !== 1 ? "es" : ""}
                  </Badge>
                </div>
                <div className="space-y-2 max-h-[250px] overflow-y-auto">
                  {matches.length > 0 ? (
                    matches.map((m, i) => (
                      <div key={i} className="flex items-center gap-3 bg-background p-2 rounded-lg border text-sm font-mono">
                        <span className="text-[10px] text-muted-foreground w-6 shrink-0">#{i + 1}</span>
                        <span className="text-primary truncate">{m.match}</span>
                        <span className="ml-auto text-[10px] text-muted-foreground shrink-0">idx:{m.index}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-6">No matches found</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
