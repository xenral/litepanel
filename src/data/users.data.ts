import {
  Crown,
  Shield,
  Settings,
  User,
  CheckCircle2,
  XCircle,
  Clock,
  Ban,
  AlertTriangle,
} from 'lucide-react';

export interface UserData {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  department: string;
  status: string;
  lastLogin: string | null;
  joinDate: string;
  location: string;
  phone: string;
  plan: string;
  permissions: string[];
  projects: number;
  tasksCompleted: number;
  performance: number;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  pendingUsers: number;
  suspendedUsers: number;
  adminUsers: number;
  newThisWeek: number;
  newThisMonth: number;
  avgPerformance: number;
}

export const departments = [
  'All Departments',
  'Engineering',
  'Marketing',
  'Sales',
  'HR',
  'Finance',
  'Operations',
];

export const roles = ['All Roles', 'Admin', 'Manager', 'Lead', 'Employee'];

export const statuses = [
  'All Status',
  'Active',
  'Inactive',
  'Pending',
  'Suspended',
];

export const usersData: UserData[] = [
  {
    id: 'USR-001',
    name: 'Alice Johnson',
    email: 'alice.johnson@company.com',
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=64&h=64&fit=crop&crop=face',
    role: 'Admin',
    department: 'Engineering',
    status: 'Active',
    lastLogin: '2024-01-20T10:30:00Z',
    joinDate: '2023-03-15',
    location: 'San Francisco, CA',
    phone: '+1 (555) 123-4567',
    plan: 'Enterprise',
    permissions: ['read', 'write', 'admin'],
    projects: 12,
    tasksCompleted: 87,
    performance: 94,
  },
  {
    id: 'USR-002',
    name: 'Bob Smith',
    email: 'bob.smith@company.com',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
    role: 'Manager',
    department: 'Marketing',
    status: 'Active',
    lastLogin: '2024-01-19T14:22:00Z',
    joinDate: '2023-01-20',
    location: 'New York, NY',
    phone: '+1 (555) 234-5678',
    plan: 'Pro',
    permissions: ['read', 'write'],
    projects: 8,
    tasksCompleted: 45,
    performance: 88,
  },
  {
    id: 'USR-003',
    name: 'Carol Davis',
    email: 'carol.davis@company.com',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face',
    role: 'Employee',
    department: 'Sales',
    status: 'Inactive',
    lastLogin: '2024-01-10T09:15:00Z',
    joinDate: '2022-07-10',
    location: 'Austin, TX',
    phone: '+1 (555) 345-6789',
    plan: 'Basic',
    permissions: ['read'],
    projects: 15,
    tasksCompleted: 156,
    performance: 76,
  },
  {
    id: 'USR-004',
    name: 'David Wilson',
    email: 'david.wilson@company.com',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
    role: 'Lead',
    department: 'Engineering',
    status: 'Active',
    lastLogin: '2024-01-20T08:45:00Z',
    joinDate: '2022-01-05',
    location: 'Seattle, WA',
    phone: '+1 (555) 456-7890',
    plan: 'Pro',
    permissions: ['read', 'write', 'lead'],
    projects: 18,
    tasksCompleted: 203,
    performance: 96,
  },
  {
    id: 'USR-005',
    name: 'Eva Brown',
    email: 'eva.brown@company.com',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=64&h=64&fit=crop&crop=face',
    role: 'Employee',
    department: 'HR',
    status: 'Pending',
    lastLogin: null,
    joinDate: '2024-01-18',
    location: 'Los Angeles, CA',
    phone: '+1 (555) 567-8901',
    plan: 'Basic',
    permissions: ['read'],
    projects: 2,
    tasksCompleted: 8,
    performance: 0,
  },
  {
    id: 'USR-006',
    name: 'Frank Miller',
    email: 'frank.miller@company.com',
    avatar:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=64&h=64&fit=crop&crop=face',
    role: 'Employee',
    department: 'Finance',
    status: 'Suspended',
    lastLogin: '2024-01-05T16:30:00Z',
    joinDate: '2023-09-12',
    location: 'Chicago, IL',
    phone: '+1 (555) 678-9012',
    plan: 'Basic',
    permissions: [],
    projects: 5,
    tasksCompleted: 34,
    performance: 45,
  },
];

export const userStats: UserStats = {
  totalUsers: 1247,
  activeUsers: 1156,
  pendingUsers: 45,
  suspendedUsers: 46,
  adminUsers: 12,
  newThisWeek: 23,
  newThisMonth: 89,
  avgPerformance: 87.2,
};

// Icon mappings using Maps for better performance
export const roleIconMap = new Map([
  ['Admin', Crown],
  ['Manager', Shield],
  ['Lead', Settings],
  ['Employee', User],
]);

export const statusColorMap = new Map([
  ['Active', 'default'],
  ['Inactive', 'secondary'],
  ['Pending', 'outline'],
  ['Suspended', 'destructive'],
]) as Map<string, string>;

export const statusIconMap = new Map([
  ['Active', CheckCircle2],
  ['Inactive', XCircle],
  ['Pending', Clock],
  ['Suspended', Ban],
]);
