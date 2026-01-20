import type { Preview } from '@storybook/nextjs-vite'
import '../app/globals.css'
import { ThemeProvider } from '../components/theme-provider'
import { ReactQueryProvider } from '../components/react-query-provider'

const withTheme = (Story: any, context: any) => {
  const selected = context.globals?.theme as 'light' | 'dark' | 'system'
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ReactQueryProvider>
        <div className={selected === 'dark' ? 'dark' : ''}>
          <Story />
        </div>
      </ReactQueryProvider>
    </ThemeProvider>
  )
}

const withContainer = (Story: any, context: any) => {
  const isHooks = context?.parameters?.hooksContainer === true
  if (!isHooks) return <Story />
  return (
    <div className="min-h-[50vh] p-8 bg-background text-foreground">
      <div className="mx-auto max-w-2xl rounded-xl border p-6 shadow-sm">
        <Story />
      </div>
    </div>
  )
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile (375×667)',
          styles: { width: '375px', height: '667px' },
          type: 'mobile',
        },
        tablet: {
          name: 'Tablet (768×1024)',
          styles: { width: '768px', height: '1024px' },
          type: 'tablet',
        },
        desktop: {
          name: 'Desktop (1280×800)',
          styles: { width: '1280px', height: '800px' },
          type: 'desktop',
        },
        largeDesktop: {
          name: 'Large Desktop (1536×960)',
          styles: { width: '1536px', height: '960px' },
          type: 'desktop',
        },
      },
      defaultViewport: 'responsive',
    },
    nextjs: {
      appDirectory: true,
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'system',
      toolbar: {
        icon: 'circlehollow',
        items: ['light', 'dark', 'system'],
        showName: true,
      },
    },
  },
  decorators: [withTheme, withContainer],
}

export default preview
