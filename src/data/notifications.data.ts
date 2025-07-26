import {
  Bell,
  User,
  AlertTriangle,
  CheckCircle,
  Info,
  Clock,
} from 'lucide-react';

export interface Notification {
  id: number;
  type: 'user' | 'system' | 'success' | 'info' | 'warning';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  icon: any;
  color: string;
}

export interface NotificationStats {
  total: number;
  unread: number;
  highPriority: number;
  today: number;
}

export const notifications: Notification[] = [
  {
    id: 1,
    type: 'user',
    title: 'New user registered',
    message: 'sarah.chen@example.com joined your workspace',
    timestamp: '2024-01-15T09:30:00Z',
    read: false,
    priority: 'medium',
    icon: User,
    color: 'text-blue-600 bg-blue-100 dark:bg-blue-900'
  },
  {
    id: 2,
    type: 'system',
    title: 'System maintenance scheduled',
    message: 'Planned maintenance window on Sunday 2 AM - 4 AM UTC',
    timestamp: '2024-01-15T08:15:00Z',
    read: false,
    priority: 'high',
    icon: AlertTriangle,
    color: 'text-orange-600 bg-orange-100 dark:bg-orange-900'
  },
  {
    id: 3,
    type: 'success',
    title: 'Backup completed successfully',
    message: 'Daily backup completed at 03:00 AM',
    timestamp: '2024-01-15T03:00:00Z',
    read: true,
    priority: 'low',
    icon: CheckCircle,
    color: 'text-green-600 bg-green-100 dark:bg-green-900'
  },
  {
    id: 4,
    type: 'info',
    title: 'New feature available',
    message: 'Advanced analytics dashboard is now live',
    timestamp: '2024-01-14T16:45:00Z',
    read: false,
    priority: 'medium',
    icon: Info,
    color: 'text-purple-600 bg-purple-100 dark:bg-purple-900'
  },
  {
    id: 5,
    type: 'warning',
    title: 'Storage usage warning',
    message: 'You are using 85% of your storage quota',
    timestamp: '2024-01-14T14:20:00Z',
    read: true,
    priority: 'high',
    icon: AlertTriangle,
    color: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900'
  },
  {
    id: 6,
    type: 'user',
    title: 'Password changed',
    message: 'Your password was successfully updated',
    timestamp: '2024-01-14T11:30:00Z',
    read: true,
    priority: 'medium',
    icon: User,
    color: 'text-blue-600 bg-blue-100 dark:bg-blue-900'
  }
];

// Priority badge mappings using Maps for better performance
export const priorityVariantMap = new Map<string, "destructive" | "default" | "secondary" | "outline">([
  ['high', 'destructive'],
  ['medium', 'default'],
  ['low', 'secondary'],
]);

export const statsIconMap = new Map([
  ['total', Bell],
  ['unread', Bell],
  ['highPriority', AlertTriangle], 
  ['today', Clock],
]); 