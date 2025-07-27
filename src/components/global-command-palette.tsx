'use client';

import React from 'react';
import { CommandPalette } from '@/components/command-palette';

/**
 * Global command palette wrapper component
 * Manages the global state for the command palette
 * This is a client component since it uses React hooks
 */
export function GlobalCommandPalette() {
  const [open, setOpen] = React.useState(false);

  return <CommandPalette open={open} onOpenChange={setOpen} />;
}
