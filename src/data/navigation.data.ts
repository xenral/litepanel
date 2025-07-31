import {
  Home,
  BarChart3,
  Table,
  FormInput,
  Settings,
  Bell,
  Users,
  Palette,
  FileText,
  Layers,
} from 'lucide-react';

/**
 * Navigation menu item type
 */
export interface NavigationItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  submenu?: { title: string; href: string }[];
}

/**
 * Navigation menu items for the sidebar
 */
export const navigationItems: NavigationItem[] = [
  {
    title: 'Overview',
    href: '/dashboard',
    icon: Home,
    description: 'Dashboard overview and KPIs',
  },
  {
    title: 'Analytics',
    href: '/dashboard/analytics',
    icon: BarChart3,
    description: 'Charts and data insights',
    submenu: [
      { title: 'Performance', href: '/dashboard/analytics/performance' },
      { title: 'Traffic', href: '/dashboard/analytics/traffic' },
      { title: 'Revenue', href: '/dashboard/analytics/revenue' },
    ],
  },
  {
    title: 'Data Management',
    href: '/dashboard/data',
    icon: Table,
    description: 'Data tables and management',
    submenu: [
      { title: 'Products', href: '/dashboard/data/products' },
      { title: 'Users', href: '/dashboard/data/users' },
      { title: 'Orders', href: '/dashboard/data/orders' },
      { title: 'Reports', href: '/dashboard/data/reports' },
    ],
  },
  {
    title: 'UI Components',
    href: '/dashboard/components',
    icon: Layers,
    description: 'UI component examples',
    submenu: [
      { title: 'Forms', href: '/dashboard/components/forms' },
      { title: 'Tables', href: '/dashboard/components/tables' },
      { title: 'Cards', href: '/dashboard/components/cards' },
      { title: 'Modals', href: '/dashboard/components/modals' },
      { title: 'Enhanced Showcase', href: '/dashboard/components/showcase' },
    ],
  },
  {
    title: 'User Management',
    href: '/dashboard/users',
    icon: Users,
    description: 'Manage users and permissions',
    submenu: [
      { title: 'All Users', href: '/dashboard/users/list' },
      { title: 'Roles', href: '/dashboard/users/roles' },
      { title: 'Permissions', href: '/dashboard/users/permissions' },
    ],
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
    description: 'Profile and preferences',
  },
  {
    title: 'Notifications',
    href: '/dashboard/notifications',
    icon: Bell,
    description: 'Activity feed',
  },
];

/**
 * Secondary navigation items
 */
export const secondaryItems = [
  {
    title: 'Documentation',
    href: '/docs',
    icon: FileText,
  },
  {
    title: 'Components',
    href: '/components',
    icon: Layers,
  },
  {
    title: 'Storybook',
    href: '/storybook',
    icon: Palette,
  },
];
