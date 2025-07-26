import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { SocialMetric } from '@/types/dashboard';

interface SocialMetricsProps {
  metrics: SocialMetric[];
}

export function SocialMetrics({ metrics }: SocialMetricsProps) {
  const getColorClasses = (colorClass: string) => {
    // Convert text color to background color for the indicator dot
    return colorClass.replace('text-', 'bg-');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Social Media Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {metrics.map((social) => (
            <div key={social.platform} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${getColorClasses(social.color)}`} />
                <div>
                  <p className="text-sm font-medium">{social.platform}</p>
                  <p className="text-xs text-muted-foreground">
                    {social.followers.toLocaleString()} followers
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{social.engagement}%</p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400">{social.growth}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 