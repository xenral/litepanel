'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

/**
 * Revenue Tabs Component
 * Detailed revenue analysis in tabs
 */
export function RevenueTabs() {
  const monthlyData = [
    { month: 'Jan', revenue: 45000, growth: 12 },
    { month: 'Feb', revenue: 52000, growth: 15.6 },
    { month: 'Mar', revenue: 48000, growth: -7.7 },
    { month: 'Apr', revenue: 61000, growth: 27.1 },
    { month: 'May', revenue: 58000, growth: -4.9 },
    { month: 'Jun', revenue: 67000, growth: 15.5 },
  ];

  const productData = [
    { name: 'Premium Plan', revenue: 234000, percentage: 45, growth: 12.5 },
    { name: 'Basic Plan', revenue: 156000, percentage: 30, growth: 8.2 },
    { name: 'Enterprise', revenue: 89000, percentage: 17, growth: 18.7 },
    { name: 'Add-ons', revenue: 42000, percentage: 8, growth: 5.3 },
  ];

  const regionData = [
    { region: 'North America', revenue: 298000, percentage: 57, growth: 14.2 },
    { region: 'Europe', revenue: 145000, percentage: 28, growth: 9.8 },
    { region: 'Asia Pacific', revenue: 78000, percentage: 15, growth: 22.1 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Analysis</CardTitle>
        <CardDescription>
          Detailed breakdown of revenue streams and performance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="monthly" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="monthly" className="text-xs sm:text-sm">
              Monthly
            </TabsTrigger>
            <TabsTrigger value="products" className="text-xs sm:text-sm">
              Products
            </TabsTrigger>
            <TabsTrigger value="regions" className="text-xs sm:text-sm">
              Regions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="monthly" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {monthlyData.map((item) => (
                <div key={item.month} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.month}</span>
                    <Badge 
                      variant={item.growth > 0 ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {item.growth > 0 ? '+' : ''}{item.growth}%
                    </Badge>
                  </div>
                  <div className="text-xl md:text-2xl font-bold">
                    ${item.revenue.toLocaleString()}
                  </div>
                  <Progress 
                    value={Math.abs(item.growth) * 2} 
                    className="h-2" 
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <div className="space-y-4">
              {productData.map((item) => (
                <div key={item.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium truncate mr-2">
                      {item.name}
                    </span>
                    <div className="text-right shrink-0">
                      <div className="text-sm font-medium">
                        ${item.revenue.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        +{item.growth}%
                      </div>
                    </div>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    {item.percentage}% of total revenue
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="regions" className="space-y-4">
            <div className="space-y-4">
              {regionData.map((item) => (
                <div key={item.region} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.region}</span>
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        ${item.revenue.toLocaleString()}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        +{item.growth}%
                      </Badge>
                    </div>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    {item.percentage}% of total revenue
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}