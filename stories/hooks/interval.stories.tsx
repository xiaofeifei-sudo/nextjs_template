import { useState } from 'react'
import { useInterval } from '../../hooks/use-interval'
import { Button } from '../../components/ui/button'

export default {
  title: 'Hooks/useInterval',
  parameters: { nextjs: { appDirectory: true }, hooksContainer: true },
}

export const TickCounter = {
  render: () => {
    const [count, setCount] = useState(0)
    const [active, setActive] = useState(false)
    useInterval(() => setCount((c) => c + 1), active ? 500 : null)
    return (
      <div className="space-y-3">
        <div className="text-lg font-medium">计数：{count}</div>
        <div className="flex gap-2">
          <Button onClick={() => setActive(true)}>开始</Button>
          <Button variant="outline" onClick={() => setActive(false)}>暂停</Button>
          <Button variant="outline" onClick={() => setCount(0)}>重置</Button>
        </div>
      </div>
    )
  },
}

