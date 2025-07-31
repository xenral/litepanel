'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface PerformanceChartCardProps {
  title: string;
  description: string;
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

/**
 * Performance Chart Card Component
 * Displays performance data with progress bars
 */
export function PerformanceChartCard({
  title,
  description,
  data,
}: PerformanceChartCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">{title}</CardTitle>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item) => (
            <div key={item.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="mr-2 truncate text-sm font-medium">
                  {item.name}
                </span>
                <span className="shrink-0 text-sm font-medium">
                  {item.value}%
                </span>
              </div>
              <Progress value={item.value} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
