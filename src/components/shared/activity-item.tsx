import * as LucideIcons from 'lucide-react';
import type { ActivityItem } from '@/types/dashboard';

interface ActivityItemProps {
  activity: ActivityItem;
}

export function ActivityItem({ activity }: ActivityItemProps) {
  // Get the icon component dynamically
  const IconComponent = LucideIcons[activity.icon as keyof typeof LucideIcons] as React.ComponentType<any>;

  return (
    <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
      <div className="flex-shrink-0">
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
          {IconComponent ? (
            <IconComponent className="h-4 w-4 text-primary" />
          ) : (
            <span className="text-xs">📝</span>
          )}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground">
          {activity.message}
        </p>
        <div className="flex items-center mt-1 text-xs text-muted-foreground">
          <span>{activity.user}</span>
          <span className="mx-1">•</span>
          <span>{activity.time}</span>
        </div>
      </div>
    </div>
  );
} 