"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function HeroCard() {
  const [count, setCount] = useState(1446);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Determine if we are on desktop
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);

    // Counter animation: animate from 0 to 1446 over 1200ms
    let start = 0;
    const end = 1446;
    const duration = 1200;
    let startTime: number | null = null;

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(animateCount);
    }, 200); // Slight delay after hydration to start counting

    return () => {
      window.removeEventListener("resize", checkDesktop);
      clearTimeout(timer);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 32 }}
      animate={{
        opacity: 1,
        x: 0,
        y: isDesktop ? [0, -6, 0] : 0,
      }}
      transition={{
        opacity: { duration: 0.6, ease: "easeOut", delay: 0.2 },
        x: { duration: 0.6, ease: "easeOut", delay: 0.2 },
        y: {
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
        },
      }}
      className="w-full"
    >
      <article
        aria-label="Washington child support calculation example showing $1,446 per month for 2 children"
        className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm mx-auto lg:mx-0"
      >
        <p
          aria-hidden="true"
          className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4"
        >
          Live Calculation Example
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          <span className="rounded-full bg-gray-100 text-gray-600 text-sm px-4 py-2 min-h-[44px] flex items-center">
            2 Children
          </span>
          <span className="rounded-full bg-gray-100 text-gray-600 text-sm px-4 py-2 min-h-[44px] flex items-center">
            King County, WA
          </span>
        </div>

        <div className="mb-8">
          <p
            className="text-5xl font-bold text-gray-900 tracking-tight"
            aria-label={`Estimated monthly child support $${count} per month`}
          >
            ${count.toLocaleString()}
            <span className="text-xl text-gray-400 font-normal ml-1">/mo</span>
          </p>
        </div>

        <dl className="space-y-1 mb-6">
          <div className="flex justify-between py-2 border-b border-gray-100">
            <dt className="text-gray-400 text-sm">Net Income</dt>
            <dd className="text-gray-700 text-sm font-medium">$5,000/mo</dd>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <dt className="text-gray-400 text-sm">Calculation Type</dt>
            <dd className="text-gray-700 text-sm font-medium">Standard</dd>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <dt className="text-gray-400 text-sm">Jurisdiction</dt>
            <dd className="text-gray-700 text-sm font-medium">King County, WA</dd>
          </div>
        </dl>

        <div className="text-xs text-green-600 flex items-center gap-1 mt-4">
          <span aria-hidden="true">●</span>
          <span>Live 2026 Data · RCW 26.19 Compliant</span>
        </div>
      </article>
    </motion.div>
  );
}
