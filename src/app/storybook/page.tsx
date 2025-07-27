import type { Metadata } from 'next';
import {
  Component,
  Search,
  Filter,
  Play,
  Eye,
  Download,
  Share2,
  Settings,
  Star,
  Users,
  Activity,
  TestTube,
  Shield,
  FileText,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { StatsCard } from '@/components/shared/stats-card';
import { ActivityItem } from '@/components/shared/activity-item';
import {
  componentStories,
  storybookStats,
  recentActivity,
  teamMembers,
  devTools,
} from '@/data/storybook';

export const metadata: Metadata = {
  title: 'Storybook | LiteControl',
  description: 'Interactive component library and design system documentation.',
};

export default function StorybookPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Storybook</h2>
          <p className="text-muted-foreground">
            Interactive component documentation and testing environment
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Play className="mr-2 h-4 w-4" />
            Run Tests
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Components"
          value={storybookStats.totalComponents}
          icon="Component"
          description="Available in library"
        />
        <StatsCard
          title="Stories"
          value={storybookStats.totalStories}
          icon="FileText"
          description="Interactive examples"
        />
        <StatsCard
          title="Test Coverage"
          value={`${storybookStats.coverage}%`}
          icon="Shield"
          description="Automated test coverage"
          trend={{
            value: '+2%',
            isPositive: true,
          }}
        />
        <StatsCard
          title="Weekly Views"
          value={storybookStats.weeklyViews.toLocaleString()}
          icon="Eye"
          description="Developer interactions"
          trend={{
            value: '+15%',
            isPositive: true,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="grid gap-4 lg:grid-cols-7">
        {/* Left Sidebar */}
        <div className="col-span-2 space-y-4">
          {/* Search and Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Browse Components</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="text-muted-foreground absolute left-3 top-3 h-4 w-4" />
                <Input placeholder="Search components..." className="pl-10" />
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
                <Badge variant="secondary">8 components</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Component Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  'Form',
                  'Layout',
                  'Navigation',
                  'Feedback',
                  'Data Display',
                  'Overlay',
                ].map((category) => {
                  const count = componentStories.filter(
                    (c) => c.category === category
                  ).length;
                  return (
                    <div
                      key={category}
                      className="hover:bg-muted flex cursor-pointer items-center justify-between rounded-lg p-2"
                    >
                      <span className="text-sm">{category}</span>
                      <Badge variant="outline" className="text-xs">
                        {count}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Component Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Status Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-sm">Stable</span>
                  </div>
                  <span className="text-sm font-medium">
                    {storybookStats.stableComponents}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-yellow-500" />
                    <span className="text-sm">Beta</span>
                  </div>
                  <span className="text-sm font-medium">
                    {componentStories.filter((c) => c.status === 'beta').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-red-500" />
                    <span className="text-sm">Alpha</span>
                  </div>
                  <span className="text-sm font-medium">
                    {
                      componentStories.filter((c) => c.status === 'alpha')
                        .length
                    }
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Development Tools */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Dev Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {devTools.map((tool) => {
                  const IconComponent = tool.icon;
                  return (
                    <div
                      key={tool.name}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`rounded-lg p-1.5 ${tool.color.replace('text-', 'bg-').replace('600', '100')} dark:${tool.color.replace('text-', 'bg-').replace('600', '900')}`}
                        >
                          <IconComponent className={`h-4 w-4 ${tool.color}`} />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{tool.name}</p>
                          <p className="text-muted-foreground text-xs">
                            {tool.description}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          tool.status === 'active' ? 'default' : 'secondary'
                        }
                      >
                        {tool.status}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="col-span-5 space-y-4">
          <Tabs defaultValue="components" className="space-y-4">
            <TabsList>
              <TabsTrigger value="components">Components</TabsTrigger>
              <TabsTrigger value="testing">Testing</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
            </TabsList>

            <TabsContent value="components" className="space-y-4">
              {/* Component Library */}
              <div className="grid gap-4 md:grid-cols-2">
                {componentStories.map((component) => {
                  const IconComponent = component.icon;
                  return (
                    <Card
                      key={component.id}
                      className="cursor-pointer transition-shadow hover:shadow-lg"
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="bg-primary/10 rounded-lg p-2">
                              <IconComponent className="text-primary h-5 w-5" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">
                                {component.name}
                              </CardTitle>
                              <CardDescription className="text-sm">
                                {component.category}
                              </CardDescription>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge
                              variant={
                                component.status === 'stable'
                                  ? 'default'
                                  : component.status === 'beta'
                                    ? 'secondary'
                                    : 'outline'
                              }
                            >
                              {component.status}
                            </Badge>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 fill-current text-yellow-500" />
                              <span className="text-sm">
                                {component.rating}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-3 text-sm">
                          {component.description}
                        </p>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span>Stories: {component.stories.length}</span>
                            <span>
                              Downloads: {component.downloads.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Version: {component.version}</span>
                            <span>Updated: {component.lastUpdated}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" className="flex-1">
                              <Eye className="mr-2 h-4 w-4" />
                              View Stories
                            </Button>
                            <Button size="sm" variant="outline">
                              <Play className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="testing" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {/* Test Results */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TestTube className="mr-2 h-5 w-5" />
                      Test Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Total Tests</span>
                        <span className="font-medium">
                          {storybookStats.testsTotal}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Passing</span>
                        <span className="font-medium text-green-600">
                          {storybookStats.testsPassing}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Failed</span>
                        <span className="font-medium text-red-600">
                          {storybookStats.testsTotal -
                            storybookStats.testsPassing}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Success Rate</span>
                          <span>
                            {Math.round(
                              (storybookStats.testsPassing /
                                storybookStats.testsTotal) *
                                100
                            )}
                            %
                          </span>
                        </div>
                        <Progress
                          value={
                            (storybookStats.testsPassing /
                              storybookStats.testsTotal) *
                            100
                          }
                          className="h-2"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Coverage Metrics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="mr-2 h-5 w-5" />
                      Coverage Report
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {['Statements', 'Branches', 'Functions', 'Lines'].map(
                        (type, index) => {
                          const coverage = [92, 85, 88, 90][index];
                          return (
                            <div key={type} className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span>{type}</span>
                                <span className="font-medium">{coverage}%</span>
                              </div>
                              <Progress value={coverage} className="h-2" />
                            </div>
                          );
                        }
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Test Activity */}
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Activity className="mr-2 h-5 w-5" />
                      Recent Test Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {recentActivity.slice(0, 6).map((activity) => (
                        <ActivityItem
                          key={activity.id}
                          activity={activity as any}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <StatsCard
                  title="Total Downloads"
                  value={storybookStats.totalDownloads.toLocaleString()}
                  icon="Download"
                  description="All time downloads"
                />
                <StatsCard
                  title="Avg Rating"
                  value={storybookStats.avgRating.toFixed(1)}
                  icon="Star"
                  description="User satisfaction"
                />
                <StatsCard
                  title="Active Contributors"
                  value={storybookStats.activeContributors}
                  icon="Users"
                  description="This month"
                />
              </div>

              {/* Usage Analytics */}
              <Card>
                <CardHeader>
                  <CardTitle>Component Usage Analytics</CardTitle>
                  <CardDescription>
                    Most popular components by downloads
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {componentStories
                      .sort((a, b) => b.downloads - a.downloads)
                      .slice(0, 5)
                      .map((component) => (
                        <div
                          key={component.id}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-3">
                            <component.icon className="text-muted-foreground h-5 w-5" />
                            <div>
                              <p className="text-sm font-medium">
                                {component.name}
                              </p>
                              <p className="text-muted-foreground text-xs">
                                {component.category}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">
                              {component.downloads.toLocaleString()}
                            </p>
                            <p className="text-muted-foreground text-xs">
                              downloads
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="team" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {/* Team Members */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="mr-2 h-5 w-5" />
                      Team Members
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {teamMembers.map((member) => (
                        <div
                          key={member.name}
                          className="flex items-center space-x-3"
                        >
                          <div className="relative">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 font-medium text-white">
                              {member.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </div>
                            <div
                              className={`border-background absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 ${
                                member.status === 'online'
                                  ? 'bg-green-500'
                                  : member.status === 'away'
                                    ? 'bg-yellow-500'
                                    : 'bg-gray-500'
                              }`}
                            />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{member.name}</p>
                            <p className="text-muted-foreground text-xs">
                              {member.role}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">
                              {member.contributions}
                            </p>
                            <p className="text-muted-foreground text-xs">
                              contributions
                            </p>
                          </div>
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
                        <Component className="mr-2 h-4 w-4" />
                        New Component
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        Add Story
                      </Button>
                      <Button variant="outline" size="sm">
                        <TestTube className="mr-2 h-4 w-4" />
                        Run Tests
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
