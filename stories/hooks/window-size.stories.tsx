import { useWindowSize } from '../../hooks/use-window-size'

export default {
  title: 'Hooks/useWindowSize',
  parameters: { nextjs: { appDirectory: true }, hooksContainer: true },
}

export const Basic = {
  render: () => {
    const { width, height } = useWindowSize()
    return (
      <div className="space-y-2">
        <div className="text-sm">width: {width}</div>
        <div className="text-sm">height: {height}</div>
        <div className="text-xs text-muted-foreground">调整窗口大小以观察变化</div>
      </div>
    )
  },
}

