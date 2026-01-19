import { useIntersectionObserver } from '../../hooks/use-intersection-observer'

export default {
  title: 'Hooks/useIntersectionObserver',
  parameters: { nextjs: { appDirectory: true }, hooksContainer: true },
}

export const ScrollIntoView = {
  render: () => {
    const [ref, { isIntersecting }] = useIntersectionObserver<HTMLDivElement>({
      threshold: 0.5,
      freezeOnceVisible: false,
    })
    return (
      <div className="space-y-3">
        <div className="text-sm">目标是否在视口中（≥50%）：{String(isIntersecting)}</div>
        <div className="h-64 overflow-y-auto rounded-lg border p-4 space-y-4">
          <div className="h-72 bg-muted rounded-md grid place-content-center">向下滚动</div>
          <div ref={ref} className="h-40 bg-primary text-primary-foreground rounded-md grid place-content-center">
            观察目标
          </div>
          <div className="h-72 bg-muted rounded-md grid place-content-center">继续滚动</div>
        </div>
      </div>
    )
  },
}

