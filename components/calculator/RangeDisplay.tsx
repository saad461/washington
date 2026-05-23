import React from 'react';

interface RangeDisplayProps {
  low: number;
  high: number;
}

const curFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const RangeDisplay: React.FC<RangeDisplayProps> = ({ low, high }) => {
  return (
    <div className="w-full bg-blue-50 border border-blue-500 rounded-lg p-3 text-left transition-all animate-in fade-in slide-in-from-top-2">
      <p className="text-[14px] font-bold text-blue-700 mb-1">
        Estimated Court Range
      </p>
      <div className="flex items-baseline gap-1 overflow-hidden">
        <span className="text-[20px] font-bold text-gray-900">
          {curFormatter.format(low)}
        </span>
        <span className="text-[18px] font-bold text-gray-600">—</span>
        <span className="text-[20px] font-bold text-gray-900">
          {curFormatter.format(high)}
        </span>
        <span className="text-[16px] font-medium text-gray-500 ml-1 whitespace-nowrap">/ month</span>
      </div>
      <p className="mt-1 text-[13px] text-gray-600">
        Actual amount set by court
      </p>
    </div>
  );
};

export default RangeDisplay;
