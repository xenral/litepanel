import type { Metadata } from 'next';
import {
  Monitor,
  Smartphone,
  Tablet,
  BarChart3,
  Activity,
  FileText,
  Calendar,
  Settings,
  Plus,
  Cpu,
  HardDrive,
  Wifi,
  MoreHorizontal,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { KPICard } from '@/components/dashboard/kpi-card';
import { QuickStatsBar } from '@/components/dashboard/quick-stats-bar';
import { TeamMemberCard } from '@/components/dashboard/team-member-card';
import { ActivityItem } from '@/components/shared/activity-item';
import {
  kpiMetrics,
  quickStats,
  teamMembers,
  recentFiles,
  upcomingEvents,
  socialMetrics,
  deviceAnalytics,
  performanceMetrics,
  recentProjects,
  systemMetrics,
  activityItems,
} from '@/data/dashboard';

export const metadata: Metadata = {
  title: 'Dashboard | LiteControl',
  description:
    'Overview of your LiteControl dashboard with analytics and insights.',
};

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Widget
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiMetrics.map((metric) => (
          <KPICard key={metric.id} metric={metric} />
        ))}
      </div>

      {/* Quick Stats Bar */}
      <QuickStatsBar stats={quickStats} />

      {/* Main Dashboard Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-7">
            {/* Left Column */}
            <div className="col-span-4 space-y-4">
              {/* Performance Analytics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5" />
                    Performance Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {performanceMetrics.map((metric) => (
                      <div
                        key={metric.metric}
                        className="flex items-center justify-between"
                      >
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{metric.metric}</p>
                          <p className="text-muted-foreground text-xs">
                            {metric.value}
                            {metric.metric.includes('Time')
                              ? 'ms'
                              : metric.metric.includes('Uptime')
                                ? '%'
                                : ''}
                            {' / '}
                            {metric.target}
                            {metric.metric.includes('Time')
                              ? 'ms'
                              : metric.metric.includes('Uptime')
                                ? '%'
                                : ''}{' '}
                            target
                          </p>
                        </div>
                        <Badge
                          variant={
                            metric.status === 'good' ? 'default' : 'destructive'
                          }
                        >
                          {metric.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Device Analytics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Monitor className="mr-2 h-5 w-5" />
                    Device Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {deviceAnalytics.map((device) => {
                      const IconComponent =
                        device.icon === 'Monitor'
                          ? Monitor
                          : device.icon === 'Smartphone'
                            ? Smartphone
                            : Tablet;
                      return (
                        <div
                          key={device.device}
                          className="flex items-center space-x-4"
                        >
                          <IconComponent className="text-muted-foreground h-5 w-5" />
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium">
                                {device.device}
                              </p>
                              <div className="flex items-center space-x-2">
                                <span className="text-muted-foreground text-sm">
                                  {device.change}
                                </span>
                                <span className="text-sm font-medium">
                                  {device.percentage}%
                                </span>
                              </div>
                            </div>
                            <Progress
                              value={device.percentage}
                              className="h-2"
                            />
                            <p className="text-muted-foreground text-xs">
                              {device.count.toLocaleString()} users
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Social Media Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Social Media Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {socialMetrics.map((social) => (
                      <div
                        key={social.platform}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`h-2 w-2 rounded-full ${social.color.replace('text-', 'bg-')}`}
                          />
                          <div>
                            <p className="text-sm font-medium">
                              {social.platform}
                            </p>
                            <p className="text-muted-foreground text-xs">
                              {social.followers.toLocaleString()} followers
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            {social.engagement}%
                          </p>
                          <p className="text-xs text-green-600">
                            {social.growth}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Activity Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="mr-2 h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {activityItems.map((activity) => (
                      <ActivityItem key={activity.id} activity={activity} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="col-span-3 space-y-4">
              {/* Team Members */}
              <Card>
                <CardHeader>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>
                    Active team members and their progress
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {teamMembers.map((member) => (
                      <TeamMemberCard key={member.id} member={member} />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingEvents.map((event) => (
                      <div
                        key={event.id}
                        className="flex items-center justify-between rounded-lg border p-3"
                      >
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{event.title}</p>
                          <p className="text-muted-foreground text-xs">
                            {event.time}
                          </p>
                        </div>
                        <Badge
                          variant={
                            event.priority === 'high'
                              ? 'destructive'
                              : event.priority === 'medium'
                                ? 'default'
                                : 'secondary'
                          }
                        >
                          {event.priority}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Files */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2 h-5 w-5" />
                    Recent Files
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentFiles.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between"
                      >
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{file.name}</p>
                          <div className="text-muted-foreground flex items-center space-x-2 text-xs">
                            <span>{file.type}</span>
                            <span>•</span>
                            <span>{file.size}</span>
                            <span>•</span>
                            <span>{file.modified}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      New Project
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText className="mr-2 h-4 w-4" />
                      New Document
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                    <Button variant="outline" size="sm">
                      <Activity className="mr-2 h-4 w-4" />
                      Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* System Status */}
              <Card>
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {systemMetrics.map((metric) => {
                      const IconComponent =
                        metric.icon === 'Cpu'
                          ? Cpu
                          : metric.icon === 'HardDrive'
                            ? HardDrive
                            : Wifi;
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
                            <span className="text-sm font-medium">
                              {metric.value}%
                            </span>
                            <div
                              className={`h-2 w-2 rounded-full ${
                                metric.status === 'healthy'
                                  ? 'bg-green-500'
                                  : metric.status === 'warning'
                                    ? 'bg-yellow-500'
                                    : 'bg-red-500'
                              }`}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recentProjects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <Badge
                      variant={
                        project.status === 'active'
                          ? 'default'
                          : project.status === 'completed'
                            ? 'secondary'
                            : 'outline'
                      }
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} />
                    <div className="text-muted-foreground flex items-center justify-between text-xs">
                      <span>Team: {project.team.length} members</span>
                      <span>{project.lastActivity}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>System performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performanceMetrics.map((metric) => (
                    <div key={metric.metric} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          {metric.metric}
                        </span>
                        <Badge
                          variant={
                            metric.status === 'good' ? 'default' : 'destructive'
                          }
                        >
                          {metric.status}
                        </Badge>
                      </div>
                      <div className="text-muted-foreground flex items-center justify-between text-xs">
                        <span>Current: {metric.value}</span>
                        <span>Target: {metric.target}</span>
                      </div>
                      <Progress
                        value={(metric.value / metric.target) * 100}
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Device Distribution</CardTitle>
                <CardDescription>User device preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deviceAnalytics.map((device) => (
                    <div key={device.device} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          {device.device}
                        </span>
                        <span className="text-muted-foreground text-sm">
                          {device.percentage}%
                        </span>
                      </div>
                      <Progress value={device.percentage} className="h-2" />
                      <div className="text-muted-foreground text-xs">
                        {device.count.toLocaleString()} users ({device.change})
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {systemMetrics.map((metric) => {
              const IconComponent =
                metric.icon === 'Cpu'
                  ? Cpu
                  : metric.icon === 'HardDrive'
                    ? HardDrive
                    : Wifi;
              return (
                <Card key={metric.name}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {metric.name}
                    </CardTitle>
                    <IconComponent className="text-muted-foreground h-4 w-4" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metric.value}%</div>
                    <div className="mt-2 flex items-center">
                      <div
                        className={`mr-2 h-2 w-2 rounded-full ${
                          metric.status === 'healthy'
                            ? 'bg-green-500'
                            : metric.status === 'warning'
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                        }`}
                      />
                      <span className="text-muted-foreground text-xs capitalize">
                        {metric.status}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>System Activity</CardTitle>
              <CardDescription>
                Recent system events and activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {activityItems.slice(0, 8).map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
