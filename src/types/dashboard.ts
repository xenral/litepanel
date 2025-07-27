export interface KPIMetric {
  id: string;
  title: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: string;
  color: string;
}

export interface QuickStat {
  id: string;
  label: string;
  value: string | number;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'away' | 'offline';
  progress: number;
}

export interface RecentFile {
  id: string;
  name: string;
  type: string;
  size: string;
  modified: string;
  author: string;
}

export interface UpcomingEvent {
  id: string;
  title: string;
  time: string;
  type: 'meeting' | 'deadline' | 'reminder';
  priority: 'high' | 'medium' | 'low';
}

export interface SocialMetric {
  platform: string;
  followers: number;
  engagement: number;
  growth: string;
  icon: string;
  color: string;
}

export interface DeviceAnalytic {
  device: string;
  percentage: number;
  count: number;
  change: string;
  icon: string;
}

export interface PerformanceMetric {
  metric: string;
  value: number;
  target: number;
  status: 'good' | 'warning' | 'error';
}

export interface RecentProject {
  id: string;
  name: string;
  description: string;
  progress: number;
  status: 'active' | 'completed' | 'on-hold';
  lastActivity: string;
  team: string[];
}

export interface SystemMetric {
  name: string;
  value: number;
  status: 'healthy' | 'warning' | 'critical';
  icon: string;
}

export interface ActivityItem {
  id: string;
  type: string;
  message: string;
  time: string;
  user: string;
  icon: string;
}
