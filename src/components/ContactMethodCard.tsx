import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ContactMethodCardProps {
  title: string;
  count: number;
  total: number;
  icon: LucideIcon;
}

export default function ContactMethodCard({ title, count, total, icon: Icon }: ContactMethodCardProps) {
  const percentage = Math.round((count / total) * 100);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <div className="p-2 bg-blue-50 rounded-lg">
          <Icon className="h-5 w-5 text-blue-600" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-baseline">
          <span className="text-2xl font-semibold text-gray-900">{count.toLocaleString()}</span>
          <span className="text-sm font-medium text-gray-500">of {total.toLocaleString()}</span>
        </div>

        <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <p className="text-sm text-gray-600">
          {percentage}% coverage
        </p>
      </div>
    </div>
  );
}