"use client";

import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function JWTDecoder() {
  const [jwt, setJwt] = useState("");
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!jwt.trim()) {
      setHeader("");
      setPayload("");
      setError("");
      return;
    }

    try {
      const parts = jwt.split(".");
      if (parts.length !== 3) {
        throw new Error("Invalid JWT: Must have exactly 3 parts separated by dots.");
      }

      const decodeBase64Url = (str: string) => {
        // Add removed at signs and pad with '='
        let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
        while (base64.length % 4) {
          base64 += "=";
        }
        return decodeURIComponent(
          window
            .atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );
      };

      const decodedHeader = decodeBase64Url(parts[0]);
      const decodedPayload = decodeBase64Url(parts[1]);

      setHeader(JSON.stringify(JSON.parse(decodedHeader), null, 2));
      setPayload(JSON.stringify(JSON.parse(decodedPayload), null, 2));
      setError("");
    } catch (err: any) {
      setHeader("");
      setPayload("");
      setError(err.message || "Failed to decode JWT. Please check the format.");
    }
  }, [jwt]);

  return (
    <ToolLayout
      title="JWT Decoder"
      description="Decode and inspect JSON Web Tokens locally"
      categoryName="Developer Tools"
      categoryPath="/developer-tools"
      slug="jwt-decoder"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border shadow-sm flex flex-col">
          <CardHeader>
            <CardTitle>Encoded JWT</CardTitle>
            <CardDescription>Paste your token here (Header.Payload.Signature)</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <Textarea
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI..."
              className="flex-1 min-h-[300px] font-mono text-sm resize-none break-all p-4"
              value={jwt}
              onChange={(e) => setJwt(e.target.value)}
              spellCheck={false}
            />
            {error && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 text-red-500 rounded-md text-sm">
                {error}
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-4 text-center">
              Decoded securely in your browser. No data is sent to our servers.
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-6">
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                Header <span className="text-xs font-normal text-muted-foreground lowercase ml-2">Algorithm & Token Type</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted/50 p-4 rounded-xl overflow-x-auto text-sm font-mono border">
                {header || <span className="text-muted-foreground italic">Waiting for token...</span>}
              </pre>
            </CardContent>
          </Card>

          <Card className="border-border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                Payload <span className="text-xs font-normal text-muted-foreground lowercase ml-2">Data & Claims</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted/50 p-4 rounded-xl overflow-x-auto text-sm font-mono border min-h-[150px]">
                {payload || <span className="text-muted-foreground italic">Waiting for token...</span>}
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
