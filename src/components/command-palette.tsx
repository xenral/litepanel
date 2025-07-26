'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Calculator,
  Calendar,
  CreditCard,
  FileText,
  Home,
  Settings,
  Smile,
  User,
  BarChart3,
  Table,
  Bell,
  Users,
  Search,
  Palette,
  Moon,
  Sun,
} from 'lucide-react';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import { useThemeContext } from '@/context/theme-context';
import { getAllThemes } from '@/lib/themes';

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Global command palette component providing search and navigation functionality
 * Accessed via Cmd/Ctrl + K
 */
export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();
  const { setTheme, toggleDarkMode, isDark } = useThemeContext();
  const themes = getAllThemes();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, onOpenChange]);

  const runCommand = React.useCallback(
    (command: () => unknown) => {
      onOpenChange(false);
      command();
    },
    [onOpenChange]
  );

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigation">
          <CommandItem
            onSelect={() => runCommand(() => router.push('/'))}
            className="flex items-center"
          >
            <Home className="mr-2 h-4 w-4" />
            <span>Home</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push('/dashboard'))}
            className="flex items-center"
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push('/dashboard/analytics'))}
            className="flex items-center"
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            <span>Analytics</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push('/dashboard/table'))}
            className="flex items-center"
          >
            <Table className="mr-2 h-4 w-4" />
            <span>Data Table</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push('/dashboard/forms'))}
            className="flex items-center"
          >
            <FileText className="mr-2 h-4 w-4" />
            <span>Forms</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push('/dashboard/settings'))}
            className="flex items-center"
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push('/dashboard/notifications'))}
            className="flex items-center"
          >
            <Bell className="mr-2 h-4 w-4" />
            <span>Notifications</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />
        <CommandGroup heading="Themes">
          {themes.map((theme) => (
            <CommandItem
              key={theme.id}
              onSelect={() => runCommand(() => setTheme(theme.id))}
              className="flex items-center"
            >
              <Palette className="mr-2 h-4 w-4" />
              <span>{theme.name}</span>
            </CommandItem>
          ))}
          <CommandItem
            onSelect={() => runCommand(toggleDarkMode)}
            className="flex items-center"
          >
            {isDark ? (
              <Sun className="mr-2 h-4 w-4" />
            ) : (
              <Moon className="mr-2 h-4 w-4" />
            )}
            <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
          </CommandItem>
        </CommandGroup>
  
        <CommandSeparator />
  
        <CommandGroup heading="Quick Actions">
          <CommandItem className="flex items-center">
            <Calculator className="mr-2 h-4 w-4" />
            <span>Calculator</span>
          </CommandItem>
          <CommandItem className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem className="flex items-center">
            <Search className="mr-2 h-4 w-4" />
            <span>Search Files</span>
          </CommandItem>
          <CommandItem className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            <span>Invite Team Member</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="User">
          <CommandItem className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem className="flex items-center">
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
} 