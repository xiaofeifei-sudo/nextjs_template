import { useMemo, useState } from 'react'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Card } from '../../components/ui/card'
import { Separator } from '../../components/ui/separator'
import { Button } from '../../components/ui/button'
import { hexToRgb, rgbToHex, hexToHsl, hslToHex, lightenColor, darkenColor, hexToRgba, getContrastRatio, isLightColor, getTextColorForBg, randomColor, mixColors } from '../../lib/utils/color'

export default {
  title: 'Utils/Color',
  parameters: {
    nextjs: { appDirectory: true },
    docs: { description: { component: '调试颜色工具函数。' } },
  },
  tags: ['autodocs'],
}

export const Playground = {
  render: () => {
    const [hex, setHex] = useState('#2e7d32')
    const [hex2, setHex2] = useState('#ff9800')
    const [percent, setPercent] = useState(20)
    const [alpha, setAlpha] = useState(0.5)

    const rgb = useMemo(() => hexToRgb(hex), [hex])
    const hsl = useMemo(() => hexToHsl(hex), [hex])

    const results = useMemo(
      () => ({
        hexToRgb: rgb ? `${rgb.r}, ${rgb.g}, ${rgb.b}` : 'invalid',
        rgbToHex: rgb ? rgbToHex(rgb.r, rgb.g, rgb.b) : 'invalid',
        hexToHsl: hsl ? `${hsl.h}, ${hsl.s}, ${hsl.l}` : 'invalid',
        hslToHex: hsl ? hslToHex(hsl.h, hsl.s, hsl.l) : 'invalid',
        lightenColor: lightenColor(hex, percent),
        darkenColor: darkenColor(hex, percent),
        hexToRgba: hexToRgba(hex, alpha),
        getContrastRatio: getContrastRatio(hex, hex2).toFixed(2),
        isLightColor: String(isLightColor(hex)),
        getTextColorForBg: getTextColorForBg(hex),
        randomColor: randomColor(),
        mixColors: mixColors(hex, hex2, 0.5),
      }),
      [hex, hex2, percent, alpha, rgb, hsl]
    )

    return (
      <div className="p-6 space-y-6">
        <Card className="p-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hex">颜色 HEX</Label>
              <Input id="hex" value={hex} onChange={(e) => setHex(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hex2">对比/混合颜色 HEX</Label>
              <Input id="hex2" value={hex2} onChange={(e) => setHex2(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="percent">百分比(±)</Label>
              <Input id="percent" type="number" value={percent} onChange={(e) => setPercent(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="alpha">透明度(0-1)</Label>
              <Input id="alpha" type="number" step="0.01" value={alpha} onChange={(e) => setAlpha(Number(e.target.value))} />
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => { setHex('#2e7d32'); setHex2('#ff9800'); setPercent(20); setAlpha(0.5) }}>重置</Button>
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
