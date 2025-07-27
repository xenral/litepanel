import React from 'react';
import { DashboardLayoutClient } from '@/components/dashboard/dashboard-layout-client';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

/**
 * Dashboard layout server component wrapper
 */
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}
