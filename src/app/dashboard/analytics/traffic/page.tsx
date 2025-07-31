'use client';

import { Users, Globe, Smartphone, Monitor, Eye, MousePointer, Clock, Activity } from 'lucide-react';
import { AnalyticsHeader } from '@/components/analytics/analytics-header';
import { TrafficMetricCard } from '@/components/analytics/traffic-metric-card';
import { TrafficSourceCard } from '@/components/analytics/traffic-source-card';
import { TrafficTabs } from '@/components/analytics/traffic-tabs';
import { ResponsiveContainer, ResponsiveGrid } from '@/components/ui/responsive-grid';

const trafficMetrics = [
  {
    title: 'Total Visitors',
    value: '86,700',
    change: 12.5,
    changeType: 'positive' as const,
    icon: Users,
    period: 'vs last month',
  },
  {
    title: 'Unique Visitors',
    value: '64,200',
    change: 8.3,
    changeType: 'positive' as const,
    icon: Globe,
    period: 'vs last month',
  },
  {
    title: 'Page Views',
    value: '234,500',
    change: 15.7,
    changeType: 'positive' as const,
    icon: Eye,
    period: 'vs last month',
  },
  {
    title: 'Bounce Rate',
    value: '32.4%',
    change: -4.2,
    changeType: 'positive' as const,
    icon: MousePointer,
    period: 'vs last month',
  },
  {
    title: 'Avg. Session',
    value: '4m 32s',
    change: 18.9,
    changeType: 'positive' as const,
    icon: Clock,
    period: 'vs last month',
  },
  {
    title: 'Pages/Session',
    value: '2.8',
    change: 6.1,
    changeType: 'positive' as const,
    icon: Activity,
    period: 'vs last month',
  },
];

export default function TrafficAnalyticsPage() {
  const breadcrumbs = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Analytics', href: '/dashboard/analytics' },
    { label: 'Traffic', isActive: true },
  ];

  const trafficSources = [
    { source: 'Organic Search', visitors: 34500, percentage: 40, change: 12.3, color: 'bg-green-500' },
    { source: 'Direct', visitors: 26000, percentage: 30, change: 8.7, color: 'bg-blue-500' },
    { source: 'Social Media', visitors: 17300, percentage: 20, change: 25.1, color: 'bg-purple-500' },
    { source: 'Referral', visitors: 8700, percentage: 10, change: -3.2, color: 'bg-orange-500' },
  ];

  const campaignTraffic = [
    { source: 'Google Ads', visitors: 18200, percentage: 35, change: 15.8, color: 'bg-red-500' },
    { source: 'Facebook Ads', visitors: 14600, percentage: 28, change: 22.4, color: 'bg-blue-600' },
    { source: 'LinkedIn Ads', visitors: 9800, percentage: 19, change: 8.9, color: 'bg-indigo-500' },
    { source: 'Email Campaign', visitors: 9400, percentage: 18, change: 12.1, color: 'bg-teal-500' },
  ];

  return (
    <ResponsiveContainer>
      {/* Header */}
      <AnalyticsHeader
        title="Traffic Analytics"
        description="Monitor website traffic, visitor behavior, and acquisition channels"
        breadcrumbs={breadcrumbs}
        badge="Real-time"
      />

      {/* Traffic Metrics */}
      <ResponsiveGrid cols={{ default: 1, sm: 2, lg: 3, xl: 6 }}>
        {trafficMetrics.map((metric, index) => (
          <TrafficMetricCard
            key={metric.title}
            metric={metric}
            index={index}
          />
        ))}
      </ResponsiveGrid>

      {/* Traffic Sources */}
      <ResponsiveGrid cols={{ default: 1, lg: 2 }}>
        <TrafficSourceCard
          title="Traffic Sources"
          description="Where your visitors are coming from"
          data={trafficSources}
        />
        <TrafficSourceCard
          title="Campaign Performance"
          description="Traffic from marketing campaigns"
          data={campaignTraffic}
        />
      </ResponsiveGrid>

      {/* Detailed Analysis */}
      <TrafficTabs />
    </ResponsiveContainer>
  );
}