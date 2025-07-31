'use client';

import { Monitor, Smartphone, Tablet } from 'lucide-react';
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

/**
 * Traffic Tabs Component
 * Detailed traffic analysis in tabs
 */
export function TrafficTabs() {
  const deviceData = [
    {
      device: 'Desktop',
      visitors: 45200,
      percentage: 52,
      icon: Monitor,
      change: 8.2,
    },
    {
      device: 'Mobile',
      visitors: 32800,
      percentage: 38,
      icon: Smartphone,
      change: 15.7,
    },
    {
      device: 'Tablet',
      visitors: 8700,
      percentage: 10,
      icon: Tablet,
      change: -3.4,
    },
  ];

  const locationData = [
    { country: 'United States', visitors: 28400, percentage: 33, flag: '🇺🇸' },
    { country: 'United Kingdom', visitors: 15200, percentage: 18, flag: '🇬🇧' },
    { country: 'Canada', visitors: 12800, percentage: 15, flag: '🇨🇦' },
    { country: 'Germany', visitors: 9600, percentage: 11, flag: '🇩🇪' },
    { country: 'Australia', visitors: 7200, percentage: 8, flag: '🇦🇺' },
    { country: 'France', visitors: 6100, percentage: 7, flag: '🇫🇷' },
    { country: 'Others', visitors: 7400, percentage: 8, flag: '🌍' },
  ];

  const timeData = [
    { hour: '00:00', visitors: 1200, percentage: 12 },
    { hour: '06:00', visitors: 2800, percentage: 28 },
    { hour: '12:00', visitors: 4500, percentage: 45 },
    { hour: '18:00', visitors: 6200, percentage: 62 },
    { hour: '21:00', visitors: 3800, percentage: 38 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Traffic Analysis</CardTitle>
        <CardDescription>
          Detailed breakdown of visitor behavior and demographics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="devices" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="devices" className="text-xs sm:text-sm">
              Devices
            </TabsTrigger>
            <TabsTrigger value="locations" className="text-xs sm:text-sm">
              Locations
            </TabsTrigger>
            <TabsTrigger value="time" className="text-xs sm:text-sm">
              Time
            </TabsTrigger>
          </TabsList>

          <TabsContent value="devices" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3">
              {deviceData.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.device}
                    className="space-y-3 rounded-lg border p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <IconComponent className="text-muted-foreground h-5 w-5" />
                        <span className="font-medium">{item.device}</span>
                      </div>
                      <Badge
                        variant={item.change > 0 ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {item.change > 0 ? '+' : ''}
                        {item.change}%
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold">
                      {item.visitors.toLocaleString()}
                    </div>
                    <Progress value={item.percentage} className="h-2" />
                    <div className="text-muted-foreground text-xs">
                      {item.percentage}% of total visitors
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="locations" className="space-y-4">
            <div className="space-y-3">
              {locationData.map((item) => (
                <div
                  key={item.country}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{item.flag}</span>
                    <span className="font-medium">{item.country}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      {item.visitors.toLocaleString()}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      {item.percentage}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="time" className="space-y-4">
            <div className="space-y-4">
              {timeData.map((item) => (
                <div key={item.hour} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.hour}</span>
                    <span className="text-sm font-medium">
                      {item.visitors.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={item.percentage} className="h-3" />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
