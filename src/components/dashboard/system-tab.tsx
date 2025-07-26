import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ActivityTimeline } from './activity-timeline';
import type { SystemMetric, ActivityItem } from '@/types/dashboard';

interface SystemTabProps {
  systemMetrics: SystemMetric[];
  activityItems: ActivityItem[];
}

export function SystemTab({ systemMetrics, activityItems }: SystemTabProps) {
  return (
    <div className="space-y-4">
      {/* System Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {systemMetrics.map((metric) => (
          <Card key={metric.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
              <div className="h-4 w-4 text-muted-foreground">
                📊
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}%</div>
              <div className="flex items-center mt-2">
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  metric.status === 'healthy' ? 'bg-emerald-500' : 
                  metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                }`} />
                <span className="text-xs text-muted-foreground capitalize">
                  {metric.status}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* System Activity - using ActivityTimeline component directly */}
      <ActivityTimeline activities={activityItems} maxItems={8} />
    </div>
  );
} 