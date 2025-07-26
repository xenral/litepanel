import {
  Users,
  FileText,
  BarChart3,
  DollarSign,
  Settings,
  Database,
} from 'lucide-react';

// Role definitions
export const rolesData = [
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

// Permission categories for role management
export const permissionCategories = [
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

// Users assigned to roles
export const usersInRoles = [
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

// Role color options
export const roleColorOptions = [
  { value: 'bg-red-500', label: 'Red' },
  { value: 'bg-blue-500', label: 'Blue' },
  { value: 'bg-green-500', label: 'Green' },
  { value: 'bg-yellow-500', label: 'Yellow' },
  { value: 'bg-purple-500', label: 'Purple' },
  { value: 'bg-orange-500', label: 'Orange' },
  { value: 'bg-pink-500', label: 'Pink' },
  { value: 'bg-gray-500', label: 'Gray' },
]; 