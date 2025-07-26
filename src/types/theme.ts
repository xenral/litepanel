/**
 * Available theme names in the application
 */
export type ThemeName = 'playful-pastel' | 'neutral-pro' | 'high-contrast';

/**
 * Theme configuration object
 */
export interface ThemeConfig {
  /** Unique identifier for the theme */
  id: ThemeName;
  /** Display name for the theme */
  name: string;
  /** Brief description of the theme */
  description: string;
  /** Whether this theme supports dark mode */
  supportsDarkMode: boolean;
  /** Preview colors for theme switcher */
  preview: {
    primary: string;
    secondary: string;
    background: string;
  };
  /** CSS custom properties for the theme */
  cssVars: {
    light: Record<string, string>;
    dark?: Record<string, string>;
  };
}

/**
 * HSL color values
 */
export interface HSLColor {
  h: number; // Hue (0-360)
  s: number; // Saturation (0-100)
  l: number; // Lightness (0-100)
}

/**
 * Theme customization settings
 */
export interface ThemeCustomization {
  /** Primary color in HSL */
  primaryColor: HSLColor;
  /** Secondary color in HSL */
  secondaryColor: HSLColor;
  /** Accent color in HSL */
  accentColor: HSLColor;
  /** Border radius multiplier */
  borderRadius: number;
  /** Font size multiplier */
  fontSize: number;
}

/**
 * Theme context value
 */
export interface ThemeContextValue {
  /** Current theme name */
  theme: ThemeName;
  /** Whether dark mode is active */
  isDark: boolean;
  /** Set the theme */
  setTheme: (theme: ThemeName) => void;
  /** Toggle dark mode */
  toggleDarkMode: () => void;
  /** Current customization settings */
  customization: ThemeCustomization;
  /** Update customization settings */
  updateCustomization: (customization: Partial<ThemeCustomization>) => void;
  /** Reset customization to defaults */
  resetCustomization: () => void;
  /** Apply custom HSL color to CSS variable */
  applyCustomColor: (variable: string, color: HSLColor) => void;
} 