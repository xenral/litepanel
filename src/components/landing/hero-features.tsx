'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Check, Sparkles } from 'lucide-react';

interface Feature {
  text: string;
  highlight: boolean;
}

const features: Feature[] = [
  { text: 'TypeScript', highlight: true },
  { text: 'Next.js 15', highlight: true },
  { text: 'Tailwind CSS v4', highlight: false },
  { text: 'shadcn/ui', highlight: false },
  { text: 'Dark Mode', highlight: true },
  { text: 'Hot-swappable Themes', highlight: true },
  { text: 'Fully Responsive', highlight: false },
  { text: 'A11y Compliant', highlight: true },
];

/**
 * Animated feature badges and typing effect for hero section
 */
export function HeroFeatures() {
  const [currentFeatureIndex, setCurrentFeatureIndex] = React.useState(0);
  const [displayedText, setDisplayedText] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(true);

  // Typing animation for the main tagline
  const mainText = 'hot-swappable themes';
  
  React.useEffect(() => {
    if (!isTyping) return;

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= mainText.length) {
        setDisplayedText(mainText.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [isTyping]);

  // Cycle through features
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeatureIndex((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      {/* Enhanced tagline with typing effect */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-muted-foreground mx-auto max-w-3xl text-xl leading-relaxed md:text-2xl"
      >
        A fully-typed{' '}
        <span className="text-foreground font-semibold">Next.js 15</span>{' '}
        admin template with{' '}
        <span className="text-foreground relative font-semibold">
          {displayedText}
          {isTyping && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ 
                type: 'tween',
                duration: 0.8, 
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="text-primary ml-1"
            >
              |
            </motion.span>
          )}
        </span>
        , built for modern React applications
      </motion.p>

      {/* Animated feature badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex flex-wrap items-center justify-center gap-3"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.text}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: 0.8 + index * 0.1,
              type: 'spring',
              stiffness: 100,
            }}
          >
            <Badge
              variant={feature.highlight ? 'default' : 'secondary'}
              className={`relative px-3 py-1 text-sm transition-all duration-300 ${
                index === currentFeatureIndex
                  ? 'ring-primary/30 scale-110 ring-2'
                  : ''
              } ${
                feature.highlight
                  ? 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20'
                  : 'hover:bg-secondary/80'
              }`}
            >
              {feature.highlight && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="mr-1"
                >
                  <Sparkles className="h-3 w-3" />
                </motion.div>
              )}
              {feature.text}
              {index === currentFeatureIndex && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-primary absolute -right-1 -top-1"
                >
                  <Check className="h-3 w-3" />
                </motion.div>
              )}
            </Badge>
          </motion.div>
        ))}
      </motion.div>

      {/* Feature highlight section */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentFeatureIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <motion.div
            className="bg-primary/5 border-primary/20 mx-auto max-w-md rounded-lg border px-4 py-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="flex items-center justify-center space-x-2">
              <Sparkles className="text-primary h-4 w-4" />
              <span className="text-primary text-sm font-medium">
                Featuring: {features[currentFeatureIndex].text}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
} 