"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function CurlConverter() {
  const [curl, setCurl] = useState("");

  const parseCurl = (cmd: string) => {
    if (!cmd.trim().startsWith("curl")) return null;

    let url = "";
    let method = "GET";
    const headers: Record<string, string> = {};
    let data = "";

    // Simple regex-based parsing
    // Match URL (naive approach: first string starting with http/https)
    const urlMatch = cmd.match(/["']?(https?:\/\/[^\s"']+)["']?/);
    if (urlMatch) {
      url = urlMatch[1];
    }

    // Match Method
    const methodMatch = cmd.match(/-X\s+([A-Z]+)/) || cmd.match(/--request\s+([A-Z]+)/);
    if (methodMatch) {
      method = methodMatch[1];
    }

    // Match Headers
    const headerRegex = /-H\s+["']([^"']+)["']/g;
    let match;
    while ((match = headerRegex.exec(cmd)) !== null) {
      const headerParts = match[1].split(/:\s*(.+)/);
      if (headerParts.length >= 2) {
        headers[headerParts[0]] = headerParts[1];
      }
    }

    // Match Data
    const dataMatch = cmd.match(/--data(-raw)?\s+['"]([\s\S]*?)['"]/) || cmd.match(/-d\s+['"]([\s\S]*?)['"]/);
    if (dataMatch) {
      data = dataMatch[2];
      if (method === "GET") method = "POST"; // Default to POST if data is present and method wasn't explicitly set
    }

    return { url, method, headers, data };
  };

  const generateFetch = (parsed: any) => {
    if (!parsed || !parsed.url) return "";
    
    let code = `fetch("${parsed.url}", {\n`;
    code += `  method: "${parsed.method}",\n`;
    
    if (Object.keys(parsed.headers).length > 0) {
      code += `  headers: {\n`;
      Object.entries(parsed.headers).forEach(([k, v]) => {
        code += `    "${k}": "${v}",\n`;
      });
      code += `  },\n`;
    }

    if (parsed.data) {
      // Try to parse JSON data to format it nicely
      try {
        const jsonData = JSON.parse(parsed.data);
        code += `  body: JSON.stringify(${JSON.stringify(jsonData, null, 2).replace(/\n/g, '\n  ')})\n`;
      } catch {
        code += `  body: "${parsed.data}"\n`;
      }
    }

    code += `})\n.then(response => response.json())\n.then(data => console.log(data))\n.catch(error => console.error(error));`;
    return code;
  };

  const generatePython = (parsed: any) => {
    if (!parsed || !parsed.url) return "";
    
    let code = `import requests\n\n`;
    code += `url = "${parsed.url}"\n`;
    
    if (Object.keys(parsed.headers).length > 0) {
      code += `\nheaders = {\n`;
      Object.entries(parsed.headers).forEach(([k, v]) => {
        code += `    "${k}": "${v}",\n`;
      });
      code += `}\n`;
    } else {
      code += `headers = {}\n`;
    }

    if (parsed.data) {
      try {
        const jsonData = JSON.parse(parsed.data);
        code += `\njson_data = ${JSON.stringify(jsonData, null, 4)}\n`;
        code += `\nresponse = requests.${parsed.method.toLowerCase()}(url, headers=headers, json=json_data)\n`;
      } catch {
        code += `\ndata = '''${parsed.data}'''\n`;
        code += `\nresponse = requests.${parsed.method.toLowerCase()}(url, headers=headers, data=data)\n`;
      }
    } else {
      code += `\nresponse = requests.${parsed.method.toLowerCase()}(url, headers=headers)\n`;
    }

    code += `\nprint(response.status_code)\nprint(response.json())`;
    return code;
  };

  const parsedData = parseCurl(curl);
  const jsFetch = generateFetch(parsedData);
  const pythonReq = generatePython(parsedData);

  return (
    <ToolLayout
      title="cURL Converter"
      description="Convert cURL commands to Python, JS, and more"
      categoryName="Developer Tools"
      categoryPath="/developer-tools"
      slug="curl-converter"
    >
      <div className="grid gap-6">
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle>cURL Command</CardTitle>
            <CardDescription>Paste your cURL request below</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder={`curl -X POST https://api.example.com/v1/data -H 'Content-Type: application/json' -d '{"key":"value"}'`}
              className="font-mono text-sm min-h-[150px] p-4"
              value={curl}
              onChange={(e) => setCurl(e.target.value)}
              spellCheck={false}
            />
          </CardContent>
        </Card>

        {parsedData && parsedData.url ? (
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-border shadow-sm">
              <CardHeader className="bg-amber-500/10 border-b pb-4">
                <CardTitle className="text-amber-600 dark:text-amber-400">JavaScript (Fetch)</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Textarea
                  readOnly
                  value={jsFetch}
                  className="min-h-[300px] font-mono text-sm border-0 rounded-none bg-transparent p-4 focus-visible:ring-0"
                />
              </CardContent>
            </Card>
            
            <Card className="border-border shadow-sm">
              <CardHeader className="bg-blue-500/10 border-b pb-4">
                <CardTitle className="text-blue-600 dark:text-blue-400">Python (Requests)</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Textarea
                  readOnly
                  value={pythonReq}
                  className="min-h-[300px] font-mono text-sm border-0 rounded-none bg-transparent p-4 focus-visible:ring-0"
                />
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground border rounded-xl border-dashed">
            Waiting for a valid cURL command...
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
