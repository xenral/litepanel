'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import type { 
  ThemeName, 
  ThemeContextValue, 
  ThemeCustomization, 
  HSLColor 
} from '@/types/theme';
import { 
  getThemeConfig, 
  applyThemeToDocument, 
  hslToString 
} from '@/lib/themes';

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Default theme customization settings
 */
const DEFAULT_CUSTOMIZATION: ThemeCustomization = {
  primaryColor: { h: 280, s: 100, l: 70 },
  secondaryColor: { h: 315, s: 20, l: 90 },
  accentColor: { h: 320, s: 30, l: 85 },
  borderRadius: 1,
  fontSize: 1,
};

/**
 * Get initial theme from localStorage without causing hydration issues
 */
function getInitialTheme(): ThemeName {
  if (typeof window === 'undefined') {
    return 'playful-pastel';
  }
  
  try {
    const savedTheme = localStorage.getItem('themecraft-theme') as ThemeName;
    if (savedTheme && ['playful-pastel', 'neutral-pro', 'high-contrast'].includes(savedTheme)) {
      return savedTheme;
    }
  } catch (error) {
    console.warn('Failed to read saved theme:', error);
  }
  
  return 'playful-pastel';
}

/**
 * Get initial customization from localStorage without causing hydration issues
 */
function getInitialCustomization(): ThemeCustomization {
  if (typeof window === 'undefined') {
    return DEFAULT_CUSTOMIZATION;
  }
  
  try {
    const savedCustomization = localStorage.getItem('themecraft-customization');
    if (savedCustomization) {
      const parsed = JSON.parse(savedCustomization);
      return { ...DEFAULT_CUSTOMIZATION, ...parsed };
    }
  } catch (error) {
    console.warn('Failed to parse saved theme customization:', error);
  }
  
  return DEFAULT_CUSTOMIZATION;
}

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
 * Theme provider component that wraps the application with theme context
 */
export function ThemeProvider({
  children,
  enableSystem = true,
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  const { theme: nextTheme, setTheme: setNextTheme, resolvedTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<ThemeName>(() => getInitialTheme());
  const [customization, setCustomization] = useState<ThemeCustomization>(() => getInitialCustomization());
  const [mounted, setMounted] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  // Handle hydration and apply initial theme immediately
  useEffect(() => {
    setMounted(true);
    
    // Apply initial theme immediately without animation to prevent flash
    const initialTheme = getInitialTheme();
    const initialCustomization = getInitialCustomization();
    
    // Only update state if different from initial values
    if (initialTheme !== currentTheme) {
      setCurrentTheme(initialTheme);
    }
    
    if (JSON.stringify(initialCustomization) !== JSON.stringify(customization)) {
      setCustomization(initialCustomization);
    }
    
    // Apply theme immediately on mount
    const themeConfig = getThemeConfig(initialTheme);
    const isDark = document.documentElement.classList.contains('dark');
    
    // Disable transitions temporarily to prevent flash
    const css = document.createElement('style');
    css.appendChild(
      document.createTextNode(
        `*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`
      )
    );
    document.head.appendChild(css);

    applyThemeToDocument(themeConfig, isDark);
    applyInitialCustomization(initialCustomization, initialTheme);
    
    // Force repaint
    document.body.offsetHeight;
    
    // Remove transition disable after a brief moment
    setTimeout(() => {
      if (document.head.contains(css)) {
        document.head.removeChild(css);
      }
      setIsInitializing(false);
    }, 50);
  }, []);

  // Apply theme when it changes (after initial mount)
  useEffect(() => {
    if (!mounted || isInitializing) return;

    const themeConfig = getThemeConfig(currentTheme);
    const isDark = resolvedTheme === 'dark';

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

    applyThemeToDocument(themeConfig, isDark);
    
    // Save theme preference
    localStorage.setItem('themecraft-theme', currentTheme);
  }, [currentTheme, resolvedTheme, mounted, disableTransitionOnChange, isInitializing]);

  // Apply customization (after initial mount)
  useEffect(() => {
    if (!mounted || isInitializing) return;
    
    applyCustomization();
    
    // Save customization
    localStorage.setItem('themecraft-customization', JSON.stringify(customization));
  }, [customization, mounted, isInitializing]);

  /**
   * Apply initial customization without transitions
   */
  const applyInitialCustomization = (initialCustomization: ThemeCustomization, themeName: ThemeName) => {
    const root = document.documentElement;
    
    // Apply custom colors
    root.style.setProperty('--primary', hslToString(initialCustomization.primaryColor));
    root.style.setProperty('--secondary', hslToString(initialCustomization.secondaryColor));
    root.style.setProperty('--accent', hslToString(initialCustomization.accentColor));
    
    // Apply border radius multiplier
    const baseRadius = getThemeConfig(themeName).cssVars.light['--radius'] || '0.5rem';
    const radiusValue = parseFloat(baseRadius.replace('rem', ''));
    root.style.setProperty('--radius', `${radiusValue * initialCustomization.borderRadius}rem`);
    
    // Apply font size multiplier
    root.style.setProperty('--font-size-multiplier', initialCustomization.fontSize.toString());
  };

  /**
   * Apply current customization to CSS variables
   */
  const applyCustomization = () => {
    const root = document.documentElement;
    
    // Apply custom colors
    root.style.setProperty('--primary', hslToString(customization.primaryColor));
    root.style.setProperty('--secondary', hslToString(customization.secondaryColor));
    root.style.setProperty('--accent', hslToString(customization.accentColor));
    
    // Apply border radius multiplier
    const baseRadius = getThemeConfig(currentTheme).cssVars.light['--radius'] || '0.5rem';
    const radiusValue = parseFloat(baseRadius.replace('rem', ''));
    root.style.setProperty('--radius', `${radiusValue * customization.borderRadius}rem`);
    
    // Apply font size multiplier
    root.style.setProperty('--font-size-multiplier', customization.fontSize.toString());
  };

  /**
   * Set the current theme
   */
  const setTheme = (theme: ThemeName) => {
    setCurrentTheme(theme);
  };

  /**
   * Toggle dark mode
   */
  const toggleDarkMode = () => {
    setNextTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  /**
   * Update customization settings
   */
  const updateCustomization = (updates: Partial<ThemeCustomization>) => {
    setCustomization(prev => ({ ...prev, ...updates }));
  };

  /**
   * Reset customization to defaults
   */
  const resetCustomization = () => {
    setCustomization(DEFAULT_CUSTOMIZATION);
  };

  /**
   * Apply custom HSL color to a CSS variable
   */
  const applyCustomColor = (variable: string, color: HSLColor) => {
    const root = document.documentElement;
    root.style.setProperty(variable, hslToString(color));
  };

  const contextValue: ThemeContextValue = {
    theme: currentTheme,
    isDark: mounted ? resolvedTheme === 'dark' : false,
    setTheme,
    toggleDarkMode,
    customization,
    updateCustomization,
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
    if (typeof window === 'undefined' || process.env.NODE_ENV === 'production') {
      return {
        theme: 'playful-pastel' as ThemeName,
        isDark: false,
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
 * Hook to get theme configuration for the current theme
 */
export function useCurrentThemeConfig() {
  const { theme } = useThemeContext();
  return getThemeConfig(theme);
} 