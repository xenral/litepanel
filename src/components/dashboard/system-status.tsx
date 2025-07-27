import { Cpu, HardDrive, Wifi } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { SystemMetric } from '@/types/dashboard';

interface SystemStatusProps {
  metrics: SystemMetric[];
}

export function SystemStatus({ metrics }: SystemStatusProps) {
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return Cpu;
      case 'HardDrive':
        return HardDrive;
      case 'Wifi':
        return Wifi;
      default:
        return Cpu;
    }
  };

  const getStatusColor = (status: SystemMetric['status']) => {
    switch (status) {
      case 'healthy':
        return 'bg-emerald-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'critical':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {metrics.map((metric) => {
            const IconComponent = getIconComponent(metric.icon);
            return (
              <div
                key={metric.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <IconComponent className="text-muted-foreground h-4 w-4" />
                  <span className="text-sm">{metric.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{metric.value}%</span>
                  <div
                    className={`h-2 w-2 rounded-full ${getStatusColor(metric.status)}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
