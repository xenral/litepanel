'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Download, Users, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface StatItem {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay: number;
}

/**
 * Animated statistics cards for the hero section
 */
export function HeroStats() {
  const [githubStars, setGithubStars] = React.useState<number | null>(null);
  const [animatedValues, setAnimatedValues] = React.useState({
    stars: 0,
    downloads: 0,
    users: 0,
    performance: 0,
  });

  // Fetch GitHub stars (simulated for now)
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setGithubStars(1247);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Animate numbers counting up
  React.useEffect(() => {
    if (!githubStars) return;

    const targets = {
      stars: githubStars,
      downloads: 15600,
      users: 892,
      performance: 98,
    };

    const intervals: NodeJS.Timeout[] = [];

    Object.entries(targets).forEach(([key, target]) => {
      let current = 0;
      const increment = target / 50;
      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        setAnimatedValues((prev) => ({
          ...prev,
          [key]: Math.floor(current),
        }));
      }, 40);
      intervals.push(interval);
    });

    return () => intervals.forEach(clearInterval);
  }, [githubStars]);

  const stats: StatItem[] = [
    {
      icon: <Star className="h-5 w-5 fill-current text-yellow-500" />,
      value: animatedValues.stars.toLocaleString(),
      label: 'GitHub Stars',
      delay: 0,
    },
    {
      icon: <Download className="h-5 w-5 text-blue-500" />,
      value: `${(animatedValues.downloads / 1000).toFixed(1)}k`,
      label: 'Downloads',
      delay: 0.1,
    },
    {
      icon: <Users className="h-5 w-5 text-green-500" />,
      value: animatedValues.users.toLocaleString(),
      label: 'Active Users',
      delay: 0.2,
    },
    {
      icon: <Zap className="h-5 w-5 text-purple-500" />,
      value: `${animatedValues.performance}%`,
      label: 'Performance',
      delay: 0.3,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.2 }}
      className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.6,
            delay: 1.4 + stat.delay,
            type: 'spring',
            stiffness: 100,
          }}
        >
          <Card className="hover:border-primary/20 group relative overflow-hidden border-0 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
            <div className="flex flex-col items-center space-y-2 text-center">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {stat.icon}
              </motion.div>
              <motion.div
                className="text-2xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 + stat.delay }}
              >
                {stat.value}
              </motion.div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>

            {/* Hover gradient effect */}
            <motion.div
              className="from-primary/20 to-accent/20 absolute inset-0 -z-10 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              initial={false}
            />
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
} 