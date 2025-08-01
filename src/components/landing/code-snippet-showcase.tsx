'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code,
  Copy,
  Check,
  Palette,
  Settings,
  Layers,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { copyToClipboard } from '@/lib/utils';
import { SyntaxHighlighter } from '@/components/ui/syntax-highlighter';
import { useTheme } from 'next-themes';

/**
 * Code examples to showcase
 */
const codeExamples = [
  {
    id: 'theme-context',
    title: 'Theme Context',
    description: 'Type-safe theme management with React Context',
    language: 'typescript',
    badge: 'TypeScript',
    code: `// Theme context with full TypeScript support
export function useThemeContext(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}

// Apply theme with CSS variables
export function applyThemeToDocument(theme: ThemeConfig, isDark: boolean): void {
  const root = document.documentElement;
  const colors = isDark && theme.cssVars.dark 
    ? theme.cssVars.dark 
    : theme.cssVars.light;

  Object.entries(colors).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
}`,
  },
  {
    id: 'component-variants',
    title: 'Component Variants',
    description: 'Flexible components with class-variance-authority',
    language: 'typescript',
    badge: 'Components',
    code: `// Button component with variants
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)`,
  },
  {
    id: 'form-validation',
    title: 'Form Validation',
    description: 'React Hook Form with Zod schema validation',
    language: 'typescript',
    badge: 'Forms',
    code: `// Zod schema for type-safe validation
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().default(false),
});

type LoginFormData = z.infer<typeof loginSchema>;

// React Hook Form with resolver
const form = useForm<LoginFormData>({
  resolver: zodResolver(loginSchema),
  defaultValues: {
    email: "",
    password: "",
    rememberMe: false,
  },
});

const onSubmit = async (data: LoginFormData) => {
  try {
    await loginUser(data);
    toast.success("Login successful!");
  } catch (error) {
    toast.error("Login failed. Please try again.");
  }
};`,
  },
  {
    id: 'animation',
    title: 'Smooth Animations',
    description: 'Framer Motion animations with theme-aware transitions',
    language: 'typescript',
    badge: 'Animation',
    code: `// Animated sidebar with theme transitions
<motion.aside
  initial={false}
  animate={{
    width: isCollapsed ? 80 : 280,
  }}
  transition={{
    duration: 0.3,
    ease: "easeInOut",
  }}
  className="relative flex h-screen flex-col border-r bg-background/95 backdrop-blur"
>
  <AnimatePresence mode="wait">
    {!isCollapsed ? (
      <motion.div
        key="expanded-logo"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.2 }}
      >
        <Logo />
      </motion.div>
    ) : (
      <motion.div
        key="collapsed-logo"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
      >
        <CompactLogo />
      </motion.div>
    )}
  </AnimatePresence>
</motion.aside>`,
  },
];

/**
 * Code snippet showcase section for the landing page
 */
export function CodeSnippetShowcase() {
  const [activeExample, setActiveExample] = React.useState(0);
  const [copiedStates, setCopiedStates] = React.useState<
    Record<string, boolean>
  >({});
  const { theme } = useTheme();

  /**
   * Handle copying code to clipboard
   */
  const handleCopyCode = async (code: string, exampleId: string) => {
    try {
      await copyToClipboard(code);
      setCopiedStates((prev) => ({ ...prev, [exampleId]: true }));
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [exampleId]: false }));
      }, 2000);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  /**
   * Navigate to previous example
   */
  const previousExample = () => {
    setActiveExample((prev) =>
      prev === 0 ? codeExamples.length - 1 : prev - 1
    );
  };

  /**
   * Navigate to next example
   */
  const nextExample = () => {
    setActiveExample((prev) =>
      prev === codeExamples.length - 1 ? 0 : prev + 1
    );
  };

  const currentExample = codeExamples[activeExample];

  return (
    <section className="bg-muted/30 py-24">
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
              <Code className="h-5 w-5" />
              <span className="text-sm font-medium">Code Quality</span>
            </div>
          </div>

          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Clean, Modern Code
          </h2>

          <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
            Explore the high-quality, well-documented code that powers
            LitePanel. Every component is crafted with TypeScript,
            accessibility, and maintainability in mind.
          </p>
        </motion.div>

        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Code Example Navigation */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              {codeExamples.map((example, index) => (
                <Card
                  key={example.id}
                  className={cn(
                    'cursor-pointer border-2 p-4 transition-all duration-200',
                    activeExample === index
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50 hover:bg-accent/50'
                  )}
                  onClick={() => setActiveExample(index)}
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className={cn(
                        'mt-1 h-3 w-3 rounded-full transition-colors',
                        activeExample === index
                          ? 'bg-primary'
                          : 'bg-muted-foreground/30'
                      )}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center space-x-2">
                        <h3 className="truncate text-sm font-semibold">
                          {example.title}
                        </h3>
                        <Badge variant="outline" className="text-xs">
                          {example.badge}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        {example.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </motion.div>

            {/* Code Display */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card className="overflow-hidden">
                {/* Header */}
                <div className="bg-muted/50 flex items-center justify-between border-b p-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1">
                      <div className="h-3 w-3 rounded-full bg-red-500" />
                      <div className="h-3 w-3 rounded-full bg-yellow-500" />
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">
                        {currentExample.title}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {currentExample.badge}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {/* Navigation */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={previousExample}
                      className="h-8 w-8 p-0"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-muted-foreground px-2 text-xs">
                      {activeExample + 1} / {codeExamples.length}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={nextExample}
                      className="h-8 w-8 p-0"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>

                    <div className="bg-border h-4 w-px" />

                    {/* Copy Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleCopyCode(currentExample.code, currentExample.id)
                      }
                      className="h-8 w-8 p-0"
                    >
                      <AnimatePresence mode="wait">
                        {copiedStates[currentExample.id] ? (
                          <motion.div
                            key="check"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Check className="h-4 w-4 text-green-600" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="copy"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Copy className="h-4 w-4" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Button>
                  </div>
                </div>

                {/* Code Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentExample.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    <div className="bg-background overflow-x-auto p-6">
                      <SyntaxHighlighter
                        code={currentExample.code}
                        language="typescript"
                        theme={theme === 'dark' ? 'dark' : 'light'}
                        className="text-sm leading-relaxed"
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Features List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="text-muted-foreground flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span>TypeScript Strict Mode</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span>ESLint + Prettier</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-purple-500" />
              <span>Comprehensive JSDoc</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-orange-500" />
              <span>GitHub Actions CI</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
