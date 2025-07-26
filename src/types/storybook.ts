import { LucideIcon } from 'lucide-react';

export interface ComponentStory {
  name: string;
  description: string;
  complexity: 'Simple' | 'Medium' | 'Complex';
  testCoverage: number;
}

export interface ComponentInfo {
  id: string;
  name: string;
  category: string;
  icon: LucideIcon;
  description: string;
  stories: ComponentStory[];
  status: 'stable' | 'beta' | 'alpha';
  lastUpdated: string;
  version: string;
  downloads: number;
  rating: number;
  contributors: string[];
}

export interface StorybookStats {
  totalComponents: number;
  totalStories: number;
  stableComponents: number;
  coverage: number;
  weeklyViews: number;
  totalDownloads: number;
  avgRating: number;
  activeContributors: number;
  testsPassing: number;
  testsTotal: number;
}

export interface RecentActivity {
  id: number;
  type: string;
  message: string;
  user: string;
  time: string;
  icon: LucideIcon;
}

export interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  contributions: number;
  status: 'online' | 'away' | 'offline';
}

export interface DevTool {
  name: string;
  description: string;
  status: 'active' | 'pending';
  icon: LucideIcon;
  color: string;
} 