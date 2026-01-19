import { Separator } from '../../components/ui/separator'

export default {
  title: 'Components/Separator',
  component: Separator,
  parameters: { nextjs: { appDirectory: true } },
  tags: ['autodocs'],
}

export const Horizontal = {
  render: () => (
    <div className="w-full max-w-md">
      <div className="flex items-center gap-4">
        <span>上方内容</span>
      </div>
      <Separator />
      <div className="flex items-center gap-4">
        <span>下方内容</span>
      </div>
    </div>
  ),
}

export const Vertical = {
  render: () => (
    <div className="flex items-center gap-4">
      <span>左侧</span>
      <Separator orientation="vertical" className="h-8" />
      <span>右侧</span>
    </div>
  ),
}
