import { useState } from 'react'
import { usePrevious } from '../../hooks/use-previous'
import { Button } from '../../components/ui/button'

export default {
  title: 'Hooks/usePrevious',
  parameters: { nextjs: { appDirectory: true }, hooksContainer: true },
}

export const Counter = {
  render: () => {
    const [count, setCount] = useState(0)
    const prev = usePrevious(count)
    return (
      <div className="space-y-3">
        <div className="text-sm">前一个值：{prev ?? '-'}</div>
        <div className="text-lg font-medium">当前：{count}</div>
        <div className="flex gap-2">
          <Button onClick={() => setCount((c) => c + 1)}>+1</Button>
          <Button variant="outline" onClick={() => setCount((c) => c - 1)}>-1</Button>
          <Button variant="outline" onClick={() => setCount(0)}>重置</Button>
        </div>
      </div>
    )
  },
}

