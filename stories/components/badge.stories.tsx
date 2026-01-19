import { Badge } from '../../components/ui/badge'

export default {
  title: 'Components/Badge',
  component: Badge,
  parameters: { 
    nextjs: { appDirectory: true },
    docs: { description: { component: '徽章用于轻量标记状态或属性，适合与按钮等组合使用。' } },
  },
  tags: ['autodocs'],
}

export const Variants = {
  render: () => (
    <div className="flex items-center gap-3">
      <Badge>默认</Badge>
      <Badge variant="secondary">次要</Badge>
      <Badge variant="destructive">危险</Badge>
      <Badge variant="outline">描边</Badge>
    </div>
  ),
}
