'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TrafficMetricCardProps {
  metric: {
    title: string;
    value: string;
    change: number;
    changeType: 'positive' | 'negative' | 'neutral';
    icon: React.ComponentType<{ className?: string }>;
    period?: string;
  };
  index: number;
}

/**
 * Traffic Metric Card Component
 * Displays individual traffic metrics with trend indicators
 */
export function TrafficMetricCard({ metric, index }: TrafficMetricCardProps) {
  const getTrendIcon = () => {
    switch (metric.changeType) {
      case 'positive':
        return <TrendingUp className="h-3 w-3 text-green-600" />;
      case 'negative':
        return <TrendingDown className="h-3 w-3 text-red-600" />;
      default:
        return <Minus className="h-3 w-3 text-gray-500" />;
    }
  };

  const getTrendColor = () => {
    switch (metric.changeType) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="transition-all hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="truncate text-sm font-medium">
            {metric.title}
          </CardTitle>
          <metric.icon className="text-muted-foreground h-4 w-4 shrink-0" />
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold md:text-2xl">{metric.value}</div>
          <div className="text-muted-foreground flex items-center space-x-2 text-xs">
            <div className="flex items-center">
              {getTrendIcon()}
              <span className={`ml-1 ${getTrendColor()}`}>
                {Math.abs(metric.change)}%
              </span>
            </div>
            {metric.period && (
              <>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:inline">{metric.period}</span>
              </>
            )}
          </div>
          {metric.period && (
            <div className="text-muted-foreground mt-1 text-xs sm:hidden">
              {metric.period}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
