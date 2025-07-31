'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveGridProps {
  children: ReactNode;
  cols?: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  };
  gap?: number;
  className?: string;
}

interface ResponsiveContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Responsive Grid Component
 * Provides consistent responsive grid layouts
 */
export function ResponsiveGrid({
  children,
  cols = { default: 1, sm: 2, md: 3, lg: 4 },
  gap = 4,
  className,
}: ResponsiveGridProps) {
  const getGridClasses = () => {
    const classes: string[] = ['grid'];

    // Add gap
    classes.push(`gap-${gap}`);

    // Add column classes
    if (cols.default) classes.push(`grid-cols-${cols.default}`);
    if (cols.sm) classes.push(`sm:grid-cols-${cols.sm}`);
    if (cols.md) classes.push(`md:grid-cols-${cols.md}`);
    if (cols.lg) classes.push(`lg:grid-cols-${cols.lg}`);
    if (cols.xl) classes.push(`xl:grid-cols-${cols.xl}`);
    if (cols['2xl']) classes.push(`2xl:grid-cols-${cols['2xl']}`);

    return classes.join(' ');
  };

  return <div className={cn(getGridClasses(), className)}>{children}</div>;
}

/**
 * Responsive Container Component
 * Provides consistent spacing and responsive behavior
 */
export function ResponsiveContainer({
  children,
  className,
}: ResponsiveContainerProps) {
  return (
    <div className={cn('space-y-4 sm:space-y-6', className)}>{children}</div>
  );
}
