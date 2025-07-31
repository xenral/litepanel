import type { Metadata } from 'next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { KPICard } from '@/components/dashboard/kpi-card';
import { QuickStatsBar } from '@/components/dashboard/quick-stats-bar';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardOverviewTab } from '@/components/dashboard/overview/dashboard-overview-tab';
import { ProjectsTab } from '@/components/dashboard/projects/projects-tab';
import { PerformanceTab } from '@/components/dashboard/performance/performance-tab';
import { SystemTab } from '@/components/dashboard/system/system-tab';
import { kpiMetrics, quickStats } from '@/data/dashboard';

export const metadata: Metadata = {
      title: 'Dashboard | LitePanel',
  description:
          'Overview of your LitePanel dashboard with analytics and insights.',
};

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 sm:space-y-6">
      {/* Dashboard Header */}
      <DashboardHeader 
        title="Dashboard" 
        description="Overview of your LitePanel dashboard with analytics and insights"
      />

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpiMetrics.map((metric) => (
          <KPICard key={metric.id} metric={metric} />
        ))}
      </div>

      {/* Quick Stats Bar */}
      <QuickStatsBar stats={quickStats} />

      {/* Main Dashboard Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="overview" className="text-xs sm:text-sm">
            Overview
          </TabsTrigger>
          <TabsTrigger value="projects" className="text-xs sm:text-sm">
            Projects
          </TabsTrigger>
          <TabsTrigger value="performance" className="text-xs sm:text-sm">
            Performance
          </TabsTrigger>
          <TabsTrigger value="system" className="text-xs sm:text-sm">
            System
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <DashboardOverviewTab />
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <ProjectsTab />
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <PerformanceTab />
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <SystemTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
