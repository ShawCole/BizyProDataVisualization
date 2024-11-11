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
  data: ChartData;
  type?: 'bar' | 'doughnut';
  titleFontSize?: number;  // Add this new prop
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
        callback: (value: number) => formatNumber(value), // Format y-axis labels
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
  titleFontSize = 16  // Add default value
}: ChartCardProps) {
  const options = {
    ...(type === 'bar' ? barOptions : doughnutOptions),
    plugins: {
      ...baseOptions.plugins,
      title: {
        display: true,
        text: title,
        padding: { bottom: 20 },
        font: {
          size: titleFontSize,  // Use the prop instead of hardcoded value
          weight: '500',
        },
      },
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