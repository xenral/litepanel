'use client';

import { Cpu, HardDrive, Wifi } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ActivityItem } from '@/components/shared/activity-item';
import { systemMetrics, activityItems } from '@/data/dashboard';

/**
 * System Tab Component
 * Shows system metrics and activity
 */
export function SystemTab() {
  return (
    <div className="space-y-4">
      {/* System Metrics Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {systemMetrics.map((metric) => {
          const IconComponent =
            metric.icon === 'Cpu'
              ? Cpu
              : metric.icon === 'HardDrive'
                ? HardDrive
                : Wifi;
          return (
            <Card key={metric.name}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.name}
                </CardTitle>
                <IconComponent className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}%</div>
                <div className="mt-2 flex items-center">
                  <div
                    className={`mr-2 h-2 w-2 rounded-full ${
                      metric.status === 'healthy'
                        ? 'bg-green-500'
                        : metric.status === 'warning'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                    }`}
                  />
                  <span className="text-muted-foreground text-xs capitalize">
                    {metric.status}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* System Activity */}
      <Card>
        <CardHeader>
          <CardTitle>System Activity</CardTitle>
          <CardDescription>Recent system events and activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {activityItems.slice(0, 8).map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
