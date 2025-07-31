'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { socialMetrics } from '@/data/dashboard';

/**
 * Social Media Metrics Card Component
 * Displays social media platform performance
 */
export function SocialMetricsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Social Media Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {socialMetrics.map((social) => (
            <div
              key={social.platform}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`h-2 w-2 rounded-full ${social.color.replace('text-', 'bg-')}`}
                />
                <div>
                  <p className="text-sm font-medium">
                    {social.platform}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {social.followers.toLocaleString()} followers
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">
                  {social.engagement}%
                </p>
                <p className="text-xs text-green-600">
                  {social.growth}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}