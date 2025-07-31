'use client';

import { DollarSign, TrendingUp, ShoppingCart, CreditCard, Target, Users } from 'lucide-react';
import { AnalyticsHeader } from '@/components/analytics/analytics-header';
import { RevenueMetricCard } from '@/components/analytics/revenue-metric-card';
import { RevenueBreakdownCard } from '@/components/analytics/revenue-breakdown-card';
import { RevenueTabs } from '@/components/analytics/revenue-tabs';
import { ResponsiveContainer, ResponsiveGrid } from '@/components/ui/responsive-grid';

const revenueMetrics = [
  {
    title: 'Total Revenue',
    value: '$521,430',
    change: 12.5,
    changeType: 'positive' as const,
    icon: DollarSign,
    period: 'vs last month',
  },
  {
    title: 'Monthly Growth',
    value: '15.2%',
    change: 3.1,
    changeType: 'positive' as const,
    icon: TrendingUp,
    period: 'vs last month',
  },
  {
    title: 'Total Orders',
    value: '2,847',
    change: 8.7,
    changeType: 'positive' as const,
    icon: ShoppingCart,
    period: 'vs last month',
  },
  {
    title: 'Avg. Order Value',
    value: '$183.12',
    change: -2.4,
    changeType: 'negative' as const,
    icon: CreditCard,
    period: 'vs last month',
  },
  {
    title: 'Conversion Rate',
    value: '3.42%',
    change: 0.8,
    changeType: 'positive' as const,
    icon: Target,
    period: 'vs last month',
  },
  {
    title: 'Customer LTV',
    value: '$1,247',
    change: 18.3,
    changeType: 'positive' as const,
    icon: Users,
    period: 'vs last month',
  },
];

export default function RevenueAnalyticsPage() {
  const breadcrumbs = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Analytics', href: '/dashboard/analytics' },
    { label: 'Revenue', isActive: true },
  ];

  const revenueByCategory = [
    { category: 'Subscriptions', amount: 234560, percentage: 45, color: 'bg-blue-500' },
    { category: 'One-time Sales', amount: 156780, percentage: 30, color: 'bg-green-500' },
    { category: 'Services', amount: 89430, percentage: 17, color: 'bg-purple-500' },
    { category: 'Add-ons', amount: 40660, percentage: 8, color: 'bg-orange-500' },
  ];

  const revenueBySource = [
    { category: 'Direct Sales', amount: 198750, percentage: 38, color: 'bg-indigo-500' },
    { category: 'Affiliate', amount: 145320, percentage: 28, color: 'bg-pink-500' },
    { category: 'Partnerships', amount: 104180, percentage: 20, color: 'bg-teal-500' },
    { category: 'Referrals', amount: 73180, percentage: 14, color: 'bg-yellow-500' },
  ];

  return (
    <ResponsiveContainer>
      {/* Header */}
      <AnalyticsHeader
        title="Revenue Analytics"
        description="Track revenue performance, growth trends, and financial metrics"
        breadcrumbs={breadcrumbs}
        badge="Live Data"
      />

      {/* Revenue Metrics */}
      <ResponsiveGrid cols={{ default: 1, sm: 2, lg: 3, xl: 6 }}>
        {revenueMetrics.map((metric, index) => (
          <RevenueMetricCard
            key={metric.title}
            metric={metric}
            index={index}
          />
        ))}
      </ResponsiveGrid>

      {/* Revenue Breakdown */}
      <ResponsiveGrid cols={{ default: 1, lg: 2 }}>
        <RevenueBreakdownCard
          title="Revenue by Category"
          description="Distribution of revenue across product categories"
          data={revenueByCategory}
        />
        <RevenueBreakdownCard
          title="Revenue by Source"
          description="Revenue breakdown by acquisition channel"
          data={revenueBySource}
        />
      </ResponsiveGrid>

      {/* Detailed Analysis */}
      <RevenueTabs />
    </ResponsiveContainer>
  );
}