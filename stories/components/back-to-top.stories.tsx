import { BackToTop } from '../../components/back-to-top'
import { Card } from '../../components/ui/card'
import { Separator } from '../../components/ui/separator'

export default {
  title: 'Components/BackToTop',
  component: BackToTop,
  parameters: {
    nextjs: { appDirectory: true },
    docs: {
      description: {
        component:
          '向下滚动时出现的悬浮按钮，点击可返回页面顶部。支持进度环与位置、阈值配置。',
      },
    },
  },
  tags: ['autodocs'],
}

export const Playground = {
  render: (args: React.ComponentProps<typeof BackToTop>) => (
    <div className="min-h-[200vh] p-6 space-y-6">
      <Card className="p-6 space-y-3">
        <h3 className="text-lg font-semibold">滚动页面以显示返回顶部按钮</h3>
        <p className="text-sm text-muted-foreground">
          本演示提供较长页面内容，你可以向下滚动至设定阈值后看到右下角的返回顶部按钮。
        </p>
      </Card>
      <Separator />
      <div className="space-y-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <p key={i} className="text-sm text-muted-foreground">
            这是占位内容段落 #{i + 1}。用于模拟长页面，便于测试 BackToTop 组件在不同滚动位置的表现。
          </p>
        ))}
      </div>
      <BackToTop {...args} />
    </div>
  ),
  args: {
    threshold: 200,
    position: 'bottom-right',
    smooth: true,
    showProgress: true,
  } as React.ComponentProps<typeof BackToTop>,
}

export const BottomLeft = {
  ...Playground,
  args: {
    threshold: 150,
    position: 'bottom-left',
    smooth: true,
    showProgress: true,
  } as React.ComponentProps<typeof BackToTop>,
}

