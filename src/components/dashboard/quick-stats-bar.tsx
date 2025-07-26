import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { QuickStat } from '@/types/dashboard';

interface QuickStatsBarProps {
  stats: QuickStat[];
}

export function QuickStatsBar({ stats }: QuickStatsBarProps) {
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.id} className="text-center">
              <div className="text-2xl font-bold text-foreground">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mb-1">
                {stat.label}
              </div>
              <div className="flex items-center justify-center text-xs">
                {stat.changeType === 'positive' ? (
                  <TrendingUp className="mr-1 h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <TrendingDown className="mr-1 h-3 w-3 text-red-600 dark:text-red-400" />
                )}
                <span className={
                  stat.changeType === 'positive' 
                    ? 'text-emerald-600 dark:text-emerald-400' 
                    : 'text-red-600 dark:text-red-400'
                }>
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 