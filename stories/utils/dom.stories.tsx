import { Card } from '../../components/ui/card'
import { Separator } from '../../components/ui/separator'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { useRef, useState } from 'react'
import { copyToClipboard, lockBodyScroll, unlockBodyScroll, getScrollPercentage, isMobile, isTouchDevice, getPreferredColorScheme, isInViewport } from '../../lib/utils/dom'

export default {
  title: 'Utils/DOM',
  parameters: {
    nextjs: { appDirectory: true },
    docs: { description: { component: '调试 DOM 工具函数。' } },
  },
  tags: ['autodocs'],
}

export const Playground = {
  render: () => {
    const [text, setText] = useState('复制到剪贴板')
    const [copyResult, setCopyResult] = useState('尚未复制')
    const boxRef = useRef<HTMLDivElement>(null)
    const [inView, setInView] = useState('未知')

    const doCopy = async () => {
      const ok = await copyToClipboard(text)
      setCopyResult(ok ? '已复制' : '复制失败')
    }

    const checkViewport = () => {
      if (boxRef.current) {
        setInView(isInViewport(boxRef.current, 0) ? '在视口内' : '不在视口内')
      }
    }

    return (
      <div className="p-6 space-y-6">
        <Card className="p-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="text">文本</Label>
              <Input id="text" value={text} onChange={(e) => setText(e.target.value)} />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={doCopy}>复制</Button>
            <Button variant="secondary" onClick={() => lockBodyScroll()}>锁定滚动</Button>
            <Button variant="outline" onClick={() => unlockBodyScroll()}>解锁滚动</Button>
            <Button variant="outline" onClick={checkViewport}>检测视口</Button>
          </div>
        </Card>
        <Separator />
        <Card className="p-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">复制结果</div>
              <div className="rounded-md border p-2 text-sm break-all">{copyResult}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">滚动百分比</div>
              <div className="rounded-md border p-2 text-sm break-all">{`${Math.round(getScrollPercentage())}%`}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">是否移动端</div>
              <div className="rounded-md border p-2 text-sm break-all">{String(isMobile())}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">是否触控设备</div>
              <div className="rounded-md border p-2 text-sm break-all">{String(isTouchDevice())}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">首选配色方案</div>
              <div className="rounded-md border p-2 text-sm break-all">{getPreferredColorScheme()}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">方块是否在视口</div>
              <div className="rounded-md border p-2 text-sm break-all">{inView}</div>
            </div>
          </div>
        </Card>
        <div className="h-64 overflow-auto border rounded-md p-4 space-y-6">
          <div className="h-[600px] rounded-md bg-muted" />
          <div ref={boxRef} className="h-24 rounded-md border flex items-center justify-center">目标方块</div>
          <div className="h-[600px] rounded-md bg-muted" />
        </div>
      </div>
    )
  },
}
