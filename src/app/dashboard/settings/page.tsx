import type { Metadata } from 'next';
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Palette,
  Shield,
  Key,
  Globe,
  Smartphone,
  Mail,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  Trash2,
  Plus,
  Check,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Manage your profile, preferences, and account settings',
};

/**
 * Mock user data
 */
const userData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: null,
  role: 'Admin',
  joinDate: '2023-08-15',
  lastLogin: '2024-01-15 09:30:00',
  timezone: 'UTC-8 (Pacific Time)',
  language: 'English (US)',
};

/**
 * Mock notification settings
 */
const notificationSettings = [
  {
    id: 'email_updates',
    title: 'Email Updates',
    description: 'Receive email notifications for important updates',
    enabled: true,
    category: 'general',
  },
  {
    id: 'push_notifications',
    title: 'Push Notifications',
    description: 'Browser push notifications for real-time alerts',
    enabled: false,
    category: 'general',
  },
  {
    id: 'weekly_digest',
    title: 'Weekly Digest',
    description: 'Summary of your activity and insights',
    enabled: true,
    category: 'reports',
  },
  {
    id: 'security_alerts',
    title: 'Security Alerts',
    description: 'Notifications about login attempts and security events',
    enabled: true,
    category: 'security',
  },
  {
    id: 'product_updates',
    title: 'Product Updates',
    description: 'Information about new features and improvements',
    enabled: false,
    category: 'product',
  },
];

/**
 * Mock API keys
 */
const apiKeys = [
  {
    id: 1,
    name: 'Production API',
    key: 'pk_live_*********************4242',
    created: '2023-12-01',
    lastUsed: '2024-01-15',
    permissions: ['read', 'write'],
  },
  {
    id: 2,
    name: 'Development API',
    key: 'pk_dev_*********************8888',
    created: '2024-01-01',
    lastUsed: '2024-01-14',
    permissions: ['read'],
  },
  {
    id: 3,
    name: 'Analytics API',
    key: 'pk_analytics_***************9999',
    created: '2024-01-10',
    lastUsed: 'Never',
    permissions: ['read'],
  },
];

/**
 * Settings page component
 */
export default function SettingsPage() {
  return (
    <div className="space-y-4 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base">
            Manage your account settings, preferences, and integrations.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <RefreshCw className="h-4 w-4" />
            <span className="hidden sm:inline">Reset</span>
          </Button>
          <Button size="sm" className="flex items-center space-x-2">
            <Save className="h-4 w-4" />
            <span className="hidden sm:inline">Save Changes</span>
            <span className="sm:hidden">Save</span>
          </Button>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="profile" className="space-y-4 sm:space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          <TabsTrigger value="profile" className="text-xs sm:text-sm">Profile</TabsTrigger>
          <TabsTrigger value="notifications" className="text-xs sm:text-sm">Notifications</TabsTrigger>
          <TabsTrigger value="appearance" className="text-xs sm:text-sm">Appearance</TabsTrigger>
          <TabsTrigger value="security" className="text-xs sm:text-sm">Security</TabsTrigger>
          <TabsTrigger value="api" className="text-xs sm:text-sm">API Keys</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
            {/* Profile Information */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Profile Information</span>
                </CardTitle>
                <CardDescription>
                  Update your personal information and profile settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={userData.email}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input
                    id="bio"
                    placeholder="Tell us about yourself..."
                    defaultValue="Product Manager and UI/UX enthusiast"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Input id="timezone" defaultValue={userData.timezone} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Input id="language" defaultValue={userData.language} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Profile Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Account Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center">
                  <div className="bg-primary/10 flex h-20 w-20 items-center justify-center rounded-full">
                    <span className="text-primary text-2xl font-bold">
                      {userData.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </span>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="font-semibold">{userData.name}</h3>
                  <p className="text-muted-foreground text-sm">
                    {userData.email}
                  </p>
                  <Badge className="mt-2">{userData.role}</Badge>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Member since:</span>
                    <span>
                      {new Date(userData.joinDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last login:</span>
                    <span>
                      {new Date(userData.lastLogin).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  Upload Avatar
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notification Preferences</span>
              </CardTitle>
              <CardDescription>
                Choose how you want to be notified about updates and activities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {notificationSettings.map((setting) => (
                <div
                  key={setting.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{setting.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {setting.category}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {setting.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={setting.enabled ? 'default' : 'outline'}
                      size="sm"
                      className="min-w-20"
                    >
                      {setting.enabled ? (
                        <>
                          <Check className="mr-1 h-3 w-3" />
                          On
                        </>
                      ) : (
                        'Off'
                      )}
                    </Button>
                  </div>
                </div>
              ))}

              <div className="space-y-4 pt-4">
                <h4 className="font-medium">Delivery Methods</h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">Email</span>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center space-x-2">
                      <Smartphone className="h-4 w-4" />
                      <span className="text-sm">Push</span>
                    </div>
                    <Badge variant="secondary">Disabled</Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4" />
                      <span className="text-sm">In-App</span>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5" />
                <span>Theme Customization</span>
              </CardTitle>
              <CardDescription>
                Customize the appearance and theme of your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-medium">Color Scheme</h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Primary Color</Label>
                      <div className="flex items-center space-x-4">
                        <div className="bg-primary h-10 w-20 rounded-lg border" />
                        <Slider
                          defaultValue={[220]}
                          max={360}
                          step={1}
                          className="flex-1"
                        />
                        <span className="text-muted-foreground w-12 text-sm">
                          220°
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Saturation</Label>
                      <div className="flex items-center space-x-4">
                        <div className="bg-primary/80 h-10 w-20 rounded-lg border" />
                        <Slider
                          defaultValue={[100]}
                          max={100}
                          step={1}
                          className="flex-1"
                        />
                        <span className="text-muted-foreground w-12 text-sm">
                          100%
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Lightness</Label>
                      <div className="flex items-center space-x-4">
                        <div className="bg-primary/60 h-10 w-20 rounded-lg border" />
                        <Slider
                          defaultValue={[50]}
                          max={100}
                          step={1}
                          className="flex-1"
                        />
                        <span className="text-muted-foreground w-12 text-sm">
                          50%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Theme Presets</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      {
                        name: 'Default',
                        colors: ['bg-blue-500', 'bg-blue-600', 'bg-blue-700'],
                      },
                      {
                        name: 'Forest',
                        colors: [
                          'bg-green-500',
                          'bg-green-600',
                          'bg-green-700',
                        ],
                      },
                      {
                        name: 'Sunset',
                        colors: ['bg-orange-500', 'bg-red-500', 'bg-pink-500'],
                      },
                      {
                        name: 'Ocean',
                        colors: ['bg-cyan-500', 'bg-blue-500', 'bg-indigo-500'],
                      },
                      {
                        name: 'Purple',
                        colors: [
                          'bg-purple-500',
                          'bg-violet-500',
                          'bg-fuchsia-500',
                        ],
                      },
                      {
                        name: 'Monochrome',
                        colors: ['bg-gray-600', 'bg-gray-700', 'bg-gray-800'],
                      },
                    ].map((preset) => (
                      <Button
                        key={preset.name}
                        variant="outline"
                        className="h-auto p-3"
                      >
                        <div className="space-y-2">
                          <div className="flex space-x-1">
                            {preset.colors.map((color, i) => (
                              <div
                                key={i}
                                className={`h-4 w-4 rounded ${color}`}
                              />
                            ))}
                          </div>
                          <span className="text-xs">{preset.name}</span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Layout Options</h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Sidebar Width</Label>
                    <Slider
                      defaultValue={[280]}
                      min={200}
                      max={400}
                      step={20}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Border Radius</Label>
                    <Slider
                      defaultValue={[8]}
                      min={0}
                      max={20}
                      step={2}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Password & Security</span>
                </CardTitle>
                <CardDescription>
                  Manage your password and security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input id="currentPassword" type="password" />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                    >
                      <EyeOff className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Input id="newPassword" type="password" />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>

                <Button className="w-full">Update Password</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>
                  Add an extra layer of security to your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <h4 className="font-medium">Authenticator App</h4>
                    <p className="text-muted-foreground text-sm">
                      Use an app like Google Authenticator
                    </p>
                  </div>
                  <Badge variant="outline">Not Enabled</Badge>
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <h4 className="font-medium">SMS Verification</h4>
                    <p className="text-muted-foreground text-sm">
                      Receive codes via text message
                    </p>
                  </div>
                  <Badge variant="outline">Not Enabled</Badge>
                </div>

                <Button className="w-full">Enable Two-Factor Auth</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Key className="h-5 w-5" />
                    <span>API Keys</span>
                  </CardTitle>
                  <CardDescription>
                    Manage your API keys for integrations and external access
                  </CardDescription>
                </div>
                <Button className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Create Key</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apiKeys.map((apiKey) => (
                  <div
                    key={apiKey.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{apiKey.name}</h4>
                        <div className="flex space-x-1">
                          {apiKey.permissions.map((permission) => (
                            <Badge
                              key={permission}
                              variant="outline"
                              className="text-xs"
                            >
                              {permission}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground font-mono text-sm">
                        {apiKey.key}
                      </p>
                      <div className="text-muted-foreground flex items-center space-x-4 text-xs">
                        <span>
                          Created:{' '}
                          {new Date(apiKey.created).toLocaleDateString()}
                        </span>
                        <span>
                          Last used:{' '}
                          {apiKey.lastUsed === 'Never'
                            ? 'Never'
                            : new Date(apiKey.lastUsed).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <RefreshCw className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
