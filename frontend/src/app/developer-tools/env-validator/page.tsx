"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function EnvValidator() {
  const [envContent, setEnvContent] = useState("");
  
  const validateEnv = () => {
    if (!envContent.trim()) return null;

    const lines = envContent.split("\n");
    const errors: Array<{ line: number; text: string; error: string }> = [];
    let validCount = 0;

    lines.forEach((line, index) => {
      const trimmed = line.trim();
      
      // Ignore empty lines and comments
      if (!trimmed || trimmed.startsWith("#")) {
        return;
      }

      // Check format KEY=VALUE
      const match = trimmed.match(/^([^=]+)=(.*)$/);
      
      if (!match) {
        errors.push({ line: index + 1, text: trimmed, error: "Invalid format. Expected KEY=VALUE" });
        return;
      }

      const key = match[1].trim();
      const value = match[2].trim();

      // Check key naming conventions (uppercase, alphanumeric, underscores)
      if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(key)) {
        errors.push({ line: index + 1, text: trimmed, error: "Invalid key name. Must contain only letters, numbers, and underscores, and cannot start with a number." });
        return;
      }

      // Check for unclosed quotes
      if (value.startsWith('"') && !value.endsWith('"') && value.length > 1) {
        errors.push({ line: index + 1, text: trimmed, error: "Unclosed double quote in value." });
        return;
      }
      if (value.startsWith("'") && !value.endsWith("'") && value.length > 1) {
        errors.push({ line: index + 1, text: trimmed, error: "Unclosed single quote in value." });
        return;
      }
      
      // Check for spaces in unquoted values
      if (!value.startsWith('"') && !value.startsWith("'") && value.includes(" ")) {
        errors.push({ line: index + 1, text: trimmed, error: "Unquoted value contains spaces. Wrap the value in quotes." });
        return;
      }

      validCount++;
    });

    return { errors, validCount, totalLines: lines.length };
  };

  const validationResult = validateEnv();

  return (
    <ToolLayout
      title="Env File Validator"
      description="Validate and format .env configuration files locally"
      categoryName="Developer Tools"
      categoryPath="/developer-tools"
      slug="env-validator"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border shadow-sm flex flex-col h-[500px]">
          <CardHeader>
            <CardTitle>.env Content</CardTitle>
            <CardDescription>Paste your environment variables</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <Textarea
              placeholder={`# Database\nDB_HOST=localhost\nDB_PORT=5432\n\n# API Keys\nAPI_KEY="your-secret-key"\nINVALID KEY=value`}
              className="flex-1 font-mono text-sm resize-none p-4"
              value={envContent}
              onChange={(e) => setEnvContent(e.target.value)}
              spellCheck={false}
            />
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm h-[500px] flex flex-col">
          <CardHeader>
            <CardTitle>Validation Results</CardTitle>
            <CardDescription>Instant client-side analysis</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto">
            {!validationResult ? (
              <div className="h-full flex items-center justify-center text-muted-foreground text-sm italic">
                Awaiting input...
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 p-3 rounded-lg flex-1 text-center">
                    <p className="text-2xl font-bold">{validationResult.validCount}</p>
                    <p className="text-xs font-medium uppercase">Valid Variables</p>
                  </div>
                  <div className={`${validationResult.errors.length > 0 ? 'bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400' : 'bg-muted border text-muted-foreground'} p-3 rounded-lg flex-1 text-center`}>
                    <p className="text-2xl font-bold">{validationResult.errors.length}</p>
                    <p className="text-xs font-medium uppercase">Errors Found</p>
                  </div>
                </div>

                {validationResult.errors.length > 0 ? (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Issues:</h4>
                    {validationResult.errors.map((err, i) => (
                      <div key={i} className="p-3 bg-red-500/5 border border-red-500/20 rounded-md text-sm space-y-1">
                        <div className="flex justify-between items-start">
                          <span className="font-mono text-xs bg-red-500/10 px-1.5 py-0.5 rounded text-red-500">Line {err.line}</span>
                          <span className="text-red-600 dark:text-red-400 font-medium">{err.error}</span>
                        </div>
                        <p className="font-mono text-xs text-muted-foreground bg-muted/50 p-2 rounded mt-2 overflow-x-auto break-all">
                          {err.text}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : validationResult.validCount > 0 ? (
                  <div className="h-40 flex flex-col items-center justify-center text-emerald-500 space-y-2">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-2xl">✓</div>
                    <p className="font-medium">All variables are valid!</p>
                  </div>
                ) : null}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
