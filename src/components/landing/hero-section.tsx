'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Star, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

/**
 * Hero section component with animated logo, tagline, and primary CTA
 * Features GitHub stats, live demo button, and scroll animation
 */
export function HeroSection() {
  const [githubStars, setGithubStars] = React.useState<number | null>(null);

  // Fetch GitHub stars (simulated for now)
  React.useEffect(() => {
    // TODO: Replace with actual GitHub API call
    // For now, simulate loading stars
    const timer = setTimeout(() => {
      setGithubStars(1247); // Simulated star count
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      {/* Animated background orbs */}
      <motion.div
        className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container relative z-10 mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8 max-w-4xl mx-auto"
        >
          {/* Logo and branding */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center space-x-3"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
              <span className="text-2xl font-bold text-primary-foreground">T</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gradient">
              ThemeCraft Admin
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            A fully-typed{' '}
            <span className="font-semibold text-foreground">Next.js 15</span>{' '}
            admin template with{' '}
            <span className="font-semibold text-foreground">hot-swappable themes</span>,{' '}
            built for modern React applications
          </motion.p>

          {/* GitHub stats and badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <Badge variant="secondary" className="text-sm px-3 py-1">
              TypeScript
            </Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">
              Next.js 15
            </Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">
              Tailwind CSS v4
            </Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">
              shadcn/ui
            </Badge>
            
            {/* GitHub stars */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.8 }}
              className="flex items-center space-x-1 bg-background border rounded-full px-3 py-1"
            >
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium">
                {githubStars ? githubStars.toLocaleString() : '...'}
              </span>
              <span className="text-sm text-muted-foreground">stars</span>
            </motion.div>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              asChild
              size="lg"
              className="group text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href="/dashboard">
                Live Demo
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 rounded-xl group"
            >
              <Link href="https://github.com/yourusername/themecraft-admin" target="_blank">
                <Github className="mr-2 w-5 h-5" />
                View on GitHub
                <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-muted-foreground/50 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 