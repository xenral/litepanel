'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
export function PerformanceChartCard({ title, description, data }: PerformanceChartCardProps) {
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
                <span className="text-sm font-medium truncate mr-2">
                  {item.name}
                </span>
                <span className="text-sm font-medium shrink-0">
                  {item.value}%
                </span>
              </div>
              <Progress
                value={item.value}
                className="h-2"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}