import type { Metadata } from 'next';
import { HeroSection } from '@/components/landing/hero-section';
import { ThemeSwitcherPreview } from '@/components/landing/theme-switcher-preview';
import { FeatureGrid } from '@/components/landing/feature-grid';
import { CodeSnippetShowcase } from '@/components/landing/code-snippet-showcase';
import { TestimonialsCarousel } from '@/components/landing/testimonials-carousel';
import { CTASection } from '@/components/landing/cta-section';

export const metadata: Metadata = {
      title: 'LitePanel - Next.js Admin Dashboard Template',
  description:
    'A fully-typed Next.js 15 admin template with hot-swappable themes, built with TypeScript, Tailwind CSS, and shadcn/ui components.',
};

/**
 * Landing page component showcasing the LitePanel template
 * Features hero section, theme preview, features, code examples, testimonials, and CTA
 */
export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero section with logo, tagline, and primary CTA */}
      <HeroSection />

      {/* Interactive theme switcher with live preview */}
      <ThemeSwitcherPreview />

      {/* Grid of feature cards with hover animations */}
      <FeatureGrid />

      {/* Code examples with syntax highlighting and copy functionality */}
      <CodeSnippetShowcase />

      {/* Rotating testimonials carousel */}
      <TestimonialsCarousel />

      {/* Final call-to-action section with deploy button */}
      <CTASection />
    </div>
  );
}
