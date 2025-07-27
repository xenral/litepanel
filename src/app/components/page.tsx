import type { Metadata } from 'next';
import {
  Palette,
  Code,
  Copy,
  Check,
  Eye,
  Download,
  Search,
  Filter,
  Star,
  Heart,
  Share2,
  MoreHorizontal,
  Settings,
  User,
  Mail,
  Calendar,
  Upload,
  ChevronDown,
  Info,
  AlertTriangle,
  CheckCircle,
  X,
  Play,
  Maximize,
  RotateCcw,
  Smartphone,
  Tablet,
  Monitor,
  Zap,
  Layers,
  Package,
  Grid,
  List,
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
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Slider } from '@/components/ui/slider';

export const metadata: Metadata = {
  title: 'Components',
  description: 'Comprehensive UI component library and design system showcase',
};

/**
 * Component categories for organization
 */
const componentCategories = [
  {
    id: 'buttons',
    name: 'Buttons',
    description: 'Interactive buttons and actions',
    count: 12,
    icon: Package,
    color: 'text-blue-600 bg-blue-100 dark:bg-blue-900',
  },
  {
    id: 'inputs',
    name: 'Form Controls',
    description: 'Input fields and form elements',
    count: 18,
    icon: Settings,
    color: 'text-green-600 bg-green-100 dark:bg-green-900',
  },
  {
    id: 'display',
    name: 'Data Display',
    description: 'Cards, badges, and content display',
    count: 15,
    icon: Grid,
    color: 'text-purple-600 bg-purple-100 dark:bg-purple-900',
  },
  {
    id: 'feedback',
    name: 'Feedback',
    description: 'Loading states and notifications',
    count: 10,
    icon: AlertTriangle,
    color: 'text-orange-600 bg-orange-100 dark:bg-orange-900',
  },
  {
    id: 'navigation',
    name: 'Navigation',
    description: 'Tabs, menus, and navigation elements',
    count: 14,
    icon: List,
    color: 'text-indigo-600 bg-indigo-100 dark:bg-indigo-900',
  },
  {
    id: 'overlay',
    name: 'Overlays',
    description: 'Modals, dialogs, and popover content',
    count: 8,
    icon: Layers,
    color: 'text-teal-600 bg-teal-100 dark:bg-teal-900',
  },
];

/**
 * Color palette for the design system
 */
const colorPalette = [
  {
    name: 'Primary',
    value: 'hsl(221.2 83.2% 53.3%)',
    class: 'bg-primary',
    description: 'Main brand color',
  },
  {
    name: 'Secondary',
    value: 'hsl(210 40% 96%)',
    class: 'bg-secondary',
    description: 'Supporting colors',
  },
  {
    name: 'Destructive',
    value: 'hsl(0 84.2% 60.2%)',
    class: 'bg-destructive',
    description: 'Error states',
  },
  {
    name: 'Muted',
    value: 'hsl(210 40% 96%)',
    class: 'bg-muted',
    description: 'Subtle backgrounds',
  },
  {
    name: 'Accent',
    value: 'hsl(210 40% 96%)',
    class: 'bg-accent',
    description: 'Highlights',
  },
  {
    name: 'Success',
    value: 'hsl(142.1 76.2% 36.3%)',
    class: 'bg-green-600',
    description: 'Success states',
  },
  {
    name: 'Warning',
    value: 'hsl(38 92% 50%)',
    class: 'bg-yellow-500',
    description: 'Warning states',
  },
  {
    name: 'Info',
    value: 'hsl(221.2 83.2% 53.3%)',
    class: 'bg-blue-600',
    description: 'Informational',
  },
];

/**
 * Popular components list
 */
const popularComponents = [
  { name: 'Button', usage: '95%', trend: '+12%', category: 'Actions' },
  { name: 'Card', usage: '89%', trend: '+8%', category: 'Layout' },
  { name: 'Input', usage: '84%', trend: '+15%', category: 'Forms' },
  { name: 'Dialog', usage: '76%', trend: '+22%', category: 'Overlay' },
  { name: 'Badge', usage: '71%', trend: '+5%', category: 'Display' },
  { name: 'Tabs', usage: '68%', trend: '+18%', category: 'Navigation' },
];

/**
 * Component stats
 */
const componentStats = [
  {
    label: 'Total Components',
    value: '77',
    icon: Package,
    change: '+5 this month',
  },
  { label: 'Categories', value: '6', icon: Grid, change: 'Fully organized' },
  {
    label: 'Design Tokens',
    value: '156',
    icon: Palette,
    change: '+12 new tokens',
  },
  {
    label: 'Usage Examples',
    value: '240+',
    icon: Code,
    change: 'Live examples',
  },
];

/**
 * Components showcase page
 */
export default function ComponentsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Component Library</h1>
          <p className="text-muted-foreground mt-2">
            Professional UI components built with React, TypeScript, and
            Tailwind CSS.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
            <Input placeholder="Search components..." className="w-64 pl-9" />
          </div>
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <Button className="flex items-center space-x-2">
            <Code className="h-4 w-4" />
            <span>View Code</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {componentStats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-green-600">{stat.change}</p>
                </div>
                <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                  <stat.icon className="text-primary h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Left Sidebar - Categories & Popular */}
        <div className="space-y-6">
          {/* Component Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Categories</CardTitle>
              <CardDescription>Browse by component type</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {componentCategories.map((category) => (
                <div
                  key={category.id}
                  className="hover:bg-muted/50 flex cursor-pointer items-center justify-between rounded-lg p-3 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`rounded-lg p-2 ${category.color}`}>
                      <category.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{category.name}</p>
                      <p className="text-muted-foreground text-xs">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {category.count}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Popular Components */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Most Popular</CardTitle>
              <CardDescription>Frequently used components</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {popularComponents.map((component, index) => (
                <div
                  key={component.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary/10 flex h-6 w-6 items-center justify-center rounded">
                      <span className="text-primary text-xs font-bold">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{component.name}</p>
                      <p className="text-muted-foreground text-xs">
                        {component.category}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{component.usage}</p>
                    <p className="text-xs text-green-600">{component.trend}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                size="sm"
              >
                <Download className="mr-2 h-4 w-4" />
                Download All
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                size="sm"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share Library
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                size="sm"
              >
                <Zap className="mr-2 h-4 w-4" />
                Generate Code
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="space-y-8 lg:col-span-3">
          {/* Interactive Playground */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Play className="h-5 w-5" />
                    <span>Interactive Playground</span>
                  </CardTitle>
                  <CardDescription>
                    Try components with live preview and customization
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Smartphone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Tablet className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Monitor className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Maximize className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Controls Panel */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Customize Component</h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Component Type</Label>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-between"
                          >
                            Button
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-full">
                          <DropdownMenuItem>Button</DropdownMenuItem>
                          <DropdownMenuItem>Card</DropdownMenuItem>
                          <DropdownMenuItem>Input</DropdownMenuItem>
                          <DropdownMenuItem>Badge</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="space-y-2">
                      <Label>Variant</Label>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="default">
                          Default
                        </Button>
                        <Button size="sm" variant="outline">
                          Outline
                        </Button>
                        <Button size="sm" variant="ghost">
                          Ghost
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Size</Label>
                      <div className="flex space-x-2">
                        <Button size="sm">Small</Button>
                        <Button size="default">Default</Button>
                        <Button size="lg">Large</Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Border Radius</Label>
                      <Slider
                        defaultValue={[8]}
                        max={20}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Live Preview */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">Live Preview</h4>
                    <Button variant="outline" size="sm">
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Reset
                    </Button>
                  </div>
                  <div className="border-muted bg-muted/20 flex min-h-48 items-center justify-center rounded-lg border-2 border-dashed p-8">
                    <div className="space-y-4 text-center">
                      <Button className="shadow-lg">Sample Component</Button>
                      <p className="text-muted-foreground text-sm">
                        Customize settings to see changes live
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Button variant="outline" size="sm">
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Code
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Component Showcase */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="h-5 w-5" />
                <span>Component Showcase</span>
              </CardTitle>
              <CardDescription>
                Explore all available components with examples
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="buttons" className="space-y-6">
                <TabsList className="grid w-fit grid-cols-6">
                  <TabsTrigger value="buttons">Buttons</TabsTrigger>
                  <TabsTrigger value="inputs">Inputs</TabsTrigger>
                  <TabsTrigger value="display">Display</TabsTrigger>
                  <TabsTrigger value="feedback">Feedback</TabsTrigger>
                  <TabsTrigger value="navigation">Navigation</TabsTrigger>
                  <TabsTrigger value="colors">Colors</TabsTrigger>
                </TabsList>

                <TabsContent value="buttons" className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Button Variants
                        </CardTitle>
                        <CardDescription>
                          Different button styles
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div>
                            <h5 className="mb-2 font-medium">
                              Primary Buttons
                            </h5>
                            <div className="flex flex-wrap gap-2">
                              <Button>Default</Button>
                              <Button size="sm">Small</Button>
                              <Button size="lg">Large</Button>
                              <Button disabled>Disabled</Button>
                            </div>
                          </div>

                          <div>
                            <h5 className="mb-2 font-medium">
                              Secondary Styles
                            </h5>
                            <div className="flex flex-wrap gap-2">
                              <Button variant="secondary">Secondary</Button>
                              <Button variant="outline">Outline</Button>
                              <Button variant="ghost">Ghost</Button>
                              <Button variant="link">Link</Button>
                            </div>
                          </div>

                          <div>
                            <h5 className="mb-2 font-medium">With Icons</h5>
                            <div className="flex flex-wrap gap-2">
                              <Button>
                                <Mail className="mr-2 h-4 w-4" />
                                Email
                              </Button>
                              <Button variant="outline">
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </Button>
                              <Button variant="destructive">
                                <X className="mr-2 h-4 w-4" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Button States</CardTitle>
                        <CardDescription>
                          Interactive states and loading
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div>
                            <h5 className="mb-2 font-medium">
                              Interactive States
                            </h5>
                            <div className="flex flex-wrap gap-2">
                              <Button className="transition-transform hover:scale-105">
                                Hover Effect
                              </Button>
                              <Button className="focus:ring-primary/30 focus:ring-4">
                                Focus State
                              </Button>
                              <Button className="active:scale-95">
                                Active State
                              </Button>
                            </div>
                          </div>

                          <div>
                            <h5 className="mb-2 font-medium">
                              Special Variants
                            </h5>
                            <div className="flex flex-wrap gap-2">
                              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                                Gradient
                              </Button>
                              <Button className="rounded-full">Rounded</Button>
                              <Button size="icon">
                                <Settings className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="inputs" className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Form Controls</CardTitle>
                        <CardDescription>
                          Input fields and form elements
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="space-y-2">
                            <Label>Text Input</Label>
                            <Input placeholder="Enter text..." />
                          </div>

                          <div className="space-y-2">
                            <Label>Email Input</Label>
                            <Input
                              type="email"
                              placeholder="email@example.com"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Search Input</Label>
                            <div className="relative">
                              <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
                              <Input placeholder="Search..." className="pl-9" />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Range Slider</Label>
                            <Slider defaultValue={[50]} max={100} step={1} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Advanced Controls
                        </CardTitle>
                        <CardDescription>Complex form elements</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="space-y-2">
                            <Label>Dropdown Select</Label>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-full justify-between"
                                >
                                  Select option
                                  <ChevronDown className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="w-full">
                                <DropdownMenuItem>Option 1</DropdownMenuItem>
                                <DropdownMenuItem>Option 2</DropdownMenuItem>
                                <DropdownMenuItem>Option 3</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          <div className="space-y-2">
                            <Label>File Upload</Label>
                            <div className="border-muted rounded-lg border-2 border-dashed p-4 text-center">
                              <Upload className="text-muted-foreground mx-auto mb-2 h-6 w-6" />
                              <p className="text-muted-foreground text-sm">
                                Drop files here or click to browse
                              </p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Tags Input</Label>
                            <div className="flex min-h-10 flex-wrap gap-2 rounded-lg border p-2">
                              <Badge>React</Badge>
                              <Badge>TypeScript</Badge>
                              <Badge>Tailwind</Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="display" className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Cards & Containers
                        </CardTitle>
                        <CardDescription>
                          Content display components
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Card className="border-2">
                          <CardHeader>
                            <CardTitle className="text-base">
                              Sample Card
                            </CardTitle>
                            <CardDescription>
                              This is a card with header and content
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground text-sm">
                              Card content goes here with additional information
                              and details.
                            </p>
                          </CardContent>
                        </Card>

                        <div className="space-y-2">
                          <Label>Badges & Labels</Label>
                          <div className="flex flex-wrap gap-2">
                            <Badge>Default</Badge>
                            <Badge variant="secondary">Secondary</Badge>
                            <Badge variant="outline">Outline</Badge>
                            <Badge variant="destructive">Error</Badge>
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                              Success
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Status Indicators
                        </CardTitle>
                        <CardDescription>
                          Visual status and progress elements
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div>
                            <Label className="text-sm">Status Badges</Label>
                            <div className="mt-2 flex flex-wrap gap-2">
                              <Badge className="flex items-center gap-1">
                                <CheckCircle className="h-3 w-3" />
                                Online
                              </Badge>
                              <Badge
                                variant="secondary"
                                className="flex items-center gap-1"
                              >
                                <AlertTriangle className="h-3 w-3" />
                                Warning
                              </Badge>
                              <Badge
                                variant="destructive"
                                className="flex items-center gap-1"
                              >
                                <X className="h-3 w-3" />
                                Offline
                              </Badge>
                            </div>
                          </div>

                          <div>
                            <Label className="text-sm">User Profiles</Label>
                            <div className="mt-2 flex items-center space-x-2 rounded-lg border p-3">
                              <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                                <User className="text-primary h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">John Doe</p>
                                <p className="text-muted-foreground text-xs">
                                  Software Engineer
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="feedback" className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Loading States
                        </CardTitle>
                        <CardDescription>
                          Skeleton loaders and indicators
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div>
                            <Label className="text-sm">Text Skeletons</Label>
                            <div className="mt-2 space-y-2">
                              <Skeleton className="h-4 w-3/4" />
                              <Skeleton className="h-4 w-1/2" />
                              <Skeleton className="h-4 w-2/3" />
                            </div>
                          </div>

                          <div>
                            <Label className="text-sm">Card Skeleton</Label>
                            <div className="mt-2 flex items-center space-x-4">
                              <Skeleton className="h-12 w-12 rounded-full" />
                              <div className="space-y-2">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-24" />
                              </div>
                            </div>
                          </div>

                          <div>
                            <Label className="text-sm">Content Skeleton</Label>
                            <div className="mt-2 space-y-2">
                              <Skeleton className="h-32 w-full" />
                              <div className="flex justify-between">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-16" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Alert Messages
                        </CardTitle>
                        <CardDescription>
                          Status messages and notifications
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-800 dark:bg-green-950">
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span className="text-sm font-medium">
                                Success!
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-green-700 dark:text-green-300">
                              Your changes have been saved successfully.
                            </p>
                          </div>

                          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3 dark:border-yellow-800 dark:bg-yellow-950">
                            <div className="flex items-center space-x-2">
                              <AlertTriangle className="h-4 w-4 text-yellow-600" />
                              <span className="text-sm font-medium">
                                Warning!
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
                              Please review your input before proceeding.
                            </p>
                          </div>

                          <div className="rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-950">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <X className="h-4 w-4 text-red-600" />
                                <span className="text-sm font-medium">
                                  Error!
                                </span>
                              </div>
                              <Button variant="ghost" size="sm">
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                            <p className="mt-1 text-sm text-red-700 dark:text-red-300">
                              Something went wrong. Please try again.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="navigation" className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Navigation Elements
                        </CardTitle>
                        <CardDescription>
                          Tabs, menus, and navigation
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm">Tab Navigation</Label>
                            <Tabs defaultValue="tab1" className="mt-2 w-full">
                              <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="tab1">Tab One</TabsTrigger>
                                <TabsTrigger value="tab2">Tab Two</TabsTrigger>
                                <TabsTrigger value="tab3">
                                  Tab Three
                                </TabsTrigger>
                              </TabsList>
                              <TabsContent value="tab1" className="mt-4">
                                <p className="text-muted-foreground text-sm">
                                  Content for tab one.
                                </p>
                              </TabsContent>
                              <TabsContent value="tab2" className="mt-4">
                                <p className="text-muted-foreground text-sm">
                                  Content for tab two.
                                </p>
                              </TabsContent>
                              <TabsContent value="tab3" className="mt-4">
                                <p className="text-muted-foreground text-sm">
                                  Content for tab three.
                                </p>
                              </TabsContent>
                            </Tabs>
                          </div>

                          <div>
                            <Label className="text-sm">Dropdown Menu</Label>
                            <div className="mt-2">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="outline">
                                    Menu Options
                                    <MoreHorizontal className="ml-2 h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <User className="mr-2 h-4 w-4" />
                                    Profile
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Settings className="mr-2 h-4 w-4" />
                                    Settings
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">
                                    <X className="mr-2 h-4 w-4" />
                                    Logout
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Dialog & Overlays
                        </CardTitle>
                        <CardDescription>
                          Modal dialogs and popups
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div>
                            <Label className="text-sm">Modal Dialog</Label>
                            <div className="mt-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline">Open Dialog</Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Dialog Title</DialogTitle>
                                    <DialogDescription>
                                      This is a sample dialog with customizable
                                      content.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="mt-4 flex justify-end space-x-2">
                                    <Button variant="outline">Cancel</Button>
                                    <Button>Confirm</Button>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>

                          <div>
                            <Label className="text-sm">
                              Interactive Buttons
                            </Label>
                            <div className="mt-2 flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Heart className="mr-2 h-4 w-4" />
                                Like
                              </Button>
                              <Button variant="outline" size="sm">
                                <Share2 className="mr-2 h-4 w-4" />
                                Share
                              </Button>
                              <Button variant="outline" size="sm">
                                <Star className="mr-2 h-4 w-4" />
                                Favorite
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="colors" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Design System Colors
                      </CardTitle>
                      <CardDescription>
                        Complete color palette with usage guidelines
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {colorPalette.map((color) => (
                          <div key={color.name} className="space-y-2">
                            <div
                              className={`h-24 w-full rounded-lg ${color.class} border shadow-sm`}
                            />
                            <div>
                              <p className="text-sm font-medium">
                                {color.name}
                              </p>
                              <p className="text-muted-foreground font-mono text-xs">
                                {color.value}
                              </p>
                              <p className="text-muted-foreground text-xs">
                                {color.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8">
                        <h4 className="mb-4 font-medium">
                          Color Usage Examples
                        </h4>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                          <div className="space-y-3">
                            <Label className="text-sm">Semantic Colors</Label>
                            <div className="flex space-x-2">
                              <Badge className="bg-green-600 text-white">
                                Success
                              </Badge>
                              <Badge className="bg-yellow-500 text-yellow-950">
                                Warning
                              </Badge>
                              <Badge className="bg-red-600 text-white">
                                Error
                              </Badge>
                              <Badge className="bg-blue-600 text-white">
                                Info
                              </Badge>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <Label className="text-sm">Button Colors</Label>
                            <div className="flex space-x-2">
                              <Button>Primary</Button>
                              <Button variant="secondary">Secondary</Button>
                              <Button variant="outline">Outline</Button>
                              <Button variant="ghost">Ghost</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
