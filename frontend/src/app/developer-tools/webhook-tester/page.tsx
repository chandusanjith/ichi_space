"use client";

import { useState, useEffect, useCallback } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Trash, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function WebhookTester() {
  const [endpointId, setEndpointId] = useState("");
  const [requests, setRequests] = useState<any[]>([]);
  const [selectedReq, setSelectedReq] = useState<any>(null);
  const [isPolling, setIsPolling] = useState(false);
  const [host, setHost] = useState("");

  useEffect(() => {
    // Generate a random ID on mount
    const id = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
    setEndpointId(id);
    setHost(window.location.origin);
  }, []);

  const webhookUrl = `${host}/api/webhook/${endpointId}`;

  const fetchRequests = useCallback(async () => {
    if (!endpointId) return;
    try {
      const res = await fetch(`/api/webhook/${endpointId}?action=fetch`);
      if (res.ok) {
        const data = await res.json();
        setRequests(data);
        if (data.length > 0 && !selectedReq) {
          setSelectedReq(data[0]);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [endpointId, selectedReq]);

  useEffect(() => {
    if (!isPolling && endpointId) {
      setIsPolling(true);
      fetchRequests();
      const interval = setInterval(fetchRequests, 3000); // poll every 3s
      return () => clearInterval(interval);
    }
  }, [endpointId, isPolling, fetchRequests]);

  const copyUrl = () => {
    navigator.clipboard.writeText(webhookUrl);
  };

  const clearRequests = async () => {
    if (!endpointId) return;
    await fetch(`/api/webhook/${endpointId}`, { method: 'DELETE' });
    setRequests([]);
    setSelectedReq(null);
  };

  return (
    <ToolLayout
      title="Webhook Tester"
      description="Catch and inspect incoming HTTP webhook requests"
      categoryName="Developer Tools"
      categoryPath="/developer-tools"
      slug="webhook-tester"
    >
      <div className="mb-6 bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-1">Your Unique Webhook URL</p>
          <p className="text-emerald-400 font-mono text-sm sm:text-base truncate select-all">{webhookUrl}</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={copyUrl} variant="outline" className="bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700">
            <Copy className="h-4 w-4 mr-2" /> Copy URL
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 h-[600px]">
        {/* Sidebar: Request List */}
        <Card className="lg:col-span-4 flex flex-col h-full border-border">
          <CardHeader className="py-4 border-b flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base">Requests ({requests.length})</CardTitle>
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" onClick={fetchRequests} className="h-8 w-8" title="Refresh">
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" onClick={clearRequests} className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50" title="Clear All">
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {requests.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground p-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <RefreshCw className="h-5 w-5 animate-spin-slow opacity-50" />
                </div>
                <p className="text-sm">Waiting for requests...<br/>Send a POST request to the URL above.</p>
              </div>
            ) : (
              requests.map((req) => (
                <button
                  key={req.id}
                  onClick={() => setSelectedReq(req)}
                  className={`w-full text-left px-3 py-3 rounded-lg text-sm transition-colors border ${
                    selectedReq?.id === req.id 
                      ? "bg-accent border-accent-foreground/20 shadow-sm" 
                      : "bg-transparent border-transparent hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <Badge variant={req.method === 'POST' ? 'default' : 'secondary'} className={req.method==='POST'?'bg-emerald-500 hover:bg-emerald-600':''}>
                      {req.method}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(req.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {req.id.split('-')[0]}
                  </p>
                </button>
              ))
            )}
          </div>
        </Card>

        {/* Main Area: Request Details */}
        <Card className="lg:col-span-8 h-full flex flex-col border-border">
          {!selectedReq ? (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              Select a request to view details
            </div>
          ) : (
            <>
              <CardHeader className="py-4 border-b bg-muted/20">
                <div className="flex items-center gap-3">
                  <Badge className={selectedReq.method==='POST'?'bg-emerald-500':''}>{selectedReq.method}</Badge>
                  <span className="text-sm font-medium">Webhook Received</span>
                  <span className="text-xs text-muted-foreground ml-auto">
                    {new Date(selectedReq.timestamp).toLocaleString()}
                  </span>
                </div>
              </CardHeader>
              <div className="flex-1 overflow-y-auto p-0">
                <div className="p-4 space-y-6">
                  {/* Headers */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Headers</h4>
                    <div className="bg-muted/30 rounded-lg p-1 border">
                      <table className="w-full text-sm">
                        <tbody>
                          {Object.entries(selectedReq.headers).map(([key, val]) => (
                            <tr key={key} className="border-b last:border-0">
                              <td className="py-2 px-3 font-medium text-slate-600 dark:text-slate-400 w-1/3">{key}</td>
                              <td className="py-2 px-3 font-mono text-xs break-all">{val as string}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Query Params */}
                  {selectedReq.query && (
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Query Parameters</h4>
                      <pre className="bg-slate-900 text-emerald-400 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                        ?{selectedReq.query}
                      </pre>
                    </div>
                  )}

                  {/* Body */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Body Payload</h4>
                    <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                      <pre className="font-mono text-xs text-emerald-400 whitespace-pre-wrap">
                        {typeof selectedReq.body === 'object' && selectedReq.body !== null
                          ? JSON.stringify(selectedReq.body, null, 2)
                          : selectedReq.body || "(Empty Body)"}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Card>
      </div>
    </ToolLayout>
  );
}
