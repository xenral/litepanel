/**
 * Super lightweight syntax highlighter
 * Minimal implementation focusing on performance and bundle size
 */

export interface HighlightTheme {
  keyword: string;
  string: string;
  comment: string;
  number: string;
  operator: string;
  function: string;
  variable: string;
  type: string;
  default: string;
}

/**
 * Default light theme colors
 */
export const lightTheme: HighlightTheme = {
  keyword: '#d73a49',      // Red for keywords
  string: '#032f62',       // Dark blue for strings
  comment: '#6a737d',      // Gray for comments
  number: '#005cc5',       // Blue for numbers
  operator: '#d73a49',     // Red for operators
  function: '#6f42c1',     // Purple for functions
  variable: '#e36209',     // Orange for variables
  type: '#005cc5',         // Blue for types
  default: '#24292e',      // Default text color
};

/**
 * Default dark theme colors
 */
export const darkTheme: HighlightTheme = {
  keyword: '#ff7b72',      // Light red for keywords
  string: '#a5d6ff',       // Light blue for strings
  comment: '#8b949e',      // Gray for comments
  number: '#79c0ff',       // Light blue for numbers
  operator: '#ff7b72',     // Light red for operators
  function: '#d2a8ff',     // Light purple for functions
  variable: '#ffa657',     // Light orange for variables
  type: '#79c0ff',         // Light blue for types
  default: '#f0f6fc',      // Default text color
};

/**
 * TypeScript/JavaScript token patterns
 */
const patterns = {
  // Comments (must be first to avoid conflicts)
  comment: /\/\/.*$|\/\*[\s\S]*?\*\//gm,
  
  // Strings
  string: /(["'`])(?:(?!\1)[^\\]|\\.)*?\1/g,
  
  // Template literals with interpolation
  templateLiteral: /`(?:[^`\\$]|\\.|\\$|$\{[^}]*\})*`/g,
  
  // Numbers
  number: /\b\d+\.?\d*\b/g,
  
  // TypeScript/JavaScript keywords
  keyword: /\b(?:abstract|any|as|asserts|async|await|boolean|break|case|catch|class|const|constructor|continue|declare|default|delete|do|else|enum|export|extends|false|finally|for|from|function|get|if|implements|import|in|instanceof|interface|is|keyof|let|namespace|never|new|null|number|object|of|package|private|protected|public|readonly|return|set|static|string|super|switch|this|throw|true|try|type|typeof|undefined|unknown|var|void|while|with|yield)\b/g,
  
  // Function names (before parentheses)
  function: /\b[a-zA-Z_$][a-zA-Z0-9_$]*(?=\s*\()/g,
  
  // Types (capitalized words, generic brackets)
  type: /\b[A-Z][a-zA-Z0-9_$]*\b|<[^>]*>/g,
  
  // Operators
  operator: /[+\-*/%=!<>&|^~?:;,.\[\]{}()]/g,
};

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Apply syntax highlighting to code (optimized for performance)
 */
export function highlightCode(
  code: string, 
  theme: HighlightTheme = lightTheme
): string {
  // Escape HTML first
  let highlighted = escapeHtml(code);
  
  // Simple replacement approach for better performance
  // Apply patterns in order of precedence to avoid conflicts
  
  // 1. Comments first (highest precedence)
  highlighted = highlighted.replace(patterns.comment, (match) => 
    `<span style="color: ${theme.comment}" data-token="comment">${match}</span>`
  );
  
  // 2. Strings and template literals
  highlighted = highlighted.replace(patterns.string, (match) => 
    `<span style="color: ${theme.string}" data-token="string">${match}</span>`
  );
  
  highlighted = highlighted.replace(patterns.templateLiteral, (match) => 
    `<span style="color: ${theme.string}" data-token="string">${match}</span>`
  );
  
  // 3. Keywords
  highlighted = highlighted.replace(patterns.keyword, (match) => 
    `<span style="color: ${theme.keyword}" data-token="keyword">${match}</span>`
  );
  
  // 4. Function names
  highlighted = highlighted.replace(patterns.function, (match) => 
    `<span style="color: ${theme.function}" data-token="function">${match}</span>`
  );
  
  // 5. Types
  highlighted = highlighted.replace(patterns.type, (match) => 
    `<span style="color: ${theme.type}" data-token="type">${match}</span>`
  );
  
  // 6. Numbers
  highlighted = highlighted.replace(patterns.number, (match) => 
    `<span style="color: ${theme.number}" data-token="number">${match}</span>`
  );
  
  // 7. Operators (lowest precedence to avoid conflicts)
  highlighted = highlighted.replace(patterns.operator, (match) => 
    `<span style="color: ${theme.operator}" data-token="operator">${match}</span>`
  );
  
  return highlighted;
}

/**
 * Lightweight syntax highlighter component props
 */
export interface SyntaxHighlighterProps {
  code: string;
  language?: 'typescript' | 'javascript' | 'tsx' | 'jsx';
  theme?: 'light' | 'dark' | HighlightTheme;
  className?: string;
  showLineNumbers?: boolean;
}

/**
 * Get theme object from theme prop
 */
export function getTheme(theme?: 'light' | 'dark' | HighlightTheme): HighlightTheme {
  if (typeof theme === 'object') return theme;
  return theme === 'dark' ? darkTheme : lightTheme;
}

/**
 * Add line numbers to highlighted code
 */
export function addLineNumbers(highlightedCode: string): string {
  const lines = highlightedCode.split('\n');
  const maxLineNumber = lines.length;
  const lineNumberWidth = maxLineNumber.toString().length;
  
  return lines
    .map((line, index) => {
      const lineNumber = (index + 1).toString().padStart(lineNumberWidth, ' ');
      return `<span class="line-number" style="color: #6a737d; margin-right: 1rem; user-select: none;">${lineNumber}</span>${line}`;
    })
    .join('\n');
}