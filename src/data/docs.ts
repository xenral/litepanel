import {
  Zap,
  Package,
  Code,
  BookOpen,
  Rocket,
  FileText,
  Palette,
  Layers,
  Download,
  Settings,
  Play,
  Video,
  Users
} from 'lucide-react';
import type {
  DocCategory,
  QuickStartStep,
  PopularDoc,
  RecentUpdate,
  Contributor,
  CommunityStats,
  LearningResource
} from '@/types/docs';

export const docCategories: DocCategory[] = [
  {
    id: 'getting-started',
    name: 'Getting Started',
    description: 'Quick setup, installation guides, and first steps',
    icon: Zap,
    articles: 12,
    color: 'text-green-600 bg-green-100 dark:bg-green-900',
    lastUpdated: '2024-01-15',
    completionRate: 95,
    difficulty: 'Beginner'
  },
  {
    id: 'components',
    name: 'Components',
    description: 'UI component documentation and usage examples',
    icon: Package,
    articles: 34,
    color: 'text-blue-600 bg-blue-100 dark:bg-blue-900',
    lastUpdated: '2024-01-14',
    completionRate: 88,
    difficulty: 'Intermediate'
  },
  {
    id: 'api',
    name: 'API Reference',
    description: 'Complete API documentation with examples',
    icon: Code,
    articles: 28,
    color: 'text-purple-600 bg-purple-100 dark:bg-purple-900',
    lastUpdated: '2024-01-13',
    completionRate: 92,
    difficulty: 'Advanced'
  },
  {
    id: 'guides',
    name: 'Guides & Tutorials',
    description: 'Step-by-step tutorials and best practices',
    icon: BookOpen,
    articles: 22,
    color: 'text-orange-600 bg-orange-100 dark:bg-orange-900',
    lastUpdated: '2024-01-12',
    completionRate: 85,
    difficulty: 'Intermediate'
  },
  {
    id: 'deployment',
    name: 'Deployment',
    description: 'Deploy your application to various platforms',
    icon: Rocket,
    articles: 16,
    color: 'text-indigo-600 bg-indigo-100 dark:bg-indigo-900',
    lastUpdated: '2024-01-11',
    completionRate: 90,
    difficulty: 'Intermediate'
  },
  {
    id: 'examples',
    name: 'Code Examples',
    description: 'Practical examples and code patterns',
    icon: FileText,
    articles: 45,
    color: 'text-teal-600 bg-teal-100 dark:bg-teal-900',
    lastUpdated: '2024-01-10',
    completionRate: 87,
    difficulty: 'Beginner'
  },
  {
    id: 'theming',
    name: 'Theming',
    description: 'Customization, themes, and design tokens',
    icon: Palette,
    articles: 18,
    color: 'text-pink-600 bg-pink-100 dark:bg-pink-900',
    lastUpdated: '2024-01-09',
    completionRate: 93,
    difficulty: 'Advanced'
  },
  {
    id: 'integrations',
    name: 'Integrations',
    description: 'Third-party integrations and plugins',
    icon: Layers,
    articles: 14,
    color: 'text-cyan-600 bg-cyan-100 dark:bg-cyan-900',
    lastUpdated: '2024-01-08',
    completionRate: 82,
    difficulty: 'Advanced'
  }
];

export const quickStart: QuickStartStep[] = [
  {
    step: 1,
    title: 'Installation',
    description: 'Install LiteControl and dependencies',
    command: 'npm create litecontrol-app@latest my-app',
    time: '2 min',
    icon: Download
  },
  {
    step: 2,
    title: 'Configuration',
    description: 'Set up your project configuration',
    command: 'cd my-app && npm run setup',
    time: '3 min',
    icon: Settings
  },
  {
    step: 3,
    title: 'Development',
    description: 'Start the development server',
    command: 'npm run dev',
    time: '1 min',
    icon: Play
  },
  {
    step: 4,
    title: 'Customization',
    description: 'Customize themes and components',
    command: 'npm run theme:customize',
    time: '5 min',
    icon: Palette
  }
];

export const popularDocs: PopularDoc[] = [
  {
    title: 'Getting Started with LiteControl',
    description: 'Complete guide to setting up your first LiteControl project',
    category: 'Getting Started',
    readTime: '8 min',
    popularity: 'High',
    views: 15420,
    lastUpdated: '2024-01-15',
    rating: 4.9,
    tags: ['setup', 'beginner', 'installation']
  },
  {
    title: 'Component API Reference',
    description: 'Comprehensive reference for all UI components and their props',
    category: 'Components',
    readTime: '15 min',
    popularity: 'High',
    views: 12350,
    lastUpdated: '2024-01-14',
    rating: 4.8,
    tags: ['components', 'api', 'reference']
  },
  {
    title: 'Advanced Theme Customization',
    description: 'Deep dive into theme customization and design tokens',
    category: 'Theming',
    readTime: '12 min',
    popularity: 'High',
    views: 9870,
    lastUpdated: '2024-01-13',
    rating: 4.7,
    tags: ['theming', 'customization', 'design-tokens']
  },
  {
    title: 'Authentication & Authorization',
    description: 'Implement secure user authentication and role-based access',
    category: 'Guides',
    readTime: '20 min',
    popularity: 'High',
    views: 8920,
    lastUpdated: '2024-01-12',
    rating: 4.8,
    tags: ['auth', 'security', 'users']
  },
  {
    title: 'Deployment to Production',
    description: 'Best practices for deploying to various cloud platforms',
    category: 'Deployment',
    readTime: '10 min',
    popularity: 'Medium',
    views: 7560,
    lastUpdated: '2024-01-11',
    rating: 4.6,
    tags: ['deployment', 'production', 'hosting']
  },
  {
    title: 'Building Interactive Dashboards',
    description: 'Create beautiful and functional admin dashboards',
    category: 'Examples',
    readTime: '25 min',
    popularity: 'High',
    views: 11240,
    lastUpdated: '2024-01-10',
    rating: 4.9,
    tags: ['dashboard', 'charts', 'data-visualization']
  }
];

export const recentUpdates: RecentUpdate[] = [
  {
    version: 'v2.4.0',
    date: '2024-01-15',
    type: 'major',
    title: 'New Component Library',
    description: 'Added 12 new components including Charts, Calendar, and Rich Text Editor',
    changes: [
      'New Charts component with 8 chart types',
      'Calendar component with full internationalization',
      'Rich Text Editor with markdown support'
    ]
  },
  {
    version: 'v2.3.2',
    date: '2024-01-12',
    type: 'patch',
    title: 'Bug Fixes & Performance',
    description: 'Critical bug fixes and performance improvements',
    changes: [
      'Fixed memory leak in Table component',
      'Improved bundle size by 15%',
      'Enhanced accessibility support'
    ]
  },
  {
    version: 'v2.3.0',
    date: '2024-01-08',
    type: 'minor',
    title: 'Theme System Update',
    description: 'Enhanced theming capabilities and new design tokens',
    changes: [
      'New CSS custom properties system',
      'Dark mode improvements',
      'Better responsive design tokens'
    ]
  }
];

export const contributors: Contributor[] = [
  {
    name: 'Sarah Chen',
    role: 'Lead Maintainer',
    avatar: '/avatars/sarah.jpg',
    contributions: 247,
    speciality: 'Core Architecture'
  },
  {
    name: 'Mike Rodriguez',
    role: 'UI/UX Designer',
    avatar: '/avatars/mike.jpg',
    contributions: 156,
    speciality: 'Design System'
  },
  {
    name: 'Emily Johnson',
    role: 'Developer',
    avatar: '/avatars/emily.jpg',
    contributions: 134,
    speciality: 'Components'
  },
  {
    name: 'David Kim',
    role: 'Documentation',
    avatar: '/avatars/david.jpg',
    contributions: 89,
    speciality: 'Docs & Examples'
  }
];

export const communityStats: CommunityStats = {
  totalUsers: 15420,
  activeContributors: 89,
  githubStars: 12500,
  discordMembers: 3420,
  monthlyDownloads: 45600,
  issuesResolved: 1847
};

export const learningResources: LearningResource[] = [
  {
    type: 'video',
    title: 'LiteControl Crash Course',
    description: '1-hour comprehensive tutorial covering all basics',
    duration: '1h 15m',
    level: 'Beginner',
    views: 25400,
    icon: Video
  },
  {
    type: 'article',
    title: 'Building Your First Admin Panel',
    description: 'Step-by-step guide with real-world examples',
    duration: '30 min read',
    level: 'Intermediate',
    views: 18900,
    icon: FileText
  },
  {
    type: 'course',
    title: 'Advanced Component Patterns',
    description: 'Master advanced patterns and best practices',
    duration: '3h 45m',
    level: 'Advanced',
    views: 12300,
    icon: BookOpen
  },
  {
    type: 'workshop',
    title: 'Live Coding Session',
    description: 'Join our weekly live coding workshops',
    duration: 'Every Friday',
    level: 'All Levels',
    views: 8700,
    icon: Users
  }
]; 