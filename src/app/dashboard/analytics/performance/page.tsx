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
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  Users,
  Target,
} from 'lucide-react';

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
    title: 'Core Web Vitals Score',
    value: '94',
    change: 5,
    status: 'improved',
    target: '> 90',
    icon: Target,
  },
  {
    title: 'Bounce Rate',
    value: '23%',
    change: -4,
    status: 'improved',
    target: '< 25%',
    icon: Users,
  },
];

const timeSeriesData = [
  { name: 'Jan', value: 2.1 },
  { name: 'Feb', value: 1.9 },
  { name: 'Mar', value: 1.7 },
  { name: 'Apr', value: 1.5 },
  { name: 'May', value: 1.3 },
  { name: 'Jun', value: 1.2 },
];

export default function PerformancePage() {
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
            <BreadcrumbLink href="/dashboard/analytics">
              Analytics
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Performance</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Performance Analytics
          </h1>
          <p className="text-muted-foreground">
            Monitor website performance and user experience metrics
          </p>
        </div>
        <Badge variant="outline" className="ml-auto">
          Real-time
        </Badge>
      </div>

      <Separator />

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {performanceData.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.title}
                </CardTitle>
                <metric.icon className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="text-muted-foreground flex items-center space-x-2 text-xs">
                  <div className="flex items-center">
                    {metric.change > 0 ? (
                      <TrendingUp className="mr-1 h-3 w-3 text-red-500" />
                    ) : (
                      <TrendingDown className="mr-1 h-3 w-3 text-green-500" />
                    )}
                    {Math.abs(metric.change)}%
                  </div>
                  <span>•</span>
                  <span>Target: {metric.target}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Detailed Analytics */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Performance Trends</CardTitle>
            <CardDescription>
              Average page load time over the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {timeSeriesData.map((data, index) => (
                <div key={data.name} className="flex items-center space-x-4">
                  <div className="w-12 text-sm font-medium">{data.name}</div>
                  <div className="flex-1">
                    <Progress
                      value={(3 - data.value) * 33.33}
                      className="h-2"
                    />
                  </div>
                  <div className="text-muted-foreground w-16 text-sm">
                    {data.value}s
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Insights</CardTitle>
            <CardDescription>
              Recommendations to improve performance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Image Optimization</span>
                <Badge variant="secondary">High Impact</Badge>
              </div>
              <p className="text-muted-foreground text-sm">
                Compress and optimize images to reduce load times by up to 40%
              </p>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Code Splitting</span>
                <Badge variant="outline">Medium Impact</Badge>
              </div>
              <p className="text-muted-foreground text-sm">
                Implement lazy loading for non-critical components
              </p>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">CDN Implementation</span>
                <Badge variant="outline">Low Impact</Badge>
              </div>
              <p className="text-muted-foreground text-sm">
                Serve static assets from a content delivery network
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Details */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Performance Metrics</CardTitle>
          <CardDescription>
            Comprehensive breakdown of performance indicators
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="loading">Loading</TabsTrigger>
              <TabsTrigger value="interactivity">Interactivity</TabsTrigger>
              <TabsTrigger value="visual">Visual Stability</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Performance Score</h4>
                  <div className="text-2xl font-bold text-green-600">
                    94/100
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Accessibility Score</h4>
                  <div className="text-2xl font-bold text-green-600">
                    98/100
                  </div>
                  <Progress value={98} className="h-2" />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="loading" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">
                    First Contentful Paint
                  </h4>
                  <div className="text-xl font-bold">0.8s</div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">
                    Largest Contentful Paint
                  </h4>
                  <div className="text-xl font-bold">1.2s</div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Speed Index</h4>
                  <div className="text-xl font-bold">1.1s</div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="interactivity" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Time to Interactive</h4>
                  <div className="text-xl font-bold">1.8s</div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">First Input Delay</h4>
                  <div className="text-xl font-bold">12ms</div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="visual" className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Cumulative Layout Shift</h4>
                <div className="text-xl font-bold">0.05</div>
                <p className="text-muted-foreground text-sm">
                  Measures visual stability during page load
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
