'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useThemeContext } from '@/context/theme-context';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  navigationItems,
  secondaryItems,
  type NavigationItem,
} from '@/data/navigation.data';

interface MobileSidebarProps {
  /** Whether the mobile sidebar is open */
  open: boolean;
  /** Callback to change open state */
  onOpenChange: (open: boolean) => void;
  /** Callback to close the sidebar */
  onClose: () => void;
}

/**
 * Mobile sidebar drawer component using Sheet
 */
export function MobileSidebar({
  open,
  onOpenChange,
  onClose,
}: MobileSidebarProps) {
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
    const newExpanded = new Set(expandedMenus);
    if (newExpanded.has(href)) {
      newExpanded.delete(href);
    } else {
      newExpanded.add(href);
    }
    setExpandedMenus(newExpanded);
  };

  /**
   * Handle navigation item click - close drawer after navigation
   */
  const handleItemClick = () => {
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="w-80 p-0 transition-all duration-300 ease-in-out"
        style={{
          backgroundColor: 'hsl(var(--sidebar-background))',
        }}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <SheetHeader className="border-b p-4">
            <div className="flex items-center space-x-2">
              <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
                <Palette className="text-primary-foreground h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <SheetTitle className="text-left text-sm font-semibold">
                  LitePanel
                </SheetTitle>
                <span className="text-muted-foreground text-xs">Admin</span>
              </div>
            </div>
          </SheetHeader>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
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
                        <motion.button
                          onClick={() => toggleSubmenu(item.href)}
                          whileHover={{ scale: 1.02, x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ duration: 0.2, ease: 'easeInOut' }}
                          className={cn(
                            'group flex w-full items-center justify-start rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
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
                              e.currentTarget.style.backgroundColor =
                                'transparent';
                            }
                          }}
                        >
                          <item.icon className="mr-3 h-4 w-4 shrink-0" />
                          <div className="flex flex-1 items-center justify-between">
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
                          </div>
                        </motion.button>
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="border-border/50 ml-4 mt-1 space-y-1 overflow-hidden border-l pl-4"
                            >
                              {item.submenu?.map((subItem) => (
                                <Link
                                  key={subItem.href}
                                  href={subItem.href}
                                  onClick={handleItemClick}
                                >
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
                      <Link href={item.href} onClick={handleItemClick}>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={cn(
                            'group flex items-center justify-start rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
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
                              e.currentTarget.style.backgroundColor =
                                'transparent';
                            }
                          }}
                        >
                          <item.icon className="mr-3 h-4 w-4 shrink-0" />
                          <div className="flex flex-col items-start text-left">
                            <span>{item.title}</span>
                            {item.description && (
                              <span className="text-xs opacity-70">
                                {item.description}
                              </span>
                            )}
                          </div>
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
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleItemClick}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="text-muted-foreground group flex items-center justify-start rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        'hsl(var(--sidebar-hover))';
                      e.currentTarget.style.color = 'hsl(var(--foreground))';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color =
                        'hsl(var(--muted-foreground))';
                    }}
                  >
                    <item.icon className="mr-3 h-4 w-4 shrink-0" />
                    <span>{item.title}</span>
                  </motion.div>
                </Link>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="border-t p-4">
            <div className="text-muted-foreground text-center text-xs">
              <div className="mb-1">LitePanel</div>
              <div className="text-[10px]">v0.1.0</div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
