'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { performanceMetrics, deviceAnalytics } from '@/data/dashboard';

/**
 * Performance Tab Component
 * Shows detailed performance metrics and device analytics
 */
export function PerformanceTab() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* Performance Metrics Card */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>System performance indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {performanceMetrics.map((metric) => (
              <div key={metric.metric} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium truncate">
                    {metric.metric}
                  </span>
                  <Badge
                    variant={
                      metric.status === 'good' ? 'default' : 'destructive'
                    }
                  >
                    {metric.status}
                  </Badge>
                </div>
                <div className="text-muted-foreground flex items-center justify-between text-xs">
                  <span>Current: {metric.value}</span>
                  <span>Target: {metric.target}</span>
                </div>
                <Progress
                  value={(metric.value / metric.target) * 100}
                  className="h-2"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Device Distribution Card */}
      <Card>
        <CardHeader>
          <CardTitle>Device Distribution</CardTitle>
          <CardDescription>User device preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {deviceAnalytics.map((device) => (
              <div key={device.device} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {device.device}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    {device.percentage}%
                  </span>
                </div>
                <Progress value={device.percentage} className="h-2" />
                <div className="text-muted-foreground text-xs flex items-center justify-between">
                  <span>{device.count.toLocaleString()} users</span>
                  <span>({device.change})</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}