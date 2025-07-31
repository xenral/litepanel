'use client';

import { Download, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OrdersHeaderProps {
  title: string;
  description: string;
}

/**
 * Orders Header Component
 * Header with title, description and action buttons for orders page
 */
export function OrdersHeader({ title, description }: OrdersHeaderProps) {
  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          {title}
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          {description}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Export Orders</span>
          <span className="sm:hidden">Export</span>
        </Button>
        <Button variant="outline" size="sm">
          <Calendar className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Date Range</span>
          <span className="sm:hidden">Dates</span>
        </Button>
      </div>
    </div>
  );
}