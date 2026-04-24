"use client";

import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Globe, Server, Hash } from "lucide-react";

export default function IPLookup() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");

  const fetchIpData = async (ipOrDomain: string = "") => {
    setLoading(true);
    setError("");
    try {
      // Free IP lookup API (limit 1000/day, no key required for basic usage)
      const endpoint = ipOrDomain ? `https://ipapi.co/${ipOrDomain}/json/` : "https://ipapi.co/json/";
      const res = await fetch(endpoint);
      const result = await res.json();
      
      if (result.error) {
        setError(result.reason || "Failed to lookup IP/Domain");
        setData(null);
      } else {
        setData(result);
        if (!ipOrDomain) {
          setQuery(result.ip); // Fill query with current IP initially
        }
      }
    } catch (err) {
      setError("Network error occurred during lookup");
    } finally {
      setLoading(false);
    }
  };

  // Fetch user's own IP on load
  useEffect(() => {
    fetchIpData("");
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      fetchIpData(query.trim());
    }
  };

  return (
    <ToolLayout
      title="IP & DNS Lookup"
      description="Find location and network records for any IP or domain"
      categoryName="Developer Tools"
      categoryPath="/developer-tools"
      slug="ip-lookup"
    >
      <div className="grid gap-6 md:grid-cols-12 max-w-5xl mx-auto">
        
        <div className="md:col-span-12">
          <Card className="border-border shadow-sm">
            <CardContent className="p-6">
              <form onSubmit={handleSearch} className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input 
                    placeholder="Enter IPv4, IPv6, or domain name (e.g., 8.8.8.8 or google.com)" 
                    className="pl-10 h-12 text-lg"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
                <Button type="submit" size="lg" className="h-12 px-8" disabled={loading}>
                  {loading ? "Searching..." : "Lookup"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {error && (
          <div className="md:col-span-12 p-4 bg-red-500/10 border border-red-500/30 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        {data && !error && (
          <>
            <div className="md:col-span-4 space-y-6">
              <Card className="bg-indigo-600 text-white border-0 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-24 bg-white/5 rounded-full blur-2xl"></div>
                <CardHeader>
                  <CardDescription className="text-indigo-200">Target IP Address</CardDescription>
                  <CardTitle className="text-3xl font-mono tracking-tight">{data.ip}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-500 rounded-lg">
                      <Hash className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-indigo-200">Version</p>
                      <p className="font-medium">{data.version}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-500 rounded-lg">
                      <Server className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-indigo-200">ASN</p>
                      <p className="font-medium">{data.asn}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base">Organization</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">{data.org || data.asn_org || "Unknown Organization"}</p>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-8">
              <Card className="border-border shadow-sm h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-indigo-500" /> Geographic Location
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="grid sm:grid-cols-2 gap-x-6 gap-y-8">
                    
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">City</p>
                      <p className="text-xl font-medium">{data.city || "Unknown"}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Region / State</p>
                      <p className="text-xl font-medium">{data.region || "Unknown"}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Country</p>
                      <p className="text-xl font-medium flex items-center gap-2">
                        {data.country_name || "Unknown"}
                        {data.country_code && <span className="text-sm text-muted-foreground border px-1.5 rounded">{data.country_code}</span>}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Timezone</p>
                      <p className="text-xl font-medium">{data.timezone || "Unknown"}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Coordinates</p>
                      <p className="text-lg font-mono">
                        {data.latitude ? `${data.latitude}, ${data.longitude}` : "Unknown"}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Postal Code</p>
                      <p className="text-xl font-medium">{data.postal || "Unknown"}</p>
                    </div>

                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </ToolLayout>
  );
}
