'use client';

import * as React from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  CreditCard, 
  Banknote,
  PieChart,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaChartComponent, LineChartComponent, PieChartComponent } from '@/components/ui/chart';

/**
 * Revenue metrics interface
 */
interface RevenueMetric {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  percentage: number;
  period: string;
}

/**
 * Revenue source interface
 */
interface RevenueSource {
  source: string;
  amount: number;
  percentage: number;
  change: string;
  trend: 'up' | 'down';
  color: string;
}

/**
 * Mock revenue data
 */
const revenueMetrics: RevenueMetric[] = [
  {
    title: 'Total Revenue',
    value: '$89,432',
    change: '+12.5%',
    trend: 'up',
    percentage: 85,
    period: 'vs last month'
  },
  {
    title: 'Monthly Recurring Revenue',
    value: '$67,890',
    change: '+8.2%',
    trend: 'up',
    percentage: 92,
    period: 'vs last month'
  },
  {
    title: 'Average Order Value',
    value: '$156.78',
    change: '-2.4%',
    trend: 'down',
    percentage: 78,
    period: 'vs last month'
  },
  {
    title: 'Revenue Per User',
    value: '$42.30',
    change: '+15.7%',
    trend: 'up',
    percentage: 67,
    period: 'vs last month'
  }
];

const revenueSources: RevenueSource[] = [
  {
    source: 'Subscriptions',
    amount: 45230,
    percentage: 50.6,
    change: '+12%',
    trend: 'up',
    color: '#3b82f6'
  },
  {
    source: 'One-time Purchases',
    amount: 28430,
    percentage: 31.8,
    change: '+5%',
    trend: 'up',
    color: '#8b5cf6'
  },
  {
    source: 'Professional Services',
    amount: 12890,
    percentage: 14.4,
    change: '-2%',
    trend: 'down',
    color: '#06d6a0'
  },
  {
    source: 'Partnerships',
    amount: 2882,
    percentage: 3.2,
    change: '+18%',
    trend: 'up',
    color: '#f59e0b'
  }
];

const monthlyRevenueData = [
  { month: 'Jan', revenue: 65000, target: 60000, subscriptions: 40000, oneTime: 25000 },
  { month: 'Feb', revenue: 72000, target: 65000, subscriptions: 45000, oneTime: 27000 },
  { month: 'Mar', revenue: 68000, target: 70000, subscriptions: 42000, oneTime: 26000 },
  { month: 'Apr', revenue: 85000, target: 75000, subscriptions: 52000, oneTime: 33000 },
  { month: 'May', revenue: 91000, target: 80000, subscriptions: 58000, oneTime: 33000 },
  { month: 'Jun', revenue: 89432, target: 85000, subscriptions: 56000, oneTime: 33432 }
];

const dailyRevenueData = [
  { date: '1', amount: 2850 },
  { date: '2', amount: 3200 },
  { date: '3', amount: 2950 },
  { date: '4', amount: 3400 },
  { date: '5', amount: 3100 },
  { date: '6', amount: 2800 },
  { date: '7', amount: 3600 },
  { date: '8', amount: 3350 },
  { date: '9', amount: 2900 },
  { date: '10', amount: 3800 },
  { date: '11', amount: 3200 },
  { date: '12', amount: 3500 },
  { date: '13', amount: 2950 },
  { date: '14', amount: 4100 },
  { date: '15', amount: 3900 }
];

/**
 * Revenue analytics component with comprehensive revenue insights
 */
export function RevenueAnalytics() {
  return (
    <div className="space-y-6">
      {/* Revenue Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {revenueMetrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                {metric.trend === 'up' ? (
                  <ArrowUpRight className="h-3 w-3 text-green-600" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-600" />
                )}
                <span className={metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                  {metric.change}
                </span>
                <span>{metric.period}</span>
              </div>
              <Progress value={metric.percentage} className="mt-3" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Revenue Trend */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Revenue Trend</span>
              </CardTitle>
              <CardDescription>
                Monthly revenue vs targets over the last 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <AreaChartComponent
                  data={monthlyRevenueData}
                  xAxisKey="month"
                  areaKey="revenue"
                  showGrid
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Sources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="h-5 w-5" />
              <span>Revenue Sources</span>
            </CardTitle>
            <CardDescription>
              Breakdown by revenue stream
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {revenueSources.map((source) => (
              <div key={source.source} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="h-3 w-3 rounded-full" 
                    style={{ backgroundColor: source.color }}
                  />
                  <div>
                    <p className="text-sm font-medium">{source.source}</p>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>${source.amount.toLocaleString()}</span>
                      <Badge variant={source.trend === 'up' ? 'default' : 'secondary'} className="h-4 text-xs">
                        {source.change}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{source.percentage}%</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
          <TabsTrigger value="cohorts">Cohorts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Daily Revenue */}
            <Card>
              <CardHeader>
                <CardTitle>Daily Revenue (Last 15 Days)</CardTitle>
                <CardDescription>
                  Revenue performance by day
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <LineChartComponent
                    data={dailyRevenueData}
                    xAxisKey="date"
                    lines={[
                      { key: 'amount', color: '#3b82f6', name: 'Revenue' }
                    ]}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Revenue by Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>
                  Revenue distribution by payment type
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Credit Cards</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">$67,890</p>
                    <p className="text-xs text-muted-foreground">75.9%</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Banknote className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Bank Transfer</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">$15,420</p>
                    <p className="text-xs text-muted-foreground">17.2%</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-4 w-4 rounded bg-primary/20 flex items-center justify-center">
                      <span className="text-xs font-bold">PP</span>
                    </div>
                    <span className="text-sm font-medium">PayPal</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">$4,890</p>
                    <p className="text-xs text-muted-foreground">5.5%</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-4 w-4 rounded bg-yellow-500/20 flex items-center justify-center">
                      <span className="text-xs font-bold">₿</span>
                    </div>
                    <span className="text-sm font-medium">Crypto</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">$1,232</p>
                    <p className="text-xs text-muted-foreground">1.4%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trends Analysis</CardTitle>
              <CardDescription>
                Historical revenue patterns and seasonal trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 flex items-center justify-center bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/25">
                <div className="text-center">
                  <TrendingUp className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium text-muted-foreground">Advanced Trend Analysis</p>
                  <p className="text-sm text-muted-foreground">YoY comparison, seasonality, and growth patterns</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forecasting" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Forecasting</CardTitle>
              <CardDescription>
                AI-powered revenue predictions and growth modeling
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 flex items-center justify-center bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/25">
                <div className="text-center">
                  <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium text-muted-foreground">Revenue Forecasting</p>
                  <p className="text-sm text-muted-foreground">Predictive analytics and scenario planning</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cohorts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Cohort Analysis</CardTitle>
              <CardDescription>
                Customer lifetime value and retention impact on revenue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 flex items-center justify-center bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/25">
                <div className="text-center">
                  <PieChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium text-muted-foreground">Cohort Analysis</p>
                  <p className="text-sm text-muted-foreground">Revenue tracking by customer acquisition cohorts</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 