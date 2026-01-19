import { useIsMobile, useIsDesktop, useIsLargeDesktop, usePrefersDarkMode } from '../../hooks/use-media-query'

export default {
  title: 'Hooks/useMediaQuery',
  parameters: { nextjs: { appDirectory: true }, hooksContainer: true },
}

export const Breakpoints = {
  render: () => {
    const isMobile = useIsMobile()
    const isDesktop = useIsDesktop()
    const isLarge = useIsLargeDesktop()
    const prefersDark = usePrefersDarkMode()
    return (
      <div className="p-6 space-y-2">
        <div className="text-sm">isMobile: {String(isMobile)}</div>
        <div className="text-sm">isDesktop: {String(isDesktop)}</div>
        <div className="text-sm">isLargeDesktop: {String(isLarge)}</div>
        <div className="text-sm">prefersDarkMode: {String(prefersDark)}</div>
        <div className="text-muted-foreground text-xs">调整窗口大小观察变化</div>
      </div>
    )
  },
}
