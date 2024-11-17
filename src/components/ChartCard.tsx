import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import type { ChartData } from '../types';
import { formatNumber } from '../utils/chartHelpers';
import { LucideIcon } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface ChartCardProps {
  title: string;
  data: any;
  type: 'doughnut' | 'bar' | 'jobTitles';
  titleFontSize?: number;
  legendFontSize?: number;
  icon?: LucideIcon;
}

const baseOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        padding: 20,
        usePointStyle: true,
      },
    },
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      titleColor: '#1f2937',
      bodyColor: '#4b5563',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      padding: 12,
      boxPadding: 6,
      usePointStyle: true,
    },
  },
};

const barOptions = {
  ...baseOptions,
  scales: {
    x: {
      display: false,
      grid: {
        display: false,
      },
    },
    y: {
      display: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.1)',
        drawBorder: false,
      },
      ticks: {
        padding: 8,
        color: '#6B7280',
        font: {
          size: 11,
        },
        callback: (value: number) => value.toLocaleString(),
      },
      beginAtZero: true,
    },
  },
  plugins: {
    ...baseOptions.plugins,
    tooltip: {
      ...baseOptions.plugins.tooltip,
      callbacks: {
        label: (context: any) => formatNumber(context.raw), // Format tooltip labels
      },
    },
  },
};

const doughnutOptions = {
  ...baseOptions,
  scales: {
    x: {
      display: false,
      grid: {
        display: false,
      },
    },
    y: {
      display: false,
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    ...baseOptions.plugins,
    tooltip: {
      ...baseOptions.plugins.tooltip,
      callbacks: {
        label: (context: any) => formatNumber(context.raw), // Format tooltip labels
      },
    },
  },
};

export default function ChartCard({
  title,
  data,
  type = 'bar',
  titleFontSize = 16,
  legendFontSize = 12,  // Add default value
  icon: Icon
}: ChartCardProps) {
  if (type === 'jobTitles') {
    const maxCount = Math.max(...data.map((item: any) => item.count));

    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {Icon && <Icon className="h-5 w-5 text-gray-600" />}
            <h3 className="text-gray-900 font-semibold">{title}</h3>
          </div>
          <a href="#" className="text-sm text-blue-600 hover:text-blue-700">Show more</a>
        </div>
        <div className="space-y-3">
          {data.map((item: any) => (
            <div key={item.name} className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700 w-24 truncate">
                {item.name}
              </span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
                  style={{ width: `${(item.count / maxCount) * 100}%` }}
                />
              </div>
              <span className="text-sm font-semibold text-gray-900 w-16 text-right">
                {item.count.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const options = {
    ...(type === 'bar' ? barOptions : doughnutOptions),
    plugins: {
      ...baseOptions.plugins,
      title: {
        display: true,
        text: title,
        padding: { bottom: 20 },
        font: {
          size: titleFontSize,
          weight: '500',
        },
      },
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: {
          font: {
            size: legendFontSize,  // Use the new prop here
          }
        }
      }
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="h-[300px]">
        {type === 'bar' ? (
          <Bar options={options} data={data} />
        ) : (
          <Doughnut options={options} data={data} />
        )}
      </div>
    </div>
  );
}