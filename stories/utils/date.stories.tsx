import { useMemo, useState } from 'react'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Card } from '../../components/ui/card'
import { Separator } from '../../components/ui/separator'
import { Button } from '../../components/ui/button'
import { formatDate, formatRelativeTime, isToday, isYesterday, daysBetween, addDays, addMonths, startOfDay, endOfDay, toISODateString, getAge } from '../../lib/utils/date'

export default {
  title: 'Utils/Date',
  parameters: {
    nextjs: { appDirectory: true },
    docs: { description: { component: '调试日期工具函数，支持实时输入与结果展示。' } },
  },
  tags: ['autodocs'],
}

export const Playground = {
  render: () => {
    const [date1, setDate1] = useState('2025-01-01')
    const [date2, setDate2] = useState('2025-02-01')
    const [days, setDays] = useState(3)
    const [months, setMonths] = useState(1)
    const [birth, setBirth] = useState('1990-01-01')

    const d1 = new Date(date1)
    const d2 = new Date(date2)
    const b = new Date(birth)

    const results = useMemo(
      () => ({
        formatDate: formatDate(d1),
        formatRelativeTime: formatRelativeTime(d1),
        isToday: String(isToday(d1)),
        isYesterday: String(isYesterday(d1)),
        daysBetween: daysBetween(d1, d2),
        addDays: formatDate(addDays(d1, days)),
        addMonths: formatDate(addMonths(d1, months)),
        startOfDay: startOfDay(d1).toLocaleString(),
        endOfDay: endOfDay(d1).toLocaleString(),
        toISODateString: toISODateString(d1),
        age: getAge(b),
      }),
      [d1, d2, days, months, b]
    )

    return (
      <div className="p-6 space-y-6">
        <Card className="p-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date1">日期 1</Label>
              <Input id="date1" type="date" value={date1} onChange={(e) => setDate1(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date2">日期 2</Label>
              <Input id="date2" type="date" value={date2} onChange={(e) => setDate2(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="birth">出生日期</Label>
              <Input id="birth" type="date" value={birth} onChange={(e) => setBirth(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="days">增加天数</Label>
              <Input id="days" type="number" value={days} onChange={(e) => setDays(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="months">增加月份</Label>
              <Input id="months" type="number" value={months} onChange={(e) => setMonths(Number(e.target.value))} />
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => { setDate1('2025-01-01'); setDate2('2025-02-01'); setBirth('1990-01-01'); setDays(3); setMonths(1) }}>重置</Button>
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
