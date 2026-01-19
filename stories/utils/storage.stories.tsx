import { useMemo, useState } from 'react'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Card } from '../../components/ui/card'
import { Separator } from '../../components/ui/separator'
import { Button } from '../../components/ui/button'
import { getStorageItem, setStorageItem, removeStorageItem, clearStorage, hasStorageItem, getStorageKeys, getStorageSize, setStorageItemWithExpiry, getStorageItemWithExpiry } from '../../lib/utils/storage'

export default {
  title: 'Utils/Storage',
  parameters: {
    nextjs: { appDirectory: true },
    docs: { description: { component: '调试 localStorage 工具函数。' } },
  },
  tags: ['autodocs'],
}

export const Playground = {
  render: () => {
    const [key, setKey] = useState('demo')
    const [value, setValue] = useState('hello')
    const [ttl, setTtl] = useState(5000)

    const stats = useMemo(
      () => ({
        hasKey: String(hasStorageItem(key)),
        sizeBytes: getStorageSize(),
        keys: getStorageKeys().join(', '),
        value: getStorageItem<string>(key, ''),
        valueWithExpiry: getStorageItemWithExpiry<string>(key + ':exp', ''),
      }),
      [key]
    )

    return (
      <div className="p-6 space-y-6">
        <Card className="p-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="key">键</Label>
              <Input id="key" value={key} onChange={(e) => setKey(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="value">值</Label>
              <Input id="value" value={value} onChange={(e) => setValue(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ttl">过期毫秒</Label>
              <Input id="ttl" type="number" value={ttl} onChange={(e) => setTtl(Number(e.target.value))} />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => setStorageItem(key, value)}>设置</Button>
            <Button onClick={() => setStorageItemWithExpiry(key + ':exp', value, ttl)} variant="secondary">设置带过期</Button>
            <Button onClick={() => removeStorageItem(key)} variant="outline">删除</Button>
            <Button onClick={() => clearStorage()} variant="destructive">清空</Button>
          </div>
        </Card>
        <Separator />
        <Card className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(stats).map(([k, v]) => (
              <div key={k} className="space-y-1">
                <div className="text-xs text-muted-foreground">{k}</div>
                <div className="rounded-md border p-2 text-sm break-all">{String(v)}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    )
  },
}
