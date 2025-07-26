import {
  CheckCircle,
  XCircle,
  Clock,
  Crown,
  Edit,
  Eye,
} from 'lucide-react';

export interface TableUser {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string | null;
  joinDate: string;
  projects: number;
}

export interface StatusInfo {
  variant: "default" | "secondary" | "outline";
  icon: any;
  label: string;
}

export const tableUserData: TableUser[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'active',
    lastLogin: '2024-01-15 09:30:00',
    joinDate: '2023-08-15',
    projects: 12
  },
  {
    id: 2,
    name: 'Sarah Chen',
    email: 'sarah.chen@example.com',
    role: 'Editor',
    status: 'active',
    lastLogin: '2024-01-14 16:45:00',
    joinDate: '2023-09-22',
    projects: 8
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    role: 'Viewer',
    status: 'inactive',
    lastLogin: '2024-01-10 11:20:00',
    joinDate: '2023-07-03',
    projects: 3
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    role: 'Editor',
    status: 'pending',
    lastLogin: null,
    joinDate: '2024-01-12',
    projects: 0
  },
  {
    id: 5,
    name: 'Alex Wilson',
    email: 'alex.wilson@example.com',
    role: 'Admin',
    status: 'active',
    lastLogin: '2024-01-15 14:15:00',
    joinDate: '2023-06-18',
    projects: 15
  },
  {
    id: 6,
    name: 'Lisa Thompson',
    email: 'lisa.thompson@example.com',
    role: 'Viewer',
    status: 'active',
    lastLogin: '2024-01-13 10:30:00',
    joinDate: '2023-11-05',
    projects: 2
  },
  {
    id: 7,
    name: 'David Brown',
    email: 'david.brown@example.com',
    role: 'Editor',
    status: 'inactive',
    lastLogin: '2024-01-08 13:45:00',
    joinDate: '2023-05-12',
    projects: 6
  },
  {
    id: 8,
    name: 'Jennifer Lee',
    email: 'jennifer.lee@example.com',
    role: 'Admin',
    status: 'active',
    lastLogin: '2024-01-15 08:20:00',
    joinDate: '2023-10-30',
    projects: 9
  }
];

// Status and role mappings using Maps for better performance
export const statusInfoMap = new Map<string, StatusInfo>([
  ['active', {
    variant: 'default',
    icon: CheckCircle,
    label: 'Active'
  }],
  ['inactive', {
    variant: 'secondary',
    icon: XCircle,
    label: 'Inactive'
  }],
  ['pending', {
    variant: 'outline',
    icon: Clock,
    label: 'Pending'
  }],
]);

export const roleBadgeVariantMap = new Map<string, "destructive" | "default" | "secondary">([
  ['Admin', 'destructive'],
  ['Editor', 'default'],
  ['Viewer', 'secondary'],
]);

export const roleIconMap = new Map([
  ['Admin', Crown],
  ['Editor', Edit],
  ['Viewer', Eye],
]); 