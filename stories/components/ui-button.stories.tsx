import { Button } from '../../components/ui/button'

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    nextjs: { appDirectory: true },
  },
}

export const Primary = {
  args: {
    children: 'Primary',
    variant: 'default',
    size: 'default',
  },
}

export const Secondary = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
    size: 'default',
  },
}

export const Outline = {
  args: {
    children: 'Outline',
    variant: 'outline',
    size: 'default',
  },
}

export const Ghost = {
  args: {
    children: 'Ghost',
    variant: 'ghost',
    size: 'default',
  },
}

export const Link = {
  args: {
    children: 'Link',
    variant: 'link',
    size: 'default',
  },
}

export const Sizes = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" aria-label="Icon button">👍</Button>
    </div>
  ),
}
