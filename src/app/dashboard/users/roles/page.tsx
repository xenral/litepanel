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
import { Textarea } from '@/components/ui/textarea';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
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
  Crown,
  Users,
  Plus,
  Edit,
  Trash2,
  Settings,
  Eye,
  Lock,
  Unlock,
  UserCheck,
  UserX,
  Database,
  FileText,
  Mail,
  BarChart3,
  DollarSign,
  Calendar,
  Download,
  Upload,
  MoreHorizontal,
  CheckCircle2,
  AlertTriangle,
  Info,
  Search,
} from 'lucide-react';

// Mock roles data
const rolesData = [
  {
    id: 'admin',
    name: 'Administrator',
    description: 'Full system access with all administrative privileges',
    color: 'bg-red-500',
    userCount: 3,
    isSystem: true,
    createdAt: '2023-01-15',
    permissions: [
      'users.read', 'users.write', 'users.delete', 'users.admin',
      'content.read', 'content.write', 'content.delete', 'content.admin',
      'analytics.read', 'analytics.write', 'analytics.admin',
      'billing.read', 'billing.write', 'billing.admin',
      'settings.read', 'settings.write', 'settings.admin',
      'system.read', 'system.write', 'system.admin'
    ],
  },
  {
    id: 'manager',
    name: 'Manager',
    description: 'Team management with limited administrative access',
    color: 'bg-blue-500',
    userCount: 8,
    isSystem: false,
    createdAt: '2023-02-10',
    permissions: [
      'users.read', 'users.write',
      'content.read', 'content.write', 'content.admin',
      'analytics.read', 'analytics.write',
      'billing.read',
      'settings.read', 'settings.write',
    ],
  },
  {
    id: 'lead',
    name: 'Team Lead',
    description: 'Lead team members with project management capabilities',
    color: 'bg-green-500',
    userCount: 15,
    isSystem: false,
    createdAt: '2023-03-05',
    permissions: [
      'users.read',
      'content.read', 'content.write',
      'analytics.read',
      'settings.read',
    ],
  },
  {
    id: 'employee',
    name: 'Employee',
    description: 'Standard user access for regular team members',
    color: 'bg-gray-500',
    userCount: 156,
    isSystem: true,
    createdAt: '2023-01-15',
    permissions: [
      'content.read',
      'analytics.read',
      'settings.read',
    ],
  },
  {
    id: 'contractor',
    name: 'Contractor',
    description: 'Limited access for external contractors and freelancers',
    color: 'bg-orange-500',
    userCount: 12,
    isSystem: false,
    createdAt: '2023-04-20',
    permissions: [
      'content.read',
      'settings.read',
    ],
  },
];

// Permissions grouped by category
const permissionCategories = [
  {
    id: 'users',
    name: 'User Management',
    icon: Users,
    permissions: [
      { id: 'users.read', name: 'View Users', description: 'View user profiles and information' },
      { id: 'users.write', name: 'Edit Users', description: 'Create and modify user accounts' },
      { id: 'users.delete', name: 'Delete Users', description: 'Remove user accounts' },
      { id: 'users.admin', name: 'Admin Users', description: 'Full user administration access' },
    ],
  },
  {
    id: 'content',
    name: 'Content Management',
    icon: FileText,
    permissions: [
      { id: 'content.read', name: 'View Content', description: 'View content and documents' },
      { id: 'content.write', name: 'Edit Content', description: 'Create and modify content' },
      { id: 'content.delete', name: 'Delete Content', description: 'Remove content and documents' },
      { id: 'content.admin', name: 'Admin Content', description: 'Full content administration' },
    ],
  },
  {
    id: 'analytics',
    name: 'Analytics & Reports',
    icon: BarChart3,
    permissions: [
      { id: 'analytics.read', name: 'View Analytics', description: 'View reports and analytics' },
      { id: 'analytics.write', name: 'Create Reports', description: 'Generate custom reports' },
      { id: 'analytics.admin', name: 'Admin Analytics', description: 'Full analytics administration' },
    ],
  },
  {
    id: 'billing',
    name: 'Billing & Finance',
    icon: DollarSign,
    permissions: [
      { id: 'billing.read', name: 'View Billing', description: 'View billing and financial data' },
      { id: 'billing.write', name: 'Manage Billing', description: 'Process payments and invoices' },
      { id: 'billing.admin', name: 'Admin Billing', description: 'Full billing administration' },
    ],
  },
  {
    id: 'settings',
    name: 'Settings & Configuration',
    icon: Settings,
    permissions: [
      { id: 'settings.read', name: 'View Settings', description: 'View system settings' },
      { id: 'settings.write', name: 'Edit Settings', description: 'Modify system configuration' },
      { id: 'settings.admin', name: 'Admin Settings', description: 'Full settings administration' },
    ],
  },
  {
    id: 'system',
    name: 'System Administration',
    icon: Database,
    permissions: [
      { id: 'system.read', name: 'View System', description: 'View system status and logs' },
      { id: 'system.write', name: 'System Config', description: 'Modify system configuration' },
      { id: 'system.admin', name: 'Admin System', description: 'Full system administration' },
    ],
  },
];

const usersInRoles = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@company.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=40&h=40&fit=crop&crop=face',
    role: 'admin',
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@company.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    role: 'manager',
  },
  {
    id: 3,
    name: 'Carol Davis',
    email: 'carol@company.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
    role: 'lead',
  },
];

export default function RolesManagementPage() {
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingRole, setEditingRole] = useState<any>(null);
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    color: 'bg-blue-500',
    permissions: [] as string[],
  });

  const filteredRoles = rolesData.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePermissionToggle = (permissionId: string, isNewRole = false) => {
    if (isNewRole) {
      setNewRole(prev => ({
        ...prev,
        permissions: prev.permissions.includes(permissionId)
          ? prev.permissions.filter(p => p !== permissionId)
          : [...prev.permissions, permissionId]
      }));
    } else if (editingRole) {
      setEditingRole((prev: any) => ({
        ...prev,
        permissions: prev.permissions.includes(permissionId)
          ? prev.permissions.filter((p: string) => p !== permissionId)
          : [...prev.permissions, permissionId]
      }));
    }
  };

  const openEditDialog = (role: any) => {
    setEditingRole({ ...role });
    setIsEditDialogOpen(true);
  };

  const resetNewRole = () => {
    setNewRole({
      name: '',
      description: '',
      color: 'bg-blue-500',
      permissions: [],
    });
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
            <BreadcrumbLink href="/dashboard/users">User Management</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbPage>Roles</BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Role Management</h1>
          <p className="text-muted-foreground">
            Define roles and manage permissions for your team members
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Roles
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetNewRole}>
                <Plus className="mr-2 h-4 w-4" />
                Create Role
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Role</DialogTitle>
                <DialogDescription>
                  Define a new role with specific permissions and access levels.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="role-name">Role Name</Label>
                    <Input
                      id="role-name"
                      placeholder="Enter role name"
                      value={newRole.name}
                      onChange={(e) => setNewRole(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role-color">Role Color</Label>
                    <Select 
                      value={newRole.color} 
                      onValueChange={(value) => setNewRole(prev => ({ ...prev, color: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bg-red-500">Red</SelectItem>
                        <SelectItem value="bg-blue-500">Blue</SelectItem>
                        <SelectItem value="bg-green-500">Green</SelectItem>
                        <SelectItem value="bg-yellow-500">Yellow</SelectItem>
                        <SelectItem value="bg-purple-500">Purple</SelectItem>
                        <SelectItem value="bg-orange-500">Orange</SelectItem>
                        <SelectItem value="bg-pink-500">Pink</SelectItem>
                        <SelectItem value="bg-gray-500">Gray</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role-description">Description</Label>
                  <Textarea
                    id="role-description"
                    placeholder="Describe the role and its responsibilities"
                    value={newRole.description}
                    onChange={(e) => setNewRole(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">Permissions</Label>
                    <div className="text-sm text-muted-foreground">
                      {newRole.permissions.length} permission{newRole.permissions.length !== 1 ? 's' : ''} selected
                    </div>
                  </div>
                  
                  {permissionCategories.map((category, categoryIndex) => {
                    const Icon = category.icon;
                    const categoryPermissions = category.permissions.filter(p => 
                      newRole.permissions.includes(p.id)
                    );
                    
                    return (
                      <motion.div
                        key={category.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: categoryIndex * 0.05 }}
                        className="border rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <Icon className="h-5 w-5 text-muted-foreground" />
                            <span className="font-medium">{category.name}</span>
                          </div>
                          <Badge variant="outline">
                            {categoryPermissions.length}/{category.permissions.length}
                          </Badge>
                        </div>
                        
                        <div className="grid gap-3 md:grid-cols-2">
                          {category.permissions.map((permission) => (
                            <div key={permission.id} className="flex items-start space-x-3">
                              <Checkbox
                                id={permission.id}
                                checked={newRole.permissions.includes(permission.id)}
                                onCheckedChange={() => handlePermissionToggle(permission.id, true)}
                              />
                              <div className="flex-1">
                                <Label htmlFor={permission.id} className="cursor-pointer font-medium">
                                  {permission.name}
                                </Label>
                                <p className="text-xs text-muted-foreground">
                                  {permission.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={() => setIsCreateDialogOpen(false)}
                  disabled={!newRole.name.trim()}
                >
                  Create Role
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search roles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              {filteredRoles.length} of {rolesData.length} roles
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Roles Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredRoles.map((role, index) => (
          <motion.div
            key={role.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${role.color}`} />
                    <div>
                      <CardTitle className="text-lg">{role.name}</CardTitle>
                      {role.isSystem && (
                        <Badge variant="outline" className="text-xs mt-1">
                          System Role
                        </Badge>
                      )}
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => setSelectedRole(role)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => openEditDialog(role)} disabled={role.isSystem}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Role
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Users className="mr-2 h-4 w-4" />
                        Manage Users
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-red-600" 
                        disabled={role.isSystem || role.userCount > 0}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Role
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription className="text-sm">
                  {role.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Users with this role</span>
                    <span className="font-medium">{role.userCount}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Permissions</span>
                    <span className="font-medium">{role.permissions.length}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Created</span>
                    <span className="font-medium">{role.createdAt}</span>
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => setSelectedRole(role)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => openEditDialog(role)}
                      disabled={role.isSystem}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Role Details Dialog */}
      <Dialog open={!!selectedRole} onOpenChange={() => setSelectedRole(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <div className={`w-4 h-4 rounded-full ${selectedRole?.color}`} />
              <span>{selectedRole?.name}</span>
              {selectedRole?.isSystem && (
                <Badge variant="outline">System Role</Badge>
              )}
            </DialogTitle>
            <DialogDescription>
              {selectedRole?.description}
            </DialogDescription>
          </DialogHeader>
          
          {selectedRole && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">{selectedRole.userCount}</div>
                  <div className="text-sm text-muted-foreground">Users</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">{selectedRole.permissions.length}</div>
                  <div className="text-sm text-muted-foreground">Permissions</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">{selectedRole.createdAt}</div>
                  <div className="text-sm text-muted-foreground">Created</div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Permissions</h4>
                <div className="space-y-4">
                  {permissionCategories.map((category) => {
                    const categoryPermissions = category.permissions.filter(p => 
                      selectedRole.permissions.includes(p.id)
                    );
                    
                    if (categoryPermissions.length === 0) return null;
                    
                    const Icon = category.icon;
                    
                    return (
                      <div key={category.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <Icon className="h-5 w-5 text-muted-foreground" />
                            <span className="font-medium">{category.name}</span>
                          </div>
                          <Badge variant="outline">
                            {categoryPermissions.length}/{category.permissions.length}
                          </Badge>
                        </div>
                        
                        <div className="grid gap-2 md:grid-cols-2">
                          {categoryPermissions.map((permission) => (
                            <div key={permission.id} className="flex items-center space-x-2">
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                              <span className="text-sm">{permission.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Users with this Role</h4>
                <div className="space-y-2">
                  {usersInRoles
                    .filter(user => user.role === selectedRole.id)
                    .map((user) => (
                      <div key={user.id} className="flex items-center space-x-3 p-3 border rounded">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{user.name}</div>
                          <div className="text-xs text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    ))}
                  {usersInRoles.filter(user => user.role === selectedRole.id).length === 0 && (
                    <div className="text-center py-4 text-muted-foreground">
                      No users assigned to this role
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setSelectedRole(null)}>
                  Close
                </Button>
                <Button onClick={() => {
                  setSelectedRole(null);
                  openEditDialog(selectedRole);
                }} disabled={selectedRole.isSystem}>
                  Edit Role
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Role</DialogTitle>
            <DialogDescription>
              Modify role details and permissions.
            </DialogDescription>
          </DialogHeader>
          
          {editingRole && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="edit-role-name">Role Name</Label>
                  <Input
                    id="edit-role-name"
                    value={editingRole.name}
                    onChange={(e) => setEditingRole((prev: any) => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-role-color">Role Color</Label>
                  <Select 
                    value={editingRole.color} 
                    onValueChange={(value) => setEditingRole((prev: any) => ({ ...prev, color: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bg-red-500">Red</SelectItem>
                      <SelectItem value="bg-blue-500">Blue</SelectItem>
                      <SelectItem value="bg-green-500">Green</SelectItem>
                      <SelectItem value="bg-yellow-500">Yellow</SelectItem>
                      <SelectItem value="bg-purple-500">Purple</SelectItem>
                      <SelectItem value="bg-orange-500">Orange</SelectItem>
                      <SelectItem value="bg-pink-500">Pink</SelectItem>
                      <SelectItem value="bg-gray-500">Gray</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-role-description">Description</Label>
                <Textarea
                  id="edit-role-description"
                  value={editingRole.description}
                  onChange={(e) => setEditingRole((prev: any) => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">Permissions</Label>
                  <div className="text-sm text-muted-foreground">
                    {editingRole.permissions.length} permission{editingRole.permissions.length !== 1 ? 's' : ''} selected
                  </div>
                </div>
                
                {permissionCategories.map((category) => {
                  const Icon = category.icon;
                  const categoryPermissions = category.permissions.filter((p: any) => 
                    editingRole.permissions.includes(p.id)
                  );
                  
                  return (
                    <div key={category.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Icon className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <Badge variant="outline">
                          {categoryPermissions.length}/{category.permissions.length}
                        </Badge>
                      </div>
                      
                      <div className="grid gap-3 md:grid-cols-2">
                        {category.permissions.map((permission) => (
                          <div key={permission.id} className="flex items-start space-x-3">
                            <Checkbox
                              id={`edit-${permission.id}`}
                              checked={editingRole.permissions.includes(permission.id)}
                              onCheckedChange={() => handlePermissionToggle(permission.id, false)}
                            />
                            <div className="flex-1">
                              <Label htmlFor={`edit-${permission.id}`} className="cursor-pointer font-medium">
                                {permission.name}
                              </Label>
                              <p className="text-xs text-muted-foreground">
                                {permission.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsEditDialogOpen(false)}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Info Alert */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          System roles (Administrator and Employee) cannot be deleted or have their core permissions modified. 
          Custom roles can be fully customized to meet your organization's needs.
        </AlertDescription>
      </Alert>
    </div>
  );
} 