import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Authentication | LiteControl',
  description: 'Sign in to your LiteControl dashboard',
};

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container relative min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        {/* Left side - Branding/Image */}
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary-foreground/90" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <div className="mr-2 h-6 w-6 rounded bg-white/20 flex items-center justify-center">
              <div className="h-3 w-3 rounded bg-white" />
            </div>
            LiteControl
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                "The most comprehensive admin template with advanced theming capabilities and modern architecture."
              </p>
              <footer className="text-sm">LiteControl Team</footer>
            </blockquote>
          </div>
        </div>

        {/* Right side - Auth forms */}
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <Suspense fallback={<div>Loading...</div>}>
              {children}
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
} 