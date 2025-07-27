'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check, Monitor, Moon, Sun, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useThemeContext } from '@/context/theme-context';
import { getThemeConfig } from '@/lib/themes';

/**
 * Current theme preview card - showing only Neutral Pro
 */
function CurrentThemePreviewCard({ isDark }: { isDark: boolean }) {
  const theme = getThemeConfig('neutral-pro');
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={cn(
        'relative rounded-lg border-2 p-6 transition-all',
        'border-primary shadow-lg ring-2 ring-primary/20'
      )}
      style={{
        backgroundColor: isDark ? theme.cssVars.dark['--background'] : theme.cssVars.light['--background'],
      }}
    >
      {/* Theme Preview UI Elements */}
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div
            className="h-4 w-4 rounded-full"
            style={{ 
              backgroundColor: isDark 
                ? `hsl(${theme.cssVars.dark['--primary']})`
                : `hsl(${theme.cssVars.light['--primary']})` 
            }}
          />
          <div className="flex space-x-1">
            <div className="h-2 w-2 rounded-full bg-current opacity-40" />
            <div className="h-2 w-2 rounded-full bg-current opacity-40" />
            <div className="h-2 w-2 rounded-full bg-current opacity-40" />
          </div>
        </div>

        {/* Content Area */}
        <div className="space-y-3">
          <div
            className="h-3 w-full rounded"
            style={{
              backgroundColor: isDark 
                ? `hsl(${theme.cssVars.dark['--primary']})`
                : `hsl(${theme.cssVars.light['--primary']})`,
              opacity: 0.8,
            }}
          />
          <div
            className="h-3 w-3/4 rounded"
            style={{
              backgroundColor: isDark 
                ? `hsl(${theme.cssVars.dark['--secondary']})`
                : `hsl(${theme.cssVars.light['--secondary']})`,
              opacity: 0.6,
            }}
          />
          <div
            className="h-3 w-1/2 rounded"
            style={{
              backgroundColor: isDark 
                ? `hsl(${theme.cssVars.dark['--muted']})`
                : `hsl(${theme.cssVars.light['--muted']})`,
              opacity: 0.4,
            }}
          />
        </div>

        {/* Button Area */}
        <div className="flex space-x-2">
          <div
            className="h-8 w-20 rounded text-xs flex items-center justify-center text-white font-medium"
            style={{ 
              backgroundColor: isDark 
                ? `hsl(${theme.cssVars.dark['--primary']})`
                : `hsl(${theme.cssVars.light['--primary']})` 
            }}
          >
            Button
          </div>
          <div
            className="h-8 w-20 rounded border text-xs flex items-center justify-center font-medium"
            style={{
              borderColor: isDark 
                ? `hsl(${theme.cssVars.dark['--primary']})`
                : `hsl(${theme.cssVars.light['--primary']})`,
              color: isDark 
                ? `hsl(${theme.cssVars.dark['--primary']})`
                : `hsl(${theme.cssVars.light['--primary']})`,
            }}
          >
            Outline
          </div>
        </div>
      </div>

      {/* Active Indicator */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center"
      >
        <Check className="h-3 w-3" />
      </motion.div>

      {/* Theme Name */}
      <div className="mt-4 text-center">
        <div className="text-sm font-medium">{theme.name}</div>
        <div className="text-xs text-muted-foreground mt-1">
          {isDark ? 'Dark Mode' : 'Light Mode'}
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Coming soon theme cards
 */
function ComingSoonThemeCard({ name, description }: { name: string; description: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className={cn(
        'relative rounded-lg border-2 p-6 transition-all opacity-60',
        'border-dashed border-border'
      )}
    >
      {/* Coming Soon Preview */}
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="h-4 w-4 rounded-full bg-muted" />
          <div className="flex space-x-1">
            <div className="h-2 w-2 rounded-full bg-muted" />
            <div className="h-2 w-2 rounded-full bg-muted" />
            <div className="h-2 w-2 rounded-full bg-muted" />
          </div>
        </div>

        {/* Content Area */}
        <div className="space-y-3">
          <div className="h-3 w-full rounded bg-muted" />
          <div className="h-3 w-3/4 rounded bg-muted/70" />
          <div className="h-3 w-1/2 rounded bg-muted/50" />
        </div>

        {/* Button Area */}
        <div className="flex space-x-2">
          <div className="h-8 w-20 rounded bg-muted" />
          <div className="h-8 w-20 rounded border border-muted" />
        </div>
      </div>

      {/* Coming Soon Badge */}
      <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
        <Clock className="h-3 w-3" />
      </div>

      {/* Theme Name */}
      <div className="mt-4 text-center">
        <div className="text-sm font-medium text-muted-foreground">{name}</div>
        <div className="text-xs text-muted-foreground mt-1">
          {description}
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
  const { isDark, toggleDarkMode } = useThemeContext();
  
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
              Beautiful Theme System
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
            Beautiful Theme System
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Experience the clean, professional Neutral Pro theme with seamless 
            dark and light modes. More exciting themes coming soon with full 
            accessibility support and custom CSS variables.
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
          {/* Current Theme */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <CurrentThemePreviewCard isDark={isDark} />
          </motion.div>

          {/* Coming Soon Themes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <ComingSoonThemeCard 
              name="Playful Pastel" 
              description="Soft colors & rounded corners"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ComingSoonThemeCard 
              name="High Contrast" 
              description="Maximum accessibility"
            />
          </motion.div>
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
            Currently using: Neutral Pro {isDark ? '(Dark)' : '(Light)'}
          </Badge>
        </motion.div>

        {/* Coming Soon Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="flex items-center justify-center space-x-2 text-muted-foreground mb-2">
            <Clock className="h-4 w-4" />
            <span className="text-sm font-medium">More themes coming soon</span>
          </div>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            We're working on additional beautiful themes including custom theme builder. 
            Stay tuned for updates!
          </p>
        </motion.div>
      </div>
    </section>
  );
} 