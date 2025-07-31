'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardHeaderProps {
  title: string;
  description?: string;
}

/**
 * Dashboard Header Component
 * Responsive header with title and actions
 */
export function DashboardHeader({ title, description }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
      <div className="space-y-1">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
        {description && (
          <p className="text-muted-foreground text-sm md:text-base">
            {description}
          </p>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <Button size="sm" className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Add Widget</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </div>
    </div>
  );
}