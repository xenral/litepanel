'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Globe,
  Smartphone,
  Monitor,
  MapPin,
  Clock,
  Eye,
  MousePointer,
  Download,
  BarChart3,
  PieChart,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from 'lucide-react';

// Mock data for traffic analytics
const trafficOverview = {
  totalVisitors: 127845,
  uniqueVisitors: 98234,
  pageViews: 342567,
  bounceRate: 34.2,
  avgSessionDuration: '3m 42s',
  conversionRate: 4.8,
};

const trafficSources = [
  { source: 'Direct', visitors: 42350, percentage: 33.1, change: 12.5, trend: 'up' },
  { source: 'Google Search', visitors: 38420, percentage: 30.1, change: 8.3, trend: 'up' },
  { source: 'Social Media', visitors: 23410, percentage: 18.3, change: -2.1, trend: 'down' },
  { source: 'Email Campaign', visitors: 15230, percentage: 11.9, change: 15.7, trend: 'up' },
  { source: 'Referral Sites', visitors: 8435, percentage: 6.6, change: 0.0, trend: 'stable' },
];

const deviceBreakdown = [
  { device: 'Desktop', visitors: 76707, percentage: 60.0, change: -2.3 },
  { device: 'Mobile', visitors: 38354, percentage: 30.0, change: 18.7 },
  { device: 'Tablet', visitors: 12784, percentage: 10.0, change: -8.1 },
];

const topPages = [
  { page: '/', visitors: 45230, views: 67845, avgTime: '4m 23s', bounceRate: 28.3 },
  { page: '/dashboard', visitors: 32410, views: 89234, avgTime: '8m 15s', bounceRate: 15.2 },
  { page: '/docs', visitors: 18760, views: 34521, avgTime: '6m 42s', bounceRate: 45.8 },
  { page: '/pricing', visitors: 12450, views: 15623, avgTime: '2m 18s', bounceRate: 52.1 },
  { page: '/blog', visitors: 9820, views: 23456, avgTime: '5m 07s', bounceRate: 38.9 },
];

const geographicData = [
  { country: 'United States', visitors: 45230, percentage: 35.4, flag: '🇺🇸' },
  { country: 'United Kingdom', visitors: 23410, percentage: 18.3, flag: '🇬🇧' },
  { country: 'Germany', visitors: 15680, percentage: 12.3, flag: '🇩🇪' },
  { country: 'Canada', visitors: 12340, percentage: 9.6, flag: '🇨🇦' },
  { country: 'France', visitors: 9870, percentage: 7.7, flag: '🇫🇷' },
  { country: 'Japan', visitors: 8745, percentage: 6.8, flag: '🇯🇵' },
  { country: 'Australia', visitors: 7560, percentage: 5.9, flag: '🇦🇺' },
  { country: 'Others', visitors: 5040, percentage: 3.9, flag: '🌐' },
];

const timeData = [
  { hour: '00:00', visitors: 1250 },
  { hour: '02:00', visitors: 890 },
  { hour: '04:00', visitors: 654 },
  { hour: '06:00', visitors: 1340 },
  { hour: '08:00', visitors: 2890 },
  { hour: '10:00', visitors: 4560 },
  { hour: '12:00', visitors: 5230 },
  { hour: '14:00', visitors: 6780 },
  { hour: '16:00', visitors: 5890 },
  { hour: '18:00', visitors: 4320 },
  { hour: '20:00', visitors: 3210 },
  { hour: '22:00', visitors: 2180 },
];

const MetricCard = ({ 
  title, 
  value, 
  change, 
  trend, 
  icon: Icon,
  description 
}: { 
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: any;
  description?: string;
}) => {
  const trendIcon = trend === 'up' ? ArrowUpRight : trend === 'down' ? ArrowDownRight : Minus;
  const trendColor = trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon className="h-5 w-5 text-muted-foreground" />
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
            </div>
            <div className={`flex items-center space-x-1 ${trendColor}`}>
              {React.createElement(trendIcon, { className: 'h-4 w-4' })}
              <span className="text-sm font-medium">{Math.abs(change)}%</span>
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold">{typeof value === 'number' ? value.toLocaleString() : value}</p>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function TrafficAnalyticsPage() {
  const [timeRange, setTimeRange] = React.useState('7d');

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/analytics">Analytics</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbPage>Traffic</BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Traffic Analytics</h1>
          <p className="text-muted-foreground">
            Monitor your website traffic patterns and visitor behavior
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 3 months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Overview Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <MetricCard
          title="Total Visitors"
          value={trafficOverview.totalVisitors}
          change={12.5}
          trend="up"
          icon={Users}
          description="All unique visits"
        />
        <MetricCard
          title="Unique Visitors"
          value={trafficOverview.uniqueVisitors}
          change={8.3}
          trend="up"
          icon={Eye}
          description="Distinct users"
        />
        <MetricCard
          title="Page Views"
          value={trafficOverview.pageViews}
          change={15.7}
          trend="up"
          icon={MousePointer}
          description="Total page loads"
        />
        <MetricCard
          title="Bounce Rate"
          value={`${trafficOverview.bounceRate}%`}
          change={-2.1}
          trend="down"
          icon={Activity}
          description="Single page visits"
        />
        <MetricCard
          title="Avg. Session"
          value={trafficOverview.avgSessionDuration}
          change={5.2}
          trend="up"
          icon={Clock}
          description="Time per session"
        />
        <MetricCard
          title="Conversion Rate"
          value={`${trafficOverview.conversionRate}%`}
          change={3.8}
          trend="up"
          icon={TrendingUp}
          description="Goal completions"
        />
      </div>

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="sources" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sources">Traffic Sources</TabsTrigger>
          <TabsTrigger value="behavior">User Behavior</TabsTrigger>
          <TabsTrigger value="geography">Geography</TabsTrigger>
          <TabsTrigger value="realtime">Real-time</TabsTrigger>
        </TabsList>

        <TabsContent value="sources" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Traffic Sources */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Traffic Sources
                </CardTitle>
                <CardDescription>
                  Where your visitors are coming from
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trafficSources.map((source, index) => (
                    <motion.div
                      key={source.source}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center justify-between"
                    >
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{source.source}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-muted-foreground">
                              {source.visitors.toLocaleString()}
                            </span>
                            <Badge
                              variant={source.trend === 'up' ? 'default' : source.trend === 'down' ? 'destructive' : 'secondary'}
                              className="text-xs"
                            >
                              {source.trend === 'up' ? '+' : source.trend === 'down' ? '-' : ''}
                              {Math.abs(source.change)}%
                            </Badge>
                          </div>
                        </div>
                        <Progress value={source.percentage} className="h-2" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Device Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Monitor className="mr-2 h-5 w-5" />
                  Device Breakdown
                </CardTitle>
                <CardDescription>
                  Visitor distribution by device type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deviceBreakdown.map((device, index) => (
                    <motion.div
                      key={device.device}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        {device.device === 'Desktop' && <Monitor className="h-4 w-4 text-muted-foreground" />}
                        {device.device === 'Mobile' && <Smartphone className="h-4 w-4 text-muted-foreground" />}
                        {device.device === 'Tablet' && <Smartphone className="h-4 w-4 text-muted-foreground" />}
                        <span className="text-sm font-medium">{device.device}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-muted-foreground">
                          {device.visitors.toLocaleString()} ({device.percentage}%)
                        </span>
                        <Badge
                          variant={device.change > 0 ? 'default' : 'destructive'}
                          className="text-xs"
                        >
                          {device.change > 0 ? '+' : ''}{device.change}%
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="behavior" className="space-y-6">
          {/* Top Pages */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="mr-2 h-5 w-5" />
                Top Pages
              </CardTitle>
              <CardDescription>
                Most visited pages on your website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPages.map((page, index) => (
                  <motion.div
                    key={page.page}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
                          {page.page}
                        </span>
                        <div className="text-xs text-muted-foreground">
                          {page.visitors.toLocaleString()} visitors
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <div className="font-medium">{page.views.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Views</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">{page.avgTime}</div>
                        <div className="text-xs text-muted-foreground">Avg. Time</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">{page.bounceRate}%</div>
                        <div className="text-xs text-muted-foreground">Bounce</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geography" className="space-y-6">
          {/* Geographic Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                Geographic Distribution
              </CardTitle>
              <CardDescription>
                Visitor locations around the world
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {geographicData.map((location, index) => (
                  <motion.div
                    key={location.country}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{location.flag}</span>
                      <span className="font-medium">{location.country}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-32">
                        <Progress value={location.percentage} className="h-2" />
                      </div>
                      <div className="text-sm text-muted-foreground w-20 text-right">
                        {location.visitors.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground w-12 text-right">
                        {location.percentage}%
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="realtime" className="space-y-6">
          {/* Real-time Stats */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="mr-2 h-5 w-5" />
                  Real-time Activity
                </CardTitle>
                <CardDescription>
                  Current visitors on your site
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="text-4xl font-bold text-green-600">247</div>
                  <p className="text-muted-foreground">Active users right now</p>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-muted-foreground">Updates every 30 seconds</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hourly Traffic Pattern</CardTitle>
                <CardDescription>
                  Visitor distribution throughout the day
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {timeData.map((time, index) => (
                    <div key={time.hour} className="flex items-center justify-between">
                      <span className="text-sm font-mono w-12">{time.hour}</span>
                      <div className="flex-1 mx-3">
                        <Progress 
                          value={(time.visitors / Math.max(...timeData.map(t => t.visitors))) * 100} 
                          className="h-2" 
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-16 text-right">
                        {time.visitors.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Alert>
            <Activity className="h-4 w-4" />
            <AlertDescription>
              Real-time data is updated every 30 seconds. Historical data may take up to 24 hours to appear in reports.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  );
} 