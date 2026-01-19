import type { Preview } from '@storybook/nextjs-vite'
import React from 'react'
import '../app/globals.css'
import { ThemeProvider } from '../components/theme-provider'

const withTheme = (Story: any, context: any) => {
  const selected = context.globals?.theme as 'light' | 'dark' | 'system'
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className={selected === 'dark' ? 'dark' : ''}>
        <Story />
      </div>
    </ThemeProvider>
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
  decorators: [withTheme],
}

export default preview
