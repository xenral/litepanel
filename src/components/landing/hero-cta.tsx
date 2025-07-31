'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Github, ExternalLink, Play, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Enhanced call-to-action section with interactive buttons
 */
export function HeroCTA() {
  const [isHoveringDemo, setIsHoveringDemo] = React.useState(false);
  const [isHoveringGithub, setIsHoveringGithub] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="flex flex-col items-center justify-center gap-6 sm:flex-row"
    >
      {/* Primary CTA - Live Demo */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onHoverStart={() => setIsHoveringDemo(true)}
        onHoverEnd={() => setIsHoveringDemo(false)}
      >
        <Button
          asChild
          size="lg"
          className="group relative overflow-hidden rounded-xl px-8 py-6 text-lg shadow-lg transition-all duration-300 hover:shadow-xl"
        >
          <Link href="/dashboard">
            {/* Animated background gradient */}
            <motion.div
              className="from-primary/80 to-accent/80 absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              animate={
                isHoveringDemo
                  ? {
                      background: [
                        'linear-gradient(90deg, hsl(var(--primary)/0.8) 0%, hsl(var(--accent)/0.8) 100%)',
                        'linear-gradient(90deg, hsl(var(--accent)/0.8) 0%, hsl(var(--primary)/0.8) 100%)',
                        'linear-gradient(90deg, hsl(var(--primary)/0.8) 0%, hsl(var(--accent)/0.8) 100%)',
                      ],
                    }
                  : {}
              }
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Button content */}
            <span className="relative z-10 flex items-center">
              <Play className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
              Live Demo
              <motion.div
                className="ml-2"
                animate={isHoveringDemo ? { x: [0, 5, 0] } : { x: 0 }}
                transition={{
                  type: 'tween',
                  duration: 0.6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.div>
            </span>

            {/* Sparkle effects */}
            <AnimatePresence>
              {isHoveringDemo && (
                <>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="absolute -right-1 -top-1"
                  >
                    <Sparkles className="h-4 w-4 text-yellow-300" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ delay: 0.2 }}
                    className="absolute -bottom-1 -left-1"
                  >
                    <Sparkles className="h-3 w-3 text-blue-300" />
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </Link>
        </Button>
      </motion.div>

      {/* Secondary CTA - GitHub */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onHoverStart={() => setIsHoveringGithub(true)}
        onHoverEnd={() => setIsHoveringGithub(false)}
      >
        <Button
          asChild
          variant="outline"
          size="lg"
          className="hover:bg-muted/50 group relative overflow-hidden rounded-xl px-8 py-6 text-lg transition-all duration-300"
        >
          <Link href="https://github.com/xenral/litepanel" target="_blank">
            {/* Animated border glow */}
            <motion.div
              className="border-primary/50 absolute inset-0 rounded-xl border opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              animate={
                isHoveringGithub
                  ? {
                      borderColor: [
                        'hsl(var(--primary)/0.5)',
                        'hsl(var(--accent)/0.8)',
                        'hsl(var(--primary)/0.5)',
                      ],
                    }
                  : {}
              }
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Button content */}
            <span className="relative z-10 flex items-center">
              <motion.div
                animate={
                  isHoveringGithub ? { rotate: [0, 360] } : { rotate: 0 }
                }
                transition={{ duration: 1 }}
              >
                <Github className="mr-2 h-5 w-5" />
              </motion.div>
              View on GitHub
              <motion.div
                className="ml-2"
                animate={
                  isHoveringGithub
                    ? { x: [0, 3, 0], y: [0, -3, 0] }
                    : { x: 0, y: 0 }
                }
                transition={{
                  type: 'tween',
                  duration: 0.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <ExternalLink className="h-4 w-4" />
              </motion.div>
            </span>
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  );
}
