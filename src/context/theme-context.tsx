'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import type {
  ThemeName,
  ThemeContextValue,
  ThemeCustomization,
  HSLColor,
} from '@/types/theme';
import {
  getThemeConfig,
  applyThemeToDocument,
  hslToString,
} from '@/lib/themes';
import { useThemeStore } from '@/stores/theme.store';

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  /**
   * Enable system theme detection
   * @default true
   */
  enableSystem?: boolean;
  /**
   * Disable transitions on theme change
   * @default false
   */
  disableTransitionOnChange?: boolean;
}

/**
 * Apply Neutral Pro theme with proper CSS variables
 */
function applyNeutralProTheme(isDark: boolean = true) {
  if (typeof window === 'undefined') return;

  

  const theme = getThemeConfig('neutral-pro');
  const root = document.documentElement;

  // Clear any existing theme classes and attributes
  root.classList.remove('light', 'dark');
  root.removeAttribute('data-theme');

  // Apply dark/light mode class
  root.classList.add(isDark ? 'dark' : 'light');

  // Set theme attribute
  root.setAttribute('data-theme', 'neutral-pro');

  // Apply theme variables - use the correct theme object structure
  const vars = isDark ? theme.cssVars.dark : theme.cssVars.light;
  if (vars) {
    Object.entries(vars).forEach(([property, value]) => {
      root.style.setProperty(property, value);

    });
  }

  // Force specific neutral-pro colors to override any customization
  if (isDark) {
    // Neutral Pro Dark colors
    root.style.setProperty('--background', '240 10% 3.9%');
    root.style.setProperty('--foreground', '0 0% 98%');
    root.style.setProperty('--card', '240 10% 3.9%');
    root.style.setProperty('--card-foreground', '0 0% 98%');
    root.style.setProperty('--popover', '240 10% 3.9%');
    root.style.setProperty('--popover-foreground', '0 0% 98%');
    root.style.setProperty('--primary', '0 0% 98%');
    root.style.setProperty('--primary-foreground', '240 5.9% 10%');
    root.style.setProperty('--secondary', '240 3.7% 15.9%');
    root.style.setProperty('--secondary-foreground', '0 0% 98%');
    root.style.setProperty('--muted', '240 3.7% 15.9%');
    root.style.setProperty('--muted-foreground', '240 5% 64.9%');
    root.style.setProperty('--accent', '240 3.7% 15.9%');
    root.style.setProperty('--accent-foreground', '0 0% 98%');
    root.style.setProperty('--destructive', '0 62.8% 30.6%');
    root.style.setProperty('--destructive-foreground', '0 0% 98%');
    root.style.setProperty('--border', '240 3.7% 15.9%');
    root.style.setProperty('--input', '240 3.7% 15.9%');
    root.style.setProperty('--ring', '240 4.9% 83.9%');
  } else {
    // Neutral Pro Light colors
    root.style.setProperty('--background', '0 0% 100%');
    root.style.setProperty('--foreground', '240 10% 3.9%');
    root.style.setProperty('--card', '0 0% 100%');
    root.style.setProperty('--card-foreground', '240 10% 3.9%');
    root.style.setProperty('--popover', '0 0% 100%');
    root.style.setProperty('--popover-foreground', '240 10% 3.9%');
    root.style.setProperty('--primary', '240 5.9% 10%');
    root.style.setProperty('--primary-foreground', '0 0% 98%');
    root.style.setProperty('--secondary', '240 4.8% 95.9%');
    root.style.setProperty('--secondary-foreground', '240 5.9% 10%');
    root.style.setProperty('--muted', '240 4.8% 95.9%');
    root.style.setProperty('--muted-foreground', '240 3.8% 46.1%');
    root.style.setProperty('--accent', '240 4.8% 95.9%');
    root.style.setProperty('--accent-foreground', '240 5.9% 10%');
    root.style.setProperty('--destructive', '0 84.2% 60.2%');
    root.style.setProperty('--destructive-foreground', '0 0% 98%');
    root.style.setProperty('--border', '240 5.9% 90%');
    root.style.setProperty('--input', '240 5.9% 90%');
    root.style.setProperty('--ring', '240 5.9% 10%');
  }

  
}

// Apply default theme immediately when module loads
if (typeof window !== 'undefined') {
  applyNeutralProTheme(true); // Default to dark mode
}

/**
 * Theme provider component that wraps the application with theme context
 */
export function ThemeProvider({
  children,
  enableSystem = true,
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  const {
    theme: nextTheme,
    setTheme: setNextTheme,
    resolvedTheme,
  } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  // Use Zustand store instead of local state
  const {
    theme: currentTheme, // Will always be 'neutral-pro'
    customization,
    isDark: storeDarkMode,
    _hasHydrated: hasHydrated,
    setTheme: setStoreTheme, // Disabled but kept for compatibility
    toggleDarkMode: storeToggleDarkMode,
    updateCustomization,
    resetCustomization,
  } = useThemeStore();

  // Apply initial theme immediately on client side
  useEffect(() => {
    applyNeutralProTheme(storeDarkMode);
  }, [storeDarkMode]);

  // Sync next-themes with our store
  useEffect(() => {
    if (mounted && hasHydrated && nextTheme) {
      const shouldBeDark = storeDarkMode;
      const currentNextTheme = resolvedTheme === 'dark';

      if (shouldBeDark !== currentNextTheme) {
        setNextTheme(shouldBeDark ? 'dark' : 'light');
      }
    }
  }, [
    storeDarkMode,
    mounted,
    hasHydrated,
    nextTheme,
    resolvedTheme,
    setNextTheme,
  ]);

  // Handle hydration and apply theme
  useEffect(() => {
    if (!hasHydrated) return;

    setMounted(true);

    // Apply theme after hydration
    const isDarkMode = storeDarkMode;

    // Set next-themes to match our store
    setNextTheme(isDarkMode ? 'dark' : 'light');

    // Disable transitions temporarily to prevent flash
    const css = document.createElement('style');
    css.appendChild(
      document.createTextNode(
        `*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`
      )
    );
    document.head.appendChild(css);

    // Apply the theme with correct colors
    applyNeutralProTheme(isDarkMode);

    // Don't apply customization initially - let theme colors take precedence
    // applyInitialCustomization(customization);

    // Force repaint
    document.body.offsetHeight;

    // Remove transition disable after a brief moment
    setTimeout(() => {
      if (document.head.contains(css)) {
        document.head.removeChild(css);
      }
      setIsInitializing(false);
    }, 100);
  }, [hasHydrated, storeDarkMode, setNextTheme]);

  // Apply theme when dark mode changes
  useEffect(() => {
    if (!mounted || !hasHydrated || isInitializing) return;

    const isDarkMode = storeDarkMode;

    if (disableTransitionOnChange) {
      const css = document.createElement('style');
      css.appendChild(
        document.createTextNode(
          `*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`
        )
      );
      document.head.appendChild(css);

      // Force repaint
      document.body.offsetHeight;

      setTimeout(() => {
        if (document.head.contains(css)) {
          document.head.removeChild(css);
        }
      }, 1);
    }

    applyNeutralProTheme(isDarkMode);
  }, [
    storeDarkMode,
    mounted,
    hasHydrated,
    disableTransitionOnChange,
    isInitializing,
  ]);

  // Apply customization (but don't override base theme colors)
  useEffect(() => {
    if (!mounted || !hasHydrated || isInitializing) return;

    // Only apply layout customization, not colors
    applyLayoutCustomization();
  }, [customization, mounted, hasHydrated, isInitializing]);

  /**
   * Apply initial customization without transitions
   */
  const applyInitialCustomization = (
    initialCustomization: ThemeCustomization
  ) => {
    const root = document.documentElement;

    // Apply border radius multiplier
    const baseRadius =
      getThemeConfig('neutral-pro').cssVars.light['--radius'] || '0.25rem';
    const radiusValue = parseFloat(baseRadius.replace('rem', ''));
    root.style.setProperty(
      '--radius',
      `${radiusValue * initialCustomization.borderRadius}rem`
    );

    // Apply font size multiplier
    root.style.setProperty(
      '--font-size-multiplier',
      initialCustomization.fontSize.toString()
    );
  };

  /**
   * Apply layout customization only (not colors to preserve theme)
   */
  const applyLayoutCustomization = () => {
    const root = document.documentElement;

    // Apply border radius multiplier
    const baseRadius =
      getThemeConfig('neutral-pro').cssVars.light['--radius'] || '0.25rem';
    const radiusValue = parseFloat(baseRadius.replace('rem', ''));
    root.style.setProperty(
      '--radius',
      `${radiusValue * customization.borderRadius}rem`
    );

    // Apply font size multiplier
    root.style.setProperty(
      '--font-size-multiplier',
      customization.fontSize.toString()
    );
  };

  /**
   * Set the current theme (disabled - always stays neutral-pro)
   */
  const setTheme = (theme: ThemeName) => {
    setStoreTheme(theme); // Will be ignored by store
  };

  /**
   * Toggle dark mode
   */
  const toggleDarkMode = () => {
    storeToggleDarkMode();
  };

  /**
   * Update customization (only layout, not colors)
   */
  const updateCustomizationOverride = (
    updates: Partial<ThemeCustomization>
  ) => {
    // Only allow layout updates, preserve theme colors
    const layoutOnlyUpdates = {
      borderRadius: updates.borderRadius,
      fontSize: updates.fontSize,
    };

    // Filter out undefined values
    const filteredUpdates = Object.fromEntries(
      Object.entries(layoutOnlyUpdates).filter(
        ([_, value]) => value !== undefined
      )
    ) as Partial<ThemeCustomization>;

    if (Object.keys(filteredUpdates).length > 0) {
      updateCustomization(filteredUpdates);
    }
  };

  /**
   * Apply custom HSL color to a CSS variable
   */
  const applyCustomColor = (variable: string, color: HSLColor) => {
    // Disabled to preserve theme colors
    console.log(
      'Custom color application disabled to preserve theme integrity'
    );
  };

  const contextValue: ThemeContextValue = {
    theme: 'neutral-pro', // Always neutral-pro
    isDark: mounted && hasHydrated ? storeDarkMode : true, // Default to dark while hydrating
    setTheme,
    toggleDarkMode,
    customization,
    updateCustomization: updateCustomizationOverride,
    resetCustomization,
    applyCustomColor,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to use the theme context
 * @returns Theme context value
 * @throws Error if used outside of ThemeProvider (only in development)
 */
export function useThemeContext(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // In production or during SSR, return safe defaults instead of throwing
    if (
      typeof window === 'undefined' ||
      process.env.NODE_ENV === 'production'
    ) {
      return {
        theme: 'neutral-pro' as ThemeName,
        isDark: true, // Default to dark mode
        setTheme: () => {},
        toggleDarkMode: () => {},
        customization: {
          primaryColor: { h: 280, s: 100, l: 70 },
          secondaryColor: { h: 315, s: 20, l: 90 },
          accentColor: { h: 320, s: 30, l: 85 },
          borderRadius: 1,
          fontSize: 1,
        },
        updateCustomization: () => {},
        resetCustomization: () => {},
        applyCustomColor: () => {},
      };
    }
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}

/**
 * Hook to check if we're within a ThemeProvider
 */
export function useIsThemeProviderAvailable(): boolean {
  const context = useContext(ThemeContext);
  return context !== undefined;
}

/**
 * Hook to get theme configuration for the current theme (always Neutral Pro)
 */
export function useCurrentThemeConfig() {
  return getThemeConfig('neutral-pro');
}
