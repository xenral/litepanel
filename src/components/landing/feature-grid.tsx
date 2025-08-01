'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  Shield,
  Palette,
  Code,
  Layers,
  Smartphone,
  BarChart3,
  Users,
  Settings,
  CheckCircle,
  Globe,
  Rocket,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

/**
 * Feature data for the grid
 */
const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Built with Next.js 15 and React 19 for optimal performance and developer experience.',
    badge: 'Performance',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Palette,
    title: 'Theme System',
    description:
      'Hot-swappable themes with CSS variables, dark mode, and accessibility support.',
    badge: 'Design',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Shield,
    title: 'Type Safety',
    description:
      'Fully typed with TypeScript, Zod validation, and strict ESLint configuration.',
    badge: 'Quality',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Code,
    title: 'Developer Ready',
    description:
      'Complete tooling with Prettier, Husky, GitHub Actions, and Storybook integration.',
    badge: 'DevEx',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Layers,
    title: 'shadcn/ui',
    description:
      'Beautiful, accessible components built on Radix UI with Tailwind CSS styling.',
    badge: 'Components',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Smartphone,
    title: 'Responsive',
    description:
      'Mobile-first design with touch-optimized interactions and adaptive layouts.',
    badge: 'Mobile',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: BarChart3,
    title: 'Data Visualization',
    description:
      'Charts with ECharts, advanced tables with TanStack Table, and real-time updates.',
    badge: 'Analytics',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Users,
    title: 'Auth Ready',
    description:
      'Authentication pages with form validation, password strength, and social login.',
    badge: 'Security',
    color: 'from-teal-500 to-cyan-500',
  },
  {
    icon: Settings,
    title: 'Customizable',
    description:
      'Theme customizer, settings panels, and configuration options for every need.',
    badge: 'Flexible',
    color: 'from-gray-500 to-slate-500',
  },
  {
    icon: CheckCircle,
    title: 'Tested',
    description:
      'E2E tests with Playwright, comprehensive error boundaries, and quality assurance.',
    badge: 'Reliable',
    color: 'from-emerald-500 to-green-500',
  },
  {
    icon: Globe,
    title: 'Accessible',
    description:
      'WCAG 2.2 AAA compliant with keyboard navigation, screen reader support, and focus management.',
    badge: 'A11y',
    color: 'from-violet-500 to-purple-500',
  },
  {
    icon: Rocket,
    title: 'Production Ready',
    description:
      'Optimized builds, SEO metadata, error pages, and deployment configurations included.',
    badge: 'Deploy',
    color: 'from-cyan-500 to-blue-500',
  },
];

/**
 * Feature grid section for the landing page
 */
export function FeatureGrid() {
  return (
    <section className="bg-background py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 flex items-center justify-center">
            <div className="bg-primary/10 text-primary flex items-center space-x-2 rounded-full px-4 py-2">
              <Layers className="h-5 w-5" />
              <span className="text-sm font-medium">Features</span>
            </div>
          </div>

          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Everything You Need
          </h2>

          <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
            A comprehensive admin template with modern tools, beautiful design,
            and production-ready features. Built for developers who value
            quality and efficiency.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Card className="group h-full p-6 transition-all duration-300 hover:shadow-lg">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex h-full flex-col"
                >
                  {/* Icon with gradient background */}
                  <div className="relative mb-4">
                    <div
                      className={`h-12 w-12 rounded-lg bg-gradient-to-br ${feature.color} p-3 text-white`}
                    >
                      <feature.icon className="h-full w-full" />
                    </div>

                    {/* Badge */}
                    <Badge
                      variant="secondary"
                      className="absolute -right-2 -top-2 text-xs"
                    >
                      {feature.badge}
                    </Badge>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="group-hover:text-primary mb-2 text-lg font-semibold transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="text-muted-foreground inline-flex items-center space-x-2 text-sm">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>MIT Licensed</span>
            <div className="bg-muted-foreground/50 h-1 w-1 rounded-full" />
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>TypeScript</span>
            <div className="bg-muted-foreground/50 h-1 w-1 rounded-full" />
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Production Ready</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
