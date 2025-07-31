'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Users,
  Github,
  Twitter,
  Linkedin,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

/**
 * Mock testimonials data
 */
const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Senior Frontend Developer',
    company: 'TechFlow Inc.',
    avatar: '/avatars/sarah.jpg',
    content:
      'LitePanel has completely transformed how we build admin interfaces. The theme system is incredibly flexible, and the TypeScript support is top-notch. Our development velocity has increased by 40%.',
    rating: 5,
    social: {
      twitter: '@sarahchen',
      github: 'sarahchen',
    },
    tags: ['TypeScript', 'Performance', 'DX'],
  },
  {
    id: 2,
    name: 'Marcus Rodriguez',
    role: 'CTO',
    company: 'StartupLabs',
    avatar: '/avatars/marcus.jpg',
    content:
      'Setting up our admin dashboard used to take weeks. With LitePanel, we had a production-ready interface in just a few days. The component library is extensive and well-documented.',
    rating: 5,
    social: {
      linkedin: 'marcus-rodriguez',
      twitter: '@marcusdesign',
    },
    tags: ['Design', 'Accessibility', 'UX'],
  },
  {
    id: 3,
    name: 'Emily Watson',
    role: 'Full Stack Engineer',
    company: 'StartupLabs',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
    content:
      'Setting up our admin dashboard used to take weeks. With ThemeCraft Admin, we had a production-ready interface in just a few days. The component library is extensive and well-documented.',
    rating: 5,
    social: {
      github: 'emilywatson',
      linkedin: 'emily-watson-dev',
    },
    tags: ['Components', 'Documentation', 'Speed'],
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Tech Lead',
    company: 'Enterprise Solutions',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
    content:
      'The code quality is exceptional. Every component is properly typed, well-tested, and follows best practices. The team productivity improvements have been significant since adopting this template.',
    rating: 5,
    social: {
      github: 'davidkim-dev',
      twitter: '@davidkimtech',
    },
    tags: ['Code Quality', 'Testing', 'Best Practices'],
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    role: 'Frontend Architect',
    company: 'GlobalTech',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face',
    content:
      'The hot-swappable theme system is genius. Our clients love being able to customize the look and feel instantly. The performance optimizations are also impressive - everything loads lightning fast.',
    rating: 5,
    social: {
      linkedin: 'lisa-thompson-arch',
      github: 'lisathompson',
    },
    tags: ['Themes', 'Performance', 'Customization'],
  },
];

/**
 * Testimonials carousel section for the landing page
 */
export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);

  /**
   * Navigate to next testimonial
   */
  const nextTestimonial = React.useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  /**
   * Navigate to previous testimonial
   */
  const previousTestimonial = React.useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, []);

  /**
   * Auto-rotation effect
   */
  React.useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextTestimonial]);

  /**
   * Pause auto-rotation on hover
   */
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const currentTestimonial = testimonials[currentIndex];

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
              <Users className="h-5 w-5" />
              <span className="text-sm font-medium">Testimonials</span>
            </div>
          </div>

          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Loved by Developers
          </h2>

          <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
            See what developers and designers are saying about LitePanel Admin.
            Join thousands of professionals who trust our template for their
            projects.
          </p>
        </motion.div>

        <div className="mx-auto max-w-4xl">
          {/* Main Testimonial Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Card className="relative overflow-hidden p-8 md:p-12">
              {/* Background decoration */}
              <div className="from-primary/5 absolute right-0 top-0 h-32 w-32 -translate-y-16 translate-x-16 rounded-full bg-gradient-to-br to-transparent" />
              <div className="from-secondary/5 absolute bottom-0 left-0 h-24 w-24 -translate-x-12 translate-y-12 rounded-full bg-gradient-to-tr to-transparent" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="relative z-10"
                >
                  {/* Quote Icon */}
                  <div className="mb-6 flex justify-center">
                    <div className="bg-primary/10 rounded-full p-3">
                      <Quote className="text-primary h-6 w-6" />
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="mb-6 flex justify-center">
                    <div className="flex space-x-1">
                      {[...Array(currentTestimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-current text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Testimonial Content */}
                  <blockquote className="text-foreground mb-8 text-center text-lg leading-relaxed md:text-xl">
                    "{currentTestimonial.content}"
                  </blockquote>

                  {/* Author Info */}
                  <div className="flex flex-col items-center justify-center space-y-4 md:flex-row md:space-x-6 md:space-y-0">
                    {/* Avatar */}
                    <div className="relative">
                      <img
                        src={currentTestimonial.avatar}
                        alt={currentTestimonial.name}
                        className="border-border h-16 w-16 rounded-full border-2 object-cover"
                      />
                      <div className="bg-primary absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <div className="bg-primary-foreground h-2 w-2 rounded-full" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Author Details */}
                    <div className="text-center md:text-left">
                      <div className="text-lg font-semibold">
                        {currentTestimonial.name}
                      </div>
                      <div className="text-muted-foreground">
                        {currentTestimonial.role}
                      </div>
                      <div className="text-muted-foreground text-sm">
                        {currentTestimonial.company}
                      </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex space-x-2">
                      {currentTestimonial.social.github && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Github className="h-4 w-4" />
                        </Button>
                      )}
                      {currentTestimonial.social.twitter && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Twitter className="h-4 w-4" />
                        </Button>
                      )}
                      {currentTestimonial.social.linkedin && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Linkedin className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {currentTestimonial.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="mt-8 flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={previousTestimonial}
                  className="flex items-center space-x-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Previous</span>
                </Button>

                {/* Indicators */}
                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={cn(
                        'h-2 w-2 rounded-full transition-all duration-200',
                        index === currentIndex
                          ? 'bg-primary w-8'
                          : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                      )}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextTestimonial}
                  className="flex items-center space-x-2"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3"
          >
            <div className="text-center">
              <div className="text-primary mb-2 text-3xl font-bold">5,000+</div>
              <div className="text-muted-foreground text-sm">
                Happy Developers
              </div>
            </div>
            <div className="text-center">
              <div className="text-primary mb-2 text-3xl font-bold">4.9/5</div>
              <div className="text-muted-foreground text-sm">
                Average Rating
              </div>
            </div>
            <div className="text-center">
              <div className="text-primary mb-2 text-3xl font-bold">500+</div>
              <div className="text-muted-foreground text-sm">GitHub Stars</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
