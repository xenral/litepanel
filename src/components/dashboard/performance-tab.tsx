import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import type { PerformanceMetric, DeviceAnalytic } from '@/types/dashboard';

interface PerformanceTabProps {
  performanceMetrics: PerformanceMetric[];
  deviceAnalytics: DeviceAnalytic[];
}

export function PerformanceTab({ performanceMetrics, deviceAnalytics }: PerformanceTabProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
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
                  <span className="text-sm font-medium">{metric.metric}</span>
                  <Badge variant={metric.status === 'good' ? 'default' : 'destructive'}>
                    {metric.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
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
                  <span className="text-sm font-medium">{device.device}</span>
                  <span className="text-sm text-muted-foreground">{device.percentage}%</span>
                </div>
                <Progress value={device.percentage} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  {device.count.toLocaleString()} users ({device.change})
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 