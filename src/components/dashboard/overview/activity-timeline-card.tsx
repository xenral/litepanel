'use client';

import { Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ActivityItem } from '@/components/shared/activity-item';
import { activityItems } from '@/data/dashboard';

/**
 * Activity Timeline Card Component
 * Shows recent activity timeline
 */
export function ActivityTimelineCard() {
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
          {activityItems.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}