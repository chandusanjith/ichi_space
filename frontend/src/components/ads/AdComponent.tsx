"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    adsbygoogle: Record<string, unknown>[];
  }
}

interface AdComponentProps {
  slot: "top-banner" | "sidebar" | "in-content";
  className?: string;
}

// Map slot names to AdSense ad slot IDs
// Set these in your .env.local file
const AD_SLOTS: Record<string, string | undefined> = {
  "top-banner": process.env.NEXT_PUBLIC_AD_SLOT_TOP_BANNER,
  "sidebar": process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR,
  "in-content": process.env.NEXT_PUBLIC_AD_SLOT_IN_CONTENT,
};

export function AdComponent({ slot, className = "" }: AdComponentProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [adError, setAdError] = useState(false);
  const isAdsenseEnabled = !!process.env.NEXT_PUBLIC_ADSENSE_ID;
  const adSlotId = AD_SLOTS[slot];

  useEffect(() => {
    if (!isAdsenseEnabled || !adSlotId) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
      setAdError(true);
    }
  }, [isAdsenseEnabled, adSlotId]);

  // Don't render anything if AdSense is not configured
  if (!isAdsenseEnabled || !adSlotId) {
    return null;
  }

  // Don't render if there was an error loading the ad
  if (adError) return null;

  const slotStyles = {
    "top-banner": "w-full max-w-4xl h-[90px] mx-auto",
    "sidebar": "w-full h-[250px]",
    "in-content": "w-full my-6 min-h-[90px]",
  };

  return (
    <div
      className={`relative overflow-hidden rounded-lg ${slotStyles[slot]} ${className}`}
      ref={adRef}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
        data-ad-slot={adSlotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
