"use client";

import { useState, useEffect, useCallback } from "react";

const RECENT_KEY = "ichi_recent_tools";
const MAX_RECENT = 8;

export function useRecentTools() {
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(RECENT_KEY);
    if (stored) setRecent(JSON.parse(stored));
  }, []);

  const addRecent = useCallback((slug: string) => {
    setRecent((prev) => {
      const filtered = prev.filter((s) => s !== slug);
      const updated = [slug, ...filtered].slice(0, MAX_RECENT);
      localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return { recent, addRecent };
}
