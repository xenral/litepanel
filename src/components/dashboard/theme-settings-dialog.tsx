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
import { getThemeConfig } from '@/lib/themes';
import {
  Palette,
  Sun,
  Moon,
  Check,
  RotateCcw,
  Type,
  FrameIcon,
  Clock,
  Lock,
} from 'lucide-react';

interface ThemeSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ThemeSettingsDialog({ open, onOpenChange }: ThemeSettingsDialogProps) {
  const {
    theme,
    isDark,
    toggleDarkMode,
    customization,
    updateCustomization,
    resetCustomization,
  } = useThemeContext();

  // Get current theme config
  const currentThemeConfig = getThemeConfig('neutral-pro');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Palette className="mr-2 h-5 w-5" />
            Theme Settings
          </DialogTitle>
          <DialogDescription>
            Customize your interface appearance and preferences
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="themes" className="h-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="themes">Appearance</TabsTrigger>
            <TabsTrigger value="customize">Layout</TabsTrigger>
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
                    Choose between light and dark modes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
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
                  </div>
                </CardContent>
              </Card>

              {/* Current Theme Display */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Current Theme</CardTitle>
                  <CardDescription>
                    You're currently using the Neutral Pro theme
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Card className="ring-2 ring-primary">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="flex space-x-1">
                            <div
                              className="h-4 w-4 rounded-full border"
                              style={{ backgroundColor: currentThemeConfig.preview.primary }}
                            />
                            <div
                              className="h-4 w-4 rounded-full border"
                              style={{ backgroundColor: currentThemeConfig.preview.secondary }}
                            />
                            <div
                              className="h-4 w-4 rounded-full border"
                              style={{ backgroundColor: currentThemeConfig.preview.background }}
                            />
                          </div>
                          <div>
                            <h4 className="font-medium">{currentThemeConfig.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {currentThemeConfig.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            Active
                          </Badge>
                          <Check className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>

              {/* Coming Soon Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Clock className="mr-2 h-4 w-4" />
                    More Themes Coming Soon
                  </CardTitle>
                  <CardDescription>
                    Additional color themes will be available in a future update
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="flex items-center justify-center space-x-2 text-muted-foreground mb-4">
                      <Clock className="h-5 w-5" />
                      <span>Additional themes in development</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      We're working on more beautiful themes including Playful Pastel, 
                      High Contrast, and custom theme builder. Stay tuned!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="customize" className="space-y-6 p-1">
              {/* Color Customization - Disabled */}
              <Card className="opacity-60">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Lock className="mr-2 h-4 w-4" />
                    Color Customization
                    <Badge variant="secondary" className="ml-2 text-xs">
                      Coming Soon
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Color customization is temporarily disabled to ensure consistent theme experience
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="flex items-center justify-center space-x-2 text-muted-foreground mb-4">
                      <Lock className="h-5 w-5" />
                      <span>Custom colors will be available soon</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      We're working on a better color customization system that maintains 
                      accessibility and theme consistency. This feature will return in a future update.
                    </p>
                  </div>
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
                        style={{ borderRadius: `${customization.borderRadius * 0.25}rem` }}
                      />
                      <div 
                        className="h-8 w-12 bg-secondary"
                        style={{ borderRadius: `${customization.borderRadius * 0.25}rem` }}
                      />
                      <div 
                        className="h-8 w-16 bg-muted border"
                        style={{ borderRadius: `${customization.borderRadius * 0.25}rem` }}
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
                      Reset Layout
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