import { useState } from 'react'
import { useElementSize } from '../../hooks/use-element-size'
import { Button } from '../../components/ui/button'

export default {
  title: 'Hooks/useElementSize',
  parameters: { nextjs: { appDirectory: true }, hooksContainer: true },
}

export const ResizableBox = {
  render: () => {
    const { ref, width, height } = useElementSize<HTMLDivElement>()
    const [wide, setWide] = useState(false)
    const [tall, setTall] = useState(false)
    return (
      <div className="space-y-3">
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setWide((v) => !v)}>{wide ? '窄' : '宽'}</Button>
          <Button variant="outline" onClick={() => setTall((v) => !v)}>{tall ? '矮' : '高'}</Button>
        </div>
        <div
          ref={ref}
          className={`rounded-lg border flex items-center justify-center transition-all ${wide ? 'w-80' : 'w-48'} ${tall ? 'h-40' : 'h-24'}`}
        >
          尺寸：{Math.round(width)} × {Math.round(height)}
        </div>
      </div>
    )
  },
}

