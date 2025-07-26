'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Bell,
  Settings,
  User,
  LogOut,
  Moon,
  Sun,
  Palette,
  Command,
  ChevronDown,
  Plus,
  HelpCircle,
  Keyboard,
  CreditCard,
  UserCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useThemeContext } from '@/context/theme-context';
import { ThemeSettingsDialog } from './theme-settings-dialog';
import { UserSettingsDialog } from './user-settings-dialog';
import { NotificationPopover } from './notification-popover';

interface TopbarProps {
  /** Callback to open the command palette */
  onCommandPaletteOpen: () => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Workspace options for the workspace picker
 */
const workspaces = [
  {
    id: 'personal',
    name: 'Personal',
    description: 'Your personal workspace',
    avatar: 'P',
  },
  {
    id: 'acme-corp',
    name: 'Acme Corp',
    description: 'Company workspace',
    avatar: 'AC',
  },
  {
    id: 'startup-inc',
    name: 'Startup Inc',
    description: 'Startup workspace',
    avatar: 'SI',
  },
];

/**
 * Mock notification count
 */
const notificationCount = 3;

/**
 * Mock user data
 */
const user = {
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
  initials: 'JD',
};

/**
 * Topbar component for the dashboard layout
 */
export function Topbar({ onCommandPaletteOpen, className }: TopbarProps) {
  const [selectedWorkspace, setSelectedWorkspace] = React.useState(workspaces[0]);
  const [themeDialogOpen, setThemeDialogOpen] = React.useState(false);
  const [userSettingsOpen, setUserSettingsOpen] = React.useState(false);
  const { isDark, toggleDarkMode } = useThemeContext();

  return (
    <header
      className={cn(
        'sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        className
      )}
    >
      {/* Left Section - Workspace Picker */}
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center space-x-2 text-left"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-medium">
                {selectedWorkspace.avatar}
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-medium">{selectedWorkspace.name}</div>
                <div className="text-xs text-muted-foreground">
                  {selectedWorkspace.description}
                </div>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-64">
            <DropdownMenuLabel>Switch Workspace</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {workspaces.map((workspace) => (
              <DropdownMenuItem
                key={workspace.id}
                onClick={() => setSelectedWorkspace(workspace)}
                className="flex items-center space-x-3"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-sm font-medium">
                  {workspace.avatar}
                </div>
                <div>
                  <div className="text-sm font-medium">{workspace.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {workspace.description}
                  </div>
                </div>
                {selectedWorkspace.id === workspace.id && (
                  <div className="ml-auto h-2 w-2 rounded-full bg-primary" />
                )}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Plus className="mr-2 h-4 w-4" />
              Create Workspace
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Center Section - Search */}
      <div className="flex-1 max-w-lg mx-8">
        <Button
          variant="outline"
          className="w-full justify-start text-muted-foreground"
          onClick={onCommandPaletteOpen}
        >
          <Search className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Search or jump to...</span>
          <span className="sm:hidden">Search...</span>
          <div className="ml-auto flex items-center space-x-1">
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <Command className="h-3 w-3" />
              <span>K</span>
            </kbd>
          </div>
        </Button>
      </div>

      {/* Right Section - Actions & User Menu */}
      <div className="flex items-center space-x-2">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleDarkMode}
          className="h-9 w-9 p-0"
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
          <motion.div
            initial={false}
            animate={{ rotate: isDark ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isDark ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </motion.div>
        </Button>

        {/* Notifications */}
        <NotificationPopover />

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-xs font-medium">
                    {user.initials}
                  </AvatarFallback>
                </Avatar>
              </motion.div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            {/* User Info Header */}
            <DropdownMenuLabel className="font-normal">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-sm font-medium">
                    {user.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </div>
            </DropdownMenuLabel>
            
            <DropdownMenuSeparator />
            
            {/* Account Section */}
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => setUserSettingsOpen(true)}>
                <UserCircle className="mr-2 h-4 w-4" />
                <span>Profile & Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing & Plans</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            
            <DropdownMenuSeparator />
            
            {/* Preferences Section */}
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => setUserSettingsOpen(true)}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setThemeDialogOpen(true)}>
                <Palette className="mr-2 h-4 w-4" />
                <span>Theme & Appearance</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Keyboard className="mr-2 h-4 w-4" />
                <span>Keyboard Shortcuts</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            
            <DropdownMenuSeparator />
            
            {/* Help Section */}
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help & Support</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            
            <DropdownMenuSeparator />
            
            {/* Sign Out */}
            <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Theme Settings Dialog */}
      <ThemeSettingsDialog
        open={themeDialogOpen}
        onOpenChange={setThemeDialogOpen}
      />

      {/* User Settings Dialog */}
      <UserSettingsDialog
        open={userSettingsOpen}
        onOpenChange={setUserSettingsOpen}
      />
    </header>
  );
} 