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
import { Label } from '@/components/ui/label';

// Import extracted data and utilities
import {
  permissionDefinitions,
  auditLog,
  usersWithPermissions,
  permissionCategories,
  permissionRisks,
  permissionStats,
} from '@/data/permissions.data';
import {
  getRiskColor,
  getRiskIcon,
  getCategoryIcon,
  formatTimestamp,
  filterPermissions,
} from '@/utils/permissions.util';
// Data is now imported from external files for better organization

export default function PermissionsManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [riskFilter, setRiskFilter] = useState('All Risks');
  const [selectedPermission, setSelectedPermission] = useState<any>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const filteredPermissions = filterPermissions(
    permissionDefinitions,
    searchTerm,
    categoryFilter,
    riskFilter
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
            <BreadcrumbLink href="/dashboard/users">
              User Management
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbPage>Permissions</BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Permission Management
          </h1>
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
                <p className="text-muted-foreground text-sm font-medium">
                  Total Permissions
                </p>
                <p className="text-2xl font-bold">
                  {permissionDefinitions.length}
                </p>
              </div>
              <Shield className="text-muted-foreground h-8 w-8" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  High Risk
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {
                    permissionDefinitions.filter(
                      (p) => p.risk === 'high' || p.risk === 'critical'
                    ).length
                  }
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
                <p className="text-muted-foreground text-sm font-medium">
                  Categories
                </p>
                <p className="text-2xl font-bold">
                  {permissionStats.totalCategories}
                </p>
              </div>
              <Shield className="text-muted-foreground h-8 w-8" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Recent Changes
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {auditLog.length}
                </p>
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
                <div className="relative min-w-64 flex-1">
                  <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                  <Input
                    placeholder="Search permissions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {permissionCategories.map((category) => (
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
                    {permissionRisks.map((risk) => (
                      <SelectItem key={risk} value={risk}>
                        {risk === 'All Risks'
                          ? risk
                          : risk.charAt(0).toUpperCase() + risk.slice(1)}
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
                Complete list of all system permissions (
                {filteredPermissions.length} of {permissionDefinitions.length}{' '}
                permissions shown)
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
                              <div className="font-medium">
                                {permission.name}
                              </div>
                              <div className="text-muted-foreground text-sm">
                                {permission.id}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <CategoryIcon className="text-muted-foreground h-4 w-4" />
                              <span className="text-sm">
                                {permission.category}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <RiskIcon className="h-4 w-4" />
                              <Badge className={getRiskColor(permission.risk)}>
                                {permission.risk.charAt(0).toUpperCase() +
                                  permission.risk.slice(1)}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {permission.grantedTo
                                .slice(0, 2)
                                .map((role: string) => (
                                  <Badge
                                    key={role}
                                    variant="outline"
                                    className="text-xs"
                                  >
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
                              {permission.dependencies
                                .slice(0, 2)
                                .map((dep: string) => (
                                  <Badge
                                    key={dep}
                                    variant="secondary"
                                    className="text-xs"
                                  >
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
                          <TableCell className="text-muted-foreground text-sm">
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
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-muted-foreground text-sm">
                          {user.email}
                        </div>
                        <div className="text-muted-foreground text-xs">
                          {user.role} • Last updated: {user.lastUpdated}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {user.permissions.length} permissions
                        </div>
                        <div className="mt-1 flex space-x-1">
                          {user.permissions.slice(0, 3).map((perm) => (
                            <Badge
                              key={perm}
                              variant="outline"
                              className="text-xs"
                            >
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
                            className="text-xs"
                            variant={
                              entry.action === 'Permission Granted'
                                ? 'default'
                                : entry.action === 'Permission Revoked'
                                  ? 'destructive'
                                  : 'secondary'
                            }
                          >
                            {entry.action}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{entry.user}</div>
                            <div className="text-muted-foreground text-sm">
                              {entry.role}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <code className="bg-muted rounded px-2 py-1 text-sm">
                            {entry.permission}
                          </code>
                        </TableCell>
                        <TableCell>{entry.performedBy}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {formatTimestamp(entry.timestamp)}
                        </TableCell>
                        <TableCell className="text-sm">
                          {entry.reason}
                        </TableCell>
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
      <Dialog
        open={!!selectedPermission}
        onOpenChange={() => setSelectedPermission(null)}
      >
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
                  <code className="bg-muted mt-1 block rounded p-2 text-sm">
                    {selectedPermission.id}
                  </code>
                </div>
                <div>
                  <Label className="text-sm font-medium">Risk Level</Label>
                  <div className="mt-1">
                    <Badge className={getRiskColor(selectedPermission.risk)}>
                      {selectedPermission.risk.charAt(0).toUpperCase() +
                        selectedPermission.risk.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Description</Label>
                <p className="text-muted-foreground mt-1 text-sm">
                  {selectedPermission.description}
                </p>
              </div>

              <div>
                <Label className="text-sm font-medium">
                  Currently Granted To
                </Label>
                <div className="mt-2 flex flex-wrap gap-2">
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
                  <div className="mt-2 flex flex-wrap gap-2">
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
                  <p className="text-muted-foreground mt-1 text-sm">
                    {selectedPermission.createdAt}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Last Updated</Label>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {selectedPermission.updatedAt}
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setSelectedPermission(null)}
                >
                  Close
                </Button>
                <Button>Manage Access</Button>
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
                  <AvatarImage
                    src={selectedUser.avatar}
                    alt={selectedUser.name}
                  />
                  <AvatarFallback>
                    {selectedUser.name
                      .split(' ')
                      .map((n: string) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{selectedUser.name}</h3>
                  <p className="text-muted-foreground text-sm">
                    {selectedUser.email}
                  </p>
                  <Badge variant="outline">{selectedUser.role}</Badge>
                </div>
              </div>

              <div>
                <Label className="text-base font-medium">
                  Current Permissions
                </Label>
                <div className="mt-3 space-y-3">
                  {permissionDefinitions
                    .filter((perm) =>
                      selectedUser.permissions.includes(perm.id)
                    )
                    .map((permission) => {
                      const CategoryIcon = getCategoryIcon(permission.category);
                      const RiskIcon = getRiskIcon(permission.risk);

                      return (
                        <div
                          key={permission.id}
                          className="flex items-center justify-between rounded border p-3"
                        >
                          <div className="flex items-center space-x-3">
                            <CategoryIcon className="text-muted-foreground h-4 w-4" />
                            <div>
                              <div className="text-sm font-medium">
                                {permission.name}
                              </div>
                              <div className="text-muted-foreground text-xs">
                                {permission.id}
                              </div>
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
                <Button>Save Changes</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Info Alert */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Permission changes are logged and audited. High-risk and critical
          permissions require additional approval. Users automatically inherit
          permissions from their assigned roles.
        </AlertDescription>
      </Alert>
    </div>
  );
}
