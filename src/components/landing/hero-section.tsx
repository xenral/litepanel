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
    <section className="from-background via-background to-muted/20 relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br">
      {/* Background pattern */}
      <div className="bg-grid-pattern absolute inset-0 opacity-5" />

      {/* Animated background orbs */}
      <motion.div
        className="bg-primary/10 absolute -right-40 -top-40 h-80 w-80 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="bg-accent/10 absolute -bottom-40 -left-40 h-96 w-96 rounded-full blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="container relative z-10 mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mx-auto max-w-4xl space-y-8"
        >
          {/* Logo and branding */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center space-x-3"
          >
            <div className="from-primary to-accent flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br">
              <span className="text-primary-foreground text-2xl font-bold">
                T
              </span>
            </div>
            <h1 className="text-gradient text-4xl font-bold tracking-tight md:text-5xl">
              LiteControl Admin
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-muted-foreground mx-auto max-w-3xl text-xl leading-relaxed md:text-2xl"
          >
            A fully-typed{' '}
            <span className="text-foreground font-semibold">Next.js 15</span>{' '}
            admin template with{' '}
            <span className="text-foreground font-semibold">
              hot-swappable themes
            </span>
            , built for modern React applications
          </motion.p>

          {/* GitHub stats and badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <Badge variant="secondary" className="px-3 py-1 text-sm">
              TypeScript
            </Badge>
            <Badge variant="secondary" className="px-3 py-1 text-sm">
              Next.js 15
            </Badge>
            <Badge variant="secondary" className="px-3 py-1 text-sm">
              Tailwind CSS v4
            </Badge>
            <Badge variant="secondary" className="px-3 py-1 text-sm">
              shadcn/ui
            </Badge>

            {/* GitHub stars */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 100, delay: 0.8 }}
              className="bg-background flex items-center space-x-1 rounded-full border px-3 py-1"
            >
              <Star className="h-4 w-4 fill-current text-yellow-500" />
              <span className="text-sm font-medium">
                {githubStars ? githubStars.toLocaleString() : '...'}
              </span>
              <span className="text-muted-foreground text-sm">stars</span>
            </motion.div>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="group rounded-xl px-8 py-6 text-lg shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <Link href="/dashboard">
                Live Demo
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="group rounded-xl px-8 py-6 text-lg"
            >
              <Link href="https://github.com/xenral/litepanel" target="_blank">
                <Github className="mr-2 h-5 w-5" />
                View on GitHub
                <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 transform"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="border-muted-foreground/30 flex h-10 w-6 justify-center rounded-full border-2"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="bg-muted-foreground/50 mt-2 h-3 w-1 rounded-full"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
