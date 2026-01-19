import { useEffect, useRef, useState } from 'react'
import { Progress } from '../../components/ui/progress'

export default {
  title: 'Components/Progress',
  component: Progress,
  parameters: { 
    nextjs: { appDirectory: true },
    docs: { description: { component: '进度条用于展示任务完成度，支持受控设置 value。' } },
  },
  tags: ['autodocs'],
}

export const Value30 = {
  render: () => <Progress value={30} className="w-64" />,
}

export const Value70 = {
  render: () => <Progress value={70} className="w-64" />,
}

export const InteractiveUpload = {
  render: () => {
    const [value, setValue] = useState<number>(0)
    const [isRunning, setIsRunning] = useState(false)
    const timerRef = useRef<number | null>(null)

    useEffect(() => {
      if (isRunning) {
        timerRef.current = window.setInterval(() => {
          setValue((v: number) => Math.min(100, v + 2))
        }, 100)
      }
      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current)
          timerRef.current = null
        }
      }
    }, [isRunning])

    useEffect(() => {
      if (value >= 100 && isRunning) {
        setIsRunning(false)
      }
    }, [value, isRunning])

    return (
      <div className="space-y-4 w-80">
        <Progress value={value} />
        <div className="flex gap-2">
          <button
            className="bg-primary text-primary-foreground h-9 px-4 rounded-md disabled:opacity-50"
            onClick={() => setIsRunning(true)}
            disabled={isRunning || value >= 100}
          >
            开始
          </button>
          <button
            className="border bg-background h-9 px-4 rounded-md"
            onClick={() => setIsRunning(false)}
            disabled={!isRunning}
          >
            暂停
          </button>
          <button
            className="border bg-background h-9 px-4 rounded-md"
            onClick={() => {
              setValue(0)
              setIsRunning(false)
            }}
          >
            重置
          </button>
        </div>
        <div className="text-sm text-muted-foreground">进度：{value}%</div>
      </div>
    )
  },
}
