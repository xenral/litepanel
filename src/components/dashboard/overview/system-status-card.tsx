'use client';

import { Cpu, HardDrive, Wifi } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { systemMetrics } from '@/data/dashboard';

/**
 * System Status Card Component
 * Shows system health metrics with status indicators
 */
export function SystemStatusCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {systemMetrics.map((metric) => {
            const IconComponent =
              metric.icon === 'Cpu'
                ? Cpu
                : metric.icon === 'HardDrive'
                  ? HardDrive
                  : Wifi;
            return (
              <div
                key={metric.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <IconComponent className="text-muted-foreground h-4 w-4" />
                  <span className="text-sm">{metric.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">
                    {metric.value}%
                  </span>
                  <div
                    className={`h-2 w-2 rounded-full ${
                      metric.status === 'healthy'
                        ? 'bg-green-500'
                        : metric.status === 'warning'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}