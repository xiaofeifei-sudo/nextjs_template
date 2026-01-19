import { useLocalStorage } from '../../hooks/use-local-storage'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'

export default {
  title: 'Hooks/useLocalStorage',
  parameters: { nextjs: { appDirectory: true }, hooksContainer: true },
}

export const PersistedValue = {
  render: () => {
    const [value, setValue, remove] = useLocalStorage<string>('storybook-demo-text', '')
    return (
      <div className="space-y-3">
        <Input placeholder="输入将自动持久化到 localStorage" value={value} onChange={(e) => setValue(e.target.value)} />
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setValue('示例文本')}>填充示例</Button>
          <Button variant="outline" onClick={remove}>移除</Button>
        </div>
        <div className="text-xs text-muted-foreground">键：storybook-demo-text</div>
      </div>
    )
  },
}

