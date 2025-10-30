import type { Preview } from '@storybook/vue3'
import '../src/assets/main.css'

// Global state for managing system theme listener
let systemThemeListener: (() => void) | null = null
let mediaQuery: MediaQueryList | null = null

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
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
          value: '#0f172a',
        },
      ],
    },
  },
  globalTypes: {
    darkMode: {
      description: 'Global theme for components',
      defaultValue: 'system',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'circlehollow', title: 'Light' },
          { value: 'dark', icon: 'circle', title: 'Dark' },
          { value: 'system', icon: 'browser', title: 'System' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (story, context) => {
      const themeMode = context.globals.darkMode

      // Apply theme class to the document element
      if (typeof document !== 'undefined') {
        if (themeMode === 'system') {
          // Remove both classes to let CSS prefers-color-scheme handle it
          document.documentElement.classList.remove('dark', 'light')
        } else if (themeMode === 'dark') {
          document.documentElement.classList.remove('light')
          document.documentElement.classList.add('dark')
        } else {
          // themeMode === 'light'
          document.documentElement.classList.remove('dark')
          document.documentElement.classList.add('light')
        }
      }

      // Manage system preference listener
      if (typeof window !== 'undefined' && window.matchMedia) {
        // Clean up existing listener
        if (systemThemeListener && mediaQuery) {
          mediaQuery.removeEventListener('change', systemThemeListener)
          systemThemeListener = null
        }

        // Set up new listener only for system mode
        if (themeMode === 'system') {
          mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

          systemThemeListener = () => {
            // Double-check we're still in system mode
            // In system mode, CSS handles everything via prefers-color-scheme
            // We just need to ensure classes stay removed
            if (context.globals.darkMode === 'system') {
              if (typeof document !== 'undefined') {
                document.documentElement.classList.remove('dark', 'light')
              }
            }
          }

          mediaQuery.addEventListener('change', systemThemeListener)
        }
      }

      return {
        template: `<div class="min-h-screen bg-background text-foreground p-4"><story /></div>`,
      }
    },
  ],
}

export default preview
