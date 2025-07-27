import type { ThemeConfig, ThemeName } from '@/types/theme';

/**
 * Theme configurations for all available themes
 */
export const THEME_CONFIGS: Record<ThemeName, ThemeConfig> = {
  'playful-pastel': {
    id: 'playful-pastel',
    name: 'Playful Pastel',
    description: 'Soft colors with rounded corners and gentle gradients',
    supportsDarkMode: true,
    preview: {
      primary: '#B794F6',
      secondary: '#FBD38D',
      background: '#FFF5F5',
    },
    cssVars: {
      light: {
        '--background': '0 0% 100%',
        '--foreground': '240 10% 3.9%',
        '--card': '0 0% 100%',
        '--card-foreground': '240 10% 3.9%',
        '--popover': '0 0% 100%',
        '--popover-foreground': '240 10% 3.9%',
        '--primary': '280 100% 70%',
        '--primary-foreground': '0 0% 100%',
        '--secondary': '240 4.8% 95.9%',
        '--secondary-foreground': '240 5.9% 10%',
        '--muted': '240 4.8% 95.9%',
        '--muted-foreground': '240 3.8% 46.1%',
        '--accent': '240 4.8% 95.9%',
        '--accent-foreground': '240 5.9% 10%',
        '--accent-hover': '240 6% 92%',
        '--accent-hover-foreground': '240 8% 8%',
        '--destructive': '0 84% 60%',
        '--destructive-foreground': '0 0% 98%',
        '--border': '240 5.9% 90%',
        '--input': '240 5.9% 90%',
        '--ring': '280 100% 70%',
        '--radius': '0.75rem',
        '--sidebar-background': '0 0% 100%',
        '--sidebar-hover': '240 8% 96%',
        '--sidebar-active': '280 100% 70%',
        '--sidebar-active-foreground': '0 0% 100%',
      },
      dark: {
        '--background': '330 20% 8%',
        '--foreground': '320 15% 92%',
        '--card': '330 25% 12%',
        '--card-foreground': '320 15% 90%',
        '--popover': '330 25% 12%',
        '--popover-foreground': '320 15% 92%',
        '--primary': '280 100% 75%',
        '--primary-foreground': '330 20% 10%',
        '--secondary': '330 20% 18%',
        '--secondary-foreground': '320 15% 85%',
        '--muted': '330 15% 20%',
        '--muted-foreground': '320 10% 65%',
        '--accent': '320 30% 25%',
        '--accent-foreground': '320 15% 85%',
        '--accent-hover': '320 35% 30%',
        '--accent-hover-foreground': '320 20% 90%',
        '--destructive': '0 75% 65%',
        '--destructive-foreground': '0 0% 98%',
        '--border': '330 20% 25%',
        '--input': '330 20% 25%',
        '--ring': '280 100% 75%',
        '--sidebar-background': '330 25% 10%',
        '--sidebar-hover': '330 30% 15%',
        '--sidebar-active': '280 100% 75%',
        '--sidebar-active-foreground': '330 20% 10%',
      },
    },
  },
  'neutral-pro': {
    id: 'neutral-pro',
    name: 'Neutral Pro',
    description: 'Clean greys with sharp edges for professional interfaces',
    supportsDarkMode: true,
    preview: {
      primary: '#1F2937',
      secondary: '#F3F4F6',
      background: '#FFFFFF',
    },
    cssVars: {
      light: {
        '--background': '0 0% 100%',
        '--foreground': '240 10% 3.9%',
        '--card': '0 0% 100%',
        '--card-foreground': '240 10% 3.9%',
        '--popover': '0 0% 100%',
        '--popover-foreground': '240 10% 3.9%',
        '--primary': '240 5.9% 10%',
        '--primary-foreground': '0 0% 98%',
        '--secondary': '240 4.8% 95.9%',
        '--secondary-foreground': '240 5.9% 10%',
        '--muted': '240 4.8% 95.9%',
        '--muted-foreground': '240 3.8% 46.1%',
        '--accent': '240 4.8% 95.9%',
        '--accent-foreground': '240 5.9% 10%',
        '--accent-hover': '240 6% 92%',
        '--accent-hover-foreground': '240 8% 8%',
        '--destructive': '0 84.2% 60.2%',
        '--destructive-foreground': '0 0% 98%',
        '--border': '240 5.9% 90%',
        '--input': '240 5.9% 90%',
        '--ring': '240 5.9% 10%',
        '--radius': '0.25rem',
        '--sidebar-background': '0 0% 100%',
        '--sidebar-hover': '240 8% 96%',
        '--sidebar-active': '240 5.9% 10%',
        '--sidebar-active-foreground': '0 0% 98%',
      },
      dark: {
        '--background': '240 10% 3.9%',
        '--foreground': '0 0% 98%',
        '--card': '240 10% 3.9%',
        '--card-foreground': '0 0% 98%',
        '--popover': '240 10% 3.9%',
        '--popover-foreground': '0 0% 98%',
        '--primary': '0 0% 98%',
        '--primary-foreground': '240 5.9% 10%',
        '--secondary': '240 3.7% 15.9%',
        '--secondary-foreground': '0 0% 98%',
        '--muted': '240 3.7% 15.9%',
        '--muted-foreground': '240 5% 64.9%',
        '--accent': '240 3.7% 15.9%',
        '--accent-foreground': '0 0% 98%',
        '--accent-hover': '240 4% 20%',
        '--accent-hover-foreground': '0 0% 95%',
        '--destructive': '0 62.8% 30.6%',
        '--destructive-foreground': '0 0% 98%',
        '--border': '240 3.7% 15.9%',
        '--input': '240 3.7% 15.9%',
        '--ring': '240 4.9% 83.9%',
        '--sidebar-background': '240 10% 3.9%',
        '--sidebar-hover': '240 5% 12%',
        '--sidebar-active': '0 0% 98%',
        '--sidebar-active-foreground': '240 5.9% 10%',
      },
    },
  },
  'high-contrast': {
    id: 'high-contrast',
    name: 'High-Contrast A11y',
    description: 'Maximum contrast ratios meeting WCAG 2.2 AAA standards',
    supportsDarkMode: true,
    preview: {
      primary: '#000000',
      secondary: '#CCCCCC',
      background: '#FFFFFF',
    },
    cssVars: {
      light: {
        '--background': '0 0% 100%',
        '--foreground': '0 0% 0%',
        '--card': '0 0% 100%',
        '--card-foreground': '0 0% 0%',
        '--popover': '0 0% 98%',
        '--popover-foreground': '0 0% 0%',
        '--primary': '0 0% 0%',
        '--primary-foreground': '0 0% 100%',
        '--secondary': '0 0% 90%',
        '--secondary-foreground': '0 0% 0%',
        '--muted': '0 0% 90%',
        '--muted-foreground': '0 0% 30%',
        '--accent': '240 100% 50%',
        '--accent-foreground': '0 0% 100%',
        '--accent-hover': '240 100% 45%',
        '--accent-hover-foreground': '0 0% 100%',
        '--destructive': '0 100% 40%',
        '--destructive-foreground': '0 0% 100%',
        '--border': '0 0% 80%',
        '--input': '0 0% 80%',
        '--ring': '0 0% 0%',
        '--radius': '0rem',
        '--sidebar-background': '0 0% 100%',
        '--sidebar-hover': '0 0% 90%',
        '--sidebar-active': '0 0% 0%',
        '--sidebar-active-foreground': '0 0% 100%',
      },
      dark: {
        '--background': '0 0% 0%',
        '--foreground': '0 0% 100%',
        '--card': '0 0% 5%',
        '--card-foreground': '0 0% 100%',
        '--popover': '0 0% 5%',
        '--popover-foreground': '0 0% 100%',
        '--primary': '0 0% 100%',
        '--primary-foreground': '0 0% 0%',
        '--secondary': '0 0% 15%',
        '--secondary-foreground': '0 0% 100%',
        '--muted': '0 0% 20%',
        '--muted-foreground': '0 0% 75%',
        '--accent': '60 100% 60%',
        '--accent-foreground': '0 0% 0%',
        '--accent-hover': '60 100% 55%',
        '--accent-hover-foreground': '0 0% 0%',
        '--destructive': '0 100% 60%',
        '--destructive-foreground': '0 0% 0%',
        '--border': '0 0% 40%',
        '--input': '0 0% 40%',
        '--ring': '0 0% 100%',
        '--sidebar-background': '0 0% 5%',
        '--sidebar-hover': '0 0% 15%',
        '--sidebar-active': '0 0% 100%',
        '--sidebar-active-foreground': '0 0% 0%',
      },
    },
  },
};

/**
 * Get theme configuration by name
 * @param themeName - Name of the theme
 * @returns Theme configuration
 */
export function getThemeConfig(themeName: ThemeName): ThemeConfig {
  return THEME_CONFIGS[themeName];
}

/**
 * Get all theme configurations as an array
 * @returns Array of theme configurations
 */
export function getAllThemes(): ThemeConfig[] {
  return Object.values(THEME_CONFIGS);
}

/**
 * Apply theme CSS variables to document root
 * @param theme - Theme configuration
 * @param isDark - Whether to apply dark mode colors
 */
export function applyThemeToDocument(
  theme: ThemeConfig,
  isDark: boolean
): void {
  const root = document.documentElement;
  const colors =
    isDark && theme.cssVars.dark ? theme.cssVars.dark : theme.cssVars.light;

  // Remove existing theme attributes
  root.removeAttribute('data-theme');

  // Set new theme attribute if not default
  if (theme.id !== 'playful-pastel') {
    root.setAttribute('data-theme', theme.id);
  }

  // Apply CSS variables
  Object.entries(colors).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
}

/**
 * Convert HSL object to CSS HSL string
 * @param hsl - HSL color object
 * @returns CSS HSL string
 */
export function hslToString(hsl: { h: number; s: number; l: number }): string {
  return `${hsl.h} ${hsl.s}% ${hsl.l}%`;
}

/**
 * Parse HSL string to HSL object
 * @param hslString - HSL string in format "h s% l%"
 * @returns HSL color object
 */
export function parseHslString(hslString: string): {
  h: number;
  s: number;
  l: number;
} {
  const matches = hslString.match(
    /(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%/
  );
  if (!matches) {
    throw new Error(`Invalid HSL string: ${hslString}`);
  }

  return {
    h: parseFloat(matches[1]),
    s: parseFloat(matches[2]),
    l: parseFloat(matches[3]),
  };
}
