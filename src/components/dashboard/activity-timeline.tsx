import { Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ActivityItem } from '@/components/shared/activity-item';
import type { ActivityItem as ActivityItemType } from '@/types/dashboard';

interface ActivityTimelineProps {
  activities: ActivityItemType[];
  maxItems?: number;
}

export function ActivityTimeline({ activities, maxItems = 5 }: ActivityTimelineProps) {
  const displayedActivities = maxItems ? activities.slice(0, maxItems) : activities;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="mr-2 h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {displayedActivities.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 