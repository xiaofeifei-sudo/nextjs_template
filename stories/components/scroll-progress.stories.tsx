import { ScrollProgress } from '../../components/scroll-progress'
import { Card } from '../../components/ui/card'
import { Separator } from '../../components/ui/separator'

export default {
  title: 'Components/ScrollProgress',
  component: ScrollProgress,
  parameters: {
    nextjs: { appDirectory: true },
    docs: {
      description: {
        component:
          '顶部或底部的水平滚动进度条，基于 Framer Motion 实现平滑动画，可显示百分比。',
      },
    },
  },
  tags: ['autodocs'],
}

function TallPage({ children }: { children?: React.ReactNode }) {
  return (
    <div className="min-h-[200vh] p-6 space-y-6">
      <Card className="p-6 space-y-3">
        <h3 className="text-lg font-semibold">滚动查看进度条变化</h3>
        <p className="text-sm text-muted-foreground">
          向下滚动以观察进度条的动画与百分比显示。
        </p>
      </Card>
      <Separator />
      <div className="space-y-4">
        {Array.from({ length: 24 }).map((_, i) => (
          <p key={i} className="text-sm text-muted-foreground">
            占位内容段落 #{i + 1}。用于模拟长页面，便于测试滚动进度条。
          </p>
        ))}
      </div>
      {children}
    </div>
  )
}

export const TopDefault = {
  render: (args: React.ComponentProps<typeof ScrollProgress>) => (
    <TallPage>
      <ScrollProgress {...args} />
    </TallPage>
  ),
  args: {
    position: 'top',
    height: 4,
    showPercentage: true,
  } as React.ComponentProps<typeof ScrollProgress>,
}

export const BottomCustomColor = {
  render: (args: React.ComponentProps<typeof ScrollProgress>) => (
    <TallPage>
      <ScrollProgress {...args} />
    </TallPage>
  ),
  args: {
    position: 'bottom',
    height: 6,
    color: 'linear-gradient(to right, #0ea5e9, #22d3ee)',
    showPercentage: true,
  } as React.ComponentProps<typeof ScrollProgress>,
}

