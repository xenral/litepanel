'use client';

import * as React from 'react';
import {
  Target,
  Users,
  ShoppingCart,
  CreditCard,
  CheckCircle,
  TrendingDown,
  TrendingUp,
  ArrowDown,
  Eye,
  MousePointer,
  UserCheck,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

/**
 * Funnel step interface
 */
interface FunnelStep {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  users: number;
  conversion: number;
  dropOff: number;
  averageTime: string;
  color: string;
}

/**
 * Conversion metric interface
 */
interface ConversionMetric {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  description: string;
}

/**
 * User journey step interface
 */
interface JourneyStep {
  step: string;
  action: string;
  users: number;
  completion: number;
  avgTime: string;
}

/**
 * Mock funnel data
 */
const funnelSteps: FunnelStep[] = [
  {
    id: 'awareness',
    name: 'Awareness',
    description: 'Users who visited the site',
    icon: Eye,
    users: 50000,
    conversion: 100,
    dropOff: 0,
    averageTime: '2m 30s',
    color: '#3b82f6',
  },
  {
    id: 'interest',
    name: 'Interest',
    description: 'Users who viewed product pages',
    icon: MousePointer,
    users: 25000,
    conversion: 50,
    dropOff: 50,
    averageTime: '4m 15s',
    color: '#8b5cf6',
  },
  {
    id: 'consideration',
    name: 'Consideration',
    description: 'Users who added items to cart',
    icon: ShoppingCart,
    users: 8750,
    conversion: 17.5,
    dropOff: 65,
    averageTime: '3m 45s',
    color: '#06d6a0',
  },
  {
    id: 'intent',
    name: 'Intent',
    description: 'Users who started checkout',
    icon: CreditCard,
    users: 5250,
    conversion: 10.5,
    dropOff: 40,
    averageTime: '2m 10s',
    color: '#f59e0b',
  },
  {
    id: 'purchase',
    name: 'Purchase',
    description: 'Users who completed purchase',
    icon: CheckCircle,
    users: 3675,
    conversion: 7.35,
    dropOff: 30,
    averageTime: '1m 30s',
    color: '#10b981',
  },
  {
    id: 'loyalty',
    name: 'Loyalty',
    description: 'Users who made repeat purchases',
    icon: UserCheck,
    users: 1470,
    conversion: 2.94,
    dropOff: 60,
    averageTime: '1m 15s',
    color: '#ef4444',
  },
];

const conversionMetrics: ConversionMetric[] = [
  {
    title: 'Overall Conversion Rate',
    value: '7.35%',
    change: '+0.8%',
    trend: 'up',
    description: 'From visitor to purchase',
  },
  {
    title: 'Cart Conversion Rate',
    value: '42.0%',
    change: '+2.3%',
    trend: 'up',
    description: 'From cart to purchase',
  },
  {
    title: 'Checkout Conversion',
    value: '70.0%',
    change: '-1.2%',
    trend: 'down',
    description: 'From checkout start to completion',
  },
  {
    title: 'Return Customer Rate',
    value: '40.0%',
    change: '+5.1%',
    trend: 'up',
    description: 'Customers who purchase again',
  },
];

const userJourney: JourneyStep[] = [
  {
    step: 'Landing Page',
    action: 'Page View',
    users: 50000,
    completion: 100,
    avgTime: '0:45',
  },
  {
    step: 'Product Browse',
    action: 'Category View',
    users: 35000,
    completion: 70,
    avgTime: '2:30',
  },
  {
    step: 'Product Detail',
    action: 'Product View',
    users: 25000,
    completion: 50,
    avgTime: '3:15',
  },
  {
    step: 'Add to Cart',
    action: 'Cart Addition',
    users: 8750,
    completion: 17.5,
    avgTime: '1:20',
  },
  {
    step: 'Cart Review',
    action: 'Cart View',
    users: 7500,
    completion: 15,
    avgTime: '2:45',
  },
  {
    step: 'Checkout Start',
    action: 'Checkout Begin',
    users: 5250,
    completion: 10.5,
    avgTime: '0:30',
  },
  {
    step: 'Payment Info',
    action: 'Payment Form',
    users: 4200,
    completion: 8.4,
    avgTime: '1:45',
  },
  {
    step: 'Order Complete',
    action: 'Purchase',
    users: 3675,
    completion: 7.35,
    avgTime: '0:15',
  },
];

/**
 * Conversion funnel component with comprehensive funnel analysis
 */
export function ConversionFunnel() {
  return (
    <div className="space-y-6">
      {/* Conversion Metrics Overview */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {conversionMetrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-lg">
                <Target className="text-primary h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="text-muted-foreground mt-1 flex items-center space-x-2 text-xs">
                {metric.trend === 'up' ? (
                  <TrendingUp className="h-3 w-3 text-green-600" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-600" />
                )}
                <span
                  className={
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }
                >
                  {metric.change}
                </span>
                <span>vs last month</span>
              </div>
              <p className="text-muted-foreground mt-2 text-xs">
                {metric.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Funnel Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Conversion Funnel</span>
          </CardTitle>
          <CardDescription>
            User journey from awareness to loyalty
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {funnelSteps.map((step, index) => {
              const isLast = index === funnelSteps.length - 1;
              const nextStep = funnelSteps[index + 1];

              return (
                <div key={step.id} className="relative">
                  <div className="hover:bg-accent/50 flex items-center space-x-4 rounded-lg border p-4 transition-colors">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-lg"
                      style={{
                        backgroundColor: `${step.color}20`,
                        color: step.color,
                      }}
                    >
                      <step.icon className="h-6 w-6" />
                    </div>

                    <div className="flex-1">
                      <div className="mb-2 flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium">{step.name}</h4>
                          <p className="text-muted-foreground text-xs">
                            {step.description}
                          </p>
                        </div>
                        <div className="flex items-center space-x-4 text-right">
                          <div>
                            <p className="text-sm font-medium">
                              {step.users.toLocaleString()}
                            </p>
                            <p className="text-muted-foreground text-xs">
                              users
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              {step.conversion}%
                            </p>
                            <p className="text-muted-foreground text-xs">
                              conversion
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              {step.averageTime}
                            </p>
                            <p className="text-muted-foreground text-xs">
                              avg time
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Progress
                          value={step.conversion}
                          className="h-2"
                          style={{ backgroundColor: `${step.color}20` }}
                        />
                        {step.dropOff > 0 && (
                          <div className="text-muted-foreground flex items-center space-x-2 text-xs">
                            <TrendingDown className="h-3 w-3 text-red-500" />
                            <span>{step.dropOff}% drop-off to next step</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {!isLast && (
                    <div className="my-2 flex justify-center">
                      <ArrowDown className="text-muted-foreground h-4 w-4" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis Tabs */}
      <Tabs defaultValue="journey" className="space-y-6">
        <TabsList>
          <TabsTrigger value="journey">User Journey</TabsTrigger>
          <TabsTrigger value="segments">Segments</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
          <TabsTrigger value="cohorts">Cohorts</TabsTrigger>
        </TabsList>

        <TabsContent value="journey" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Detailed User Journey</CardTitle>
              <CardDescription>
                Step-by-step breakdown of user interactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userJourney.map((step, index) => (
                  <div
                    key={step.step}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{step.step}</p>
                        <p className="text-muted-foreground text-xs">
                          {step.action}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 text-right">
                      <div>
                        <p className="text-sm font-medium">
                          {step.users.toLocaleString()}
                        </p>
                        <p className="text-muted-foreground text-xs">users</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {step.completion}%
                        </p>
                        <p className="text-muted-foreground text-xs">
                          completion
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{step.avgTime}</p>
                        <p className="text-muted-foreground text-xs">
                          avg time
                        </p>
                      </div>
                      <Badge
                        variant={
                          step.completion > 50
                            ? 'default'
                            : step.completion > 20
                              ? 'secondary'
                              : 'destructive'
                        }
                      >
                        {step.completion > 50
                          ? 'Good'
                          : step.completion > 20
                            ? 'Fair'
                            : 'Poor'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="segments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Conversion by Segments</CardTitle>
              <CardDescription>
                How different user segments perform in the funnel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">By Traffic Source</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Organic Search</span>
                      <Badge variant="default">8.2%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Direct</span>
                      <Badge variant="default">7.8%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Social Media</span>
                      <Badge variant="secondary">6.1%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Paid Ads</span>
                      <Badge variant="secondary">5.9%</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">By Device Type</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Desktop</span>
                      <Badge variant="default">9.1%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Mobile</span>
                      <Badge variant="secondary">6.2%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Tablet</span>
                      <Badge variant="secondary">5.8%</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Optimization Opportunities</CardTitle>
              <CardDescription>
                Recommendations to improve conversion rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border-l-4 border-l-red-500 bg-red-50 p-4 dark:bg-red-950/20">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-red-800 dark:text-red-200">
                        High Cart Abandonment
                      </h4>
                      <p className="mt-1 text-sm text-red-600 dark:text-red-300">
                        65% of users abandon their cart at the consideration
                        stage
                      </p>
                    </div>
                    <Badge variant="destructive">Critical</Badge>
                  </div>
                  <div className="mt-3">
                    <Button size="sm" variant="outline">
                      View Recommendations
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border-l-4 border-l-yellow-500 bg-yellow-50 p-4 dark:bg-yellow-950/20">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                        Checkout Drop-off
                      </h4>
                      <p className="mt-1 text-sm text-yellow-600 dark:text-yellow-300">
                        30% of users don't complete checkout after starting
                      </p>
                    </div>
                    <Badge variant="secondary">Medium</Badge>
                  </div>
                  <div className="mt-3">
                    <Button size="sm" variant="outline">
                      Analyze Checkout Flow
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border-l-4 border-l-green-500 bg-green-50 p-4 dark:bg-green-950/20">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-green-800 dark:text-green-200">
                        Mobile Optimization
                      </h4>
                      <p className="mt-1 text-sm text-green-600 dark:text-green-300">
                        Mobile conversion is 3% lower than desktop
                      </p>
                    </div>
                    <Badge variant="secondary">Low</Badge>
                  </div>
                  <div className="mt-3">
                    <Button size="sm" variant="outline">
                      Mobile Analysis
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cohorts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cohort Conversion Analysis</CardTitle>
              <CardDescription>
                Conversion rates by user acquisition cohorts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/20 border-muted-foreground/25 flex h-96 items-center justify-center rounded-lg border-2 border-dashed">
                <div className="text-center">
                  <Users className="text-muted-foreground mx-auto mb-4 h-16 w-16" />
                  <p className="text-muted-foreground text-lg font-medium">
                    Cohort Analysis
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Track conversion rates by user acquisition date
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
