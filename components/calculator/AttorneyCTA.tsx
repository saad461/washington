"use client";

import React from "react";
import { ExternalLink } from "lucide-react";

export default function AttorneyCTA() {
  return (
    <div className="card-standard !p-6 bg-white border-gray-200 shadow-sm mt-8">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="flex-1 text-center sm:text-left">
          <h4 className="text-lg font-bold text-gray-900 mb-2">Want to review these results with a Washington family law attorney?</h4>
          <p className="text-sm text-gray-500 leading-relaxed">
            The Washington State Bar Association can help you find a licensed family law attorney near you.
          </p>
        </div>
        <a
          href="https://www.wsba.org/find-a-lawyer"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary !px-6 whitespace-nowrap flex items-center gap-2 group"
        >
          Find a WA Family Law Attorney
          <ExternalLink size={16} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
        </a>
      </div>
    </div>
  );
}
