'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface RevenueBreakdownCardProps {
  title: string;
  description: string;
  data: Array<{
    category: string;
    amount: number;
    percentage: number;
    color: string;
  }>;
}

/**
 * Revenue Breakdown Card Component
 * Shows revenue distribution across categories
 */
export function RevenueBreakdownCard({ title, description, data }: RevenueBreakdownCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">{title}</CardTitle>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item) => (
            <div key={item.category} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className={`h-3 w-3 rounded-full ${item.color}`}
                  />
                  <span className="text-sm font-medium truncate">
                    {item.category}
                  </span>
                </div>
                <div className="text-right shrink-0 ml-2">
                  <div className="text-sm font-medium">
                    ${item.amount.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {item.percentage}%
                  </div>
                </div>
              </div>
              <Progress
                value={item.percentage}
                className="h-2"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}