import * as LucideIcons from 'lucide-react';
import type { ActivityItem } from '@/types/dashboard';

interface ActivityItemProps {
  activity: ActivityItem;
}

export function ActivityItem({ activity }: ActivityItemProps) {
  // Get the icon component dynamically
  const IconComponent = LucideIcons[
    activity.icon as keyof typeof LucideIcons
  ] as React.ComponentType<any>;

  return (
    <div className="hover:bg-accent/50 flex items-start space-x-3 rounded-lg p-3 transition-colors">
      <div className="flex-shrink-0">
        <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
          {IconComponent ? (
            <IconComponent className="text-primary h-4 w-4" />
          ) : (
            <span className="text-xs">📝</span>
          )}
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-foreground text-sm">{activity.message}</p>
        <div className="text-muted-foreground mt-1 flex items-center text-xs">
          <span>{activity.user}</span>
          <span className="mx-1">•</span>
          <span>{activity.time}</span>
        </div>
      </div>
    </div>
  );
}
