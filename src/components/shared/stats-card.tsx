import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import * as LucideIcons from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
}

export function StatsCard({
  title,
  value,
  description,
  icon,
  trend,
  className,
}: StatsCardProps) {
  const IconComponent = icon
    ? (LucideIcons[
        icon as keyof typeof LucideIcons
      ] as React.ComponentType<any>)
    : null;

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {IconComponent && (
          <IconComponent className="text-muted-foreground h-4 w-4" />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-muted-foreground mt-1 text-xs">{description}</p>
        )}
        {trend && (
          <div className="mt-1 flex items-center">
            <span
              className={`text-xs ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}
            >
              {trend.value}
            </span>
            <span className="text-muted-foreground ml-1 text-xs">
              from last period
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
