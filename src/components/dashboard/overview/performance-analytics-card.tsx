'use client';

import { BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { performanceMetrics } from '@/data/dashboard';

/**
 * Performance Analytics Card Component
 * Displays system performance metrics with status indicators
 */
export function PerformanceAnalyticsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart3 className="mr-2 h-5 w-5" />
          Performance Analytics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {performanceMetrics.map((metric) => (
            <div
              key={metric.metric}
              className="flex items-center justify-between"
            >
              <div className="space-y-1">
                <p className="text-sm font-medium">{metric.metric}</p>
                <p className="text-muted-foreground text-xs">
                  {metric.value}
                  {metric.metric.includes('Time')
                    ? 'ms'
                    : metric.metric.includes('Uptime')
                      ? '%'
                      : ''}
                  {' / '}
                  {metric.target}
                  {metric.metric.includes('Time')
                    ? 'ms'
                    : metric.metric.includes('Uptime')
                      ? '%'
                      : ''}{' '}
                  target
                </p>
              </div>
              <Badge
                variant={
                  metric.status === 'good' ? 'default' : 'destructive'
                }
              >
                {metric.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}