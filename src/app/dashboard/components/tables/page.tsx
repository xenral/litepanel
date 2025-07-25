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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
  Table2,
  Search,
  Filter,
  MoreHorizontal,
  ChevronUp,
  ChevronDown,
  ArrowUpDown,
  Eye,
  Edit,
  Trash2,
  Download,
  Upload,
  Plus,
  Star,
  StarOff,
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
} from 'lucide-react';

// Mock data for different table examples
const basicTableData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'Inactive' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'Pending' },
];

const advancedTableData = [
  {
    id: 'USR-001',
    user: {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=32&h=32&fit=crop&crop=face',
    },
    department: 'Engineering',
    performance: 92,
    salary: 95000,
    joinDate: '2023-03-15',
    projects: 12,
    status: 'Active',
    rating: 4.8,
  },
  {
    id: 'USR-002',
    user: {
      name: 'Bob Smith',
      email: 'bob@example.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
    },
    department: 'Marketing',
    performance: 87,
    salary: 78000,
    joinDate: '2023-01-22',
    projects: 8,
    status: 'Active',
    rating: 4.5,
  },
  {
    id: 'USR-003',
    user: {
      name: 'Carol Davis',
      email: 'carol@example.com',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
    },
    department: 'Sales',
    performance: 76,
    salary: 65000,
    joinDate: '2022-11-08',
    projects: 15,
    status: 'On Leave',
    rating: 4.2,
  },
  {
    id: 'USR-004',
    user: {
      name: 'David Wilson',
      email: 'david@example.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
    },
    department: 'Engineering',
    performance: 94,
    salary: 105000,
    joinDate: '2022-07-12',
    projects: 18,
    status: 'Active',
    rating: 4.9,
  },
  {
    id: 'USR-005',
    user: {
      name: 'Eva Brown',
      email: 'eva@example.com',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=face',
    },
    department: 'HR',
    performance: 89,
    salary: 72000,
    joinDate: '2023-05-03',
    projects: 6,
    status: 'Active',
    rating: 4.6,
  },
];

const expandableTableData = [
  {
    id: 'PRJ-001',
    name: 'Website Redesign',
    status: 'In Progress',
    priority: 'High',
    team: 5,
    progress: 75,
    dueDate: '2024-02-15',
    details: {
      description: 'Complete overhaul of the company website with modern design and improved UX.',
      tasks: [
        { name: 'UI Design', status: 'Completed', assignee: 'Alice' },
        { name: 'Frontend Development', status: 'In Progress', assignee: 'Bob' },
        { name: 'Backend Integration', status: 'Pending', assignee: 'Carol' },
        { name: 'Testing', status: 'Pending', assignee: 'David' },
      ]
    }
  },
  {
    id: 'PRJ-002',
    name: 'Mobile App',
    status: 'Planning',
    priority: 'Medium',
    team: 3,
    progress: 25,
    dueDate: '2024-04-30',
    details: {
      description: 'Native mobile application for iOS and Android platforms.',
      tasks: [
        { name: 'Requirements Gathering', status: 'Completed', assignee: 'Eva' },
        { name: 'Wireframing', status: 'In Progress', assignee: 'Frank' },
        { name: 'Development', status: 'Pending', assignee: 'Grace' },
      ]
    }
  },
  {
    id: 'PRJ-003',
    name: 'API Integration',
    status: 'Completed',
    priority: 'Low',
    team: 2,
    progress: 100,
    dueDate: '2024-01-15',
    details: {
      description: 'Integration with third-party APIs for enhanced functionality.',
      tasks: [
        { name: 'API Research', status: 'Completed', assignee: 'Henry' },
        { name: 'Implementation', status: 'Completed', assignee: 'Ivy' },
        { name: 'Testing', status: 'Completed', assignee: 'Jack' },
      ]
    }
  },
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
    case 'completed':
      return 'default';
    case 'inactive':
    case 'on leave':
      return 'secondary';
    case 'pending':
    case 'planning':
      return 'outline';
    case 'in progress':
      return 'secondary';
    default:
      return 'outline';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case 'high':
      return 'destructive';
    case 'medium':
      return 'secondary';
    case 'low':
      return 'outline';
    default:
      return 'outline';
  }
};

const renderStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
  }

  if (hasHalfStar) {
    stars.push(<Star key="half" className="h-4 w-4 fill-yellow-400/50 text-yellow-400" />);
  }

  const remainingStars = 5 - Math.ceil(rating);
  for (let i = 0; i < remainingStars; i++) {
    stars.push(<StarOff key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
  }

  return stars;
};

export default function TablesComponentPage() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');

  const handleRowSelect = (id: string) => {
    setSelectedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = (data: any[]) => {
    setSelectedRows(
      selectedRows.length === data.length 
        ? [] 
        : data.map(item => item.id)
    );
  };

  const toggleRowExpansion = (id: string) => {
    setExpandedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAdvancedData = advancedTableData.filter(item =>
    item.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <BreadcrumbLink href="/dashboard/components">UI Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbPage>Tables</BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Table Components</h1>
          <p className="text-muted-foreground">
            Comprehensive table examples with sorting, filtering, and interactive features
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Examples
          </Button>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import Data
          </Button>
        </div>
      </div>

      {/* Table Examples Tabs */}
      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Table</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Table</TabsTrigger>
          <TabsTrigger value="expandable">Expandable Rows</TabsTrigger>
          <TabsTrigger value="interactive">Interactive Features</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Table2 className="mr-2 h-5 w-5" />
                Basic Table Example
              </CardTitle>
              <CardDescription>
                Simple table with standard styling and basic data display
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableCaption>A list of recent users and their information.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {basicTableData.map((user, index) => (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <TableCell className="font-medium">{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={4}>Total Users</TableCell>
                      <TableCell className="text-right">{basicTableData.length}</TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Alert>
            <Table2 className="h-4 w-4" />
            <AlertDescription>
              Basic tables are perfect for simple data display with consistent formatting. 
              Use TableCaption for accessibility and TableFooter for summary information.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div>
                  <CardTitle className="flex items-center">
                    <Table2 className="mr-2 h-5 w-5" />
                    Advanced Table with Rich Data
                  </CardTitle>
                  <CardDescription>
                    Feature-rich table with avatars, progress bars, ratings, and sorting
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 w-64"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedRows.length === filteredAdvancedData.length}
                          onCheckedChange={() => handleSelectAll(filteredAdvancedData)}
                        />
                      </TableHead>
                      <TableHead>
                        <Button 
                          variant="ghost" 
                          className="h-auto p-0 font-semibold"
                          onClick={() => handleSort('name')}
                        >
                          User
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button 
                          variant="ghost" 
                          className="h-auto p-0 font-semibold"
                          onClick={() => handleSort('department')}
                        >
                          Department
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>
                        <Button 
                          variant="ghost" 
                          className="h-auto p-0 font-semibold"
                          onClick={() => handleSort('salary')}
                        >
                          Salary
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead>Projects</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-12">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAdvancedData.map((employee, index) => (
                      <motion.tr
                        key={employee.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.02 }}
                        className="group"
                      >
                        <TableCell>
                          <Checkbox
                            checked={selectedRows.includes(employee.id)}
                            onCheckedChange={() => handleRowSelect(employee.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={employee.user.avatar} alt={employee.user.name} />
                              <AvatarFallback>
                                {employee.user.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{employee.user.name}</div>
                              <div className="text-sm text-muted-foreground">{employee.user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span>{employee.performance}%</span>
                              {employee.performance >= 90 ? (
                                <TrendingUp className="h-4 w-4 text-green-600" />
                              ) : employee.performance >= 75 ? (
                                <Minus className="h-4 w-4 text-yellow-600" />
                              ) : (
                                <TrendingDown className="h-4 w-4 text-red-600" />
                              )}
                            </div>
                            <Progress value={employee.performance} className="h-2" />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          ${employee.salary.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{employee.projects}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            {renderStars(employee.rating)}
                            <span className="ml-2 text-sm text-muted-foreground">
                              {employee.rating}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(employee.status)}>
                            {employee.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Employee
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Remove
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {selectedRows.length > 0 && (
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {selectedRows.length} employee{selectedRows.length > 1 ? 's' : ''} selected
                    </span>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        Export Selected
                      </Button>
                      <Button variant="outline" size="sm">
                        Bulk Edit
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expandable" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Table2 className="mr-2 h-5 w-5" />
                Expandable Rows Table
              </CardTitle>
              <CardDescription>
                Table with collapsible rows that reveal additional details and nested data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12"></TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Team Size</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead className="w-12">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {expandableTableData.map((project, index) => (
                      <React.Fragment key={project.id}>
                        <motion.tr
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="group cursor-pointer hover:bg-muted/50"
                          onClick={() => toggleRowExpansion(project.id)}
                        >
                          <TableCell>
                            <Button variant="ghost" size="sm" className="p-0 h-auto">
                              {expandedRows.includes(project.id) ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </Button>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{project.name}</div>
                              <div className="text-sm text-muted-foreground">{project.id}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getStatusColor(project.status)}>
                              {project.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getPriorityColor(project.priority)}>
                              {project.priority}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <div className="flex -space-x-2">
                                {Array.from({ length: Math.min(project.team, 3) }, (_, i) => (
                                  <div 
                                    key={i} 
                                    className="w-6 h-6 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs"
                                  >
                                    {i + 1}
                                  </div>
                                ))}
                                {project.team > 3 && (
                                  <div className="w-6 h-6 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs">
                                    +{project.team - 3}
                                  </div>
                                )}
                              </div>
                              <span className="text-sm text-muted-foreground">{project.team}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-sm">
                                <span>{project.progress}%</span>
                                {project.progress === 100 ? (
                                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                                ) : project.progress > 50 ? (
                                  <Clock className="h-4 w-4 text-blue-600" />
                                ) : (
                                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                                )}
                              </div>
                              <Progress value={project.progress} className="h-2" />
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">{project.dueDate}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Project
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit Project
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </motion.tr>

                        {expandedRows.includes(project.id) && (
                          <motion.tr
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <TableCell colSpan={8} className="bg-muted/30 p-0">
                              <div className="p-4 space-y-4">
                                <div>
                                  <h4 className="font-medium text-sm mb-2">Project Description</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {project.details.description}
                                  </p>
                                </div>
                                
                                <div>
                                  <h4 className="font-medium text-sm mb-3">Tasks</h4>
                                  <div className="space-y-2">
                                    {project.details.tasks.map((task, taskIndex) => (
                                      <div key={taskIndex} className="flex items-center justify-between p-2 bg-background rounded border">
                                        <div className="flex items-center space-x-3">
                                          {task.status === 'Completed' ? (
                                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                                          ) : task.status === 'In Progress' ? (
                                            <Clock className="h-4 w-4 text-blue-600" />
                                          ) : (
                                            <XCircle className="h-4 w-4 text-gray-400" />
                                          )}
                                          <span className="text-sm font-medium">{task.name}</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                          <Badge variant="outline" className="text-xs">
                                            {task.assignee}
                                          </Badge>
                                          <Badge variant={getStatusColor(task.status)} className="text-xs">
                                            {task.status}
                                          </Badge>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                          </motion.tr>
                        )}
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interactive" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Table Features</CardTitle>
                <CardDescription>
                  Interactive features available in our table components
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="font-medium">Row Selection</div>
                      <div className="text-sm text-muted-foreground">Checkbox selection with bulk actions</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="font-medium">Sortable Columns</div>
                      <div className="text-sm text-muted-foreground">Click headers to sort data</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="font-medium">Search & Filter</div>
                      <div className="text-sm text-muted-foreground">Real-time search and filtering</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="font-medium">Expandable Rows</div>
                      <div className="text-sm text-muted-foreground">Nested data and detail views</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="font-medium">Custom Components</div>
                      <div className="text-sm text-muted-foreground">Avatars, badges, progress bars</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Best Practices</CardTitle>
                <CardDescription>
                  Guidelines for effective table design and UX
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Performance</h4>
                    <p className="text-sm text-muted-foreground">
                      Use pagination or virtual scrolling for large datasets to maintain performance.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Accessibility</h4>
                    <p className="text-sm text-muted-foreground">
                      Include proper table captions, headers, and ARIA labels for screen readers.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Mobile Responsiveness</h4>
                    <p className="text-sm text-muted-foreground">
                      Consider stacked layouts or horizontal scrolling for narrow screens.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Visual Hierarchy</h4>
                    <p className="text-sm text-muted-foreground">
                      Use consistent spacing, typography, and color coding to guide user attention.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Remember to implement proper loading states, error handling, and empty states for production tables. 
              Consider using libraries like TanStack Table for complex data management needs.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  );
} 