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
              <CardTitle className="text-sm font-medium">
                {metric.name}
              </CardTitle>
              <div className="text-muted-foreground h-4 w-4">📊</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}%</div>
              <div className="mt-2 flex items-center">
                <div
                  className={`mr-2 h-2 w-2 rounded-full ${
                    metric.status === 'healthy'
                      ? 'bg-emerald-500'
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
        ))}
      </div>

      {/* System Activity - using ActivityTimeline component directly */}
      <ActivityTimeline activities={activityItems} maxItems={8} />
    </div>
  );
}
