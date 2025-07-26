'use client';

import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  Activity,
  Users,
  DollarSign,
  Target,
  Clock,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaChartComponent, LineChartComponent, PieChartComponent } from '@/components/ui/chart';
import { FilterPopover, DEFAULT_ANALYTICS_FILTERS } from '@/components/ui/filter-popover';
import { DatePicker } from '@/components/ui/calendar';
import { RevenueAnalytics } from '@/components/dashboard/revenue-analytics';
import { ConversionFunnel } from '@/components/dashboard/conversion-funnel';
import { AnalyticsService, AnalyticsData, handleApiError } from '@/lib/api';

// Transform API data to display format
const transformAnalyticsData = (data: AnalyticsData) => ({
  summary: [
    {
      title: 'Total Visitors',
      value: data.metrics.totalVisitors.toLocaleString(),
      change: '+12.5%', // Would be calculated from historical data
      changeType: 'positive' as const,
      icon: Users,
      period: 'vs last month'
    },
    {
      title: 'Revenue',
      value: `$${data.metrics.revenue.toLocaleString()}`,
      change: '+8.2%',
      changeType: 'positive' as const,
      icon: DollarSign,
      period: 'vs last month'
    },
    {
      title: 'Conversion Rate',
      value: `${data.metrics.conversionRate}%`,
      change: '-0.8%',
      changeType: 'negative' as const,
      icon: Target,
      period: 'vs last month'
    },
    {
      title: 'Avg. Session',
      value: formatDuration(data.metrics.avgSessionDuration),
      change: '+15.3%',
      changeType: 'positive' as const,
      icon: Clock,
      period: 'vs last month'
    }
  ],
  topPages: [
    { path: '/dashboard', views: 15420, change: '+12%' },
    { path: '/analytics', views: 8932, change: '+5%' },
    { path: '/settings', views: 6744, change: '-2%' },
    { path: '/forms', views: 4523, change: '+18%' },
    { path: '/table', views: 3891, change: '+7%' }
  ],
  trafficSources: data.charts.trafficSources
});

const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
};

/**
 * Analytics dashboard page component
 */
export default function AnalyticsPage() {
  // State for filters and date selection
  const [activeFilters, setActiveFilters] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load analytics data
  useEffect(() => {
    loadAnalyticsData();
  }, []);

  const loadAnalyticsData = async (timeRange = '30d') => {
    try {
      setLoading(true);
      setError('');
      const data = await AnalyticsService.getAnalytics(timeRange);
      setAnalyticsData(data);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleExportData = async (format: 'csv' | 'xlsx' | 'pdf') => {
    try {
      const blob = await AnalyticsService.exportData(format);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `analytics-data.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError(handleApiError(err));
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading analytics data...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load analytics</h3>
            <p className="text-gray-500 mb-4">{error}</p>
            <Button onClick={() => loadAnalyticsData()}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!analyticsData) return null;

  const displayData = transformAnalyticsData(analyticsData);
  const chartData = {
    revenue: analyticsData.charts.revenue,
    visitors: analyticsData.charts.visitors
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive insights into your application performance and user behavior.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <FilterPopover
            categories={DEFAULT_ANALYTICS_FILTERS}
            activeFilters={activeFilters}
            onFiltersChange={setActiveFilters}
            triggerText="Filter"
            showCount={true}
          />
          <DatePicker
            selected={selectedDate}
            onSelect={setSelectedDate}
            placeholder="Select date range"
            className="w-40"
          />
          <Button variant="outline" className="flex items-center space-x-2">
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </Button>
          <Button 
            className="flex items-center space-x-2"
            onClick={() => handleExportData('csv')}
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayData.summary.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <metric.icon className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                <TrendingUp className={`h-3 w-3 ${
                  metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`} />
                <span className={metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}>
                  {metric.change}
                </span>
                <span>{metric.period}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Tables */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-fit">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="conversion">Conversion</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Revenue Chart */}
            <AreaChartComponent
              title="Revenue Trend"
              description="Monthly revenue over the last 6 months"
              data={chartData.revenue}
              xAxisKey="month"
              areaKey="value"
              className="lg:col-span-2"
            />

            {/* Top Pages */}
            <Card>
              <CardHeader>
                <CardTitle>Top Pages</CardTitle>
                <CardDescription>
                  Most visited pages this month
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {displayData.topPages.map((page, index) => (
                  <div key={page.path} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-sm font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{page.path}</p>
                        <p className="text-xs text-muted-foreground">
                          {page.views.toLocaleString()} views
                        </p>
                      </div>
                    </div>
                    <Badge variant={page.change.startsWith('+') ? 'default' : 'secondary'}>
                      {page.change}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="traffic" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Visitor Chart */}
            <LineChartComponent
              title="Visitor Traffic"
              description="Desktop vs Mobile visitors"
              data={chartData.visitors}
              xAxisKey="date"
              lines={[
                { key: 'desktop', color: '#3b82f6', name: 'Desktop' },
                { key: 'mobile', color: '#8b5cf6', name: 'Mobile' }
              ]}
            />

            {/* Traffic Sources */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="h-5 w-5" />
                  <span>Traffic Sources</span>
                </CardTitle>
                <CardDescription>
                  Where your visitors come from
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {displayData.trafficSources.map((source) => (
                  <div key={source.source} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-3 w-3 rounded-full bg-primary" />
                      <span className="text-sm font-medium">{source.source}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{source.visitors.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">{source.percentage}%</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <RevenueAnalytics />
        </TabsContent>

        <TabsContent value="conversion" className="space-y-6">
          <ConversionFunnel />
        </TabsContent>
      </Tabs>
    </div>
  );
} 