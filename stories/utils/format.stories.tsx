import { useMemo, useState } from 'react'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Card } from '../../components/ui/card'
import { Separator } from '../../components/ui/separator'
import { Button } from '../../components/ui/button'
import { formatCurrency, formatNumber, formatPercentage, formatFileSize, formatPhoneNumber, formatCompact, formatDuration } from '../../lib/utils/format'

export default {
  title: 'Utils/Format',
  parameters: {
    nextjs: { appDirectory: true },
    docs: { description: { component: '调试格式化工具函数。' } },
  },
  tags: ['autodocs'],
}

export const Playground = {
  render: () => {
    const [amount, setAmount] = useState(1234567)
    const [bytes, setBytes] = useState(123456789)
    const [percent, setPercent] = useState(0.1234)
    const [phone, setPhone] = useState('081234567890')
    const [ms, setMs] = useState(9876)
    const [compact, setCompact] = useState(1234567)

    const results = useMemo(
      () => ({
        formatCurrency: formatCurrency(amount),
        formatNumber: formatNumber(amount),
        formatPercentage: formatPercentage(percent, 2),
        formatFileSize: formatFileSize(bytes),
        formatPhoneNumber: formatPhoneNumber(phone),
        formatCompact: formatCompact(compact),
        formatDuration: formatDuration(ms),
      }),
      [amount, bytes, percent, phone, compact, ms]
    )

    return (
      <div className="p-6 space-y-6">
        <Card className="p-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">金额</Label>
              <Input id="amount" type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bytes">字节数</Label>
              <Input id="bytes" type="number" value={bytes} onChange={(e) => setBytes(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="percent">百分比(0-1)</Label>
              <Input id="percent" type="number" step="0.001" value={percent} onChange={(e) => setPercent(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">电话</Label>
              <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="compact">紧凑数值</Label>
              <Input id="compact" type="number" value={compact} onChange={(e) => setCompact(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ms">毫秒</Label>
              <Input id="ms" type="number" value={ms} onChange={(e) => setMs(Number(e.target.value))} />
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => { setAmount(1234567); setBytes(123456789); setPercent(0.1234); setPhone('081234567890'); setCompact(1234567); setMs(9876) }}>重置</Button>
          </div>
        </Card>
        <Separator />
        <Card className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(results).map(([k, v]) => (
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
