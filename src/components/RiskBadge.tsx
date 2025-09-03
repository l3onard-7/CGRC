import React from 'react';

interface RiskBadgeProps {
  level: 'Low' | 'Medium' | 'High';
  size?: 'sm' | 'md';
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level, size = 'md' }) => {
  const getRiskConfig = (level: string) => {
    switch (level) {
      case 'Low':
        return { color: 'bg-green-100 text-green-800 border-green-200' };
      case 'Medium':
        return { color: 'bg-yellow-100 text-yellow-800 border-yellow-200' };
      case 'High':
        return { color: 'bg-red-100 text-red-800 border-red-200' };
      default:
        return { color: 'bg-gray-100 text-gray-800 border-gray-200' };
    }
  };

  const config = getRiskConfig(level);
  const sizeClasses = size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-sm';

  return (
    <span className={`inline-flex items-center rounded-full border font-medium ${config.color} ${sizeClasses}`}>
      {level}
    </span>
  );
};