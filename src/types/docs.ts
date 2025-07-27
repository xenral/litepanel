import { LucideIcon } from 'lucide-react';

export interface DocCategory {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  articles: number;
  color: string;
  lastUpdated: string;
  completionRate: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface QuickStartStep {
  step: number;
  title: string;
  description: string;
  command: string;
  time: string;
  icon: LucideIcon;
}

export interface PopularDoc {
  title: string;
  description: string;
  category: string;
  readTime: string;
  popularity: 'High' | 'Medium' | 'Low';
  views: number;
  lastUpdated: string;
  rating: number;
  tags: string[];
}

export interface RecentUpdate {
  version: string;
  date: string;
  type: 'major' | 'minor' | 'patch';
  title: string;
  description: string;
  changes: string[];
}

export interface Contributor {
  name: string;
  role: string;
  avatar: string;
  contributions: number;
  speciality: string;
}

export interface CommunityStats {
  totalUsers: number;
  activeContributors: number;
  githubStars: number;
  discordMembers: number;
  monthlyDownloads: number;
  issuesResolved: number;
}

export interface LearningResource {
  type: 'video' | 'article' | 'course' | 'workshop';
  title: string;
  description: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  views: number;
  icon: LucideIcon;
}
