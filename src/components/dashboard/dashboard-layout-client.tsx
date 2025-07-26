'use client';

import React from 'react';
import { Sidebar } from '@/components/dashboard/sidebar';
import { Topbar } from '@/components/dashboard/topbar';
import { CommandPalette } from '@/components/command-palette';

interface DashboardLayoutClientProps {
  children: React.ReactNode;
}

/**
 * Dashboard layout client component with sidebar, topbar, and content area
 * This is a client component to handle interactive state and theme context
 */
export function DashboardLayoutClient({ children }: DashboardLayoutClientProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = React.useState(false);

  /**
   * Toggle sidebar collapsed state
   */
  const toggleSidebar = React.useCallback(() => {
    setSidebarCollapsed((prev) => !prev);
  }, []);

  /**
   * Open command palette
   */
  const openCommandPalette = React.useCallback(() => {
    setCommandPaletteOpen(true);
  }, []);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={toggleSidebar}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <Topbar onCommandPaletteOpen={openCommandPalette} />

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
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