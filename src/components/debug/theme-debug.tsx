'use client';

import { useThemeStore } from '@/stores/theme.store';
import { useThemeContext } from '@/context/theme-context';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

/**
 * Debug component to show theme hydration status - only for development
 */
export function ThemeDebug() {
  const { theme, isDark, _hasHydrated } = useThemeStore();
  const { theme: contextTheme, isDark: contextIsDark } = useThemeContext();
  const [loadTime, setLoadTime] = useState<number>(0);

  useEffect(() => {
    const start = Date.now();
    const timer = setInterval(() => {
      setLoadTime(Date.now() - start);
    }, 100);

    return () => clearInterval(timer);
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const handleReset = () => {
    // Clear all theme-related localStorage
    localStorage.removeItem('themecraft-theme-storage');
    localStorage.removeItem('themecraft-theme');
    localStorage.removeItem('themecraft-customization');
    
    // Reload page to start fresh
    window.location.reload();
  };

  const isDefaultTheme = theme === 'neutral-pro' && isDark === true;
  const isProtectionActive = loadTime < 2000; // Protection is active for first 2 seconds

  return (
    <div 
      className="fixed bottom-4 right-4 bg-background border border-border rounded-lg p-3 text-xs font-mono shadow-lg z-50"
      style={{ opacity: 0.9 }}
    >
      <div className="font-semibold mb-2">Theme Debug Info</div>
      <div>Load Time: {Math.round(loadTime / 100) / 10}s</div>
      <div>Protection: {isProtectionActive ? '🔒 Active' : '🔓 Inactive'}</div>
      <div>Store Hydrated: {_hasHydrated ? '✅' : '❌'}</div>
      <div>Default Theme: {isDefaultTheme ? '✅' : '❌'}</div>
      <div>Store Theme: {theme}</div>
      <div>Store Dark: {isDark ? '🌙' : '☀️'}</div>
      <div>Context Theme: {contextTheme}</div>
      <div>Context Dark: {contextIsDark ? '🌙' : '☀️'}</div>
      <div>Match: {theme === contextTheme && isDark === contextIsDark ? '✅' : '❌'}</div>
      <Button 
        onClick={handleReset}
        size="sm"
        variant="outline"
        className="mt-2 text-xs h-6"
      >
        Reset & Reload
      </Button>
    </div>
  );
} 