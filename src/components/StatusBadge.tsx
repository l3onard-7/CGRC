import React from 'react';

interface StatusBadgeProps {
  status: 'current' | 'overdue' | 'missing' | 'completed' | 'in-progress' | 'pending';
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'current':
      case 'completed':
        return { color: 'bg-green-100 text-green-800 border-green-200', label: status === 'current' ? 'Current' : 'Completed' };
      case 'overdue':
        return { color: 'bg-red-100 text-red-800 border-red-200', label: 'Overdue' };
      case 'missing':
        return { color: 'bg-gray-100 text-gray-800 border-gray-200', label: 'Missing' };
      case 'in-progress':
        return { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'In Progress' };
      case 'pending':
        return { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'Pending' };
      default:
        return { color: 'bg-gray-100 text-gray-800 border-gray-200', label: 'Unknown' };
    }
  };

  const config = getStatusConfig(status);
  const sizeClasses = size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-sm';

  return (
    <span className={`inline-flex items-center rounded-full border font-medium ${config.color} ${sizeClasses}`}>
      {config.label}
    </span>
  );
};