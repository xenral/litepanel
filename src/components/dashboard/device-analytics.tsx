import { Monitor, Smartphone, Tablet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { DeviceAnalytic } from '@/types/dashboard';

interface DeviceAnalyticsProps {
  devices: DeviceAnalytic[];
}

export function DeviceAnalytics({ devices }: DeviceAnalyticsProps) {
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Monitor':
        return Monitor;
      case 'Smartphone':
        return Smartphone;
      case 'Tablet':
        return Tablet;
      default:
        return Monitor;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Monitor className="mr-2 h-5 w-5" />
          Device Analytics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {devices.map((device) => {
            const IconComponent = getIconComponent(device.icon);
            return (
              <div key={device.device} className="flex items-center space-x-4">
                <IconComponent className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{device.device}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">{device.change}</span>
                      <span className="text-sm font-medium">{device.percentage}%</span>
                    </div>
                  </div>
                  <Progress value={device.percentage} className="h-2" />
                  <p className="text-xs text-muted-foreground">{device.count.toLocaleString()} users</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
} 