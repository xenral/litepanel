import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Authentication | LitePanel',
  description: 'Sign in to your LitePanel dashboard',
};

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="bg-background min-h-screen">
      <div className="container relative min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        {/* Left side - Branding/Image */}
        <div className="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
          <div className="from-primary/90 to-primary-foreground/90 absolute inset-0 bg-gradient-to-br" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <div className="mr-2 flex h-6 w-6 items-center justify-center rounded bg-white/20">
              <div className="h-3 w-3 rounded bg-white" />
            </div>
                            LitePanel
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                "The most comprehensive admin template with advanced theming
                capabilities and modern architecture."
              </p>
              <footer className="text-sm">Ali Morshedzadeh</footer>
            </blockquote>
          </div>
        </div>

        {/* Right side - Auth forms */}
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
