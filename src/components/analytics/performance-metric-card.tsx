'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PerformanceMetricCardProps {
  metric: {
    title: string;
    value: string;
    change: number;
    status: string;
    target: string;
    icon: React.ComponentType<{ className?: string }>;
  };
  index: number;
}

/**
 * Performance Metric Card Component
 * Displays individual performance metrics with animations
 */
export function PerformanceMetricCard({ metric, index }: PerformanceMetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="transition-all hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium truncate">
            {metric.title}
          </CardTitle>
          <metric.icon className="text-muted-foreground h-4 w-4 shrink-0" />
        </CardHeader>
        <CardContent>
          <div className="text-xl md:text-2xl font-bold">{metric.value}</div>
          <div className="text-muted-foreground flex items-center space-x-2 text-xs">
            <div className="flex items-center">
              {metric.change > 0 ? (
                <TrendingUp className="mr-1 h-3 w-3 text-red-500" />
              ) : (
                <TrendingDown className="mr-1 h-3 w-3 text-green-500" />
              )}
              {Math.abs(metric.change)}%
            </div>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Target: {metric.target}</span>
          </div>
          <div className="text-muted-foreground mt-1 text-xs sm:hidden">
            Target: {metric.target}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}