'use client';

import React from 'react';
import { Sidebar } from '@/components/dashboard/sidebar';
import { Topbar } from '@/components/dashboard/topbar';
import { CommandPalette } from '@/components/command-palette';
import { MobileSidebar } from '@/components/dashboard/mobile-sidebar';
import { useMediaQuery } from '@/hooks/use-media-query';

interface DashboardLayoutClientProps {
  children: React.ReactNode;
}

/**
 * Dashboard layout client component with sidebar, topbar, and content area
 * This is a client component to handle interactive state and theme context
 * Now includes mobile-responsive sidebar drawer
 */
export function DashboardLayoutClient({
  children,
}: DashboardLayoutClientProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = React.useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);
  
  // Check if we're on a mobile device (screens smaller than 768px)
  const isMobile = useMediaQuery('(max-width: 767px)');

  /**
   * Toggle sidebar collapsed state (desktop only)
   */
  const toggleSidebar = React.useCallback(() => {
    setSidebarCollapsed((prev) => !prev);
  }, []);

  /**
   * Toggle mobile sidebar drawer
   */
  const toggleMobileSidebar = React.useCallback(() => {
    setMobileSidebarOpen((prev) => !prev);
  }, []);

  /**
   * Close mobile sidebar
   */
  const closeMobileSidebar = React.useCallback(() => {
    setMobileSidebarOpen(false);
  }, []);

  /**
   * Open command palette
   */
  const openCommandPalette = React.useCallback(() => {
    setCommandPaletteOpen(true);
  }, []);

  return (
    <div className="bg-background flex h-screen">
      {/* Desktop Sidebar - Hidden on mobile */}
      {!isMobile && (
        <Sidebar
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={toggleSidebar}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      {isMobile && (
        <MobileSidebar
          open={mobileSidebarOpen}
          onOpenChange={setMobileSidebarOpen}
          onClose={closeMobileSidebar}
        />
      )}

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <Topbar 
          onCommandPaletteOpen={openCommandPalette}
          onMobileSidebarToggle={toggleMobileSidebar}
          isMobile={isMobile}
        />

        {/* Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>

      {/* Command Palette */}
      <CommandPalette
        open={commandPaletteOpen}
        onOpenChange={setCommandPaletteOpen}
      />
    </div>
  );
}
