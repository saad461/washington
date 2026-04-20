'use client';
import React, { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdContainerProps {
  slot: 'top' | 'mid' | 'bottom' | string;
  wordCount?: number;
}

const AdContainer: React.FC<AdContainerProps> = ({ slot, wordCount = 600 }) => {
  // --- PRE-APPROVAL LAUNCH MODE ---
  // Return null to hide manual ad boxes while waiting for AdSense approval.
  // Rendering <ins> with invalid slots ("XXXXXXXXXX") causes console errors 
  // and blank layout spaces which can lead to AdSense rejection.
  return null;

  /*
  // AFTER APPROVAL: Uncomment this block and add your real data-ad-slot IDs.
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  const shouldRenderAd = () => {
    if (slot === 'mid' && wordCount < 400) return false;
    return true;
  };

  if (!shouldRenderAd()) {
    return (
      <div className="w-full py-10 px-8 border-2 border-dashed border-gray-50 rounded-3xl flex flex-col items-center justify-center opacity-30 grayscale no-print my-10">
        <AlertCircle className="w-5 h-5 text-gray-300 mb-2" />
        <p className="text-xs font-bold text-gray-300 uppercase tracking-[0.2em] italic">Inventory Held: Awaiting Content Depth</p>
      </div>
    );
  }

  return (
    <div className="w-full my-12 flex justify-center no-print">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-9902783604679065"
        data-ad-slot="XXXXXXXXXX"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
  */
};

export default AdContainer;
