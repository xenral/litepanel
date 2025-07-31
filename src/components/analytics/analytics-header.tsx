'use client';

import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

interface AnalyticsHeaderProps {
  title: string;
  description: string;
  breadcrumbs: Array<{
    label: string;
    href?: string;
    isActive?: boolean;
  }>;
  badge?: string;
}

/**
 * Analytics Header Component
 * Responsive header for analytics pages
 */
export function AnalyticsHeader({
  title,
  description,
  breadcrumbs,
  badge,
}: AnalyticsHeaderProps) {
  return (
    <div className="space-y-4">
      {/* Breadcrumbs */}
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.label} className="flex items-center">
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {crumb.isActive ? (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={crumb.href}>
                    {crumb.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      {/* Title and Description */}
      <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            {title}
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            {description}
          </p>
        </div>
        {badge && (
          <Badge variant="outline" className="w-fit">
            {badge}
          </Badge>
        )}
      </div>

      <Separator />
    </div>
  );
}
