'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useThemeContext } from '@/context/theme-context';
import { getAllThemes } from '@/lib/themes';
import {
  Palette,
  Sun,
  Moon,
  Monitor,
  Check,
  RotateCcw,
  Paintbrush,
  Type,
  FrameIcon,
} from 'lucide-react';

interface ThemeSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Color picker component for theme customization
 */
const ColorPicker = ({ 
  label, 
  value, 
  onChange 
}: { 
  label: string;
  value: { h: number; s: number; l: number };
  onChange: (color: { h: number; s: number; l: number }) => void;
}) => {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <div 
            className="h-8 w-12 rounded border-2 border-border" 
            style={{ 
              backgroundColor: `hsl(${value.h}, ${value.s}%, ${value.l}%)` 
            }} 
          />
          <span className="text-sm text-muted-foreground">
            HSL({value.h}, {value.s}%, {value.l}%)
          </span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs">Hue</Label>
            <span className="text-xs text-muted-foreground">{value.h}°</span>
          </div>
          <Slider
            value={[value.h]}
            onValueChange={([h]) => onChange({ ...value, h })}
            max={360}
            step={1}
            className="w-full"
          />
          
          <div className="flex items-center justify-between">
            <Label className="text-xs">Saturation</Label>
            <span className="text-xs text-muted-foreground">{value.s}%</span>
          </div>
          <Slider
            value={[value.s]}
            onValueChange={([s]) => onChange({ ...value, s })}
            max={100}
            step={1}
            className="w-full"
          />
          
          <div className="flex items-center justify-between">
            <Label className="text-xs">Lightness</Label>
            <span className="text-xs text-muted-foreground">{value.l}%</span>
          </div>
          <Slider
            value={[value.l]}
            onValueChange={([l]) => onChange({ ...value, l })}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export function ThemeSettingsDialog({ open, onOpenChange }: ThemeSettingsDialogProps) {
  const {
    theme,
    isDark,
    setTheme,
    toggleDarkMode,
    customization,
    updateCustomization,
    resetCustomization,
  } = useThemeContext();

  const themes = getAllThemes();
  const [previewMode, setPreviewMode] = React.useState<'light' | 'dark' | 'system'>('system');

  const handleThemeSelect = (themeName: any) => {
    setTheme(themeName);
  };

  const handlePreviewModeChange = (mode: 'light' | 'dark' | 'system') => {
    setPreviewMode(mode);
    if (mode === 'light') {
      // Force light mode
    } else if (mode === 'dark') {
      // Force dark mode
    } else {
      // Use system preference
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Palette className="mr-2 h-5 w-5" />
            Theme Settings
          </DialogTitle>
          <DialogDescription>
            Customize your interface appearance and theme preferences
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="themes" className="h-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="themes">Themes</TabsTrigger>
            <TabsTrigger value="customize">Customize</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <div className="h-[600px] overflow-y-auto">
            <TabsContent value="themes" className="space-y-6 p-1">
              {/* Theme Mode Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Sun className="mr-2 h-4 w-4" />
                    Appearance Mode
                  </CardTitle>
                  <CardDescription>
                    Choose how the interface should appear
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-3">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant={!isDark ? "default" : "outline"}
                        className="h-20 w-full flex-col space-y-2"
                        onClick={() => !isDark || toggleDarkMode()}
                      >
                        <Sun className="h-6 w-6" />
                        <span>Light</span>
                      </Button>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant={isDark ? "default" : "outline"}
                        className="h-20 w-full flex-col space-y-2"
                        onClick={() => isDark || toggleDarkMode()}
                      >
                        <Moon className="h-6 w-6" />
                        <span>Dark</span>
                      </Button>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="outline"
                        className="h-20 w-full flex-col space-y-2"
                      >
                        <Monitor className="h-6 w-6" />
                        <span>System</span>
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>

              {/* Theme Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Color Themes</CardTitle>
                  <CardDescription>
                    Choose from our curated color themes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {themes.map((themeConfig) => (
                      <motion.div
                        key={themeConfig.id}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <Card 
                          className={`cursor-pointer transition-all hover:shadow-md ${
                            theme === themeConfig.id ? 'ring-2 ring-primary' : ''
                          }`}
                          onClick={() => handleThemeSelect(themeConfig.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="flex space-x-1">
                                  <div
                                    className="h-4 w-4 rounded-full border"
                                    style={{ backgroundColor: themeConfig.preview.primary }}
                                  />
                                  <div
                                    className="h-4 w-4 rounded-full border"
                                    style={{ backgroundColor: themeConfig.preview.secondary }}
                                  />
                                  <div
                                    className="h-4 w-4 rounded-full border"
                                    style={{ backgroundColor: themeConfig.preview.background }}
                                  />
                                </div>
                                <div>
                                  <h4 className="font-medium">{themeConfig.name}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {themeConfig.description}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                {themeConfig.supportsDarkMode && (
                                  <Badge variant="outline" className="text-xs">
                                    Dark Mode
                                  </Badge>
                                )}
                                {theme === themeConfig.id && (
                                  <Check className="h-4 w-4 text-primary" />
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="customize" className="space-y-6 p-1">
              {/* Color Customization */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Paintbrush className="mr-2 h-4 w-4" />
                    Color Customization
                  </CardTitle>
                  <CardDescription>
                    Fine-tune the colors to match your preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 lg:grid-cols-2">
                    <ColorPicker
                      label="Primary Color"
                      value={customization.primaryColor}
                      onChange={(color) => updateCustomization({ primaryColor: color })}
                    />
                    <ColorPicker
                      label="Secondary Color"
                      value={customization.secondaryColor}
                      onChange={(color) => updateCustomization({ secondaryColor: color })}
                    />
                  </div>
                  <ColorPicker
                    label="Accent Color"
                    value={customization.accentColor}
                    onChange={(color) => updateCustomization({ accentColor: color })}
                  />
                </CardContent>
              </Card>

              {/* Layout Customization */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <FrameIcon className="mr-2 h-4 w-4" />
                    Layout & Typography
                  </CardTitle>
                  <CardDescription>
                    Adjust the visual styling of interface elements
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Border Radius</Label>
                    <div className="flex items-center space-x-4">
                      <Slider
                        value={[customization.borderRadius]}
                        onValueChange={([value]) => updateCustomization({ borderRadius: value })}
                        min={0}
                        max={2}
                        step={0.1}
                        className="flex-1"
                      />
                      <span className="text-sm text-muted-foreground w-8">
                        {customization.borderRadius.toFixed(1)}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <div 
                        className="h-8 w-8 bg-primary"
                        style={{ borderRadius: `${customization.borderRadius * 0.5}rem` }}
                      />
                      <div 
                        className="h-8 w-12 bg-secondary"
                        style={{ borderRadius: `${customization.borderRadius * 0.5}rem` }}
                      />
                      <div 
                        className="h-8 w-16 bg-muted border"
                        style={{ borderRadius: `${customization.borderRadius * 0.5}rem` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-medium flex items-center">
                      <Type className="mr-2 h-4 w-4" />
                      Font Size Scale
                    </Label>
                    <div className="flex items-center space-x-4">
                      <Slider
                        value={[customization.fontSize]}
                        onValueChange={([value]) => updateCustomization({ fontSize: value })}
                        min={0.8}
                        max={1.2}
                        step={0.1}
                        className="flex-1"
                      />
                      <span className="text-sm text-muted-foreground w-8">
                        {customization.fontSize.toFixed(1)}x
                      </span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs" style={{ fontSize: `${customization.fontSize * 0.75}rem` }}>
                        Small text example
                      </p>
                      <p className="text-sm" style={{ fontSize: `${customization.fontSize * 0.875}rem` }}>
                        Regular text example
                      </p>
                      <p className="text-base" style={{ fontSize: `${customization.fontSize * 1}rem` }}>
                        Base text example
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button variant="outline" onClick={resetCustomization}>
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Reset to Default
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-6 p-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Theme Preferences</CardTitle>
                  <CardDescription>
                    Configure how themes behave in your workspace
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Auto Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically switch to dark mode based on system preference
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Reduce Motion</Label>
                      <p className="text-sm text-muted-foreground">
                        Minimize animations and transitions for better accessibility
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">High Contrast</Label>
                      <p className="text-sm text-muted-foreground">
                        Increase contrast for better visibility
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Remember Theme per Workspace</Label>
                      <p className="text-sm text-muted-foreground">
                        Save different themes for different workspaces
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
} 