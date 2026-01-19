import { AnimatedThemeToggle } from '../../components/animated-theme-toggle'

export default {
  title: 'Components/AnimatedThemeToggle',
  component: AnimatedThemeToggle,
  parameters: {
    nextjs: { appDirectory: true },
  },
}

export const Default = {
  args: {
    variant: 'rectangle',
    start: 'bottom-up',
    blur: false,
    width: 56,
    height: 32,
  },
}
