import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CarDetailItemProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
}

export function CarDetailItem({ icon: Icon, label, value }: CarDetailItemProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-5 flex justify-center">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <div>
        <div className="text-sm font-medium text-gray-500">{label}</div>
        <div className="text-gray-900">{value}</div>
      </div>
    </div>
  );
}