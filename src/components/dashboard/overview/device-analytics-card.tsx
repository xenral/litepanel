'use client';

import { Monitor, Smartphone, Tablet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { deviceAnalytics } from '@/data/dashboard';

/**
 * Device Analytics Card Component
 * Shows user device distribution with progress bars
 */
export function DeviceAnalyticsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Monitor className="mr-2 h-5 w-5" />
          Device Analytics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {deviceAnalytics.map((device) => {
            const IconComponent =
              device.icon === 'Monitor'
                ? Monitor
                : device.icon === 'Smartphone'
                  ? Smartphone
                  : Tablet;
            return (
              <div
                key={device.device}
                className="flex items-center space-x-4"
              >
                <IconComponent className="text-muted-foreground h-5 w-5 shrink-0" />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">
                      {device.device}
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className="text-muted-foreground text-sm">
                        {device.change}
                      </span>
                      <span className="text-sm font-medium">
                        {device.percentage}%
                      </span>
                    </div>
                  </div>
                  <Progress
                    value={device.percentage}
                    className="h-2"
                  />
                  <p className="text-muted-foreground text-xs">
                    {device.count.toLocaleString()} users
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}