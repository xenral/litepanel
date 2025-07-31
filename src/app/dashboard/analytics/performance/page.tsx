'use client';

import { Activity, Clock, Users, Target } from 'lucide-react';
import { AnalyticsHeader } from '@/components/analytics/analytics-header';
import { PerformanceMetricCard } from '@/components/analytics/performance-metric-card';
import { PerformanceChartCard } from '@/components/analytics/performance-chart-card';
import { PerformanceTabs } from '@/components/analytics/performance-tabs';

const performanceData = [
  {
    title: 'Page Load Time',
    value: '1.2s',
    change: -8,
    status: 'improved',
    target: '< 2s',
    icon: Clock,
  },
  {
    title: 'First Contentful Paint',
    value: '0.8s',
    change: -12,
    status: 'improved',
    target: '< 1s',
    icon: Activity,
  },
  {
    title: 'Time to Interactive',
    value: '2.1s',
    change: 5,
    status: 'degraded',
    target: '< 2.5s',
    icon: Users,
  },
  {
    title: 'Core Web Vitals Score',
    value: '88/100',
    change: 3,
    status: 'improved',
    target: '> 90',
    icon: Target,
  },
];

export default function PerformancePage() {
  const breadcrumbs = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Analytics', href: '/dashboard/analytics' },
    { label: 'Performance', isActive: true },
  ];

  const performanceChartData = [
    { name: 'Page Load Time', value: 85, color: 'bg-blue-500' },
    { name: 'First Contentful Paint', value: 92, color: 'bg-green-500' },
    { name: 'Time to Interactive', value: 78, color: 'bg-yellow-500' },
    { name: 'Core Web Vitals', value: 88, color: 'bg-purple-500' },
  ];

  const browserPerformanceData = [
    { name: 'Chrome', value: 92, color: 'bg-green-500' },
    { name: 'Firefox', value: 87, color: 'bg-orange-500' },
    { name: 'Safari', value: 89, color: 'bg-blue-500' },
    { name: 'Edge', value: 85, color: 'bg-purple-500' },
  ];

  return (
    <div className="flex-1 space-y-4 sm:space-y-6">
      {/* Header */}
      <AnalyticsHeader
        title="Performance Analytics"
        description="Monitor website performance and user experience metrics"
        breadcrumbs={breadcrumbs}
        badge="Real-time"
      />

      {/* Key Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {performanceData.map((metric, index) => (
          <PerformanceMetricCard
            key={metric.title}
            metric={metric}
            index={index}
          />
        ))}
      </div>

      {/* Performance Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <PerformanceChartCard
          title="Performance Metrics"
          description="Overall performance scores across different metrics"
          data={performanceChartData}
        />
        <PerformanceChartCard
          title="Browser Performance"
          description="Performance scores by browser type"
          data={browserPerformanceData}
        />
      </div>

      {/* Detailed Performance Analysis */}
      <PerformanceTabs />
    </div>
  );
}