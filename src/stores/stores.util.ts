import { useThemeStore } from './theme.store';
import { useAuthStore } from './auth.store';
import type { ThemeName } from '@/types/theme';

/**
 * Utilities for theme store management
 */
export const themeUtils = {
  /**
   * Reset theme to default (Neutral Pro Dark) and clear any color customization
   */
  resetToDefault: () => {
    const { setTheme, setIsDark, resetCustomization } =
      useThemeStore.getState();

    // Clear localStorage to prevent conflicts
    localStorage.removeItem('litepanel-theme-storage');
    localStorage.removeItem('litepanel-theme');
    localStorage.removeItem('litepanel-customization');

    setTheme('neutral-pro');
    setIsDark(true);
    resetCustomization();

    console.log('Theme reset to Neutral Pro Dark with default settings');
  },

  /**
   * Force apply Neutral Pro colors (emergency reset)
   */
  forceNeutralProColors: () => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    const { isDark } = useThemeStore.getState();

    console.log('Force applying Neutral Pro colors...');

    // Clear existing classes and attributes
    root.classList.remove('light', 'dark');
    root.removeAttribute('data-theme');

    // Apply correct theme
    root.classList.add(isDark ? 'dark' : 'light');
    root.setAttribute('data-theme', 'neutral-pro');

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

    console.log('Neutral Pro colors force applied successfully');
  },

  /**
   * Apply theme preset
   */
  applyPreset: (theme: ThemeName, isDark: boolean = true) => {
    const { setTheme, setIsDark } = useThemeStore.getState();
    setTheme(theme);
    setIsDark(isDark);
  },

  /**
   * Get theme CSS variables for current theme
   */
  getCurrentCssVars: () => {
    const { theme, isDark } = useThemeStore.getState();
    return {
      theme,
      isDark,
      cssClass: `theme-${theme}${isDark ? ' dark' : ''}`,
    };
  },
};

/**
 * Utilities for auth store management
 */
export const authUtils = {
  /**
   * Clear all auth data (logout)
   */
  clearAuth: () => {
    const { logout } = useAuthStore.getState();
    logout();
  },

  /**
   * Check if user has valid token
   */
  hasValidToken: () => {
    const { token, isAuthenticated } = useAuthStore.getState();
    return isAuthenticated && !!token;
  },

  /**
   * Get user display name
   */
  getUserDisplayName: () => {
    const { user } = useAuthStore.getState();
    return user?.name || user?.email || 'User';
  },

  /**
   * Update user profile data
   */
  updateProfile: (updates: { name?: string; avatar?: string }) => {
    const { user, setUser } = useAuthStore.getState();
    if (user) {
      setUser({ ...user, ...updates });
    }
  },
};

/**
 * Combined store utilities
 */
export const storeUtils = {
  theme: themeUtils,
  auth: authUtils,

  /**
   * Reset all stores to default state
   */
  resetAll: () => {
    themeUtils.resetToDefault();
    authUtils.clearAuth();
  },

  /**
   * Emergency theme fix - force apply correct colors
   */
  emergencyThemeFix: () => {
    console.log('Applying emergency theme fix...');
    themeUtils.resetToDefault();
    setTimeout(() => {
      themeUtils.forceNeutralProColors();
      window.location.reload();
    }, 100);
  },

  /**
   * Get application state summary
   */
  getAppState: () => {
    const themeState = useThemeStore.getState();
    const authState = useAuthStore.getState();

    return {
      theme: {
        current: themeState.theme,
        isDark: themeState.isDark,
        hasCustomization:
          JSON.stringify(themeState.customization) !==
          JSON.stringify({
            primaryColor: { h: 0, s: 0, l: 98 },
            secondaryColor: { h: 240, s: 4, l: 16 },
            accentColor: { h: 240, s: 4, l: 16 },
            borderRadius: 1,
            fontSize: 1,
          }),
      },
      auth: {
        isAuthenticated: authState.isAuthenticated,
        hasUser: !!authState.user,
        userEmail: authState.user?.email,
      },
    };
  },
};
