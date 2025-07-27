/**
 * Navigation utilities for the dashboard
 * Provides real routing logic instead of placeholder links
 */

import { useRouter, usePathname } from 'next/navigation';
import { LucideIcon } from 'lucide-react';

/**
 * Navigation item interface
 */
export interface NavigationItem {
  title: string;
  href: string;
  icon: LucideIcon;
  description?: string;
  badge?: string;
  submenu?: Array<{
    title: string;
    href: string;
    description?: string;
    badge?: string;
  }>;
}

/**
 * Check if a navigation item is active
 */
export const useActiveNavigation = () => {
  const pathname = usePathname();

  const isActive = (href: string, exact = false): boolean => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const hasActiveSubmenu = (submenu?: NavigationItem['submenu']): boolean => {
    if (!submenu) return false;
    return submenu.some(item => isActive(item.href));
  };

  return { isActive, hasActiveSubmenu, pathname };
};

/**
 * Navigation hook for programmatic routing
 */
export const useNavigation = () => {
  const router = useRouter();

  const navigateTo = (href: string) => {
    router.push(href);
  };

  const navigateBack = () => {
    router.back();
  };

  const navigateReplace = (href: string) => {
    router.replace(href);
  };

  return { navigateTo, navigateBack, navigateReplace };
};

/**
 * Breadcrumb utilities
 */
export const generateBreadcrumbs = (pathname: string) => {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs = [];

  let currentPath = '';
  for (const segment of segments) {
    currentPath += `/${segment}`;
    breadcrumbs.push({
      title: segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' '),
      href: currentPath,
    });
  }

  return breadcrumbs;
};

/**
 * Get page metadata based on current route
 */
export const getPageMetadata = (pathname: string) => {
  const routeMetadata: Record<string, { title: string; description: string }> = {
    '/dashboard': {
      title: 'Dashboard',
      description: 'Overview of your application metrics and recent activity',
    },
    '/dashboard/analytics': {
      title: 'Analytics',
      description: 'Detailed insights into your application performance',
    },
    '/dashboard/analytics/performance': {
      title: 'Performance Analytics',
      description: 'Monitor your application performance metrics',
    },
    '/dashboard/analytics/traffic': {
      title: 'Traffic Analytics',
      description: 'Analyze your website traffic and user behavior',
    },
    '/dashboard/analytics/revenue': {
      title: 'Revenue Analytics',
      description: 'Track your revenue metrics and financial performance',
    },
    '/dashboard/data/products': {
      title: 'Products',
      description: 'Manage your product catalog and inventory',
    },
    '/dashboard/data/users': {
      title: 'Users',
      description: 'User management and account administration',
    },
    '/dashboard/data/orders': {
      title: 'Orders',
      description: 'Order management and fulfillment tracking',
    },
    '/dashboard/data/reports': {
      title: 'Reports',
      description: 'Generate and view detailed business reports',
    },
    '/dashboard/components': {
      title: 'UI Components',
      description: 'Explore the component library and design system',
    },
    '/dashboard/components/forms': {
      title: 'Form Components',
      description: 'Form examples and validation patterns',
    },
    '/dashboard/components/tables': {
      title: 'Table Components',
      description: 'Data table examples with sorting and filtering',
    },
    '/dashboard/components/cards': {
      title: 'Card Components',
      description: 'Various card layouts and display patterns',
    },
    '/dashboard/components/modals': {
      title: 'Modal Components',
      description: 'Dialog and overlay component examples',
    },
    '/dashboard/components/showcase': {
      title: 'Enhanced Components',
      description: 'Advanced UI components and interactions',
    },
    '/dashboard/users/list': {
      title: 'All Users',
      description: 'Complete user directory and management',
    },
    '/dashboard/users/roles': {
      title: 'User Roles',
      description: 'Role-based access control management',
    },
    '/dashboard/users/permissions': {
      title: 'Permissions',
      description: 'Granular permission management system',
    },
    '/dashboard/settings': {
      title: 'Settings',
      description: 'Application and account preferences',
    },
    '/dashboard/notifications': {
      title: 'Notifications',
      description: 'Notification center and preferences',
    },
  };

  return routeMetadata[pathname] || {
    title: 'Dashboard',
    description: 'LiteControl Admin Dashboard',
  };
};

/**
 * Check if user has permission to access a route
 * In a real app, this would check against user permissions from the API
 */
export const canAccessRoute = (href: string, userRole?: string): boolean => {
  // In development, allow all routes
  if (process.env.NODE_ENV === 'development') {
    return true;
  }

  // Define route permissions
  const routePermissions: Record<string, string[]> = {
    '/dashboard/users': ['admin', 'manager'],
    '/dashboard/users/permissions': ['admin'],
    '/dashboard/settings': ['admin', 'manager', 'user'],
    '/dashboard/analytics': ['admin', 'manager', 'analyst'],
    '/dashboard/data': ['admin', 'manager', 'editor'],
  };

  const requiredRoles = routePermissions[href];
  if (!requiredRoles) return true; // Public route

  return userRole ? requiredRoles.includes(userRole) : false;
};

/**
 * Search through navigation items
 */
export const searchNavigation = (
  items: NavigationItem[],
  query: string
): Array<NavigationItem & { matchType: 'title' | 'description' | 'submenu' }> => {
  const results: Array<NavigationItem & { matchType: 'title' | 'description' | 'submenu' }> = [];
  const lowerQuery = query.toLowerCase();

  for (const item of items) {
    // Check title match
    if (item.title.toLowerCase().includes(lowerQuery)) {
      results.push({ ...item, matchType: 'title' });
      continue;
    }

    // Check description match
    if (item.description?.toLowerCase().includes(lowerQuery)) {
      results.push({ ...item, matchType: 'description' });
      continue;
    }

    // Check submenu matches
    if (item.submenu) {
      const submenuMatch = item.submenu.some(subitem =>
        subitem.title.toLowerCase().includes(lowerQuery) ||
        subitem.description?.toLowerCase().includes(lowerQuery)
      );
      if (submenuMatch) {
        results.push({ ...item, matchType: 'submenu' });
      }
    }
  }

  return results;
};

export default {
  useActiveNavigation,
  useNavigation,
  generateBreadcrumbs,
  getPageMetadata,
  canAccessRoute,
  searchNavigation,
}; 