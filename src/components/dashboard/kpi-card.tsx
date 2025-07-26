import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { KPIMetric } from '@/types/dashboard';

interface KPICardProps {
  metric: KPIMetric;
}

const iconMap = {
  Users: '👥',
  DollarSign: '💰',
  ShoppingCart: '🛒',
  TrendingUp: '📈'
};

export function KPICard({ metric }: KPICardProps) {
  const isPositive = metric.trend === 'up';
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
        <div className={`h-4 w-4 ${metric.color}`}>
          {iconMap[metric.icon as keyof typeof iconMap] || '📊'}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{metric.value}</div>
        <div className="flex items-center text-xs text-muted-foreground">
          {isPositive ? (
            <TrendingUp className={`mr-1 h-3 w-3 ${isPositive ? 'text-emerald-600' : 'text-red-600'}`} />
          ) : (
            <TrendingDown className={`mr-1 h-3 w-3 ${isPositive ? 'text-emerald-600' : 'text-red-600'}`} />
          )}
          <span className={isPositive ? 'text-emerald-600' : 'text-red-600'}>
            {metric.change}
          </span>
          <span className="ml-1">from last month</span>
        </div>
      </CardContent>
    </Card>
  );
} 