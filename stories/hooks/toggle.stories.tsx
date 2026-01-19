import { useToggle } from '../../hooks/use-toggle'
import { Button } from '../../components/ui/button'

export default {
  title: 'Hooks/useToggle',
  parameters: { nextjs: { appDirectory: true }, hooksContainer: true },
}

export const Basic = {
  render: () => {
    const [open, toggle, setTrue, setFalse] = useToggle(false)
    return (
      <div className="p-6 space-y-3">
        <div className="text-sm">当前：{open ? '打开' : '关闭'}</div>
        <div className="flex gap-2">
          <Button onClick={toggle}>切换</Button>
          <Button onClick={setTrue} variant="outline">打开</Button>
          <Button onClick={setFalse} variant="outline">关闭</Button>
        </div>
        {open && (
          <div className="border rounded-md p-3">内容区域</div>
        )}
      </div>
    )
  },
}
