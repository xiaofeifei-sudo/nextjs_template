import { useState, useEffect } from 'react'
import { useDebounce } from '../../hooks/use-debounce'
import { Input } from '../../components/ui/input'

export default {
  title: 'Hooks/useDebounce',
  parameters: { nextjs: { appDirectory: true }, hooksContainer: true },
}

export const SearchInput = {
  render: () => {
    const [value, setValue] = useState('')
    const debounced = useDebounce(value, 600)
    const [triggerCount, setTriggerCount] = useState(0)
    useEffect(() => {
      setTriggerCount((c) => c + 1)
    }, [debounced])
    return (
      <div className="space-y-3">
        <Input placeholder="输入关键字（600ms 防抖）" value={value} onChange={(e) => setValue(e.target.value)} />
        <div className="text-sm">防抖后值：{debounced || '(空)'}</div>
        <div className="text-xs text-muted-foreground">触发次数：{triggerCount}</div>
      </div>
    )
  },
}

