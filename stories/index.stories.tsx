import { useMemo, useState } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card } from '../components/ui/card'
import { Separator } from '../components/ui/separator'
import { Badge } from '../components/ui/badge'

export default {
  title: '目录/总览',
  parameters: {
    nextjs: { appDirectory: true },
    docs: {
      description: {
        component: '用于快速导航与调试的目录页，收录常用组件与 Hooks 的示例入口。',
      },
    },
  },
  tags: ['autodocs'],
}

export const Catalog = {
  render: () => {
    const [q, setQ] = useState('')

    const items = useMemo(
      () => [
        { label: '组件总览', href: '?path=/story/components-catalog--all', group: 'Components' },
        { label: 'Lucide 图标总览', href: '?path=/story/components-lucide-icons--all-icons', group: 'Components' },
        { label: '按钮 Button', href: '?path=/story/components-button--primary', group: 'Components' },
        { label: '工具提示 Tooltip', href: '?path=/story/components-tooltip--default', group: 'Components' },
        { label: '对话框 Dialog', href: '?path=/story/components-dialog--default', group: 'Components' },
        { label: '下拉菜单 Dropdown', href: '?path=/story/components-dropdown-menu--default', group: 'Components' },
        { label: '选择器 Select', href: '?path=/story/components-select--default', group: 'Components' },
        { label: '抽屉 Drawer', href: '?path=/story/components-drawer--default', group: 'Components' },
        { label: '标签页 Tabs', href: '?path=/story/components-tabs--default', group: 'Components' },
        { label: 'Hooks/useAsync 示例', href: '?path=/story/hooks-useasync--fetch-json', group: 'Hooks' },
        { label: 'Hooks/debounce 示例', href: '?path=/story/hooks-debounce--default', group: 'Hooks' },
        { label: 'Hooks/throttle 示例', href: '?path=/story/hooks-throttle--default', group: 'Hooks' },
        { label: 'Hooks/localStorage 示例', href: '?path=/story/hooks-local-storage--default', group: 'Hooks' },
      ],
      []
    )

    const filtered = useMemo(() => {
      if (!q) return items
      const s = q.toLowerCase()
      return items.filter((i) => i.label.toLowerCase().includes(s) || i.group.toLowerCase().includes(s))
    }, [items, q])

    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">Storybook 调试目录</h2>
            <p className="text-sm text-muted-foreground">快速进入常用示例，支持关键字过滤</p>
          </div>
          <Badge>stories</Badge>
        </div>

        <Card className="p-4 space-y-4">
          <div className="flex items-center gap-3">
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="输入关键字过滤，例如：button / hooks"
              className="max-w-sm"
              aria-label="过滤"
            />
            <Button variant="outline" onClick={() => setQ('')}>清除</Button>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group"
                aria-label={`前往 ${item.label}`}
              >
                <Card className="p-4 transition-colors group-hover:bg-muted">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-muted-foreground">{item.group}</div>
                      <div className="font-medium">{item.label}</div>
                    </div>
                    <Button size="sm" variant="secondary">打开</Button>
                  </div>
                </Card>
              </a>
            ))}
          </div>
        </Card>

        <p className="text-xs text-muted-foreground">
          提示：左侧导航已包含全部 stories，本页仅提供快速入口与检索。
        </p>
      </div>
    )
  },
}
