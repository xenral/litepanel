'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  BarChart3,
  Table,
  FormInput,
  Settings,
  Bell,
  Users,
  ChevronLeft,
  ChevronDown,
  Palette,
  FileText,
  Layers,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useThemeContext } from '@/context/theme-context';

/**
 * Navigation menu item type
 */
interface NavigationItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  submenu?: { title: string; href: string }[];
}

/**
 * Navigation menu items for the sidebar
 */
const navigationItems: NavigationItem[] = [
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
const secondaryItems = [
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

interface SidebarProps {
  /** Whether the sidebar is collapsed */
  isCollapsed: boolean;
  /** Callback to toggle collapsed state */
  onToggleCollapse: () => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Collapsible sidebar component for dashboard navigation
 */
export function Sidebar({
  isCollapsed,
  onToggleCollapse,
  className,
}: SidebarProps) {
  const pathname = usePathname();
  const { theme } = useThemeContext();
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set());

  /**
   * Check if a navigation item is currently active
   */
  const isActive = (href: string): boolean => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  /**
   * Check if a submenu item is currently active
   */
  const isSubmenuActive = (submenu?: { href: string }[]): boolean => {
    return submenu?.some((item) => pathname.startsWith(item.href)) ?? false;
  };

  /**
   * Toggle submenu expansion
   */
  const toggleSubmenu = (href: string) => {
    if (isCollapsed) return;

    const newExpanded = new Set(expandedMenus);
    if (newExpanded.has(href)) {
      newExpanded.delete(href);
    } else {
      newExpanded.add(href);
    }
    setExpandedMenus(newExpanded);
  };

  return (
    <motion.aside
      initial={false}
      animate={{
        width: isCollapsed ? 80 : 280,
      }}
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
      }}
      className={cn(
        'bg-background/95 supports-[backdrop-filter]:bg-background/60 relative flex h-screen flex-col border-r backdrop-blur',
        className
      )}
      style={{
        backgroundColor: 'hsl(var(--sidebar-background))',
      }}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-4">
        <AnimatePresence mode="wait">
          {!isCollapsed ? (
            <motion.div
              key="expanded-logo"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex items-center space-x-2"
            >
              <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
                <Palette className="text-primary-foreground h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">LitePanel</span>
                <span className="text-muted-foreground text-xs">Admin</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="collapsed-logo"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg"
            >
              <Palette className="text-primary-foreground h-5 w-5" />
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className="h-8 w-8 p-0 hover:bg-[hsl(var(--sidebar-hover))]"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <ChevronLeft
            className={cn(
              'h-4 w-4 transition-transform duration-300',
              isCollapsed && 'rotate-180'
            )}
          />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const isItemActive = isActive(item.href);
            const hasSubmenu = item.submenu && item.submenu.length > 0;
            const isExpanded = expandedMenus.has(item.href);
            const isSubmenuItemActive =
              hasSubmenu && isSubmenuActive(item.submenu);

            return (
              <div key={item.href}>
                {hasSubmenu ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(item.href)}
                      className={cn(
                        'group flex w-full items-center rounded-lg text-sm font-medium transition-all duration-200',
                        isCollapsed
                          ? 'justify-center px-2 py-3'
                          : 'justify-start px-3 py-2',
                        isItemActive || isSubmenuItemActive
                          ? 'text-[hsl(var(--sidebar-active-foreground))] shadow-sm'
                          : 'text-foreground'
                      )}
                      style={{
                        backgroundColor:
                          isItemActive || isSubmenuItemActive
                            ? 'hsl(var(--sidebar-active))'
                            : 'transparent',
                      }}
                      onMouseEnter={(e) => {
                        if (!isItemActive && !isSubmenuItemActive) {
                          e.currentTarget.style.backgroundColor =
                            'hsl(var(--sidebar-hover))';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isItemActive && !isSubmenuItemActive) {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }
                      }}
                    >
                      <item.icon
                        className={cn(
                          'h-4 w-4 shrink-0',
                          !isCollapsed && 'mr-3'
                        )}
                      />
                      <AnimatePresence>
                        {!isCollapsed && (
                          <motion.div
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: 'auto' }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex flex-1 items-center justify-between overflow-hidden"
                          >
                            <div className="flex flex-col items-start text-left">
                              <span>{item.title}</span>
                              {item.description && (
                                <span className="text-xs opacity-70">
                                  {item.description}
                                </span>
                              )}
                            </div>
                            <ChevronDown
                              className={cn(
                                'h-4 w-4 transition-transform duration-200',
                                isExpanded && 'rotate-180'
                              )}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                    <AnimatePresence>
                      {!isCollapsed && isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="border-border/50 ml-4 mt-1 space-y-1 overflow-hidden border-l pl-4"
                        >
                          {item.submenu?.map((subItem) => (
                            <Link key={subItem.href} href={subItem.href}>
                              <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={cn(
                                  'flex items-center justify-start rounded-md px-3 py-1.5 text-left text-sm transition-all duration-200',
                                  pathname === subItem.href
                                    ? 'text-[hsl(var(--sidebar-active-foreground))]'
                                    : 'text-muted-foreground'
                                )}
                                style={{
                                  backgroundColor:
                                    pathname === subItem.href
                                      ? 'hsl(var(--accent))'
                                      : 'transparent',
                                }}
                                onMouseEnter={(e) => {
                                  if (pathname !== subItem.href) {
                                    e.currentTarget.style.backgroundColor =
                                      'hsl(var(--accent-hover))';
                                    e.currentTarget.style.color =
                                      'hsl(var(--accent-hover-foreground))';
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (pathname !== subItem.href) {
                                    e.currentTarget.style.backgroundColor =
                                      'transparent';
                                    e.currentTarget.style.color =
                                      'hsl(var(--muted-foreground))';
                                  }
                                }}
                              >
                                {subItem.title}
                              </motion.div>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link href={item.href}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        'group flex items-center rounded-lg text-sm font-medium transition-all duration-200',
                        isCollapsed
                          ? 'justify-center px-2 py-3'
                          : 'justify-start px-3 py-2',
                        isItemActive
                          ? 'text-[hsl(var(--sidebar-active-foreground))] shadow-sm'
                          : 'text-foreground'
                      )}
                      style={{
                        backgroundColor: isItemActive
                          ? 'hsl(var(--sidebar-active))'
                          : 'transparent',
                      }}
                      onMouseEnter={(e) => {
                        if (!isItemActive) {
                          e.currentTarget.style.backgroundColor =
                            'hsl(var(--sidebar-hover))';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isItemActive) {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }
                      }}
                    >
                      <item.icon
                        className={cn(
                          'h-4 w-4 shrink-0',
                          !isCollapsed && 'mr-3'
                        )}
                      />
                      <AnimatePresence>
                        {!isCollapsed && (
                          <motion.div
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: 'auto' }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex flex-col items-start overflow-hidden text-left"
                          >
                            <span>{item.title}</span>
                            {item.description && (
                              <span className="text-xs opacity-70">
                                {item.description}
                              </span>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <div className="bg-border my-4 h-px" />

        {/* Secondary Navigation */}
        <div className="space-y-1">
          {secondaryItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  'text-muted-foreground group flex items-center rounded-lg text-sm font-medium transition-all duration-200',
                  isCollapsed
                    ? 'justify-center px-2 py-3'
                    : 'justify-start px-3 py-2'
                )}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    'hsl(var(--sidebar-hover))';
                  e.currentTarget.style.color = 'hsl(var(--foreground))';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'hsl(var(--muted-foreground))';
                }}
              >
                <item.icon
                  className={cn('h-4 w-4 shrink-0', !isCollapsed && 'mr-3')}
                />
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden text-left"
                    >
                      {item.title}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t p-4">
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="text-muted-foreground text-center text-xs"
            >
                              <div className="mb-1">LitePanel</div>
              <div className="text-[10px]">v0.1.0</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
}
