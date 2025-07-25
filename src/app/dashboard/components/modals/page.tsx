'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  MessageSquare,
  AlertTriangle,
  Trash2,
  Edit,
  Plus,
  Settings,
  HelpCircle,
  Info,
  CheckCircle2,
  X,
  Upload,
  Download,
  Share,
  Calendar,
  User,
  Lock,
  Mail,
  Phone,
  MapPin,
  Camera,
  Star,
  Heart,
  Menu,
  Search,
  Filter,
  MoreHorizontal,
} from 'lucide-react';

// Mock data for examples
const users = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=40&h=40&fit=crop&crop=face',
    role: 'Admin',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    role: 'Editor',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Carol Davis',
    email: 'carol@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
    role: 'Viewer',
    status: 'Inactive',
  },
];

export default function ModalsComponentPage() {
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    role: '',
    department: '',
  });
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleUserSelect = (userId: number) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/components">UI Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbPage>Modals</BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Modal Components</h1>
          <p className="text-muted-foreground">
            Dialogs, sheets, popovers, and overlays for user interactions
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Examples
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Customize
          </Button>
        </div>
      </div>

      {/* Modal Examples Tabs */}
      <Tabs defaultValue="dialogs" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 lg:w-auto">
          <TabsTrigger value="dialogs">Dialogs</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="sheets">Sheets</TabsTrigger>
          <TabsTrigger value="popovers">Popovers</TabsTrigger>
          <TabsTrigger value="tooltips">Tooltips</TabsTrigger>
        </TabsList>

        <TabsContent value="dialogs" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Dialog Components</h2>
            <p className="text-muted-foreground mb-6">
              Standard dialogs for forms, content display, and user interactions
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Basic Dialog */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Basic Dialog</CardTitle>
                <CardDescription>
                  Simple dialog with header, content, and actions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Open Basic Dialog
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Basic Dialog Example</DialogTitle>
                      <DialogDescription>
                        This is a simple dialog with basic content and actions.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="text-sm text-muted-foreground">
                        Dialog content goes here. You can include any React components,
                        forms, or other interactive elements.
                      </p>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button>Confirm</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Form Dialog */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Form Dialog</CardTitle>
                <CardDescription>
                  Dialog containing a form with multiple input fields
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Add New User
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Create New User</DialogTitle>
                      <DialogDescription>
                        Fill in the user information below.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          placeholder="Enter full name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="editor">Editor</SelectItem>
                            <SelectItem value="viewer">Viewer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button>Create User</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Content Dialog */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Content Dialog</CardTitle>
                <CardDescription>
                  Dialog with rich content and scrollable area
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <Info className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Project Details</DialogTitle>
                      <DialogDescription>
                        Comprehensive information about the project
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold mb-2">Overview</h3>
                        <p className="text-sm text-muted-foreground">
                          This project involves developing a comprehensive dashboard
                          application with modern React components and TypeScript integration.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold mb-3">Team Members</h3>
                        <div className="space-y-2">
                          {users.map((user) => (
                            <div key={user.id} className="flex items-center space-x-3 p-2 border rounded">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="font-medium text-sm">{user.name}</div>
                                <div className="text-xs text-muted-foreground">{user.role}</div>
                              </div>
                              <Badge variant="outline">{user.status}</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold mb-2">Progress</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Completion</span>
                            <span>75%</span>
                          </div>
                          <Progress value={75} />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Close</Button>
                      <Button>Edit Project</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Upload Dialog */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upload Dialog</CardTitle>
                <CardDescription>
                  Dialog with progress indicator and file upload
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Files
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Upload Files</DialogTitle>
                      <DialogDescription>
                        Select files to upload to your workspace
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                        <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                        <div className="mt-4">
                          <p className="text-sm font-medium">Drop files here or click to browse</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Support for PDF, DOC, JPG, PNG up to 10MB
                          </p>
                        </div>
                        <Button variant="outline" className="mt-4">
                          Choose Files
                        </Button>
                      </div>
                      
                      {(isUploading || uploadProgress > 0) && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Uploading...</span>
                            <span>{uploadProgress}%</span>
                          </div>
                          <Progress value={uploadProgress} />
                        </div>
                      )}
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button onClick={simulateUpload} disabled={isUploading}>
                        {isUploading ? 'Uploading...' : 'Upload'}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Selection Dialog */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Selection Dialog</CardTitle>
                <CardDescription>
                  Dialog with multiple selection and checkboxes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <User className="mr-2 h-4 w-4" />
                      Select Users
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Select Team Members</DialogTitle>
                      <DialogDescription>
                        Choose users to add to this project
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input placeholder="Search users..." className="pl-9" />
                      </div>
                      
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {users.map((user) => (
                          <div key={user.id} className="flex items-center space-x-3 p-2 hover:bg-muted rounded">
                            <Checkbox
                              id={`user-${user.id}`}
                              checked={selectedUsers.includes(user.id)}
                              onCheckedChange={() => handleUserSelect(user.id)}
                            />
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <Label htmlFor={`user-${user.id}`} className="font-medium cursor-pointer">
                                {user.name}
                              </Label>
                              <div className="text-xs text-muted-foreground">{user.email}</div>
                            </div>
                            <Badge variant="outline">{user.role}</Badge>
                          </div>
                        ))}
                      </div>
                      
                      {selectedUsers.length > 0 && (
                        <div className="p-3 bg-muted rounded">
                          <p className="text-sm font-medium">
                            {selectedUsers.length} user{selectedUsers.length > 1 ? 's' : ''} selected
                          </p>
                        </div>
                      )}
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button disabled={selectedUsers.length === 0}>
                        Add Selected ({selectedUsers.length})
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Settings Dialog */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Settings Dialog</CardTitle>
                <CardDescription>
                  Complex dialog with tabs and multiple sections
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <Settings className="mr-2 h-4 w-4" />
                      Open Settings
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Project Settings</DialogTitle>
                      <DialogDescription>
                        Configure your project preferences and settings
                      </DialogDescription>
                    </DialogHeader>
                    <Tabs defaultValue="general" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="general">General</TabsTrigger>
                        <TabsTrigger value="members">Members</TabsTrigger>
                        <TabsTrigger value="advanced">Advanced</TabsTrigger>
                      </TabsList>
                      <div className="h-80 overflow-y-auto">
                        <TabsContent value="general" className="space-y-4 p-1">
                          <div className="space-y-2">
                            <Label>Project Name</Label>
                            <Input placeholder="Enter project name" />
                          </div>
                          <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea placeholder="Project description..." rows={3} />
                          </div>
                          <div className="space-y-2">
                            <Label>Category</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="web">Web Development</SelectItem>
                                <SelectItem value="mobile">Mobile App</SelectItem>
                                <SelectItem value="design">Design</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </TabsContent>
                        <TabsContent value="members" className="space-y-4 p-1">
                          <div className="space-y-3">
                            {users.map((user) => (
                              <div key={user.id} className="flex items-center justify-between p-2 border rounded">
                                <div className="flex items-center space-x-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium text-sm">{user.name}</div>
                                    <div className="text-xs text-muted-foreground">{user.email}</div>
                                  </div>
                                </div>
                                <Select defaultValue={user.role.toLowerCase()}>
                                  <SelectTrigger className="w-24">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="editor">Editor</SelectItem>
                                    <SelectItem value="viewer">Viewer</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                        <TabsContent value="advanced" className="space-y-4 p-1">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium">Public Project</div>
                                <div className="text-sm text-muted-foreground">
                                  Make this project visible to everyone
                                </div>
                              </div>
                              <Checkbox />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium">Enable Notifications</div>
                                <div className="text-sm text-muted-foreground">
                                  Receive email notifications for updates
                                </div>
                              </div>
                              <Checkbox defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium">Auto Archive</div>
                                <div className="text-sm text-muted-foreground">
                                  Archive completed projects after 30 days
                                </div>
                              </div>
                              <Checkbox />
                            </div>
                          </div>
                        </TabsContent>
                      </div>
                    </Tabs>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button>Save Changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Alert Dialogs</h2>
            <p className="text-muted-foreground mb-6">
              Confirmation dialogs and alerts for critical actions
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Confirmation Alert */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Confirmation Alert</CardTitle>
                <CardDescription>
                  Standard confirmation dialog for destructive actions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="w-full">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Item
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the
                        item and remove it from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>

            {/* Warning Alert */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Warning Alert</CardTitle>
                <CardDescription>
                  Alert with warning message and custom actions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      Show Warning
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="flex items-center">
                        <AlertTriangle className="mr-2 h-5 w-5 text-yellow-600" />
                        Unsaved Changes
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        You have unsaved changes that will be lost if you continue.
                        Would you like to save your changes before proceeding?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <Button variant="outline">Don't Save</Button>
                      <AlertDialogAction>Save Changes</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>

            {/* Success Alert */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Success Alert</CardTitle>
                <CardDescription>
                  Success confirmation with positive messaging
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="w-full">
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Complete Action
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="flex items-center text-green-600">
                        <CheckCircle2 className="mr-2 h-5 w-5" />
                        Action Completed Successfully
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Your request has been processed successfully. All changes have
                        been saved and users will be notified of the updates.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sheets" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Sheet Components</h2>
            <p className="text-muted-foreground mb-6">
              Slide-out panels and drawers for secondary content and actions
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Right Sheet */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Right Sheet</CardTitle>
                <CardDescription>
                  Default sheet sliding from the right
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button className="w-full">
                      <Menu className="mr-2 h-4 w-4" />
                      Open Right Sheet
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Right Sheet Example</SheetTitle>
                      <SheetDescription>
                        This sheet slides in from the right side of the screen.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="py-4 space-y-4">
                      <div className="space-y-2">
                        <Label>Name</Label>
                        <Input placeholder="Enter your name" />
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input type="email" placeholder="Enter your email" />
                      </div>
                      <div className="space-y-2">
                        <Label>Message</Label>
                        <Textarea placeholder="Enter your message" rows={4} />
                      </div>
                    </div>
                    <SheetFooter>
                      <Button>Send Message</Button>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </CardContent>
            </Card>

            {/* Left Sheet */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Left Sheet</CardTitle>
                <CardDescription>
                  Sheet sliding from the left side
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button className="w-full">
                      <Menu className="mr-2 h-4 w-4" />
                      Open Left Sheet
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle>Navigation Menu</SheetTitle>
                      <SheetDescription>
                        Quick access to main navigation items.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="py-4 space-y-2">
                      <Button variant="ghost" className="w-full justify-start">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <HelpCircle className="mr-2 h-4 w-4" />
                        Help & Support
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <Mail className="mr-2 h-4 w-4" />
                        Contact
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>
              </CardContent>
            </Card>

            {/* Top Sheet */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Sheet</CardTitle>
                <CardDescription>
                  Sheet sliding from the top
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button className="w-full">
                      <Search className="mr-2 h-4 w-4" />
                      Open Top Sheet
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="top">
                    <SheetHeader>
                      <SheetTitle>Search Everything</SheetTitle>
                      <SheetDescription>
                        Quick search across all your content and data.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="py-4 space-y-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input placeholder="Search..." className="pl-9" />
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Filter className="mr-2 h-4 w-4" />
                          Filters
                        </Button>
                        <Button variant="outline" size="sm">
                          Recent
                        </Button>
                        <Button variant="outline" size="sm">
                          Favorites
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </CardContent>
            </Card>

            {/* Bottom Sheet */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Bottom Sheet</CardTitle>
                <CardDescription>
                  Sheet sliding from the bottom
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button className="w-full">
                      <Share className="mr-2 h-4 w-4" />
                      Open Bottom Sheet
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom">
                    <SheetHeader>
                      <SheetTitle>Share Options</SheetTitle>
                      <SheetDescription>
                        Choose how you'd like to share this content.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="grid grid-cols-4 gap-4 py-4">
                      <Button variant="outline" className="flex-col h-20">
                        <Mail className="h-6 w-6 mb-2" />
                        Email
                      </Button>
                      <Button variant="outline" className="flex-col h-20">
                        <Share className="h-6 w-6 mb-2" />
                        Link
                      </Button>
                      <Button variant="outline" className="flex-col h-20">
                        <Download className="h-6 w-6 mb-2" />
                        Download
                      </Button>
                      <Button variant="outline" className="flex-col h-20">
                        <MoreHorizontal className="h-6 w-6 mb-2" />
                        More
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="popovers" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Popover Components</h2>
            <p className="text-muted-foreground mb-6">
              Floating content containers for additional information and actions
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Basic Popover */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Basic Popover</CardTitle>
                <CardDescription>
                  Simple popover with text content
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button>
                      <Info className="mr-2 h-4 w-4" />
                      Show Info
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="space-y-2">
                      <h4 className="font-medium">About this feature</h4>
                      <p className="text-sm text-muted-foreground">
                        This is a popover component that displays additional
                        information when triggered.
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>
              </CardContent>
            </Card>

            {/* Form Popover */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Form Popover</CardTitle>
                <CardDescription>
                  Popover containing form elements
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Quick Add
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Add New Item</h4>
                        <p className="text-sm text-muted-foreground">
                          Quickly create a new item with basic information.
                        </p>
                      </div>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <Label htmlFor="item-name">Name</Label>
                          <Input id="item-name" placeholder="Enter item name" />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="item-category">Category</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="work">Work</SelectItem>
                              <SelectItem value="personal">Personal</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button className="w-full">Add Item</Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </CardContent>
            </Card>

            {/* Menu Popover */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Menu Popover</CardTitle>
                <CardDescription>
                  Popover with menu items and actions
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 p-2">
                    <div className="space-y-1">
                      <Button variant="ghost" className="w-full justify-start">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <Share className="mr-2 h-4 w-4" />
                        Share
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                      <div className="h-px bg-border my-1" />
                      <Button variant="ghost" className="w-full justify-start text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tooltips" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Tooltip Components</h2>
            <p className="text-muted-foreground mb-6">
              Helpful hints and information on hover or focus
            </p>
          </div>

          <TooltipProvider>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {/* Basic Tooltip */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Basic Tooltip</CardTitle>
                  <CardDescription>
                    Simple tooltip with text
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button>
                        <HelpCircle className="mr-2 h-4 w-4" />
                        Hover me
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>This is a helpful tooltip</p>
                    </TooltipContent>
                  </Tooltip>
                </CardContent>
              </Card>

              {/* Icon Tooltips */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Icon Tooltips</CardTitle>
                  <CardDescription>
                    Tooltips for icon buttons
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center space-x-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add to favorites</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Star className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Rate this item</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Share className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share with others</p>
                    </TooltipContent>
                  </Tooltip>
                </CardContent>
              </Card>

              {/* Rich Tooltip */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Rich Tooltip</CardTitle>
                  <CardDescription>
                    Tooltip with rich content
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">
                        <User className="mr-2 h-4 w-4" />
                        User Info
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={users[0].avatar} />
                            <AvatarFallback>AJ</AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-sm">Alice Johnson</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Product Designer with 5+ years of experience in UX/UI design
                        </p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </CardContent>
              </Card>

              {/* Keyboard Shortcuts */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Keyboard Shortcuts</CardTitle>
                  <CardDescription>
                    Tooltips showing keyboard shortcuts
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center space-x-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Search className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="flex items-center space-x-2">
                        <span>Search</span>
                        <kbd className="px-2 py-1 text-xs bg-muted rounded">⌘K</kbd>
                      </div>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="flex items-center space-x-2">
                        <span>New item</span>
                        <kbd className="px-2 py-1 text-xs bg-muted rounded">⌘N</kbd>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </CardContent>
              </Card>
            </div>
          </TooltipProvider>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Tooltips should provide helpful, concise information without overwhelming the user. 
              Use them sparingly and ensure they add value to the user experience.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  );
} 