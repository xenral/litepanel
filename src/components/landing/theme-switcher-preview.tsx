'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check, Monitor, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useThemeContext } from '@/context/theme-context';
import { getAllThemes } from '@/lib/themes';
import type { ThemeName } from '@/types/theme';

/**
 * Mock component for theme preview
 */
function ThemePreviewCard({ themeName, isActive }: { themeName: ThemeName; isActive: boolean }) {
  const themes = getAllThemes();
  const theme = themes.find(t => t.id === themeName);
  
  if (!theme) return null;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'relative rounded-lg border-2 p-4 cursor-pointer transition-all',
        isActive
          ? 'border-primary shadow-lg ring-2 ring-primary/20'
          : 'border-border hover:border-primary/50 hover:shadow-md'
      )}
      style={{
        backgroundColor: theme.preview.background,
        borderColor: isActive ? theme.preview.primary : undefined,
      }}
    >
      {/* Theme Preview UI Elements */}
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: theme.preview.primary }}
          />
          <div className="flex space-x-1">
            <div className="h-2 w-2 rounded-full bg-current opacity-40" />
            <div className="h-2 w-2 rounded-full bg-current opacity-40" />
            <div className="h-2 w-2 rounded-full bg-current opacity-40" />
          </div>
        </div>

        {/* Content Area */}
        <div className="space-y-2">
          <div
            className="h-2 w-full rounded"
            style={{
              backgroundColor: theme.preview.primary,
              opacity: 0.8,
            }}
          />
          <div
            className="h-2 w-3/4 rounded"
            style={{
              backgroundColor: theme.preview.secondary,
              opacity: 0.6,
            }}
          />
          <div
            className="h-2 w-1/2 rounded"
            style={{
              backgroundColor: theme.preview.secondary,
              opacity: 0.4,
            }}
          />
        </div>

        {/* Button Area */}
        <div className="flex space-x-2">
          <div
            className="h-6 w-16 rounded text-xs flex items-center justify-center text-white font-medium"
            style={{ backgroundColor: theme.preview.primary }}
          >
            Button
          </div>
          <div
            className="h-6 w-16 rounded border text-xs flex items-center justify-center font-medium"
            style={{
              borderColor: theme.preview.primary,
              color: theme.preview.primary,
            }}
          >
            Outline
          </div>
        </div>
      </div>

      {/* Active Indicator */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center"
          >
            <Check className="h-3 w-3" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Theme Name */}
      <div className="mt-3 text-center">
        <div className="text-sm font-medium">{theme.name}</div>
        <div className="text-xs text-muted-foreground mt-1">
          {theme.description}
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Theme switcher preview section for the landing page
 */
export function ThemeSwitcherPreview() {
  const [mounted, setMounted] = React.useState(false);
  
  // Always call hooks at the top level
  const { theme, setTheme, isDark, toggleDarkMode } = useThemeContext();
  const themes = getAllThemes();
  
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Return early during hydration with same hook calls
  if (!mounted) {
    return (
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center space-x-2 rounded-full bg-primary/10 px-4 py-2 text-primary">
                <Palette className="h-5 w-5" />
                <span className="text-sm font-medium">Theme System</span>
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Hot-Swappable Themes
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Loading theme system...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center space-x-2 rounded-full bg-primary/10 px-4 py-2 text-primary">
              <Palette className="h-5 w-5" />
              <span className="text-sm font-medium">Theme System</span>
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Hot-Swappable Themes
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Switch between beautiful, carefully crafted themes instantly. Each theme 
            includes light and dark modes with full accessibility support and custom 
            CSS variables for easy customization.
          </p>

          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <Button
              variant={!isDark ? 'default' : 'outline'}
              size="sm"
              onClick={() => !isDark && toggleDarkMode()}
              className="flex items-center space-x-2"
            >
              <Sun className="h-4 w-4" />
              <span>Light</span>
            </Button>
            
            <Button
              variant={isDark ? 'default' : 'outline'}
              size="sm"
              onClick={() => isDark && toggleDarkMode()}
              className="flex items-center space-x-2"
            >
              <Moon className="h-4 w-4" />
              <span>Dark</span>
            </Button>
          </div>
        </motion.div>

        {/* Theme Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {themes.map((themeConfig, index) => (
            <motion.div
              key={themeConfig.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              onClick={() => setTheme(themeConfig.id)}
            >
              <ThemePreviewCard
                themeName={themeConfig.id}
                isActive={theme === themeConfig.id}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Features List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          <Card className="p-6 text-center">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Palette className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">CSS Variables</h3>
            <p className="text-sm text-muted-foreground">
              All themes use CSS custom properties for easy runtime customization
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Monitor className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">System Preference</h3>
            <p className="text-sm text-muted-foreground">
              Automatically detects and respects user's system theme preference
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Check className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">WCAG Compliant</h3>
            <p className="text-sm text-muted-foreground">
              All themes meet WCAG 2.2 AAA accessibility standards
            </p>
          </Card>
        </motion.div>

        {/* Current Theme Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 flex justify-center"
        >
          <Badge variant="outline" className="text-sm px-4 py-2">
            Currently using: {themes.find(t => t.id === theme)?.name} 
            {isDark ? ' (Dark)' : ' (Light)'}
          </Badge>
        </motion.div>
      </div>
    </section>
  );
} 