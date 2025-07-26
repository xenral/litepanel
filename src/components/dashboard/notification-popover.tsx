'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Bell,
  X,
  Check,
  User,
  AlertTriangle,
  Info,
  CheckCircle,
  Clock,
  Settings,
  Trash2,
  Eye,
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'user';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'user',
    title: 'New user registered',
    message: 'sarah.chen@example.com joined your workspace',
    timestamp: '5 minutes ago',
    read: false,
    priority: 'medium',
  },
  {
    id: '2',
    type: 'warning',
    title: 'System maintenance',
    message: 'Scheduled maintenance this Sunday 2-4 AM UTC',
    timestamp: '1 hour ago',
    read: false,
    priority: 'high',
  },
  {
    id: '3',
    type: 'success',
    title: 'Backup completed',
    message: 'Daily backup completed successfully',
    timestamp: '2 hours ago',
    read: true,
    priority: 'low',
  },
  {
    id: '4',
    type: 'info',
    title: 'New feature available',
    message: 'Advanced analytics dashboard is now live',
    timestamp: '1 day ago',
    read: false,
    priority: 'medium',
  },
  {
    id: '5',
    type: 'error',
    title: 'Storage warning',
    message: 'You are using 85% of your storage quota',
    timestamp: '2 days ago',
    read: true,
    priority: 'high',
  },
];

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'user':
      return User;
    case 'warning':
      return AlertTriangle;
    case 'success':
      return CheckCircle;
    case 'info':
      return Info;
    case 'error':
      return AlertTriangle;
    default:
      return Bell;
  }
};

const getNotificationColor = (type: Notification['type']) => {
  switch (type) {
    case 'user':
      return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
    case 'warning':
      return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30';
    case 'success':
      return 'text-green-600 bg-green-100 dark:bg-green-900/30';
    case 'info':
      return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30';
    case 'error':
      return 'text-red-600 bg-red-100 dark:bg-red-900/30';
    default:
      return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
  }
};

const getPriorityVariant = (priority: Notification['priority']) => {
  switch (priority) {
    case 'high':
      return 'destructive' as const;
    case 'medium':
      return 'default' as const;
    case 'low':
      return 'secondary' as const;
    default:
      return 'default' as const;
  }
};

interface NotificationPopoverProps {
  children: React.ReactNode;
  notificationCount?: number;
}

export function NotificationPopover({ 
  children, 
  notificationCount = mockNotifications.filter(n => !n.read).length 
}: NotificationPopoverProps) {
  const [notifications, setNotifications] = React.useState(mockNotifications);

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent 
        className="w-96 p-0" 
        align="end" 
        sideOffset={8}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <h3 className="font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {unreadCount}
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-1">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMarkAllAsRead}
                className="text-xs h-8 px-2"
              >
                <Check className="h-3 w-3 mr-1" />
                Mark all read
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
            >
              <Settings className="h-3 w-3" />
            </Button>
          </div>
        </div>

        <ScrollArea className="h-96">
          <div className="p-2">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No notifications</p>
                <p className="text-xs text-muted-foreground">
                  You're all caught up!
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                {notifications.map((notification, index) => {
                  const Icon = getNotificationIcon(notification.type);
                  const colorClass = getNotificationColor(notification.type);
                  
                  return (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`group relative flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors ${
                        !notification.read ? 'bg-muted/30' : ''
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${colorClass} shrink-0`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <h4 className="text-sm font-medium">
                                {notification.title}
                              </h4>
                              {!notification.read && (
                                <div className="h-2 w-2 rounded-full bg-primary" />
                              )}
                              <Badge 
                                variant={getPriorityVariant(notification.priority)} 
                                className="text-xs"
                              >
                                {notification.priority}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {notification.timestamp}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(notification.id)}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </ScrollArea>

        <Separator />
        <div className="p-3">
          <Button variant="outline" className="w-full text-sm">
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
} 