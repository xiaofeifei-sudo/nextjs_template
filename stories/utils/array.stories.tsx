import { Card } from '../../components/ui/card'
import { Separator } from '../../components/ui/separator'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { useMemo, useState } from 'react'
import { chunk, unique, shuffle, groupBy, sortBy, intersection, difference, randomItem, randomItems, removeAt, remove, move, sum, average, min, max } from '../../lib/utils/array'

export default {
  title: 'Utils/Array',
  parameters: {
    nextjs: { appDirectory: true },
    docs: { description: { component: '调试数组工具函数。' } },
  },
  tags: ['autodocs'],
}

export const Playground = {
  render: () => {
    const [arr, setArr] = useState('1,2,2,3,4,5')
    const [chunkSize, setChunkSize] = useState(2)
    const [groupKey] = useState<'type'>('type')
    const [removeIndex, setRemoveIndex] = useState(1)
    const [removeValue, setRemoveValue] = useState('2')
    const [fromIdx, setFromIdx] = useState(0)
    const [toIdx, setToIdx] = useState(2)
    const [arrB, setArrB] = useState('2,3,6')

    const nums = useMemo(() => arr.split(',').map((v) => Number(v.trim())).filter((v) => !isNaN(v)), [arr])
    const numsB = useMemo(() => arrB.split(',').map((v) => Number(v.trim())).filter((v) => !isNaN(v)), [arrB])
    const items = useMemo(() => [{ id: 1, type: 'a' }, { id: 2, type: 'b' }, { id: 3, type: 'a' }, { id: 4, type: 'c' }], [])

    const results = useMemo(() => ({
      chunk: JSON.stringify(chunk(nums, chunkSize)),
      unique: JSON.stringify(unique(nums)),
      shuffle: JSON.stringify(shuffle(nums)),
      groupBy: JSON.stringify(groupBy(items, groupKey)),
      sortBy: JSON.stringify(sortBy(items, 'id', 'desc')),
      intersection: JSON.stringify(intersection(nums, numsB)),
      difference: JSON.stringify(difference(nums, numsB)),
      randomItem: `${randomItem(nums)}`,
      randomItems: JSON.stringify(randomItems(nums, 3)),
      removeAt: JSON.stringify(removeAt(nums, removeIndex)),
      remove: JSON.stringify(remove(nums, Number(removeValue))),
      move: JSON.stringify(move(nums, fromIdx, toIdx)),
      sum: `${sum(nums)}`,
      average: `${average(nums)}`,
      min: `${min(nums)}`,
      max: `${max(nums)}`,
    }), [nums, chunkSize, items, groupKey, numsB, removeIndex, removeValue, fromIdx, toIdx])

    return (
      <div className="p-6 space-y-6">
        <Card className="p-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="arr">数组(逗号)</Label>
              <Input id="arr" value={arr} onChange={(e) => setArr(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="chunk">分块大小</Label>
              <Input id="chunk" type="number" value={chunkSize} onChange={(e) => setChunkSize(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="arrb">数组B(逗号)</Label>
              <Input id="arrb" value={arrB} onChange={(e) => setArrB(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="removeIndex">移除索引</Label>
              <Input id="removeIndex" type="number" value={removeIndex} onChange={(e) => setRemoveIndex(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="removeValue">移除值</Label>
              <Input id="removeValue" value={removeValue} onChange={(e) => setRemoveValue(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fromIdx">移动起始</Label>
              <Input id="fromIdx" type="number" value={fromIdx} onChange={(e) => setFromIdx(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="toIdx">移动目标</Label>
              <Input id="toIdx" type="number" value={toIdx} onChange={(e) => setToIdx(Number(e.target.value))} />
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => { setArr('1,2,2,3,4,5'); setArrB('2,3,6'); setChunkSize(2); setRemoveIndex(1); setRemoveValue('2'); setFromIdx(0); setToIdx(2) }}>重置</Button>
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
