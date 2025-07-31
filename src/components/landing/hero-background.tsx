'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useThemeContext } from '@/context/theme-context';

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

/**
 * Theme-aware animated background with subtle effects
 */
export function HeroBackground() {
  const { isDark } = useThemeContext();
  const [floatingElements, setFloatingElements] = React.useState<
    FloatingElement[]
  >([]);
  const [mousePosition, setMousePosition] = React.useState({ x: 50, y: 50 });

  // Generate floating elements
  React.useEffect(() => {
    const elements: FloatingElement[] = [];
    for (let i = 0; i < 8; i++) {
      elements.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 120 + 60,
        opacity: Math.random() * 0.15 + 0.05,
        duration: Math.random() * 30 + 20,
        delay: Math.random() * 5,
      });
    }
    setFloatingElements(elements);
  }, []);

  // Track mouse movement for subtle parallax
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base background with theme-aware gradient */}
      <div
        className={`absolute inset-0 transition-all duration-700 ${
          isDark
            ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'
            : 'bg-gradient-to-br from-slate-50 via-white to-slate-100'
        }`}
      />

      {/* Subtle grid pattern */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          isDark ? 'opacity-[0.02]' : 'opacity-[0.03]'
        }`}
        style={{
          backgroundImage: `
            linear-gradient(${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} 1px, transparent 1px),
            linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
        }}
      />

      {/* Main gradient orbs */}
      <motion.div
        className={`absolute -right-64 -top-64 h-96 w-96 rounded-full blur-3xl transition-all duration-1000 ${
          isDark
            ? 'via-purple-500/8 bg-gradient-to-br from-blue-500/10 to-transparent'
            : 'via-purple-400/12 bg-gradient-to-br from-blue-400/15 to-transparent'
        }`}
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          type: 'tween',
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
        }}
      />

      <motion.div
        className={`absolute -bottom-64 -left-64 h-96 w-96 rounded-full blur-3xl transition-all duration-1000 ${
          isDark
            ? 'from-violet-500/8 via-pink-500/6 bg-gradient-to-tr to-transparent'
            : 'from-violet-400/12 bg-gradient-to-tr via-pink-400/10 to-transparent'
        }`}
        animate={{
          x: [0, -40, 0],
          y: [0, 20, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          type: 'tween',
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015}px)`,
        }}
      />

      {/* Floating geometric elements */}
      {floatingElements.map((element) => (
        <motion.div
          key={element.id}
          className={`absolute rounded-full transition-all duration-700 ${
            isDark
              ? 'border border-white/10 bg-gradient-to-br from-white/5 to-transparent'
              : 'border border-slate-900/10 bg-gradient-to-br from-slate-900/5 to-transparent'
          }`}
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
            opacity: element.opacity,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            type: 'tween',
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Subtle radial highlight following mouse */}
      <motion.div
        className={`absolute inset-0 transition-opacity duration-500 ${
          isDark ? 'opacity-20' : 'opacity-30'
        }`}
        style={{
          background: `radial-gradient(circle 400px at ${mousePosition.x}% ${mousePosition.y}%, ${
            isDark
              ? 'rgba(100, 116, 139, 0.1) 0%, transparent 70%'
              : 'rgba(148, 163, 184, 0.1) 0%, transparent 70%'
          })`,
        }}
      />

      {/* Top fade overlay */}
      <div
        className={`absolute inset-x-0 top-0 h-32 transition-all duration-700 ${
          isDark
            ? 'bg-gradient-to-b from-slate-950/80 to-transparent'
            : 'bg-gradient-to-b from-slate-50/80 to-transparent'
        }`}
      />

      {/* Bottom fade overlay */}
      <div
        className={`absolute inset-x-0 bottom-0 h-32 transition-all duration-700 ${
          isDark
            ? 'bg-gradient-to-t from-slate-950/60 to-transparent'
            : 'bg-gradient-to-t from-slate-50/60 to-transparent'
        }`}
      />

      {/* Ambient light streaks */}
      <motion.div
        className={`absolute left-1/4 top-0 h-full w-px transition-all duration-1000 ${
          isDark
            ? 'bg-gradient-to-b from-transparent via-blue-400/20 to-transparent'
            : 'bg-gradient-to-b from-transparent via-blue-500/15 to-transparent'
        }`}
        animate={{
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          type: 'tween',
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className={`absolute right-1/3 top-0 h-full w-px transition-all duration-1000 ${
          isDark
            ? 'bg-gradient-to-b from-transparent via-purple-400/20 to-transparent'
            : 'bg-gradient-to-b from-transparent via-purple-500/15 to-transparent'
        }`}
        animate={{
          opacity: [0.8, 0.3, 0.8],
        }}
        transition={{
          type: 'tween',
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
