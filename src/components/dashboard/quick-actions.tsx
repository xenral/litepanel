import { Plus, FileText, Settings, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function QuickActions() {
  const actions = [
    {
      icon: Plus,
      label: 'New Project',
      action: () => console.log('New Project'),
    },
    {
      icon: FileText,
      label: 'New Document',
      action: () => console.log('New Document'),
    },
    {
      icon: Settings,
      label: 'Settings',
      action: () => console.log('Settings'),
    },
    {
      icon: Activity,
      label: 'Analytics',
      action: () => console.log('Analytics'),
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {actions.map((action) => {
            const IconComponent = action.icon;
            return (
              <Button
                key={action.label}
                variant="outline"
                size="sm"
                onClick={action.action}
                className="justify-start"
              >
                <IconComponent className="mr-2 h-4 w-4" />
                {action.label}
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
