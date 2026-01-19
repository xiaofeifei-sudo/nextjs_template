import { useMemo, useState } from 'react'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Button } from '../../components/ui/button'
import { Card } from '../../components/ui/card'
import { Separator } from '../../components/ui/separator'
import { clamp, randomBetween, randomFloatBetween, roundTo, inRange, toRadians, toDegrees, lerp, mapRange, percentage, distance, ordinal, padNumber, isPositive, isNegative, sign, factorial, gcd, lcm } from '../../lib/utils/number'

export default {
  title: 'Utils/Number',
  parameters: {
    nextjs: { appDirectory: true },
    docs: {
      description: {
        component: '调试数字工具函数，支持实时输入与结果展示。',
      },
    },
  },
  tags: ['autodocs'],
}

export const Playground = {
  render: () => {
    const [value, setValue] = useState(42)
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(100)
    const [decimals, setDecimals] = useState(2)
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(100)
    const [t, setT] = useState(0.5)
    const [inMin, setInMin] = useState(0)
    const [inMax, setInMax] = useState(1)
    const [outMin, setOutMin] = useState(0)
    const [outMax, setOutMax] = useState(100)
    const [x1, setX1] = useState(0)
    const [y1, setY1] = useState(0)
    const [x2, setX2] = useState(3)
    const [y2, setY2] = useState(4)
    const [n, setN] = useState(21)

    const results = useMemo(
      () => ({
        clamp: clamp(value, min, max),
        randomBetween: randomBetween(min, max),
        randomFloatBetween: randomFloatBetween(min, max).toFixed(3),
        roundTo: roundTo(value, decimals),
        inRange: String(inRange(value, min, max)),
        toRadians: toRadians(value),
        toDegrees: toDegrees(value),
        lerp: lerp(start, end, t),
        mapRange: mapRange(value, inMin, inMax, outMin, outMax),
        percentage: percentage(value, min, max),
        distance: distance(x1, y1, x2, y2),
        ordinal: ordinal(n),
        padNumber: padNumber(value, 4),
        isPositive: String(isPositive(value)),
        isNegative: String(isNegative(value)),
        sign: String(sign(value)),
        factorial: factorial(5),
        gcd: gcd(48, 18),
        lcm: lcm(12, 18),
      }),
      [value, min, max, decimals, start, end, t, inMin, inMax, outMin, outMax, x1, y1, x2, y2, n]
    )

    return (
      <div className="p-6 space-y-6">
        <Card className="p-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="value">值</Label>
              <Input id="value" type="number" value={value} onChange={(e) => setValue(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="min">最小值</Label>
              <Input id="min" type="number" value={min} onChange={(e) => setMin(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max">最大值</Label>
              <Input id="max" type="number" value={max} onChange={(e) => setMax(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="decimals">小数位</Label>
              <Input id="decimals" type="number" value={decimals} onChange={(e) => setDecimals(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="start">起始</Label>
              <Input id="start" type="number" value={start} onChange={(e) => setStart(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end">结束</Label>
              <Input id="end" type="number" value={end} onChange={(e) => setEnd(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="t">t</Label>
              <Input id="t" type="number" step="0.01" value={t} onChange={(e) => setT(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inMin">映射入最小</Label>
              <Input id="inMin" type="number" value={inMin} onChange={(e) => setInMin(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inMax">映射入最大</Label>
              <Input id="inMax" type="number" value={inMax} onChange={(e) => setInMax(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="outMin">映射出最小</Label>
              <Input id="outMin" type="number" value={outMin} onChange={(e) => setOutMin(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="outMax">映射出最大</Label>
              <Input id="outMax" type="number" value={outMax} onChange={(e) => setOutMax(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="x1">x1</Label>
              <Input id="x1" type="number" value={x1} onChange={(e) => setX1(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="y1">y1</Label>
              <Input id="y1" type="number" value={y1} onChange={(e) => setY1(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="x2">x2</Label>
              <Input id="x2" type="number" value={x2} onChange={(e) => setX2(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="y2">y2</Label>
              <Input id="y2" type="number" value={y2} onChange={(e) => setY2(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="n">序数输入</Label>
              <Input id="n" type="number" value={n} onChange={(e) => setN(Number(e.target.value))} />
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => { setValue(42); setMin(0); setMax(100) }}>重置范围</Button>
            <Button variant="outline" onClick={() => { setStart(0); setEnd(100); setT(0.5) }}>重置插值</Button>
            <Button variant="outline" onClick={() => { setInMin(0); setInMax(1); setOutMin(0); setOutMax(100) }}>重置映射</Button>
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
