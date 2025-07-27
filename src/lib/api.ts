/**
 * API configuration and service layer
 * Replace mock data with proper API integration patterns
 */

import * as React from 'react';

// API Base Configuration
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
const API_VERSION = 'v1';

/**
 * API Response wrapper
 */
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * HTTP client with error handling
 */
class ApiClient {
  private baseURL: string;
  private headers: Record<string, string>;

  constructor() {
    this.baseURL = `${API_BASE_URL}/${API_VERSION}`;
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  setAuthToken(token: string) {
    this.headers['Authorization'] = `Bearer ${token}`;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        headers: { ...this.headers, ...options.headers },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();

/**
 * User Management Service
 */
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  lastLoginAt?: string;
  bio?: string;
  title?: string;
  company?: string;
  location?: string;
  phone?: string;
  website?: string;
  joinedAt?: string;
  preferences: {
    theme: string;
    language: string;
    timezone: string;
    notifications: boolean;
  };
}

export const UserService = {
  getCurrentUser: async (): Promise<User> => {
    // In development, return mock data
    if (process.env.NODE_ENV === 'development') {
      return {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        avatar:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        role: 'admin',
        status: 'active',
        createdAt: '2023-01-15T00:00:00Z',
        lastLoginAt: new Date().toISOString(),
        bio: 'Product designer passionate about creating intuitive user experiences.',
        title: 'Senior Product Designer',
        company: 'Acme Corp',
        location: 'San Francisco, CA',
        phone: '+1 (555) 123-4567',
        website: 'https://johndoe.com',
        joinedAt: '2023-01-15',
        preferences: {
          theme: 'system',
          language: 'en',
          timezone: 'America/Los_Angeles',
          notifications: true,
        },
      };
    }

    const response = await apiClient.get<User>('/user/me');
    return response.data;
  },

  updateUser: async (id: string, data: Partial<User>): Promise<User> => {
    if (process.env.NODE_ENV === 'development') {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { ...(await UserService.getCurrentUser()), ...data };
    }

    const response = await apiClient.put<User>(`/users/${id}`, data);
    return response.data;
  },

  uploadAvatar: async (file: File): Promise<{ url: string }> => {
    if (process.env.NODE_ENV === 'development') {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return { url: URL.createObjectURL(file) };
    }

    const formData = new FormData();
    formData.append('avatar', file);

    const response = await fetch(`${API_BASE_URL}/${API_VERSION}/user/avatar`, {
      method: 'POST',
      body: formData,
    });

    return response.json();
  },
};

/**
 * Analytics Service
 */
export interface AnalyticsData {
  metrics: {
    totalVisitors: number;
    revenue: number;
    conversionRate: number;
    avgSessionDuration: number;
  };
  charts: {
    revenue: Array<{ month: string; value: number }>;
    visitors: Array<{ date: string; desktop: number; mobile: number }>;
    trafficSources: Array<{
      source: string;
      visitors: number;
      percentage: number;
    }>;
  };
  timeRange: string;
}

export const AnalyticsService = {
  getAnalytics: async (timeRange: string = '30d'): Promise<AnalyticsData> => {
    if (process.env.NODE_ENV === 'development') {
      return {
        metrics: {
          totalVisitors: 124832,
          revenue: 89432,
          conversionRate: 3.24,
          avgSessionDuration: 272, // seconds
        },
        charts: {
          revenue: [
            { month: 'Jan', value: 65000 },
            { month: 'Feb', value: 72000 },
            { month: 'Mar', value: 68000 },
            { month: 'Apr', value: 85000 },
            { month: 'May', value: 91000 },
            { month: 'Jun', value: 89432 },
          ],
          visitors: [
            { date: '1 Dec', desktop: 4200, mobile: 2800 },
            { date: '8 Dec', desktop: 4800, mobile: 3200 },
            { date: '15 Dec', desktop: 5100, mobile: 3600 },
            { date: '22 Dec', desktop: 4900, mobile: 3400 },
            { date: '29 Dec', desktop: 5300, mobile: 3800 },
          ],
          trafficSources: [
            { source: 'Direct', visitors: 45230, percentage: 36.2 },
            { source: 'Organic Search', visitors: 32840, percentage: 26.3 },
            { source: 'Social Media', visitors: 28100, percentage: 22.5 },
            { source: 'Referral', visitors: 12450, percentage: 9.9 },
            { source: 'Email', visitors: 6212, percentage: 5.1 },
          ],
        },
        timeRange,
      };
    }

    const response = await apiClient.get<AnalyticsData>(
      `/analytics?range=${timeRange}`
    );
    return response.data;
  },

  exportData: async (format: 'csv' | 'xlsx' | 'pdf'): Promise<Blob> => {
    if (process.env.NODE_ENV === 'development') {
      // Create a mock CSV for development
      const csvContent =
        'Date,Visitors,Revenue\n2024-01-01,1000,5000\n2024-01-02,1200,6000';
      return new Blob([csvContent], { type: 'text/csv' });
    }

    const response = await fetch(
      `${API_BASE_URL}/${API_VERSION}/analytics/export?format=${format}`
    );
    return response.blob();
  },
};

/**
 * Dashboard Service
 */
export interface DashboardData {
  kpis: Array<{
    id: string;
    title: string;
    value: string;
    change: string;
    trend: 'up' | 'down' | 'stable';
    icon: string;
  }>;
  recentActivity: Array<{
    id: string;
    type: string;
    message: string;
    timestamp: string;
    user: string;
  }>;
  quickStats: {
    activeUsers: number;
    totalProjects: number;
    completedTasks: number;
    teamMembers: number;
  };
}

export const DashboardService = {
  getDashboardData: async (): Promise<DashboardData> => {
    if (process.env.NODE_ENV === 'development') {
      return {
        kpis: [
          {
            id: '1',
            title: 'Total Revenue',
            value: '$45,231.89',
            change: '+20.1%',
            trend: 'up',
            icon: 'DollarSign',
          },
          {
            id: '2',
            title: 'Active Users',
            value: '2,350',
            change: '+180.1%',
            trend: 'up',
            icon: 'Users',
          },
          {
            id: '3',
            title: 'Sales',
            value: '12,234',
            change: '+19%',
            trend: 'up',
            icon: 'CreditCard',
          },
          {
            id: '4',
            title: 'Active Now',
            value: '573',
            change: '+201',
            trend: 'up',
            icon: 'Activity',
          },
        ],
        recentActivity: [
          {
            id: '1',
            type: 'user_signup',
            message: 'New user registered',
            timestamp: new Date().toISOString(),
            user: 'john@example.com',
          },
          {
            id: '2',
            type: 'purchase',
            message: 'Purchase completed',
            timestamp: new Date(Date.now() - 300000).toISOString(),
            user: 'jane@example.com',
          },
        ],
        quickStats: {
          activeUsers: 2350,
          totalProjects: 156,
          completedTasks: 1234,
          teamMembers: 24,
        },
      };
    }

    const response = await apiClient.get<DashboardData>('/dashboard');
    return response.data;
  },
};

/**
 * Notification Service
 */
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

export const NotificationService = {
  getNotifications: async (): Promise<Notification[]> => {
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          id: '1',
          title: 'System Update',
          message: 'New features have been deployed',
          type: 'info',
          read: false,
          createdAt: new Date().toISOString(),
          actionUrl: '/changelog',
        },
        {
          id: '2',
          title: 'Payment Received',
          message: 'Payment of $299.00 received from client',
          type: 'success',
          read: false,
          createdAt: new Date(Date.now() - 3600000).toISOString(),
        },
        {
          id: '3',
          title: 'Backup Complete',
          message: 'Daily backup completed successfully',
          type: 'success',
          read: true,
          createdAt: new Date(Date.now() - 7200000).toISOString(),
        },
      ];
    }

    const response = await apiClient.get<Notification[]>('/notifications');
    return response.data;
  },

  markAsRead: async (id: string): Promise<void> => {
    if (process.env.NODE_ENV === 'development') {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return;
    }

    await apiClient.put(`/notifications/${id}/read`, {});
  },

  markAllAsRead: async (): Promise<void> => {
    if (process.env.NODE_ENV === 'development') {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return;
    }

    await apiClient.put('/notifications/read-all', {});
  },
};

/**
 * Error handling utility
 */
export const handleApiError = (error: any): string => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

/**
 * Data refresh utilities
 */
export const useApiData = <T>(
  fetcher: () => Promise<T>,
  dependencies: any[] = []
) => {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const refresh = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetcher();
      setData(result);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  }, dependencies);

  React.useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
};

export default {
  UserService,
  AnalyticsService,
  DashboardService,
  NotificationService,
};
