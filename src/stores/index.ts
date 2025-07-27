import { useAuthStore } from './auth.store';
import { useThemeStore } from './theme.store';

// Store exports
export { useThemeStore, type ThemeStore } from './theme.store';
export { useAuthStore, type AuthStore, type AuthUser } from './auth.store';

// Store utilities
export const stores = {
  theme: useThemeStore,
  auth: useAuthStore,
} as const;

// Helper functions for accessing store state outside of React components
export const getThemeState = () => useThemeStore.getState();
export const getAuthState = () => useAuthStore.getState();

// Helper for checking authentication status
export const isAuthenticated = () => getAuthState().isAuthenticated;

// Helper for getting current theme info
export const getCurrentTheme = () => {
  const state = getThemeState();
  return {
    theme: state.theme,
    isDark: state.isDark,
    customization: state.customization,
    hasHydrated: state._hasHydrated,
  };
};

// Helper for checking if stores have hydrated
export const hasStoresHydrated = () => {
  const themeState = getThemeState();
  return themeState._hasHydrated;
}; 