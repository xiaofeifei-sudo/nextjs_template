import { useState } from 'react'
import { useKeyboardShortcut } from '../../hooks/use-keyboard-shortcut'
import { Button } from '../../components/ui/button'

export default {
  title: 'Hooks/useKeyboardShortcut',
  parameters: { nextjs: { appDirectory: true }, hooksContainer: true },
}

export const CtrlK = {
  render: () => {
    const [counter, setCounter] = useState(0)
    useKeyboardShortcut(['ctrl', 'k'], () => setCounter((v) => v + 1))
    return (
      <div className="p-6 space-y-3">
        <div className="text-sm">按下 ⌘K / Ctrl+K 触发计数</div>
        <div className="text-lg font-medium">触发次数：{counter}</div>
        <Button onClick={() => setCounter(0)} variant="outline">重置</Button>
      </div>
    )
  },
}
