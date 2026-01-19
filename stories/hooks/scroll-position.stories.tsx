import { useScrollPosition } from '../../hooks/use-scroll-position'

export default {
  title: 'Hooks/useScrollPosition',
  parameters: { nextjs: { appDirectory: true }, hooksContainer: true },
}

export const InContainer = {
  render: () => {
    const pos = useScrollPosition()
    return (
      <div className="space-y-3">
        <div className="text-sm">y: {Math.round(pos.y)} / direction: {pos.direction} / atTop: {String(pos.isAtTop)} / atBottom: {String(pos.isAtBottom)}</div>
        <div className="text-sm">百分比：{pos.percentage.toFixed(1)}%</div>
        <div className="h-64 overflow-y-auto rounded-lg border p-4 space-y-4">
          <div className="h-80 bg-muted rounded-md grid place-content-center">滚动区域 1</div>
          <div className="h-80 bg-muted rounded-md grid place-content-center">滚动区域 2</div>
          <div className="h-80 bg-muted rounded-md grid place-content-center">滚动区域 3</div>
        </div>
      </div>
    )
  },
}

