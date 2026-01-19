import { Card } from '../../components/ui/card'
import { Separator } from '../../components/ui/separator'
import { Button } from '../../components/ui/button'
import { synth } from '../../lib/utils/sound'

export default {
  title: 'Utils/Sound',
  parameters: {
    nextjs: { appDirectory: true },
    docs: { description: { component: '调试声音工具函数（Web Audio API 合成音效）。' } },
  },
  tags: ['autodocs'],
}

export const Playground = {
  render: () => {
    return (
      <div className="p-6 space-y-6">
        <Card className="p-4 space-y-3">
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => synth.playClick()}>点击音效</Button>
            <Button onClick={() => synth.playHover()} variant="secondary">悬停音效</Button>
            <Button onClick={() => synth.playSuccess()} variant="outline">成功音效</Button>
            <Button onClick={() => synth.playError()} variant="destructive">错误音效</Button>
          </div>
        </Card>
        <Separator />
        <p className="text-xs text-muted-foreground">提示：部分浏览器可能需要用户交互后才允许播放声音。</p>
      </div>
    )
  },
}
