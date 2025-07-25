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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
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
  DialogFooter,
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
  Shield,
  Lock,
  Unlock,
  Users,
  FileText,
  BarChart3,
  DollarSign,
  Settings,
  Database,
  Search,
  Filter,
  Download,
  History,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Info,
  Eye,
  Edit,
  Trash2,
  Plus,
  Calendar,
  User,
} from 'lucide-react';

// Permission definitions with detailed information
const permissionDefinitions = [
  {
    id: 'users.read',
    name: 'View Users',
    category: 'User Management',
    description: 'View user profiles, contact information, and basic account details',
    risk: 'low',
    dependencies: [],
    grantedTo: ['admin', 'manager', 'lead'],
    createdAt: '2023-01-15',
    updatedAt: '2023-01-15',
  },
  {
    id: 'users.write',
    name: 'Edit Users',
    category: 'User Management',
    description: 'Create, modify, and update user accounts and profile information',
    risk: 'medium',
    dependencies: ['users.read'],
    grantedTo: ['admin', 'manager'],
    createdAt: '2023-01-15',
    updatedAt: '2023-02-10',
  },
  {
    id: 'users.delete',
    name: 'Delete Users',
    category: 'User Management',
    description: 'Permanently remove user accounts and associated data',
    risk: 'high',
    dependencies: ['users.read', 'users.write'],
    grantedTo: ['admin'],
    createdAt: '2023-01-15',
    updatedAt: '2023-01-15',
  },
  {
    id: 'users.admin',
    name: 'Admin Users',
    category: 'User Management',
    description: 'Full administrative control over user accounts and permissions',
    risk: 'critical',
    dependencies: ['users.read', 'users.write', 'users.delete'],
    grantedTo: ['admin'],
    createdAt: '2023-01-15',
    updatedAt: '2023-01-15',
  },
  {
    id: 'content.read',
    name: 'View Content',
    category: 'Content Management',
    description: 'Access and view content, documents, and media files',
    risk: 'low',
    dependencies: [],
    grantedTo: ['admin', 'manager', 'lead', 'employee', 'contractor'],
    createdAt: '2023-01-15',
    updatedAt: '2023-01-15',
  },
  {
    id: 'content.write',
    name: 'Edit Content',
    category: 'Content Management',
    description: 'Create, modify, and publish content and documents',
    risk: 'medium',
    dependencies: ['content.read'],
    grantedTo: ['admin', 'manager', 'lead'],
    createdAt: '2023-01-15',
    updatedAt: '2023-03-05',
  },
  {
    id: 'content.delete',
    name: 'Delete Content',
    category: 'Content Management',
    description: 'Remove content and documents permanently from the system',
    risk: 'high',
    dependencies: ['content.read', 'content.write'],
    grantedTo: ['admin', 'manager'],
    createdAt: '2023-01-15',
    updatedAt: '2023-01-15',
  },
  {
    id: 'analytics.read',
    name: 'View Analytics',
    category: 'Analytics & Reports',
    description: 'Access analytics dashboards and view performance reports',
    risk: 'low',
    dependencies: [],
    grantedTo: ['admin', 'manager', 'lead', 'employee'],
    createdAt: '2023-01-15',
    updatedAt: '2023-01-15',
  },
  {
    id: 'analytics.write',
    name: 'Create Reports',
    category: 'Analytics & Reports',
    description: 'Generate custom reports and export analytics data',
    risk: 'medium',
    dependencies: ['analytics.read'],
    grantedTo: ['admin', 'manager'],
    createdAt: '2023-01-15',
    updatedAt: '2023-02-20',
  },
  {
    id: 'billing.read',
    name: 'View Billing',
    category: 'Billing & Finance',
    description: 'Access billing information, invoices, and payment history',
    risk: 'medium',
    dependencies: [],
    grantedTo: ['admin', 'manager'],
    createdAt: '2023-01-15',
    updatedAt: '2023-01-15',
  },
  {
    id: 'billing.write',
    name: 'Manage Billing',
    category: 'Billing & Finance',
    description: 'Process payments, manage subscriptions, and handle invoicing',
    risk: 'high',
    dependencies: ['billing.read'],
    grantedTo: ['admin'],
    createdAt: '2023-01-15',
    updatedAt: '2023-01-15',
  },
  {
    id: 'settings.read',
    name: 'View Settings',
    category: 'Settings & Configuration',
    description: 'View system settings and configuration options',
    risk: 'low',
    dependencies: [],
    grantedTo: ['admin', 'manager', 'lead', 'employee'],
    createdAt: '2023-01-15',
    updatedAt: '2023-01-15',
  },
  {
    id: 'settings.write',
    name: 'Edit Settings',
    category: 'Settings & Configuration',
    description: 'Modify system settings and configuration parameters',
    risk: 'high',
    dependencies: ['settings.read'],
    grantedTo: ['admin', 'manager'],
    createdAt: '2023-01-15',
    updatedAt: '2023-01-15',
  },
  {
    id: 'system.admin',
    name: 'System Administration',
    category: 'System Administration',
    description: 'Full system administration including database and server management',
    risk: 'critical',
    dependencies: ['settings.read', 'settings.write'],
    grantedTo: ['admin'],
    createdAt: '2023-01-15',
    updatedAt: '2023-01-15',
  },
];

// Audit log entries
const auditLog = [
  {
    id: 1,
    action: 'Permission Granted',
    permission: 'content.write',
    user: 'Bob Smith',
    role: 'Lead',
    performedBy: 'Alice Johnson',
    timestamp: '2024-01-20T10:30:00Z',
    reason: 'Promotion to team lead position',
  },
  {
    id: 2,
    action: 'Permission Revoked',
    permission: 'billing.read',
    user: 'Carol Davis',
    role: 'Employee',
    performedBy: 'Alice Johnson',
    timestamp: '2024-01-19T15:45:00Z',
    reason: 'Department transfer to Engineering',
  },
  {
    id: 3,
    action: 'Role Changed',
    permission: 'Multiple permissions updated',
    user: 'David Wilson',
    role: 'Manager → Lead',
    performedBy: 'Alice Johnson',
    timestamp: '2024-01-18T09:20:00Z',
    reason: 'Organizational restructuring',
  },
  {
    id: 4,
    action: 'Permission Granted',
    permission: 'analytics.write',
    user: 'Eva Brown',
    role: 'Manager',
    performedBy: 'Bob Smith',
    timestamp: '2024-01-17T14:15:00Z',
    reason: 'Report generation responsibilities added',
  },
];

// Users with their current permissions
const usersWithPermissions = [
  {
    id: 'USR-001',
    name: 'Alice Johnson',
    email: 'alice@company.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=40&h=40&fit=crop&crop=face',
    role: 'Administrator',
    permissions: ['users.admin', 'content.delete', 'analytics.write', 'billing.write', 'settings.write', 'system.admin'],
    lastUpdated: '2024-01-15',
  },
  {
    id: 'USR-002',
    name: 'Bob Smith',
    email: 'bob@company.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    role: 'Manager',
    permissions: ['users.write', 'content.write', 'analytics.write', 'billing.read', 'settings.write'],
    lastUpdated: '2024-01-18',
  },
  {
    id: 'USR-003',
    name: 'Carol Davis',
    email: 'carol@company.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
    role: 'Team Lead',
    permissions: ['users.read', 'content.write', 'analytics.read', 'settings.read'],
    lastUpdated: '2024-01-19',
  },
];

const getRiskColor = (risk: string) => {
  switch (risk) {
    case 'low':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'high':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
    case 'critical':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
};

const getRiskIcon = (risk: string) => {
  switch (risk) {
    case 'low':
      return CheckCircle2;
    case 'medium':
      return AlertTriangle;
    case 'high':
      return XCircle;
    case 'critical':
      return Shield;
    default:
      return Info;
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'User Management':
      return Users;
    case 'Content Management':
      return FileText;
    case 'Analytics & Reports':
      return BarChart3;
    case 'Billing & Finance':
      return DollarSign;
    case 'Settings & Configuration':
      return Settings;
    case 'System Administration':
      return Database;
    default:
      return Shield;
  }
};

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export default function PermissionsManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [riskFilter, setRiskFilter] = useState('All Risks');
  const [selectedPermission, setSelectedPermission] = useState<any>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const categories = ['All Categories', ...Array.from(new Set(permissionDefinitions.map(p => p.category)))];
  const risks = ['All Risks', 'low', 'medium', 'high', 'critical'];

  const filteredPermissions = permissionDefinitions.filter(permission => {
    const matchesSearch = permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         permission.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         permission.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All Categories' || permission.category === categoryFilter;
    const matchesRisk = riskFilter === 'All Risks' || permission.risk === riskFilter;
    
    return matchesSearch && matchesCategory && matchesRisk;
  });

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
            <BreadcrumbLink href="/dashboard/users">User Management</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbPage>Permissions</BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Permission Management</h1>
          <p className="text-muted-foreground">
            Control and audit user permissions across all system resources
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Audit Log
          </Button>
          <Button variant="outline">
            <History className="mr-2 h-4 w-4" />
            View History
          </Button>
        </div>
      </div>

      {/* Permission Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Permissions</p>
                <p className="text-2xl font-bold">{permissionDefinitions.length}</p>
              </div>
              <Shield className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">High Risk</p>
                <p className="text-2xl font-bold text-red-600">
                  {permissionDefinitions.filter(p => p.risk === 'high' || p.risk === 'critical').length}
                </p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Categories</p>
                <p className="text-2xl font-bold">{categories.length - 1}</p>
              </div>
              <Database className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Recent Changes</p>
                <p className="text-2xl font-bold text-blue-600">{auditLog.length}</p>
              </div>
              <History className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="permissions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="permissions">All Permissions</TabsTrigger>
          <TabsTrigger value="users">User Permissions</TabsTrigger>
          <TabsTrigger value="audit">Audit Log</TabsTrigger>
        </TabsList>

        <TabsContent value="permissions" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-wrap items-center gap-4">
                <div className="relative flex-1 min-w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search permissions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={riskFilter} onValueChange={setRiskFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {risks.map((risk) => (
                      <SelectItem key={risk} value={risk}>
                        {risk === 'All Risks' ? risk : risk.charAt(0).toUpperCase() + risk.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Permissions Table */}
          <Card>
            <CardHeader>
              <CardTitle>Permission Registry</CardTitle>
              <CardDescription>
                Complete list of all system permissions ({filteredPermissions.length} of {permissionDefinitions.length} permissions shown)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Permission</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Risk Level</TableHead>
                      <TableHead>Granted To</TableHead>
                      <TableHead>Dependencies</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPermissions.map((permission, index) => {
                      const CategoryIcon = getCategoryIcon(permission.category);
                      const RiskIcon = getRiskIcon(permission.risk);
                      
                      return (
                        <motion.tr
                          key={permission.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.02 }}
                        >
                          <TableCell>
                            <div>
                              <div className="font-medium">{permission.name}</div>
                              <div className="text-sm text-muted-foreground">{permission.id}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <CategoryIcon className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{permission.category}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <RiskIcon className="h-4 w-4" />
                              <Badge className={getRiskColor(permission.risk)}>
                                {permission.risk.charAt(0).toUpperCase() + permission.risk.slice(1)}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {permission.grantedTo.slice(0, 2).map((role) => (
                                <Badge key={role} variant="outline" className="text-xs">
                                  {role}
                                </Badge>
                              ))}
                              {permission.grantedTo.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{permission.grantedTo.length - 2}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {permission.dependencies.slice(0, 2).map((dep) => (
                                <Badge key={dep} variant="secondary" className="text-xs">
                                  {dep.split('.')[1]}
                                </Badge>
                              ))}
                              {permission.dependencies.length > 2 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{permission.dependencies.length - 2}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {permission.updatedAt}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedPermission(permission)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </motion.tr>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Permission Matrix</CardTitle>
              <CardDescription>
                View and manage permissions for individual users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {usersWithPermissions.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                        <div className="text-xs text-muted-foreground">
                          {user.role} • Last updated: {user.lastUpdated}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {user.permissions.length} permissions
                        </div>
                        <div className="flex space-x-1 mt-1">
                          {user.permissions.slice(0, 3).map((perm) => (
                            <Badge key={perm} variant="outline" className="text-xs">
                              {perm.split('.')[1]}
                            </Badge>
                          ))}
                          {user.permissions.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{user.permissions.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedUser(user)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Permission Audit Log</CardTitle>
              <CardDescription>
                Track all permission changes and administrative actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Action</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Permission/Role</TableHead>
                      <TableHead>Performed By</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Reason</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditLog.map((entry, index) => (
                      <motion.tr
                        key={entry.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <TableCell>
                          <Badge 
                            variant={
                              entry.action === 'Permission Granted' ? 'default' :
                              entry.action === 'Permission Revoked' ? 'destructive' : 'secondary'
                            }
                          >
                            {entry.action}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{entry.user}</div>
                            <div className="text-sm text-muted-foreground">{entry.role}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <code className="text-sm bg-muted px-2 py-1 rounded">
                            {entry.permission}
                          </code>
                        </TableCell>
                        <TableCell>{entry.performedBy}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatTimestamp(entry.timestamp)}
                        </TableCell>
                        <TableCell className="text-sm">{entry.reason}</TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Permission Details Dialog */}
      <Dialog open={!!selectedPermission} onOpenChange={() => setSelectedPermission(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedPermission?.name}</DialogTitle>
            <DialogDescription>
              Detailed information about this permission
            </DialogDescription>
          </DialogHeader>
          
          {selectedPermission && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label className="text-sm font-medium">Permission ID</Label>
                  <code className="block text-sm bg-muted p-2 rounded mt-1">
                    {selectedPermission.id}
                  </code>
                </div>
                <div>
                  <Label className="text-sm font-medium">Risk Level</Label>
                  <div className="mt-1">
                    <Badge className={getRiskColor(selectedPermission.risk)}>
                      {selectedPermission.risk.charAt(0).toUpperCase() + selectedPermission.risk.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Description</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedPermission.description}
                </p>
              </div>

              <div>
                <Label className="text-sm font-medium">Currently Granted To</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedPermission.grantedTo.map((role: string) => (
                    <Badge key={role} variant="outline">
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>

              {selectedPermission.dependencies.length > 0 && (
                <div>
                  <Label className="text-sm font-medium">Dependencies</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedPermission.dependencies.map((dep: string) => (
                      <Badge key={dep} variant="secondary">
                        {dep}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label className="text-sm font-medium">Created</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedPermission.createdAt}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Last Updated</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedPermission.updatedAt}
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setSelectedPermission(null)}>
                  Close
                </Button>
                <Button>
                  Manage Access
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* User Permissions Dialog */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedUser?.name} - Permissions</DialogTitle>
            <DialogDescription>
              Manage permissions for this user
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                  <AvatarFallback>
                    {selectedUser.name.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{selectedUser.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                  <Badge variant="outline">{selectedUser.role}</Badge>
                </div>
              </div>

              <div>
                <Label className="text-base font-medium">Current Permissions</Label>
                <div className="space-y-3 mt-3">
                  {permissionDefinitions
                    .filter(perm => selectedUser.permissions.includes(perm.id))
                    .map((permission) => {
                      const CategoryIcon = getCategoryIcon(permission.category);
                      const RiskIcon = getRiskIcon(permission.risk);
                      
                      return (
                        <div key={permission.id} className="flex items-center justify-between p-3 border rounded">
                          <div className="flex items-center space-x-3">
                            <CategoryIcon className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <div className="font-medium text-sm">{permission.name}</div>
                              <div className="text-xs text-muted-foreground">{permission.id}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getRiskColor(permission.risk)}>
                              {permission.risk}
                            </Badge>
                            <Switch defaultChecked />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setSelectedUser(null)}>
                  Cancel
                </Button>
                <Button>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Info Alert */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Permission changes are logged and audited. High-risk and critical permissions require additional approval. 
          Users automatically inherit permissions from their assigned roles.
        </AlertDescription>
      </Alert>
    </div>
  );
} 