import { useState } from 'react'
import { useThrottle } from '../../hooks/use-throttle'

export default {
  title: 'Hooks/useThrottle',
  parameters: { nextjs: { appDirectory: true }, hooksContainer: true },
}

export const RangeSlider = {
  render: () => {
    const [raw, setRaw] = useState(0)
    const [throttled, setThrottled] = useState(0)
    const applyThrottle = useThrottle((...args: unknown[]) => {
      const v = Number(args[0] ?? 0)
      setThrottled(v)
    }, 300)
    return (
      <div className="space-y-3">
        <input
          type="range"
          min={0}
          max={100}
          value={raw}
          onChange={(e) => {
            const v = Number(e.target.value)
            setRaw(v)
            applyThrottle(v)
          }}
          className="w-64"
        />
        <div className="text-sm">原始：{raw}</div>
        <div className="text-sm">节流后：{throttled}</div>
        <div className="text-xs text-muted-foreground">每 300ms 更新一次节流值</div>
      </div>
    )
  },
}
