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
  Download,
  BookOpen,
  Zap,
  Shield,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

/**
 * Quick stats for the CTA section
 */
const stats = [
  {
    icon: Github,
    value: '2.5k+',
    label: 'GitHub Stars',
    description: 'Join our growing community'
  },
  {
    icon: Download,
    value: '10k+',
    label: 'Downloads',
    description: 'Monthly package downloads'
  },
  {
    icon: Users,
    value: '500+',
    label: 'Companies',
    description: 'Using in production'
  },
  {
    icon: Shield,
    value: '99.9%',
    label: 'Uptime',
    description: 'Production reliability'
  }
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
    primary: true
  },
  {
    name: 'Netlify',
    description: 'One-click deployment',
    icon: '◆',
          url: 'https://app.netlify.com/start/deploy?repository=https://github.com/xenral/litepanel',
    color: 'bg-teal-600 text-white hover:bg-teal-700'
  },
  {
    name: 'Railway',
    description: 'Deploy from GitHub',
    icon: '🚂',
          url: 'https://railway.app/new/template?template=https://github.com/xenral/litepanel',
    color: 'bg-purple-600 text-white hover:bg-purple-700'
  }
];

/**
 * CTA section for the landing page
 */
export function CTASection() {
  const [githubStars, setGithubStars] = React.useState<number | null>(null);

  React.useEffect(() => {
    // TODO: Replace with actual GitHub API call
    const timer = setTimeout(() => {
      setGithubStars(2547); // Simulated star count
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-24 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-br from-secondary/10 to-accent/10 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Main CTA Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-2 rounded-full bg-primary/10 px-4 py-2 text-primary">
              <Rocket className="h-5 w-5" />
              <span className="text-sm font-medium">Ready to Launch</span>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Start Building Today
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Join thousands of developers who trust LiteControl Admin for their projects. 
            Get started in minutes with our comprehensive documentation and examples.
          </p>

          {/* Primary Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button asChild size="lg" className="flex items-center space-x-2 min-w-[200px]">
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
              className="flex items-center space-x-2 min-w-[200px]"
            >
                             <Link href="https://github.com/xenral/litepanel" target="_blank">
                <Github className="h-5 w-5" />
                <span>View on GitHub</span>
                {githubStars && (
                  <Badge variant="secondary" className="ml-2">
                    <Star className="h-3 w-3 mr-1 text-yellow-500 fill-current" />
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
          <h3 className="text-2xl font-semibold text-center mb-8">
            Deploy with One Click
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {deploymentOptions.map((option, index) => (
              <motion.div
                key={option.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 group">
                  <div className="text-3xl mb-3">{option.icon}</div>
                  <h4 className="font-semibold mb-2">{option.name}</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {option.description}
                  </p>
                  <Button
                    asChild
                    className={`w-full ${option.color} group-hover:scale-105 transition-transform`}
                    variant={option.primary ? 'default' : 'secondary'}
                  >
                    <Link href={option.url} target="_blank">
                      Deploy to {option.name}
                      <ExternalLink className="h-4 w-4 ml-2" />
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
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
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
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-medium mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-muted-foreground">
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
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button asChild variant="ghost" className="flex items-center space-x-2">
              <Link href="/docs">
                <BookOpen className="h-4 w-4" />
                <span>Documentation</span>
              </Link>
            </Button>
            
            <Button asChild variant="ghost" className="flex items-center space-x-2">
              <Link href="/components">
                <Star className="h-4 w-4" />
                <span>Component Gallery</span>
              </Link>
            </Button>
            
            <Button asChild variant="ghost" className="flex items-center space-x-2">
              <Link href="/storybook">
                <ExternalLink className="h-4 w-4" />
                <span>Storybook</span>
              </Link>
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>MIT Licensed</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span>TypeScript</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <span>Next.js 15</span>
              </div>
            </div>
            
            <p className="max-w-2xl mx-auto">
              LiteControl Admin is built with modern tools and best practices. 
              Start with our template and customize it to fit your unique needs. 
              No vendor lock-in, no subscriptions, just great code.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 