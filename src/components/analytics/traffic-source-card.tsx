'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface TrafficSourceCardProps {
  title: string;
  description: string;
  data: Array<{
    source: string;
    visitors: number;
    percentage: number;
    change: number;
    color: string;
  }>;
}

/**
 * Traffic Source Card Component
 * Shows traffic distribution by source
 */
export function TrafficSourceCard({
  title,
  description,
  data,
}: TrafficSourceCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">{title}</CardTitle>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item) => (
            <div key={item.source} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`h-3 w-3 rounded-full ${item.color}`} />
                  <span className="truncate text-sm font-medium">
                    {item.source}
                  </span>
                </div>
                <div className="ml-2 shrink-0 text-right">
                  <div className="text-sm font-medium">
                    {item.visitors.toLocaleString()}
                  </div>
                  <Badge
                    variant={item.change > 0 ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {item.change > 0 ? '+' : ''}
                    {item.change}%
                  </Badge>
                </div>
              </div>
              <Progress value={item.percentage} className="h-2" />
              <div className="text-muted-foreground text-xs">
                {item.percentage}% of total traffic
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
