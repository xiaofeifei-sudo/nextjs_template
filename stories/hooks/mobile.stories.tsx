import { useIsMobile as useMobileHook } from '../../hooks/use-mobile'

export default {
  title: 'Hooks/useMobile',
  parameters: { nextjs: { appDirectory: true }, hooksContainer: true },
}

export const Basic = {
  render: () => {
    const isMobile = useMobileHook()
    return (
      <div className="space-y-2">
        <div className="text-sm">isMobile: {String(isMobile)}</div>
        <div className="text-xs text-muted-foreground">调整窗口宽度以体验变化</div>
      </div>
    )
  },
}

