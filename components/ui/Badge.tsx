import React from 'react';
import { Clock } from 'lucide-react';

interface BadgeProps {
  text: string;
  variant: 'category' | 'featured' | 'readtime';
}

const Badge: React.FC<BadgeProps> = ({ text, variant }) => {
  const baseStyles = "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold";

  if (variant === 'category') {
    return (
      <span className={`${baseStyles} bg-blue-50 text-blue-700 border border-blue-100`}>
        {text}
      </span>
    );
  }

  if (variant === 'featured') {
    return (
      <span className={`${baseStyles} bg-amber-50 text-amber-700 border border-amber-100`}>
        {text}
      </span>
    );
  }

  if (variant === 'readtime') {
    return (
      <span className="flex items-center gap-1 text-xs text-gray-400">
        <Clock size={12} aria-hidden="true" />
        {text}
      </span>
    );
  }

  return null;
};

export default Badge;
