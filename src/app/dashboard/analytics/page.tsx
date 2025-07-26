import type { Metadata } from 'next';
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
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaChartComponent, LineChartComponent, PieChartComponent } from '@/components/ui/chart';

export const metadata: Metadata = {
  title: 'Analytics Dashboard',
  description: 'View detailed analytics, charts, and business insights',
};

/**
 * Mock analytics data
 */
const analyticsData = {
  summary: [
    {
      title: 'Total Visitors',
      value: '124,832',
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: Users,
      period: 'vs last month'
    },
    {
      title: 'Revenue',
      value: '$89,432',
      change: '+8.2%',
      changeType: 'positive' as const,
      icon: DollarSign,
      period: 'vs last month'
    },
    {
      title: 'Conversion Rate',
      value: '3.24%',
      change: '-0.8%',
      changeType: 'negative' as const,
      icon: Target,
      period: 'vs last month'
    },
    {
      title: 'Avg. Session',
      value: '4m 32s',
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
  trafficSources: [
    { source: 'Direct', visitors: 45230, percentage: 36.2 },
    { source: 'Organic Search', visitors: 32840, percentage: 26.3 },
    { source: 'Social Media', visitors: 28100, percentage: 22.5 },
    { source: 'Referral', visitors: 12450, percentage: 9.9 },
    { source: 'Email', visitors: 6212, percentage: 5.1 }
  ]
};

/**
 * Mock chart data for visualization
 */
const chartData = {
  revenue: [
    { month: 'Jan', value: 65000 },
    { month: 'Feb', value: 72000 },
    { month: 'Mar', value: 68000 },
    { month: 'Apr', value: 85000 },
    { month: 'May', value: 91000 },
    { month: 'Jun', value: 89432 }
  ],
  visitors: [
    { date: '1 Dec', desktop: 4200, mobile: 2800 },
    { date: '8 Dec', desktop: 4800, mobile: 3200 },
    { date: '15 Dec', desktop: 5100, mobile: 3600 },
    { date: '22 Dec', desktop: 4900, mobile: 3400 },
    { date: '29 Dec', desktop: 5300, mobile: 3800 }
  ]
};

/**
 * Analytics dashboard page component
 */
export default function AnalyticsPage() {
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
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Last 30 days</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </Button>
          <Button className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsData.summary.map((metric) => (
          <Card key={metric.title} className="hover:shadow-lg transition-shadow">
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
                {analyticsData.topPages.map((page, index) => (
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
                {analyticsData.trafficSources.map((source) => (
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
          <Card>
            <CardHeader>
              <CardTitle>Revenue Analytics</CardTitle>
              <CardDescription>
                Detailed revenue breakdown and forecasting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 flex items-center justify-center bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/25">
                <div className="text-center">
                  <DollarSign className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium text-muted-foreground">Revenue Dashboard</p>
                  <p className="text-sm text-muted-foreground">Advanced revenue analytics coming soon</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conversion" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnel</CardTitle>
              <CardDescription>
                Track user journey and conversion points
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 flex items-center justify-center bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/25">
                <div className="text-center">
                  <Target className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium text-muted-foreground">Conversion Analytics</p>
                  <p className="text-sm text-muted-foreground">Funnel analysis and optimization tools</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 