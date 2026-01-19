import { useRef, useState } from 'react'
import { useOnClickOutside } from '../../hooks/use-on-click-outside'
import { Button } from '../../components/ui/button'

export default {
  title: 'Hooks/useOnClickOutside',
  parameters: { nextjs: { appDirectory: true }, hooksContainer: true },
}

export const PopoverLike = {
  render: () => {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement | null>(null)
    useOnClickOutside(ref, () => setOpen(false))
    return (
      <div className="p-6">
        <Button onClick={() => setOpen((v) => !v)}>切换弹层</Button>
        {open && (
          <div ref={ref} className="mt-3 w-64 rounded-lg border p-4 shadow-sm">
            <div className="font-medium">弹层内容</div>
            <div className="text-sm text-muted-foreground">点击外部区域关闭</div>
          </div>
        )}
      </div>
    )
  },
}
