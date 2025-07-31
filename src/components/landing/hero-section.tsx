'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HeroBackground } from './hero-background';
import { HeroFeatures } from './hero-features';
import { HeroCTA } from './hero-cta';
import { HeroStats } from './hero-stats';
import Image from 'next/image';

/**
 * Enhanced hero section component with modular structure
 * Features animated background, typing effects, interactive CTAs, and stats
 */
export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Enhanced animated background */}
      <HeroBackground />

      <div className="container relative z-10 mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mx-auto max-w-5xl space-y-12"
        >
          {/* Logo and branding with enhanced animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center space-x-3"
          >
            <motion.div
              className="flex h-14 w-14 items-center justify-center rounded-xl bg-white bg-gradient-to-br p-2 shadow-lg"
              whileHover={{
                scale: 1.1,
                rotate: [0, -10, 10, 0],
                boxShadow:
                  '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              }}
              transition={{
                scale: { type: 'spring', stiffness: 300 },
                rotate: { type: 'tween', duration: 0.6, ease: 'easeInOut' },
                boxShadow: { type: 'tween', duration: 0.3 },
              }}
            >
              <Image src="/logo.svg" alt="LitePanel" width={100} height={100} />
            </motion.div>
            <motion.h1
              className="text-gradient from-foreground to-foreground/70 bg-gradient-to-r bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-6xl"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              LitePanel
            </motion.h1>
          </motion.div>

          {/* Enhanced features section with typing animation */}
          <HeroFeatures />

          {/* Enhanced CTA section */}
          <HeroCTA />

          {/* Animated statistics */}
          <HeroStats />

          {/* Enhanced scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 transform"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                type: 'tween',
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="border-muted-foreground/30 mx-auto flex h-12 w-7 justify-center rounded-full border-2 backdrop-blur-sm"
            >
              <motion.div
                animate={{
                  y: [0, 16, 0],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  type: 'tween',
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="bg-muted-foreground/60 mt-3 h-4 w-1 rounded-full"
              />
            </motion.div>

            {/* Scroll hint text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="text-muted-foreground mt-2 text-xs"
            >
              Scroll to explore
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle glow effect at the bottom */}
      <motion.div
        className="from-primary/5 absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      />
    </section>
  );
}
