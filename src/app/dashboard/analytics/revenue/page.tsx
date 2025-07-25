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
  DollarSign,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  CreditCard,
  Target,
  PieChart,
  BarChart3,
  Calendar,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Users,
  Package,
  RefreshCw,
  AlertTriangle,
} from 'lucide-react';

// Mock revenue data
const revenueOverview = {
  totalRevenue: 1247850,
  monthlyRevenue: 124780,
  avgOrderValue: 89.50,
  totalOrders: 13943,
  conversionRate: 4.8,
  customerLifetimeValue: 450.25,
  refundRate: 2.3,
  churnRate: 5.1,
};

const monthlyData = [
  { month: 'Jan', revenue: 98400, orders: 1120, avgOrder: 87.86 },
  { month: 'Feb', revenue: 105200, orders: 1245, avgOrder: 84.54 },
  { month: 'Mar', revenue: 118700, orders: 1389, avgOrder: 85.46 },
  { month: 'Apr', revenue: 125600, orders: 1456, avgOrder: 86.26 },
  { month: 'May', revenue: 134200, orders: 1523, avgOrder: 88.11 },
  { month: 'Jun', revenue: 142300, orders: 1634, avgOrder: 87.09 },
];

const revenueByCategory = [
  { category: 'Software', revenue: 456780, percentage: 36.6, change: 15.3, orders: 5234 },
  { category: 'Consulting', revenue: 324560, percentage: 26.0, change: 8.7, orders: 891 },
  { category: 'Training', revenue: 234120, percentage: 18.8, change: 22.1, orders: 1456 },
  { category: 'Support', revenue: 156780, percentage: 12.6, change: -3.2, orders: 2890 },
  { category: 'Hardware', revenue: 75610, percentage: 6.1, change: -8.5, orders: 567 },
];

const topCustomers = [
  { name: 'Acme Corporation', revenue: 45600, orders: 23, avgOrder: 1982.61, tier: 'Enterprise' },
  { name: 'Global Tech Solutions', revenue: 38200, orders: 18, avgOrder: 2122.22, tier: 'Enterprise' },
  { name: 'Innovation Labs', revenue: 29800, orders: 34, avgOrder: 876.47, tier: 'Business' },
  { name: 'Digital Dynamics', revenue: 24500, orders: 28, avgOrder: 875.00, tier: 'Business' },
  { name: 'Future Systems', revenue: 19300, orders: 15, avgOrder: 1286.67, tier: 'Pro' },
];

const revenueTargets = [
  { metric: 'Monthly Revenue', current: 124780, target: 150000, percentage: 83.2 },
  { metric: 'Quarterly Revenue', current: 387680, target: 450000, percentage: 86.2 },
  { metric: 'Annual Revenue', current: 1247850, target: 1500000, percentage: 83.2 },
  { metric: 'New Customer Revenue', current: 45670, target: 60000, percentage: 76.1 },
];

const paymentMethods = [
  { method: 'Credit Card', revenue: 623925, percentage: 50.0, transactions: 8965 },
  { method: 'PayPal', revenue: 374355, percentage: 30.0, transactions: 3456 },
  { method: 'Bank Transfer', revenue: 186942, percentage: 15.0, transactions: 891 },
  { method: 'Digital Wallet', revenue: 62463, percentage: 5.0, transactions: 1234 },
];

const MetricCard = ({ 
  title, 
  value, 
  change, 
  trend, 
  icon: Icon,
  description,
  format = 'number'
}: { 
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: any;
  description?: string;
  format?: 'number' | 'currency' | 'percentage';
}) => {
  const trendIcon = trend === 'up' ? ArrowUpRight : trend === 'down' ? ArrowDownRight : Minus;
  const trendColor = trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600';

  const formatValue = (val: string | number) => {
    if (format === 'currency') {
      return typeof val === 'number' ? `$${val.toLocaleString()}` : val;
    }
    if (format === 'percentage') {
      return typeof val === 'number' ? `${val}%` : val;
    }
    return typeof val === 'number' ? val.toLocaleString() : val;
  };

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
            <p className="text-2xl font-bold">{formatValue(value)}</p>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function RevenueAnalyticsPage() {
  const [timeRange, setTimeRange] = React.useState('30d');

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
          <BreadcrumbPage>Revenue</BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Revenue Analytics</h1>
          <p className="text-muted-foreground">
            Track your financial performance and revenue trends
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 3 months</SelectItem>
              <SelectItem value="12m">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Revenue Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Revenue"
          value={revenueOverview.totalRevenue}
          change={15.3}
          trend="up"
          icon={DollarSign}
          format="currency"
          description="Year to date"
        />
        <MetricCard
          title="Monthly Revenue"
          value={revenueOverview.monthlyRevenue}
          change={8.7}
          trend="up"
          icon={Calendar}
          format="currency"
          description="Current month"
        />
        <MetricCard
          title="Avg. Order Value"
          value={revenueOverview.avgOrderValue}
          change={5.2}
          trend="up"
          icon={ShoppingCart}
          format="currency"
          description="Per transaction"
        />
        <MetricCard
          title="Total Orders"
          value={revenueOverview.totalOrders}
          change={12.1}
          trend="up"
          icon={Package}
          description="Completed orders"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Conversion Rate"
          value={revenueOverview.conversionRate}
          change={3.8}
          trend="up"
          icon={Target}
          format="percentage"
          description="Visitor to customer"
        />
        <MetricCard
          title="Customer LTV"
          value={revenueOverview.customerLifetimeValue}
          change={7.4}
          trend="up"
          icon={Users}
          format="currency"
          description="Lifetime value"
        />
        <MetricCard
          title="Refund Rate"
          value={revenueOverview.refundRate}
          change={-1.2}
          trend="down"
          icon={RefreshCw}
          format="percentage"
          description="Return percentage"
        />
        <MetricCard
          title="Churn Rate"
          value={revenueOverview.churnRate}
          change={-0.8}
          trend="down"
          icon={AlertTriangle}
          format="percentage"
          description="Customer churn"
        />
      </div>

      {/* Revenue Analysis Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="targets">Targets</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Monthly Revenue Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Monthly Revenue Trend
                </CardTitle>
                <CardDescription>
                  Revenue performance over the last 6 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyData.map((month, index) => (
                    <motion.div
                      key={month.month}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="font-medium w-8">{month.month}</span>
                        <div className="flex-1">
                          <Progress 
                            value={(month.revenue / Math.max(...monthlyData.map(m => m.revenue))) * 100} 
                            className="h-3 w-32" 
                          />
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${month.revenue.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">
                          {month.orders} orders
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Payment Methods
                </CardTitle>
                <CardDescription>
                  Revenue breakdown by payment type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentMethods.map((method, index) => (
                    <motion.div
                      key={method.method}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center justify-between"
                    >
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{method.method}</span>
                          <span className="text-sm text-muted-foreground">
                            ${method.revenue.toLocaleString()}
                          </span>
                        </div>
                        <Progress value={method.percentage} className="h-2" />
                        <div className="text-xs text-muted-foreground mt-1">
                          {method.transactions.toLocaleString()} transactions
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          {/* Revenue by Category */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="mr-2 h-5 w-5" />
                Revenue by Category
              </CardTitle>
              <CardDescription>
                Product and service revenue breakdown
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {revenueByCategory.map((category, index) => (
                  <motion.div
                    key={category.category}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{category.category}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">
                            ${category.revenue.toLocaleString()}
                          </span>
                          <Badge
                            variant={category.change > 0 ? 'default' : 'destructive'}
                            className="text-xs"
                          >
                            {category.change > 0 ? '+' : ''}{category.change}%
                          </Badge>
                        </div>
                      </div>
                      <Progress value={category.percentage} className="h-2 mb-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{category.percentage}% of total revenue</span>
                        <span>{category.orders.toLocaleString()} orders</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          {/* Top Customers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Top Customers by Revenue
              </CardTitle>
              <CardDescription>
                Your highest value customers this period
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCustomers.map((customer, index) => (
                  <motion.div
                    key={customer.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {customer.orders} orders • Avg: ${customer.avgOrder.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={customer.tier === 'Enterprise' ? 'default' : customer.tier === 'Business' ? 'secondary' : 'outline'}
                        >
                          {customer.tier}
                        </Badge>
                      </div>
                      <div className="font-medium text-lg">
                        ${customer.revenue.toLocaleString()}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="targets" className="space-y-6">
          {/* Revenue Targets */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="mr-2 h-5 w-5" />
                Revenue Targets
              </CardTitle>
              <CardDescription>
                Track progress towards your revenue goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {revenueTargets.map((target, index) => (
                  <motion.div
                    key={target.metric}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{target.metric}</span>
                      <span className="text-sm text-muted-foreground">
                        ${target.current.toLocaleString()} / ${target.target.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={target.percentage} className="h-3" />
                    <div className="flex justify-between text-sm">
                      <span className={`font-medium ${target.percentage >= 90 ? 'text-green-600' : target.percentage >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {target.percentage.toFixed(1)}% completed
                      </span>
                      <span className="text-muted-foreground">
                        ${(target.target - target.current).toLocaleString()} remaining
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Alert>
            <Target className="h-4 w-4" />
            <AlertDescription>
              Revenue targets are automatically calculated based on your historical performance and growth projections. 
              You can adjust these targets in your business settings.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  );
} 