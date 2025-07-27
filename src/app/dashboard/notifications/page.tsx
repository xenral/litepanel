import type { Metadata } from 'next';
import {
  Bell,
  Check,
  X,
  Filter,
  Search,
  MoreHorizontal,
  User,
  AlertTriangle,
  Info,
  CheckCircle,
  Clock,
  Trash2,
  Eye,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const metadata: Metadata = {
  title: 'Notifications',
  description: 'Stay updated with your activity feed and notifications',
};

/**
 * Mock notifications data
 */
const notifications = [
  {
    id: 1,
    type: 'user',
    title: 'New user registered',
    message: 'sarah.chen@example.com joined your workspace',
    timestamp: '2024-01-15T09:30:00Z',
    read: false,
    priority: 'medium',
    icon: User,
    color: 'text-blue-600 bg-blue-100 dark:bg-blue-900',
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
    color: 'text-orange-600 bg-orange-100 dark:bg-orange-900',
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
    color: 'text-green-600 bg-green-100 dark:bg-green-900',
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
    color: 'text-purple-600 bg-purple-100 dark:bg-purple-900',
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
    color: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900',
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
    color: 'text-blue-600 bg-blue-100 dark:bg-blue-900',
  },
];

/**
 * Format timestamp for display
 */
function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInMinutes = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60)
  );

  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d ago`;

  return date.toLocaleDateString();
}

/**
 * Get priority badge variant
 */
function getPriorityVariant(priority: string) {
  switch (priority) {
    case 'high':
      return 'destructive' as const;
    case 'medium':
      return 'default' as const;
    case 'low':
      return 'secondary' as const;
    default:
      return 'outline' as const;
  }
}

/**
 * Notifications page component
 */
export default function NotificationsPage() {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground mt-2">
            Stay updated with your activity feed and system notifications.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          <Button className="flex items-center space-x-2">
            <Check className="h-4 w-4" />
            <span>Mark All Read</span>
          </Button>
        </div>
      </div>

      {/* Notifications Summary */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Total
                </p>
                <p className="text-2xl font-bold">{notifications.length}</p>
              </div>
              <Bell className="text-muted-foreground h-8 w-8" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Unread
                </p>
                <p className="text-2xl font-bold">{unreadCount}</p>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
                <span className="text-sm font-bold text-red-600">
                  {unreadCount}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  High Priority
                </p>
                <p className="text-2xl font-bold">
                  {notifications.filter((n) => n.priority === 'high').length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Today
                </p>
                <p className="text-2xl font-bold">
                  {
                    notifications.filter(
                      (n) =>
                        new Date(n.timestamp).toDateString() ===
                        new Date().toDateString()
                    ).length
                  }
                </p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Activity Feed</span>
              </CardTitle>
              <CardDescription>
                Recent notifications and system updates
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
                <Input
                  placeholder="Search notifications..."
                  className="w-64 pl-9"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => {
              const NotificationIcon = notification.icon;

              return (
                <div
                  key={notification.id}
                  className={`hover:bg-muted/50 flex items-start space-x-4 rounded-lg border p-4 transition-colors ${
                    !notification.read
                      ? 'bg-muted/20 border-primary/20'
                      : 'bg-background'
                  }`}
                >
                  <div
                    className={`rounded-lg p-2 ${notification.color} shrink-0`}
                  >
                    <NotificationIcon className="h-4 w-4" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="text-sm font-medium">
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <div className="bg-primary h-2 w-2 rounded-full" />
                          )}
                          <Badge
                            variant={getPriorityVariant(notification.priority)}
                            className="text-xs"
                          >
                            {notification.priority}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm">
                          {notification.message}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {formatTimestamp(notification.timestamp)}
                        </p>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem className="cursor-pointer">
                            <Eye className="mr-2 h-4 w-4" />
                            {notification.read
                              ? 'Mark as unread'
                              : 'Mark as read'}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive cursor-pointer">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Load More Button */}
          <div className="flex justify-center pt-6">
            <Button variant="outline">Load More Notifications</Button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>
            Manage how you receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <h4 className="font-medium">Email Notifications</h4>
              <p className="text-muted-foreground text-sm">
                Receive important updates via email
              </p>
              <Button variant="outline" size="sm">
                Configure
              </Button>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Push Notifications</h4>
              <p className="text-muted-foreground text-sm">
                Browser notifications for real-time alerts
              </p>
              <Button variant="outline" size="sm">
                Enable
              </Button>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Digest Settings</h4>
              <p className="text-muted-foreground text-sm">
                Daily or weekly notification summaries
              </p>
              <Button variant="outline" size="sm">
                Customize
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
