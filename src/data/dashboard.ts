import {
  Users,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  BarChart3,
  Clock,
  Zap,
  Eye,
  Download,
  Activity,
  Cpu,
  HardDrive,
  Wifi,
} from 'lucide-react';
import type {
  KPIMetric,
  QuickStat,
  TeamMember,
  RecentFile,
  UpcomingEvent,
  SocialMetric,
  DeviceAnalytic,
  PerformanceMetric,
  RecentProject,
  SystemMetric,
  ActivityItem,
} from '@/types/dashboard';

export const kpiMetrics: KPIMetric[] = [
  {
    id: 'users',
    title: 'Total Users',
    value: '54,239',
    change: '+12.5%',
    trend: 'up',
    icon: 'Users',
    color: 'text-blue-600',
  },
  {
    id: 'revenue',
    title: 'Revenue',
    value: '$429,845',
    change: '+8.2%',
    trend: 'up',
    icon: 'DollarSign',
    color: 'text-green-600',
  },
  {
    id: 'orders',
    title: 'Orders',
    value: '3,847',
    change: '+15.3%',
    trend: 'up',
    icon: 'ShoppingCart',
    color: 'text-purple-600',
  },
  {
    id: 'growth',
    title: 'Growth Rate',
    value: '23.1%',
    change: '+2.4%',
    trend: 'up',
    icon: 'TrendingUp',
    color: 'text-orange-600',
  },
];

export const quickStats: QuickStat[] = [
  {
    id: 'pageviews',
    label: 'Page Views',
    value: '2.1M',
    change: '+12%',
    changeType: 'positive',
  },
  {
    id: 'api-calls',
    label: 'API Calls',
    value: '847K',
    change: '+8%',
    changeType: 'positive',
  },
  {
    id: 'downloads',
    label: 'Downloads',
    value: '34.5K',
    change: '+23%',
    changeType: 'positive',
  },
  {
    id: 'sessions',
    label: 'Active Sessions',
    value: '1,249',
    change: '-3%',
    changeType: 'negative',
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Product Manager',
    avatar: '/avatars/sarah.jpg',
    status: 'online',
    progress: 87,
  },
  {
    id: '2',
    name: 'Mike Chen',
    role: 'Lead Developer',
    avatar: '/avatars/mike.jpg',
    status: 'online',
    progress: 92,
  },
  {
    id: '3',
    name: 'Emily Davis',
    role: 'UI/UX Designer',
    avatar: '/avatars/emily.jpg',
    status: 'away',
    progress: 76,
  },
  {
    id: '4',
    name: 'James Wilson',
    role: 'DevOps Engineer',
    avatar: '/avatars/james.jpg',
    status: 'offline',
    progress: 94,
  },
];

export const recentFiles: RecentFile[] = [
  {
    id: '1',
    name: 'dashboard-redesign.figma',
    type: 'Design',
    size: '2.4 MB',
    modified: '2 hours ago',
    author: 'Emily Davis',
  },
  {
    id: '2',
    name: 'api-documentation.md',
    type: 'Documentation',
    size: '156 KB',
    modified: '4 hours ago',
    author: 'Mike Chen',
  },
  {
    id: '3',
    name: 'user-analytics.xlsx',
    type: 'Spreadsheet',
    size: '892 KB',
    modified: '1 day ago',
    author: 'Sarah Johnson',
  },
  {
    id: '4',
    name: 'deployment-config.yml',
    type: 'Configuration',
    size: '8 KB',
    modified: '2 days ago',
    author: 'James Wilson',
  },
];

export const upcomingEvents: UpcomingEvent[] = [
  {
    id: '1',
    title: 'Sprint Planning Meeting',
    time: 'Today 2:00 PM',
    type: 'meeting',
    priority: 'high',
  },
  {
    id: '2',
    title: 'Product Release Deadline',
    time: 'Tomorrow',
    type: 'deadline',
    priority: 'high',
  },
  {
    id: '3',
    title: 'Client Presentation',
    time: 'Friday 10:00 AM',
    type: 'meeting',
    priority: 'medium',
  },
  {
    id: '4',
    title: 'Code Review Session',
    time: 'Monday 3:00 PM',
    type: 'reminder',
    priority: 'low',
  },
];

export const socialMetrics: SocialMetric[] = [
  {
    platform: 'Twitter',
    followers: 12500,
    engagement: 4.2,
    growth: '+8%',
    icon: 'Twitter',
    color: 'text-blue-400',
  },
  {
    platform: 'LinkedIn',
    followers: 8900,
    engagement: 6.1,
    growth: '+12%',
    icon: 'Linkedin',
    color: 'text-blue-600',
  },
  {
    platform: 'GitHub',
    followers: 3400,
    engagement: 8.7,
    growth: '+15%',
    icon: 'Github',
    color: 'text-gray-800',
  },
];

export const deviceAnalytics: DeviceAnalytic[] = [
  {
    device: 'Desktop',
    percentage: 65,
    count: 34520,
    change: '+5%',
    icon: 'Monitor',
  },
  {
    device: 'Mobile',
    percentage: 28,
    count: 14880,
    change: '+12%',
    icon: 'Smartphone',
  },
  {
    device: 'Tablet',
    percentage: 7,
    count: 3720,
    change: '-2%',
    icon: 'Tablet',
  },
];

export const performanceMetrics: PerformanceMetric[] = [
  {
    metric: 'Response Time',
    value: 245,
    target: 300,
    status: 'good',
  },
  {
    metric: 'Uptime',
    value: 99.9,
    target: 99.0,
    status: 'good',
  },
  {
    metric: 'Error Rate',
    value: 0.12,
    target: 0.5,
    status: 'good',
  },
  {
    metric: 'Load Time',
    value: 1.8,
    target: 2.0,
    status: 'warning',
  },
];

export const recentProjects: RecentProject[] = [
  {
    id: '1',
    name: 'E-commerce Platform',
    description: 'Modern shopping platform with advanced features',
    progress: 87,
    status: 'active',
    lastActivity: '2 hours ago',
    team: ['Sarah Johnson', 'Mike Chen', 'Emily Davis'],
  },
  {
    id: '2',
    name: 'Mobile App Redesign',
    description: 'Complete UI/UX overhaul for mobile application',
    progress: 100,
    status: 'completed',
    lastActivity: '1 day ago',
    team: ['Emily Davis', 'James Wilson'],
  },
  {
    id: '3',
    name: 'Analytics Dashboard',
    description: 'Real-time analytics and reporting dashboard',
    progress: 45,
    status: 'active',
    lastActivity: '5 hours ago',
    team: ['Mike Chen', 'Sarah Johnson'],
  },
];

export const systemMetrics: SystemMetric[] = [
  {
    name: 'CPU Usage',
    value: 68,
    status: 'healthy',
    icon: 'Cpu',
  },
  {
    name: 'Memory',
    value: 74,
    status: 'warning',
    icon: 'HardDrive',
  },
  {
    name: 'Disk Space',
    value: 45,
    status: 'healthy',
    icon: 'HardDrive',
  },
  {
    name: 'Network',
    value: 12,
    status: 'healthy',
    icon: 'Wifi',
  },
];

export const activityItems: ActivityItem[] = [
  {
    id: '1',
    type: 'deployment',
    message: 'New version deployed to production',
    time: '2 hours ago',
    user: 'James Wilson',
    icon: 'Zap',
  },
  {
    id: '2',
    type: 'user',
    message: '1,234 new users registered today',
    time: '4 hours ago',
    user: 'System',
    icon: 'Users',
  },
  {
    id: '3',
    type: 'update',
    message: 'Dashboard analytics updated',
    time: '6 hours ago',
    user: 'Mike Chen',
    icon: 'BarChart3',
  },
  {
    id: '4',
    type: 'backup',
    message: 'Database backup completed successfully',
    time: '8 hours ago',
    user: 'System',
    icon: 'HardDrive',
  },
];
