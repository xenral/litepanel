import type { Preview } from '@storybook/react';
import { themes } from '@storybook/theming';
import '../src/app/globals.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      theme: themes.light,
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#0f0f0f',
        },
        {
          name: 'playful-light',
          value: '#fefbff',
        },
        {
          name: 'playful-dark',
          value: '#141218',
        },
      ],
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1024px',
            height: '768px',
          },
        },
        desktopLarge: {
          name: 'Desktop Large',
          styles: {
            width: '1440px',
            height: '900px',
          },
        },
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'playful-pastel',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'playful-pastel', title: 'Playful Pastel' },
          { value: 'neutral-pro', title: 'Neutral Pro' },
          { value: 'high-contrast', title: 'High Contrast' },
        ],
        dynamicTitle: true,
      },
    },
    darkMode: {
      description: 'Toggle dark mode',
      defaultValue: false,
      toolbar: {
        title: 'Dark Mode',
        icon: 'moon',
        items: [
          { value: false, title: 'Light' },
          { value: true, title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const { theme, darkMode } = context.globals;

      // Apply theme classes to body
      if (typeof window !== 'undefined') {
        const body = document.body;

        // Remove existing theme classes
        body.classList.remove(
          'theme-playful-pastel',
          'theme-neutral-pro',
          'theme-high-contrast'
        );
        body.classList.remove('light', 'dark');

        // Apply new theme classes
        body.classList.add(`theme-${theme}`);
        body.classList.add(darkMode ? 'dark' : 'light');

        // Update CSS variables for the theme
        const root = document.documentElement;
        if (darkMode) {
          root.setAttribute('data-theme', `${theme}-dark`);
        } else {
          root.setAttribute('data-theme', theme);
        }
      }

      const themeClass = `min-h-screen bg-background text-foreground theme-${theme} ${darkMode ? 'dark' : 'light'}`;

      return (
        <div className={themeClass}>
          <div className="p-4">
            <Story />
          </div>
        </div>
      );
    },
  ],
};

export default preview;
