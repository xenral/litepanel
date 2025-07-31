'use client';

import { Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { upcomingEvents } from '@/data/dashboard';

/**
 * Upcoming Events Card Component
 * Shows scheduled events with priority indicators
 */
export function UpcomingEventsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="mr-2 h-5 w-5" />
          Upcoming Events
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="hover:bg-muted/50 flex items-center justify-between rounded-lg border p-3 transition-colors"
            >
              <div className="space-y-1">
                <p className="text-sm font-medium">{event.title}</p>
                <p className="text-muted-foreground text-xs">{event.time}</p>
              </div>
              <Badge
                variant={
                  event.priority === 'high'
                    ? 'destructive'
                    : event.priority === 'medium'
                      ? 'default'
                      : 'secondary'
                }
              >
                {event.priority}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
