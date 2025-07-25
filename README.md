# ThemeCraft Admin

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Next.js](https://img.shields.io/badge/Next.js-15.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC)](https://tailwindcss.com/)
[![CI Status](https://github.com/yourusername/themecraft-admin/workflows/CI/badge.svg)](https://github.com/yourusername/themecraft-admin/actions)

A fully-typed **Next.js 15** admin template with **hot-swappable themes**, built with TypeScript, Tailwind CSS, and shadcn/ui components. Features a comprehensive theming system, modern UI components, and production-ready configurations.

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/themecraft-admin.git
   cd themecraft-admin
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Quick Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
npm run test         # Run Playwright tests
npm run storybook    # Start Storybook
```

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/themecraft-admin)

---

## ✨ Features

### 🎨 Advanced Theming System
- **Three Beautiful Themes**: Playful Pastel, Neutral Pro, High-Contrast A11y
- **Hot-Swappable**: Change themes instantly without page reload
- **Dark Mode Support**: All themes include beautiful dark variants
- **CSS Variables**: Easy customization with CSS custom properties
- **Theme Customizer**: Live HSL color adjustments with real-time preview
- **System Preference**: Automatic detection and respect for user's system theme

### 🔧 Modern Tech Stack
- **Next.js 15** with App Router and React 19
- **TypeScript** with strict mode and comprehensive type safety
- **Tailwind CSS v4** with custom design tokens
- **shadcn/ui** components built on Radix UI primitives
- **Framer Motion v11** for smooth animations and transitions
- **React Hook Form v8** with Zod validation
- **TanStack Table v5** for advanced data grids
- **Apache ECharts** for beautiful data visualizations

### 🏢 Complete Admin Features
- **Dashboard Overview** with KPI cards and activity timeline
- **Analytics Dashboard** with interactive charts and insights
- **Data Tables** with sorting, filtering, and virtualization
- **Form Wizard** with multi-step validation
- **Settings Panel** with tabs and customization options
- **User Management** with roles and permissions
- **Notification System** with real-time updates

### 🎯 Developer Experience
- **TypeScript Strict Mode** with comprehensive type definitions
- **ESLint + Prettier** with consistent code formatting
- **Husky Pre-commit Hooks** for quality assurance
- **GitHub Actions CI/CD** with automated testing and building
- **Storybook Integration** for component development
- **Playwright E2E Tests** with cross-browser testing
- **Comprehensive Documentation** with examples and guides

### ♿ Accessibility & Quality
- **WCAG 2.2 AAA Compliant** color contrasts and interactions
- **Keyboard Navigation** with proper focus management
- **Screen Reader Support** with ARIA labels and descriptions
- **Error Boundaries** with graceful error handling
- **SEO Optimized** with proper metadata and structure
- **Performance Optimized** with code splitting and lazy loading

---

## 📁 Project Structure

```
themecraft-admin/
├── 📁 src/
│   ├── 📁 app/                    # Next.js App Router
│   │   ├── 📁 auth/              # Authentication pages ⏳
│   │   ├── 📁 dashboard/         # Dashboard pages ✅
│   │   │   ├── 📁 analytics/     # Analytics dashboard ⏳
│   │   │   ├── 📁 forms/         # Form examples ⏳
│   │   │   ├── 📁 settings/      # Settings panels ⏳
│   │   │   ├── 📁 table/         # Data table demo ⏳
│   │   │   └── 📁 notifications/ # Notification center ⏳
│   │   ├── 📄 globals.css        # Global styles & theme CSS ✅
│   │   ├── 📄 layout.tsx         # Root layout ✅
│   │   └── 📄 page.tsx           # Landing page ✅
│   ├── 📁 components/            # Reusable components
│   │   ├── 📁 ui/                # shadcn/ui components ✅
│   │   ├── 📁 dashboard/         # Dashboard-specific components ✅
│   │   ├── 📁 landing/           # Landing page components ✅
│   │   └── 📄 command-palette.tsx # Global command palette ✅
│   ├── 📁 context/               # React contexts
│   │   └── 📄 theme-context.tsx  # Theme management ✅
│   ├── 📁 lib/                   # Utilities and configurations
│   │   ├── 📄 themes.ts          # Theme configurations ✅
│   │   └── 📄 utils.ts           # Helper functions ✅
│   ├── 📁 types/                 # TypeScript type definitions
│   │   └── 📄 theme.ts           # Theme-related types ✅
│   ├── 📁 hooks/                 # Custom React hooks ⏳
│   └── 📁 mock/                  # Mock data and API responses ⏳
├── 📁 tests/                     # Playwright E2E tests ⏳
├── 📁 docs/                      # MDX documentation site ⏳
├── 📁 .storybook/               # Storybook configuration ⏳
├── 📁 public/                    # Static assets ⏳
├── 📄 package.json               # Dependencies and scripts ✅
├── 📄 tsconfig.json             # TypeScript configuration ✅
├── 📄 tailwind.config.ts        # Tailwind CSS configuration ✅
├── 📄 next.config.js            # Next.js configuration ✅
├── 📄 playwright.config.ts      # Playwright test configuration ✅
└── 📄 README.md                 # Project documentation ✅

Legend: ✅ Implemented | ⏳ Coming Soon
```

---

## 🎨 Theme System

### Available Themes

1. **Playful Pastel** *(Default)*
   - Soft, rounded corners with gentle gradients
   - Warm color palette with accessibility in mind
   - Perfect for creative applications

2. **Neutral Pro**
   - Clean, professional aesthetic
   - Sharp edges and high contrast
   - Ideal for business applications

3. **High-Contrast A11y**
   - Maximum accessibility compliance
   - WCAG 2.2 AAA color ratios
   - Optimized for screen readers

### Theme Customization

```typescript
// Access theme context
const { theme, setTheme, customization, updateCustomization } = useThemeContext();

// Switch themes programmatically
setTheme('neutral-pro');

// Customize colors
updateCustomization({
  primaryColor: { h: 280, s: 100, l: 70 },
  borderRadius: 1.2,
  fontSize: 1.1
});
```

### CSS Variables

All themes use CSS custom properties for easy customization:

```css
:root {
  --background: 320 20% 99%;
  --foreground: 330 15% 15%;
  --primary: 280 100% 70%;
  --radius: 0.75rem;
  /* ... more variables */
}
```

---

## 🔧 Configuration

### Environment Setup

Create a `.env.local` file:

```env
# Optional: Analytics and monitoring
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
NEXT_PUBLIC_GA_ID=your-google-analytics-id

# Optional: External API endpoints
NEXT_PUBLIC_API_URL=https://api.example.com
```

### Customizing the Template

1. **Update Branding**: Edit `src/components/dashboard/sidebar.tsx` and `src/app/layout.tsx`
2. **Add Routes**: Create new pages in `src/app/` following the App Router structure
3. **Modify Themes**: Edit `src/lib/themes.ts` to adjust theme configurations
4. **Add Components**: Place reusable components in `src/components/`

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/themecraft-admin)

### Deploy to Netlify

1. Build the project: `npm run build`
2. Deploy the `out/` directory to Netlify
3. Configure redirects for client-side routing

### Deploy to Railway

1. Connect your GitHub repository
2. Railway will automatically detect and deploy your Next.js app
3. Configure environment variables as needed

### Self-Hosted

```bash
# Build for production
npm run build

# Start the production server
npm start

# Or use PM2 for process management
pm2 start npm --name "themecraft-admin" -- start
```

---

## 🧪 Testing

### Running Tests

```bash
# Run all Playwright tests
npm run test

# Run tests in UI mode
npm run test:ui

# Run specific test file
npx playwright test tests/landing.spec.ts
```

### Test Coverage

The project includes E2E tests for:
- ✅ Landing page navigation and theme switching
- ⏳ Authentication flows
- ⏳ Dashboard functionality
- ⏳ Form validation
- ⏳ Data table interactions

---

## 📚 Documentation

### Additional Resources

- **[Component Documentation](./docs/components.md)** - Detailed component API
- **[Theme Guide](./docs/theming.md)** - Comprehensive theming instructions
- **[Contributing Guide](./docs/contributing.md)** - How to contribute to the project
- **[Deployment Guide](./docs/deployment.md)** - Production deployment best practices

### Storybook

View the interactive component library:

```bash
npm run storybook
```

Then visit [http://localhost:6006](http://localhost:6006)

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./docs/contributing.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm run test`
5. Run linting: `npm run lint`
6. Commit your changes: `git commit -m 'Add amazing feature'`
7. Push to the branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

### Code Style

- TypeScript with strict mode
- ESLint + Prettier for formatting
- Conventional commits
- Comprehensive JSDoc documentation

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

**Note**: While the code is MIT licensed, brand assets (logos, icons, design elements) are reserved and require separate permission for use.

---

## 🙏 Acknowledgments

- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful component library
- **[Radix UI](https://www.radix-ui.com/)** - Accessible UI primitives
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Next.js](https://nextjs.org/)** - React framework for production
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Lucide Icons](https://lucide.dev/)** - Beautiful icon library

---

## 🔗 Links

- **[Live Demo](https://themecraft-admin.vercel.app)** - See it in action
- **[GitHub Repository](https://github.com/yourusername/themecraft-admin)** - Source code
- **[Documentation](https://themecraft-admin.vercel.app/docs)** - Full documentation
- **[Storybook](https://themecraft-admin.vercel.app/storybook)** - Component library
- **[Issues](https://github.com/yourusername/themecraft-admin/issues)** - Report bugs or request features

---

<div align="center">
  <p>Built with ❤️ by the ThemeCraft Team</p>
  <p>
    <a href="https://github.com/yourusername/themecraft-admin">⭐ Star on GitHub</a> •
    <a href="https://twitter.com/themecraft">🐦 Follow on Twitter</a> •
    <a href="https://discord.gg/themecraft">💬 Join Discord</a>
  </p>
</div> 