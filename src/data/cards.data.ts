import {
  DollarSign,
  Users,
  CreditCard,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from 'lucide-react';

export interface StatsCard {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: any;
  description: string;
}

export interface ProductCard {
  id: number;
  name: string;
  price: string;
  originalPrice: string;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  badge: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
  location: string;
  email: string;
  projects: number;
  rating: number;
  skills: string[];
}

export interface ProjectCard {
  id: number;
  title: string;
  description: string;
  progress: number;
  status: string;
  dueDate: string;
  team: number;
  tasks: { completed: number; total: number };
  priority: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  authorAvatar: string;
  publishDate: string;
  readTime: string;
  category: string;
  image: string;
  likes: number;
  comments: number;
}

export const statsCards: StatsCard[] = [
  {
    title: 'Total Revenue',
    value: '$45,231.89',
    change: 20.1,
    trend: 'up',
    icon: DollarSign,
    description: 'From last month',
  },
  {
    title: 'Subscriptions',
    value: '+2350',
    change: 180.1,
    trend: 'up',
    icon: Users,
    description: 'From last month',
  },
  {
    title: 'Sales',
    value: '+12,234',
    change: 19,
    trend: 'up',
    icon: CreditCard,
    description: 'From last month',
  },
  {
    title: 'Active Now',
    value: '+573',
    change: 201,
    trend: 'up',
    icon: TrendingUp,
    description: 'From last hour',
  },
];

export const productCards: ProductCard[] = [
  {
    id: 1,
    name: 'MacBook Pro 16"',
    price: '$2,399',
    originalPrice: '$2,599',
    image:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=200&fit=crop',
    category: 'Laptops',
    rating: 4.8,
    reviews: 128,
    inStock: true,
    badge: 'Best Seller',
  },
  {
    id: 2,
    name: 'iPhone 15 Pro',
    price: '$999',
    originalPrice: '$1,099',
    image:
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=200&fit=crop',
    category: 'Smartphones',
    rating: 4.9,
    reviews: 256,
    inStock: true,
    badge: 'New',
  },
  {
    id: 3,
    name: 'AirPods Pro',
    price: '$249',
    originalPrice: '$279',
    image:
      'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300&h=200&fit=crop',
    category: 'Audio',
    rating: 4.7,
    reviews: 89,
    inStock: false,
    badge: 'Sale',
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Alice Johnson',
    role: 'Product Designer',
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face',
    location: 'San Francisco, CA',
    email: 'alice@example.com',
    projects: 12,
    rating: 4.9,
    skills: ['UI/UX', 'Figma', 'Prototyping'],
  },
  {
    id: 2,
    name: 'Bob Smith',
    role: 'Frontend Developer',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    location: 'New York, NY',
    email: 'bob@example.com',
    projects: 18,
    rating: 4.8,
    skills: ['React', 'TypeScript', 'Next.js'],
  },
  {
    id: 3,
    name: 'Carol Davis',
    role: 'Marketing Manager',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    location: 'Austin, TX',
    email: 'carol@example.com',
    projects: 8,
    rating: 4.7,
    skills: ['Strategy', 'Analytics', 'Content'],
  },
];

export const projectCards: ProjectCard[] = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'Modern shopping experience with advanced features',
    progress: 75,
    status: 'In Progress',
    dueDate: '2024-03-15',
    team: 5,
    tasks: { completed: 12, total: 16 },
    priority: 'High',
  },
  {
    id: 2,
    title: 'Mobile App Redesign',
    description: 'Complete UI/UX overhaul for better user engagement',
    progress: 45,
    status: 'In Progress',
    dueDate: '2024-04-20',
    team: 3,
    tasks: { completed: 8, total: 18 },
    priority: 'Medium',
  },
  {
    id: 3,
    title: 'API Integration',
    description: 'Third-party service integration and optimization',
    progress: 100,
    status: 'Completed',
    dueDate: '2024-02-10',
    team: 2,
    tasks: { completed: 10, total: 10 },
    priority: 'Low',
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Getting Started with React 18',
    excerpt:
      'Learn about the new features and improvements in React 18, including concurrent rendering and automatic batching.',
    author: 'John Doe',
    authorAvatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    publishDate: '2024-01-15',
    readTime: '5 min read',
    category: 'Development',
    image:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop',
    likes: 124,
    comments: 23,
  },
  {
    id: 2,
    title: 'Design Systems at Scale',
    excerpt:
      'How to build and maintain design systems for large organizations with multiple teams and products.',
    author: 'Jane Smith',
    authorAvatar:
      'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=40&h=40&fit=crop&crop=face',
    publishDate: '2024-01-10',
    readTime: '8 min read',
    category: 'Design',
    image:
      'https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=200&fit=crop',
    likes: 89,
    comments: 15,
  },
];

// Icon mappings using Maps for better performance
export const trendIconMap = new Map([
  ['up', ArrowUpRight],
  ['down', ArrowDownRight],
  ['stable', Minus],
]);

export const trendColorMap = new Map([
  ['up', 'text-green-600'],
  ['down', 'text-red-600'],
  ['stable', 'text-gray-600'],
]);

export const statusColorMap = new Map<
  string,
  'default' | 'destructive' | 'outline' | 'secondary'
>([
  ['completed', 'default'],
  ['in progress', 'secondary'],
  ['pending', 'outline'],
]);

export const priorityColorMap = new Map<
  string,
  'default' | 'destructive' | 'outline' | 'secondary'
>([
  ['high', 'destructive'],
  ['medium', 'secondary'],
  ['low', 'outline'],
]);
