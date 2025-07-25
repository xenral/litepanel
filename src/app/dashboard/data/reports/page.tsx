'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  FileText,
  Download,
  Calendar,
  Database,
  BarChart3,
  PieChart,
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Filter,
  Settings,
  Play,
  Pause,
  Edit,
  Trash2,
  Plus,
  Eye,
} from 'lucide-react';

// Mock reports data
const reportTemplates = [
  {
    id: 'sales-summary',
    name: 'Sales Summary Report',
    description: 'Comprehensive overview of sales performance',
    category: 'Sales',
    frequency: 'Daily',
    lastRun: '2024-01-20T10:30:00Z',
    status: 'Active',
    format: 'PDF',
    recipients: 12,
  },
  {
    id: 'user-analytics',
    name: 'User Analytics Report',
    description: 'User behavior and engagement metrics',
    category: 'Analytics',
    frequency: 'Weekly',
    lastRun: '2024-01-19T09:00:00Z',
    status: 'Active',
    format: 'Excel',
    recipients: 8,
  },
  {
    id: 'financial-overview',
    name: 'Financial Overview',
    description: 'Revenue, expenses, and profit analysis',
    category: 'Finance',
    frequency: 'Monthly',
    lastRun: '2024-01-15T16:00:00Z',
    status: 'Scheduled',
    format: 'PDF',
    recipients: 5,
  },
  {
    id: 'inventory-status',
    name: 'Inventory Status Report',
    description: 'Stock levels and product availability',
    category: 'Inventory',
    frequency: 'Daily',
    lastRun: '2024-01-20T08:00:00Z',
    status: 'Active',
    format: 'CSV',
    recipients: 15,
  },
  {
    id: 'customer-insights',
    name: 'Customer Insights',
    description: 'Customer demographics and behavior patterns',
    category: 'Marketing',
    frequency: 'Weekly',
    lastRun: '2024-01-18T14:30:00Z',
    status: 'Paused',
    format: 'PDF',
    recipients: 6,
  },
];

const recentReports = [
  {
    id: 'RPT-2024-001',
    name: 'Sales Summary Report',
    generatedAt: '2024-01-20T10:30:00Z',
    format: 'PDF',
    size: '2.4 MB',
    downloadCount: 25,
    status: 'Ready',
  },
  {
    id: 'RPT-2024-002',
    name: 'User Analytics Report',
    generatedAt: '2024-01-19T09:00:00Z',
    format: 'Excel',
    size: '1.8 MB',
    downloadCount: 18,
    status: 'Ready',
  },
  {
    id: 'RPT-2024-003',
    name: 'Financial Overview',
    generatedAt: '2024-01-18T16:00:00Z',
    format: 'PDF',
    size: '3.2 MB',
    downloadCount: 42,
    status: 'Ready',
  },
  {
    id: 'RPT-2024-004',
    name: 'Inventory Status Report',
    generatedAt: '2024-01-20T08:00:00Z',
    format: 'CSV',
    size: '856 KB',
    downloadCount: 31,
    status: 'Generating',
    progress: 75,
  },
];

const dataSourceOptions = [
  { id: 'users', name: 'User Data', description: 'User profiles, activity, and preferences' },
  { id: 'orders', name: 'Order Data', description: 'Sales transactions and order history' },
  { id: 'products', name: 'Product Data', description: 'Product catalog and inventory' },
  { id: 'analytics', name: 'Analytics Data', description: 'Website and app usage analytics' },
  { id: 'financial', name: 'Financial Data', description: 'Revenue, expenses, and financial metrics' },
  { id: 'marketing', name: 'Marketing Data', description: 'Campaign performance and leads' },
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active':
      return 'default';
    case 'Scheduled':
      return 'secondary';
    case 'Paused':
      return 'outline';
    case 'Ready':
      return 'default';
    case 'Generating':
      return 'secondary';
    default:
      return 'outline';
  }
};

export default function ReportsDataPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedDataSources, setSelectedDataSources] = useState<string[]>([]);

  const handleDataSourceToggle = (sourceId: string) => {
    setSelectedDataSources(prev => 
      prev.includes(sourceId) 
        ? prev.filter(id => id !== sourceId)
        : [...prev, sourceId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/data">Data Management</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbPage>Reports</BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Data Reports</h1>
          <p className="text-muted-foreground">
            Generate, schedule, and export comprehensive data reports
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Report Settings
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Report
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Custom Report</DialogTitle>
                <DialogDescription>
                  Build a custom report with your preferred data sources and settings.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="report-name">Report Name</Label>
                    <Input id="report-name" placeholder="Enter report name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="report-category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="analytics">Analytics</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="inventory">Inventory</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">Data Sources</Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Select the data sources to include in your report
                  </p>
                  <div className="grid gap-3 md:grid-cols-2">
                    {dataSourceOptions.map((source) => (
                      <div key={source.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                        <Checkbox
                          id={source.id}
                          checked={selectedDataSources.includes(source.id)}
                          onCheckedChange={() => handleDataSourceToggle(source.id)}
                        />
                        <div className="flex-1">
                          <Label htmlFor={source.id} className="font-medium cursor-pointer">
                            {source.name}
                          </Label>
                          <p className="text-sm text-muted-foreground">{source.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Format</Label>
                    <Select defaultValue="pdf">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="json">JSON</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Frequency</Label>
                    <Select defaultValue="manual">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manual">Manual</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Date Range</Label>
                    <Select defaultValue="30d">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7d">Last 7 days</SelectItem>
                        <SelectItem value="30d">Last 30 days</SelectItem>
                        <SelectItem value="90d">Last 3 months</SelectItem>
                        <SelectItem value="custom">Custom range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsCreateDialogOpen(false)}>
                    Create Report
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="templates" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="templates">Report Templates</TabsTrigger>
          <TabsTrigger value="recent">Recent Reports</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          {/* Quick Actions */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <BarChart3 className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Sales Report</h3>
                      <p className="text-sm text-muted-foreground">Generate now</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">User Report</h3>
                      <p className="text-sm text-muted-foreground">Generate now</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <DollarSign className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Financial Report</h3>
                      <p className="text-sm text-muted-foreground">Generate now</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Database className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Custom Report</h3>
                      <p className="text-sm text-muted-foreground">Create new</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Report Templates */}
          <Card>
            <CardHeader>
              <CardTitle>Report Templates</CardTitle>
              <CardDescription>
                Pre-configured report templates for common business needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportTemplates.map((template, index) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-muted rounded-lg">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <h4 className="font-medium">{template.name}</h4>
                          <p className="text-sm text-muted-foreground">{template.description}</p>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-xs text-muted-foreground">
                              Category: {template.category}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              Frequency: {template.frequency}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              Format: {template.format}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <Badge variant={getStatusColor(template.status)}>
                          {template.status}
                        </Badge>
                        <div className="text-xs text-muted-foreground mt-1">
                          Last run: {formatDate(template.lastRun)}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Play className="mr-2 h-4 w-4" />
                          Run Now
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          {/* Recent Reports */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>
                Recently generated reports available for download
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report, index) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-muted rounded-lg">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <h4 className="font-medium">{report.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>ID: {report.id}</span>
                          <span>Generated: {formatDate(report.generatedAt)}</span>
                          <span>Size: {report.size}</span>
                          <span>Downloads: {report.downloadCount}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant={getStatusColor(report.status)}>
                        {report.status}
                      </Badge>
                      {report.status === 'Generating' && report.progress && (
                        <div className="w-32">
                          <Progress value={report.progress} className="h-2" />
                          <span className="text-xs text-muted-foreground">{report.progress}%</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" disabled={report.status !== 'Ready'}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" disabled={report.status !== 'Ready'}>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Reports are automatically deleted after 30 days. Download important reports for long-term storage.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-6">
          {/* Scheduled Reports */}
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
              <CardDescription>
                Manage automated report generation schedules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportTemplates.filter(t => t.status !== 'Paused').map((template, index) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-muted rounded-lg">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <h4 className="font-medium">{template.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>Frequency: {template.frequency}</span>
                          <span>Next run: Tomorrow at 9:00 AM</span>
                          <span>Recipients: {template.recipients}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant={getStatusColor(template.status)}>
                        {template.status}
                      </Badge>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Pause className="mr-2 h-4 w-4" />
                          Pause
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Report Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Email Recipients</span>
                    <span className="font-medium">48 users</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Slack Channels</span>
                    <span className="font-medium">3 channels</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Dashboard Access</span>
                    <span className="font-medium">All users</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Storage Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Report Storage</span>
                      <span className="text-sm text-muted-foreground">2.4 GB / 10 GB</span>
                    </div>
                    <Progress value={24} className="h-2" />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Reports are automatically cleaned up after 30 days to manage storage.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 