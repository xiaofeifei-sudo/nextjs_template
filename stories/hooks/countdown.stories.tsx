import { useCountdown } from '../../hooks/use-countdown'
import { Button } from '../../components/ui/button'

export default {
  title: 'Hooks/useCountdown',
  parameters: { nextjs: { appDirectory: true }, hooksContainer: true },
}

export const Basic = {
  render: () => {
    const { count, isRunning, start, pause, reset, restart } = useCountdown(10, { interval: 500 })
    return (
      <div className="p-6 space-y-3">
        <div className="text-lg font-medium">剩余：{count}s</div>
        <div className="text-sm text-muted-foreground">状态：{isRunning ? '运行中' : '已暂停'}</div>
        <div className="flex gap-2">
          <Button onClick={start}>开始</Button>
          <Button onClick={pause} variant="outline">暂停</Button>
          <Button onClick={reset} variant="outline">重置</Button>
          <Button onClick={restart} variant="outline">重启</Button>
        </div>
      </div>
    )
  },
}
