'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Rocket,
  Github,
  ExternalLink,
  ArrowRight,
  Star,
  GitFork,
  BookOpen,
  Zap,
  Shield,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { fetchAllStats, fetchGitHubStats, type StatsData } from '@/lib/stats.api';

/**
 * Create dynamic stats for the CTA section
 */
const createStats = (data: StatsData | null, isLoading: boolean) => [
  {
    icon: Github,
    value: isLoading ? '...' : `${(data?.githubStars || 0) >= 1000 ? `${Math.floor((data?.githubStars || 0) / 1000)}k+` : `${data?.githubStars || 0}+`}`,
    label: 'GitHub Stars',
    description: 'Join our growing community',
  },
  {
    icon: GitFork,
    value: isLoading ? '...' : `${Math.floor((data?.githubClones || 0) / 1000)}k+`,
    label: 'Repository Clones',
    description: 'Total clones this month',
  },
  {
    icon: Users,
    value: isLoading ? '...' : `${data?.contributors || 0}+`,
    label: 'Contributors',
    description: 'Active project contributors',
  },
  {
    icon: Shield,
    value: isLoading ? '...' : `${data?.performance || 0}%`,
    label: 'Performance',
    description: 'Lighthouse score',
  },
];

/**
 * Deployment options
 */
const deploymentOptions = [
  {
    name: 'Vercel',
    description: 'Deploy with zero configuration',
    icon: '▲',
    url: 'https://vercel.com/new/clone?repository-url=https://github.com/xenral/litepanel',
    color: 'bg-black text-white hover:bg-gray-800',
    primary: true,
  },
  {
    name: 'Netlify',
    description: 'One-click deployment',
    icon: '◆',
    url: 'https://app.netlify.com/start/deploy?repository=https://github.com/xenral/litepanel',
    color: 'bg-teal-600 text-white hover:bg-teal-700',
  },
  {
    name: 'Railway',
    description: 'Deploy from GitHub',
    icon: '🚂',
    url: 'https://railway.app/new/template?template=https://github.com/xenral/litepanel',
    color: 'bg-purple-600 text-white hover:bg-purple-700',
  },
];

/**
 * CTA section for the landing page
 */
export function CTASection() {
  const [githubStars, setGithubStars] = React.useState<number | null>(null);
  const [statsData, setStatsData] = React.useState<StatsData | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    let isMounted = true;

    const loadStats = async () => {
      try {
        // Load both GitHub stars for the button and all stats for the bottom section
        const [githubData, allStats] = await Promise.all([
          fetchGitHubStats(),
          fetchAllStats(),
        ]);

        if (isMounted) {
          setGithubStars(githubData.stars);
          setStatsData(allStats);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Failed to load CTA stats:', error);
        if (isMounted) {
          // Fallback values
          setGithubStars(2547);
          setStatsData({
            githubStars: 2547,
            githubClones: 6500,
            contributors: 24,
            performance: 98,
          });
          setIsLoading(false);
        }
      }
    };

    loadStats();

    // Refresh every 10 minutes (less frequent than hero stats)
    const interval = setInterval(loadStats, 10 * 60 * 1000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const stats = createStats(statsData, isLoading);

  return (
    <section className="from-background via-muted/20 to-background relative overflow-hidden bg-gradient-to-br py-24">
      {/* Background decoration */}
      <div className="bg-grid-pattern absolute inset-0 opacity-5" />
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="from-primary/10 to-secondary/10 absolute right-20 top-20 h-64 w-64 rounded-full bg-gradient-to-br blur-3xl"
      />
      <motion.div
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="from-secondary/10 to-accent/10 absolute bottom-20 left-20 h-48 w-48 rounded-full bg-gradient-to-br blur-3xl"
      />

      <div className="container relative z-10 mx-auto px-4">
        {/* Main CTA Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-6 flex items-center justify-center">
            <div className="bg-primary/10 text-primary flex items-center space-x-2 rounded-full px-4 py-2">
              <Rocket className="h-5 w-5" />
              <span className="text-sm font-medium">Ready to Launch</span>
            </div>
          </div>

          <h2 className="text-gradient mb-6 text-4xl font-bold md:text-5xl">
            Start Building Today
          </h2>

          <p className="text-muted-foreground mx-auto mb-8 max-w-3xl text-xl">
            Join thousands of developers who trust LitePanel for their projects.
            Get started in minutes with our comprehensive documentation and
            examples.
          </p>

          {/* Primary Actions */}
          <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="flex min-w-[200px] items-center space-x-2"
            >
              <Link href="/dashboard">
                <Zap className="h-5 w-5" />
                <span>Live Demo</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="flex min-w-[200px] items-center space-x-2"
            >
              <Link href="https://github.com/xenral/litepanel" target="_blank">
                <Github className="h-5 w-5" />
                <span>View on GitHub</span>
                {githubStars && (
                  <Badge variant="secondary" className="ml-2">
                    <Star className="mr-1 h-3 w-3 fill-current text-yellow-500" />
                    {githubStars.toLocaleString()}
                  </Badge>
                )}
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Deployment Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="mb-8 text-center text-2xl font-semibold">
            Deploy with One Click
          </h3>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
            {deploymentOptions.map((option, index) => (
              <motion.div
                key={option.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="group p-6 text-center transition-all duration-300 hover:shadow-lg">
                  <div className="mb-3 text-3xl">{option.icon}</div>
                  <h4 className="mb-2 font-semibold">{option.name}</h4>
                  <p className="text-muted-foreground mb-4 text-sm">
                    {option.description}
                  </p>
                  <Button
                    asChild
                    className={`w-full ${option.color} transition-transform group-hover:scale-105`}
                    variant={option.primary ? 'default' : 'secondary'}
                  >
                    <Link href={option.url} target="_blank">
                      Deploy to {option.name}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16 grid grid-cols-2 gap-8 md:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="text-center"
            >
              <div className="bg-primary/10 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg relative">
                <stat.icon className="text-primary h-6 w-6" />
                {!isLoading && statsData && (
                  <div className="absolute -top-1 -right-1">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  </div>
                )}
              </div>
              <div className="mb-1 text-2xl font-bold md:text-3xl">
                {isLoading ? (
                  <div className="h-8 w-16 animate-pulse rounded bg-muted/50 mx-auto" />
                ) : (
                  stat.value
                )}
              </div>
              <div className="mb-1 text-sm font-medium">{stat.label}</div>
              <div className="text-muted-foreground text-xs">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Secondary Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <div className="mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              variant="ghost"
              className="flex items-center space-x-2"
            >
              <Link href="/docs">
                <BookOpen className="h-4 w-4" />
                <span>Documentation</span>
              </Link>
            </Button>

            <Button
              asChild
              variant="ghost"
              className="flex items-center space-x-2"
            >
              <Link href="/components">
                <Star className="h-4 w-4" />
                <span>Component Gallery</span>
              </Link>
            </Button>

            <Button
              asChild
              variant="ghost"
              className="flex items-center space-x-2"
            >
              <Link href="/storybook">
                <ExternalLink className="h-4 w-4" />
                <span>Storybook</span>
              </Link>
            </Button>
          </div>

          <div className="text-muted-foreground text-sm">
            <div className="mb-4 flex items-center justify-center space-x-4">
              <div className="flex items-center space-x-1">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span>MIT Licensed</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <span>TypeScript</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                <span>Next.js 15</span>
              </div>
            </div>

            <p className="mx-auto max-w-2xl">
              LitePanel is built with modern tools and best practices. Start
              with our template and customize it to fit your unique needs. No
              vendor lock-in, no subscriptions, just great code.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
