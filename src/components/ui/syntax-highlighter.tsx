'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import {
  highlightCode,
  addLineNumbers,
  getTheme,
  type SyntaxHighlighterProps,
} from '@/utils/syntax-highlight.util';

/**
 * Lightweight syntax highlighter component
 * Minimal bundle size with TypeScript/JavaScript support
 */
export function SyntaxHighlighter({
  code,
  language = 'typescript',
  theme = 'light',
  className,
  showLineNumbers = false,
}: SyntaxHighlighterProps) {
  const [highlightedCode, setHighlightedCode] = React.useState<string>('');
  const [isClient, setIsClient] = React.useState(false);

  // Ensure we're on the client side before highlighting
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  React.useEffect(() => {
    if (!isClient) return;

    try {
      const themeObj = getTheme(theme);
      let highlighted = highlightCode(code, themeObj);

      if (showLineNumbers) {
        highlighted = addLineNumbers(highlighted);
      }

      setHighlightedCode(highlighted);
    } catch (error) {
      console.warn('Failed to highlight code:', error);
      // Fallback to plain text
      setHighlightedCode(code);
    }
  }, [code, theme, showLineNumbers, isClient]);

  // Server-side render fallback
  if (!isClient) {
    return (
      <pre className={cn('font-mono text-sm leading-relaxed', className)}>
        <code>{code}</code>
      </pre>
    );
  }

  return (
    <pre
      className={cn(
        'overflow-x-auto font-mono text-sm leading-relaxed',
        showLineNumbers && 'pl-0',
        className
      )}
    >
      <code
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
        className="block"
      />
    </pre>
  );
}

/**
 * Simple code block with copy functionality
 */
interface CodeBlockProps extends SyntaxHighlighterProps {
  onCopy?: (code: string) => void;
  copyable?: boolean;
}

export function CodeBlock({
  code,
  language = 'typescript',
  theme = 'light',
  className,
  showLineNumbers = false,
  onCopy,
  copyable = false,
}: CodeBlockProps) {
  const handleCopy = React.useCallback(() => {
    if (onCopy) {
      onCopy(code);
    }
  }, [code, onCopy]);

  return (
    <div className="group relative">
      <SyntaxHighlighter
        code={code}
        language={language}
        theme={theme}
        className={className}
        showLineNumbers={showLineNumbers}
      />

      {copyable && (
        <button
          onClick={handleCopy}
          className="bg-background/80 hover:bg-accent absolute right-2 top-2 rounded border px-2 py-1 text-xs opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          type="button"
        >
          Copy
        </button>
      )}
    </div>
  );
}
