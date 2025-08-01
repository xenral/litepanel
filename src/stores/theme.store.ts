import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { ThemeName, ThemeCustomization, HSLColor } from '@/types/theme';

/**
 * Default theme customization settings - layout only, no colors
 */
const DEFAULT_CUSTOMIZATION: ThemeCustomization = {
  // These colors won't be used since we're forcing Neutral Pro colors
  primaryColor: { h: 0, s: 0, l: 98 }, // Neutral Pro primary
  secondaryColor: { h: 240, s: 4, l: 16 }, // Neutral Pro secondary
  accentColor: { h: 240, s: 4, l: 16 }, // Neutral Pro accent
  borderRadius: 1,
  fontSize: 1,
};

// Force Neutral Pro theme only
const LOCKED_THEME: ThemeName = 'neutral-pro';

export interface ThemeStore {
  // State
  theme: ThemeName;
  customization: ThemeCustomization;
  isDark: boolean;
  _hasHydrated: boolean;

  // Actions
  setTheme: (theme: ThemeName) => void; // Will be disabled but kept for compatibility
  setIsDark: (isDark: boolean) => void;
  toggleDarkMode: () => void;
  updateCustomization: (updates: Partial<ThemeCustomization>) => void;
  resetCustomization: () => void;
  setHasHydrated: (hasHydrated: boolean) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      // Initial state - locked to Neutral Pro Dark
      theme: LOCKED_THEME,
      customization: DEFAULT_CUSTOMIZATION,
      isDark: true, // Default to dark mode
      _hasHydrated: false,

      // Actions
      setTheme: (theme) => {
        // Silently ignore theme changes - always stay on neutral-pro
        console.log(
          'Theme switching is currently disabled. Using Neutral Pro theme.'
        );
        set({ theme: LOCKED_THEME });
      },

      setIsDark: (isDark) => set({ isDark }),

      toggleDarkMode: () => set((state) => ({ isDark: !state.isDark })),

      updateCustomization: (updates) => {
        set((state) => ({
          customization: { ...state.customization, ...updates },
        }));
      },

      resetCustomization: () => {
        set({ customization: DEFAULT_CUSTOMIZATION });
      },

      setHasHydrated: (hasHydrated) => set({ _hasHydrated: hasHydrated }),
    }),
    {
      name: 'litepanel-theme-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        theme: LOCKED_THEME, // Always save neutral-pro
        customization: {
          // Only save layout settings, not colors
          borderRadius: state.customization.borderRadius,
          fontSize: state.customization.fontSize,
          // Set neutral colors
          primaryColor: { h: 0, s: 0, l: 98 },
          secondaryColor: { h: 240, s: 4, l: 16 },
          accentColor: { h: 240, s: 4, l: 16 },
        },
        isDark: state.isDark,
      }),
      onRehydrateStorage: () => (state) => {
        // Force neutral-pro theme on rehydration
        if (state) {
          state.theme = LOCKED_THEME;
          // Reset to neutral colors if they were changed
          state.customization = {
            ...state.customization,
            primaryColor: { h: 0, s: 0, l: 98 },
            secondaryColor: { h: 240, s: 4, l: 16 },
            accentColor: { h: 240, s: 4, l: 16 },
          };
          state.setHasHydrated(true);
        }
      },
    }
  )
);
