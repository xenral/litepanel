'use client';

import { PerformanceAnalyticsCard } from './performance-analytics-card';
import { DeviceAnalyticsCard } from './device-analytics-card';
import { SocialMetricsCard } from './social-metrics-card';
import { ActivityTimelineCard } from './activity-timeline-card';
import { TeamMembersCard } from './team-members-card';
import { UpcomingEventsCard } from './upcoming-events-card';
import { RecentFilesCard } from './recent-files-card';
import { QuickActionsCard } from './quick-actions-card';
import { SystemStatusCard } from './system-status-card';

/**
 * Dashboard Overview Tab Component
 * Main overview layout with responsive grid
 */
export function DashboardOverviewTab() {
  return (
    <div className="grid gap-4 lg:grid-cols-7">
      {/* Left Column - Main Content */}
      <div className="col-span-full lg:col-span-4 space-y-4">
        <PerformanceAnalyticsCard />
        <DeviceAnalyticsCard />
        <SocialMetricsCard />
        <ActivityTimelineCard />
      </div>

      {/* Right Column - Sidebar Content */}
      <div className="col-span-full lg:col-span-3 space-y-4">
        <TeamMembersCard />
        <UpcomingEventsCard />
        <RecentFilesCard />
        <QuickActionsCard />
        <SystemStatusCard />
      </div>
    </div>
  );
}