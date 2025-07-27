import {
  Users,
  FileText,
  BarChart3,
  DollarSign,
  Settings,
  Database,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Shield,
  Info,
} from 'lucide-react';

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface PermissionCategory {
  id: string;
  name: string;
  icon: any;
  permissions: Permission[];
}

export interface PermissionDefinition {
  id: string;
  name: string;
  category: string;
  description: string;
  risk: 'low' | 'medium' | 'high' | 'critical';
  dependencies: string[];
  grantedTo: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AuditLogEntry {
  id: number;
  action: string;
  permission: string;
  user: string;
  role: string;
  performedBy: string;
  timestamp: string;
  reason: string;
}

export interface UserWithPermissions {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  permissions: string[];
  lastUpdated: string;
}

// Permission definitions with detailed information
export const permissionDefinitions = [
  {
    id: 'users.read',
    name: 'View Users',
    category: 'User Management',
    description:
      'View user profiles, contact information, and basic account details',
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
    description:
      'Create, modify, and update user accounts and profile information',
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
    description:
      'Full administrative control over user accounts and permissions',
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
    description:
      'Full system administration including database and server management',
    risk: 'critical',
    dependencies: ['settings.read', 'settings.write'],
    grantedTo: ['admin'],
    createdAt: '2023-01-15',
    updatedAt: '2023-01-15',
  },
];

// Audit log entries
export const auditLog = [
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
export const usersWithPermissions = [
  {
    id: 'USR-001',
    name: 'Alice Johnson',
    email: 'alice@company.com',
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=40&h=40&fit=crop&crop=face',
    role: 'Administrator',
    permissions: [
      'users.admin',
      'content.delete',
      'analytics.write',
      'billing.write',
      'settings.write',
      'system.admin',
    ],
    lastUpdated: '2024-01-15',
  },
  {
    id: 'USR-002',
    name: 'Bob Smith',
    email: 'bob@company.com',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    role: 'Manager',
    permissions: [
      'users.write',
      'content.write',
      'analytics.write',
      'billing.read',
      'settings.write',
    ],
    lastUpdated: '2024-01-18',
  },
  {
    id: 'USR-003',
    name: 'Carol Davis',
    email: 'carol@company.com',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
    role: 'Team Lead',
    permissions: [
      'users.read',
      'content.write',
      'analytics.read',
      'settings.read',
    ],
    lastUpdated: '2024-01-19',
  },
];

// Permission categories with stats
export const permissionCategories = [
  'All Categories',
  'User Management',
  'Content Management',
  'Analytics & Reports',
  'Billing & Finance',
  'Settings & Configuration',
  'System Administration',
];
export const permissionRisks = [
  'All Risks',
  'low',
  'medium',
  'high',
  'critical',
];

// Permission stats
export const permissionStats = {
  totalPermissions: permissionDefinitions.length,
  highRiskPermissions: permissionDefinitions.filter(
    (p) => p.risk === 'high' || p.risk === 'critical'
  ).length,
  totalCategories: permissionCategories.length - 1,
  recentChanges: auditLog.length,
};

// Risk and icon mappings using Maps
export const riskColorMap = new Map([
  ['low', 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'],
  [
    'medium',
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  ],
  [
    'high',
    'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  ],
  ['critical', 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'],
]);

export const riskIconMap = new Map([
  ['low', CheckCircle2],
  ['medium', AlertTriangle],
  ['high', XCircle],
  ['critical', Shield],
]);

export const categoryIconMap = new Map([
  ['User Management', Users],
  ['Content Management', FileText],
  ['Analytics & Reports', BarChart3],
  ['Billing & Finance', DollarSign],
  ['Settings & Configuration', Settings],
  ['System Administration', Database],
]);
