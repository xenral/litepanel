import type { Metadata } from 'next';
import {
  BookOpen,
  Search,
  Download,
  ExternalLink,
  Star,
  Clock,
  Users,
  TrendingUp,
  Shield,
  Rocket,
  Globe,
  MessageSquare,
  Github,
  Play,
  Copy,
  ChevronRight,
  CheckCircle,
  Info,
  Award,
  Filter,
  FileText,
  Video,
  Calendar,
  Activity,
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
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatsCard } from '@/components/shared/stats-card';
import {
  docCategories,
  quickStart,
  popularDocs,
  recentUpdates,
  contributors,
  communityStats,
  learningResources,
} from '@/data/docs';

export const metadata: Metadata = {
      title: 'Documentation | LitePanel',
  description:
    'Comprehensive documentation for LitePanel components and APIs.',
};

export default function DocsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Documentation</h2>
          <p className="text-muted-foreground">
            Comprehensive guides, tutorials, and API references
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
          <Button>
            <ExternalLink className="mr-2 h-4 w-4" />
            API Reference
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Articles"
          value={docCategories.reduce((acc, cat) => acc + cat.articles, 0)}
          icon="FileText"
          description="Documentation articles"
        />
        <StatsCard
          title="GitHub Stats"
          value={communityStats.githubStars.toLocaleString()}
          icon="Github"
          description="Stars on GitHub"
          trend={{
            value: '+12%',
            isPositive: true,
          }}
        />
        <StatsCard
          title="Monthly Downloads"
          value={communityStats.monthlyDownloads.toLocaleString()}
          icon="Download"
          description="Package downloads"
          trend={{
            value: '+8%',
            isPositive: true,
          }}
        />
        <StatsCard
          title="Community"
          value={communityStats.totalUsers.toLocaleString()}
          icon="Users"
          description="Active users"
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
          {/* Search */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Search Docs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="text-muted-foreground absolute left-3 top-3 h-4 w-4" />
                <Input
                  placeholder="Search documentation..."
                  className="pl-10"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
                <Badge variant="secondary">
                  {docCategories.reduce((acc, cat) => acc + cat.articles, 0)}{' '}
                  articles
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {docCategories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <div
                      key={category.id}
                      className="hover:bg-muted flex cursor-pointer items-center justify-between rounded-lg p-3 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`rounded-lg p-1.5 ${category.color}`}>
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{category.name}</p>
                          <p className="text-muted-foreground text-xs">
                            {category.articles} articles
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="text-xs">
                          {category.difficulty}
                        </Badge>
                        <p className="text-muted-foreground mt-1 text-xs">
                          {category.completionRate}% complete
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Quick Start */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Start</CardTitle>
              <CardDescription>Get up and running in minutes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {quickStart.map((step) => {
                  const IconComponent = step.icon;
                  return (
                    <div key={step.step} className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium">
                          {step.step}
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center space-x-2">
                          <IconComponent className="text-muted-foreground h-4 w-4" />
                          <h4 className="text-sm font-medium">{step.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {step.time}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mt-1 text-xs">
                          {step.description}
                        </p>
                        <div className="bg-muted mt-2 rounded p-2 font-mono text-xs">
                          {step.command}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Community Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Community</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Github className="text-muted-foreground h-4 w-4" />
                    <span className="text-sm">GitHub Stars</span>
                  </div>
                  <span className="text-sm font-medium">
                    {communityStats.githubStars.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="text-muted-foreground h-4 w-4" />
                    <span className="text-sm">Discord Members</span>
                  </div>
                  <span className="text-sm font-medium">
                    {communityStats.discordMembers.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="text-muted-foreground h-4 w-4" />
                    <span className="text-sm">Contributors</span>
                  </div>
                  <span className="text-sm font-medium">
                    {communityStats.activeContributors}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="text-muted-foreground h-4 w-4" />
                    <span className="text-sm">Issues Resolved</span>
                  </div>
                  <span className="text-sm font-medium">
                    {communityStats.issuesResolved.toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="col-span-5 space-y-4">
          <Tabs defaultValue="popular" className="space-y-4">
            <TabsList>
              <TabsTrigger value="popular">Popular Docs</TabsTrigger>
              <TabsTrigger value="categories">Browse All</TabsTrigger>
              <TabsTrigger value="learning">Learning</TabsTrigger>
              <TabsTrigger value="updates">Updates</TabsTrigger>
            </TabsList>

            <TabsContent value="popular" className="space-y-4">
              {/* Popular Documentation */}
              <div className="grid gap-4 md:grid-cols-2">
                {popularDocs.map((doc) => (
                  <Card
                    key={doc.title}
                    className="cursor-pointer transition-shadow hover:shadow-lg"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg leading-tight">
                            {doc.title}
                          </CardTitle>
                          <CardDescription className="mt-2">
                            {doc.description}
                          </CardDescription>
                        </div>
                        <div className="ml-2 flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-current text-yellow-500" />
                          <span className="text-sm">{doc.rating}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <Badge variant="outline">{doc.category}</Badge>
                          <Badge
                            variant={
                              doc.popularity === 'High'
                                ? 'default'
                                : 'secondary'
                            }
                          >
                            {doc.popularity}
                          </Badge>
                        </div>
                        <div className="text-muted-foreground flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{doc.readTime}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="h-3 w-3" />
                              <span>{doc.views.toLocaleString()} views</span>
                            </div>
                          </div>
                          <span>Updated {doc.lastUpdated}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {doc.tags.slice(0, 3).map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center space-x-2 pt-2">
                          <Button size="sm" className="flex-1">
                            <FileText className="mr-2 h-4 w-4" />
                            Read Article
                          </Button>
                          <Button size="sm" variant="outline">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="categories" className="space-y-4">
              {/* All Categories */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {docCategories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <Card
                      key={category.id}
                      className="cursor-pointer transition-shadow hover:shadow-lg"
                    >
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <div className={`rounded-lg p-2 ${category.color}`}>
                            <IconComponent className="h-5 w-5" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">
                              {category.name}
                            </CardTitle>
                            <CardDescription>
                              {category.articles} articles
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-3 text-sm">
                          {category.description}
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Completion</span>
                            <span>{category.completionRate}%</span>
                          </div>
                          <Progress
                            value={category.completionRate}
                            className="h-2"
                          />
                        </div>
                        <div className="text-muted-foreground mt-3 flex items-center justify-between text-xs">
                          <Badge variant="outline" className="text-xs">
                            {category.difficulty}
                          </Badge>
                          <span>Updated {category.lastUpdated}</span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="learning" className="space-y-4">
              {/* Learning Resources */}
              <div className="grid gap-4 md:grid-cols-2">
                {learningResources.map((resource) => {
                  const IconComponent = resource.icon;
                  return (
                    <Card
                      key={resource.title}
                      className="cursor-pointer transition-shadow hover:shadow-lg"
                    >
                      <CardHeader>
                        <div className="flex items-start space-x-3">
                          <div className="bg-primary/10 rounded-lg p-2">
                            <IconComponent className="text-primary h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <CardTitle className="text-lg">
                                {resource.title}
                              </CardTitle>
                              <Badge
                                variant="outline"
                                className="text-xs capitalize"
                              >
                                {resource.type}
                              </Badge>
                            </div>
                            <CardDescription className="mt-1">
                              {resource.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-2">
                              <Clock className="text-muted-foreground h-4 w-4" />
                              <span>{resource.duration}</span>
                            </div>
                            <Badge variant="secondary">{resource.level}</Badge>
                          </div>
                          <div className="text-muted-foreground flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-1">
                              <Users className="h-3 w-3" />
                              <span>
                                {resource.views.toLocaleString()} views
                              </span>
                            </div>
                          </div>
                          <Button size="sm" className="w-full">
                            <Play className="mr-2 h-4 w-4" />
                            Start Learning
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="updates" className="space-y-4">
              {/* Recent Updates */}
              <div className="space-y-4">
                {recentUpdates.map((update) => (
                  <Card key={update.version}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`rounded-lg p-2 ${
                              update.type === 'major'
                                ? 'bg-red-100 dark:bg-red-900'
                                : update.type === 'minor'
                                  ? 'bg-blue-100 dark:bg-blue-900'
                                  : 'bg-green-100 dark:bg-green-900'
                            }`}
                          >
                            <Rocket
                              className={`h-5 w-5 ${
                                update.type === 'major'
                                  ? 'text-red-600 dark:text-red-400'
                                  : update.type === 'minor'
                                    ? 'text-blue-600 dark:text-blue-400'
                                    : 'text-green-600 dark:text-green-400'
                              }`}
                            />
                          </div>
                          <div>
                            <CardTitle className="flex items-center space-x-2">
                              <span>{update.version}</span>
                              <Badge
                                variant={
                                  update.type === 'major'
                                    ? 'destructive'
                                    : update.type === 'minor'
                                      ? 'default'
                                      : 'secondary'
                                }
                              >
                                {update.type}
                              </Badge>
                            </CardTitle>
                            <CardDescription>{update.title}</CardDescription>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-muted-foreground flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span className="text-sm">{update.date}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-3 text-sm">
                        {update.description}
                      </p>
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">What's New:</h4>
                        <ul className="space-y-1">
                          {update.changes.map((change, index) => (
                            <li
                              key={index}
                              className="flex items-start space-x-2 text-sm"
                            >
                              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                              <span>{change}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Contributors Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="mr-2 h-5 w-5" />
            Top Contributors
          </CardTitle>
          <CardDescription>
            Community members who help maintain our documentation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {contributors.map((contributor) => (
              <div
                key={contributor.name}
                className="flex items-center space-x-3 rounded-lg border p-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 font-medium text-white">
                  {contributor.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{contributor.name}</p>
                  <p className="text-muted-foreground text-xs">
                    {contributor.role}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {contributor.speciality}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {contributor.contributions}
                  </p>
                  <p className="text-muted-foreground text-xs">contributions</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
