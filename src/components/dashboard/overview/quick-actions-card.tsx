'use client';

import { Plus, FileText, Settings, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

/**
 * Quick Actions Card Component
 * Provides shortcuts to common actions
 */
export function QuickActionsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <Button variant="outline" size="sm" className="justify-start">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
          <Button variant="outline" size="sm" className="justify-start">
            <FileText className="mr-2 h-4 w-4" />
            New Document
          </Button>
          <Button variant="outline" size="sm" className="justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button variant="outline" size="sm" className="justify-start">
            <Activity className="mr-2 h-4 w-4" />
            Analytics
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
