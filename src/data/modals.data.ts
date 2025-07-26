// Mock users data for modal examples
export const modalUsers = [
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

// Form field options
export const departmentOptions = [
  { value: 'engineering', label: 'Engineering' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'sales', label: 'Sales' },
  { value: 'hr', label: 'Human Resources' },
  { value: 'finance', label: 'Finance' },
];

export const roleOptions = [
  { value: 'admin', label: 'Admin' },
  { value: 'editor', label: 'Editor' },
  { value: 'viewer', label: 'Viewer' },
];

export const planOptions = [
  { value: 'basic', label: 'Basic' },
  { value: 'pro', label: 'Pro' },
  { value: 'enterprise', label: 'Enterprise' },
];

export const categoryOptions = [
  { value: 'web', label: 'Web Development' },
  { value: 'mobile', label: 'Mobile App' },
  { value: 'design', label: 'Design' },
];

// Modal type configurations
export const modalTypes = [
  {
    id: 'dialogs',
    name: 'Dialogs',
    description: 'Standard dialogs for forms, content display, and user interactions',
  },
  {
    id: 'alerts',
    name: 'Alerts',
    description: 'Confirmation dialogs and alerts for critical actions',
  },
  {
    id: 'sheets',
    name: 'Sheets',
    description: 'Slide-out panels and drawers for secondary content and actions',
  },
  {
    id: 'popovers',
    name: 'Popovers',
    description: 'Floating content containers for additional information and actions',
  },
  {
    id: 'tooltips',
    name: 'Tooltips',
    description: 'Helpful hints and information on hover or focus',
  },
];

// Project data for content dialog
export const projectData = {
  name: 'Dashboard Development',
  description: 'This project involves developing a comprehensive dashboard application with modern React components and TypeScript integration.',
  completion: 75,
  teamMembers: modalUsers,
};

// Share options for bottom sheet
export const shareOptions = [
  { icon: 'Mail', label: 'Email' },
  { icon: 'Share', label: 'Link' },
  { icon: 'Download', label: 'Download' },
  { icon: 'MoreHorizontal', label: 'More' },
];

// Navigation items for left sheet
export const navigationItems = [
  { icon: 'User', label: 'Profile' },
  { icon: 'Settings', label: 'Settings' },
  { icon: 'HelpCircle', label: 'Help & Support' },
  { icon: 'Mail', label: 'Contact' },
];

// File upload configuration
export const uploadConfig = {
  maxSize: '10MB',
  supportedTypes: 'PDF, DOC, JPG, PNG',
  dropText: 'Drop files here or click to browse',
  supportText: 'Support for PDF, DOC, JPG, PNG up to 10MB',
}; 