import {
  Users,
  UserPlus,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Shield,
  Crown,
  Edit,
  Eye,
} from 'lucide-react';

export interface DataUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  status: 'Active' | 'Inactive' | 'Pending';
  lastLogin: string | null;
  joinDate: string;
  location: string;
  phone: string;
  department: string;
  plan: string;
}

export interface DataUserStats {
  totalUsers: number;
  activeUsers: number;
  pendingUsers: number;
  inactiveUsers: number;
  adminUsers: number;
  newThisMonth: number;
}

export const departments = [
  'Engineering',
  'Marketing',
  'Sales',
  'Human Resources',
  'Finance'
];

export const roles = [
  'Admin',
  'Editor',
  'Viewer'
];

export const userData: DataUser[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=64&h=64&fit=crop&crop=face',
    role: 'Admin',
    status: 'Active',
    lastLogin: '2024-01-20T10:30:00Z',
    joinDate: '2023-03-15',
    location: 'San Francisco, CA',
    phone: '+1 (555) 123-4567',
    department: 'Engineering',
    plan: 'Enterprise',
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob.smith@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
    role: 'Editor',
    status: 'Active',
    lastLogin: '2024-01-19T14:22:00Z',
    joinDate: '2023-05-20',
    location: 'New York, NY',
    phone: '+1 (555) 234-5678',
    department: 'Marketing',
    plan: 'Pro',
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol.davis@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face',
    role: 'Viewer',
    status: 'Inactive',
    lastLogin: '2024-01-10T09:15:00Z',
    joinDate: '2023-07-10',
    location: 'Austin, TX',
    phone: '+1 (555) 345-6789',
    department: 'Sales',
    plan: 'Basic',
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david.wilson@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
    role: 'Editor',
    status: 'Active',
    lastLogin: '2024-01-20T08:45:00Z',
    joinDate: '2023-01-05',
    location: 'Seattle, WA',
    phone: '+1 (555) 456-7890',
    department: 'Engineering',
    plan: 'Pro',
  },
  {
    id: '5',
    name: 'Eva Brown',
    email: 'eva.brown@example.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=64&h=64&fit=crop&crop=face',
    role: 'Admin',
    status: 'Pending',
    lastLogin: null,
    joinDate: '2024-01-18',
    location: 'Los Angeles, CA',
    phone: '+1 (555) 567-8901',
    department: 'HR',
    plan: 'Enterprise',
  },
  {
    id: '6',
    name: 'Frank Miller',
    email: 'frank.miller@example.com',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=64&h=64&fit=crop&crop=face',
    role: 'Viewer',
    status: 'Active',
    lastLogin: '2024-01-19T16:30:00Z',
    joinDate: '2023-09-12',
    location: 'Chicago, IL',
    phone: '+1 (555) 678-9012',
    department: 'Finance',
    plan: 'Basic',
  },
];

export const userStats: DataUserStats = {
  totalUsers: 1247,
  activeUsers: 1156,
  pendingUsers: 45,
  inactiveUsers: 46,
  adminUsers: 12,
  newThisMonth: 89,
};

// Role and status mappings using Maps for better performance
export const roleIconMap = new Map([
  ['Admin', Crown],
  ['Editor', Edit],
  ['Viewer', Eye],
]);

export const statusColorMap = new Map<string, "default" | "secondary" | "outline">([
  ['Active', 'default'],
  ['Inactive', 'secondary'],
  ['Pending', 'outline'],
]);

export const roleColorMap = new Map<string, "destructive" | "default" | "secondary">([
  ['Admin', 'destructive'],
  ['Editor', 'default'],
  ['Viewer', 'secondary'],
]);

export const statsIconMap = new Map([
  ['total', Users],
  ['active', CheckCircle2],
  ['pending', Clock],
  ['inactive', AlertTriangle],
  ['admin', Shield],
  ['newThisMonth', UserPlus],
]); 