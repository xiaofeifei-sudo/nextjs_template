import { useMemo, useState } from 'react'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Card } from '../../components/ui/card'
import { Separator } from '../../components/ui/separator'
import { Button } from '../../components/ui/button'
import { pick, omit, deepClone, deepMerge, isEqual, isEmptyObject, get, set, flattenObject, invert, mapValues, filterObject } from '../../lib/utils/object'

export default {
  title: 'Utils/Object',
  parameters: {
    nextjs: { appDirectory: true },
    docs: { description: { component: '调试对象工具函数。' } },
  },
  tags: ['autodocs'],
}

export const Playground = {
  render: () => {
    const [json, setJson] = useState('{"name":"Alice","age":30,"nested":{"a":1,"b":2}}')
    const [json2, setJson2] = useState('{"age":31,"nested":{"b":3,"c":4},"city":"Jakarta"}')
    const [keys, setKeys] = useState('name,age')
    const [path, setPath] = useState('nested.a')
    const [pathValue, setPathValue] = useState('100')

    let obj: Record<string, unknown> = {}
    let obj2: Record<string, unknown> = {}
    try { obj = JSON.parse(json) } catch {}
    try { obj2 = JSON.parse(json2) } catch {}
    const keyList = keys.split(',').map((s) => s.trim()).filter(Boolean)

    const picked = useMemo(() => pick(obj, keyList as (keyof typeof obj)[]), [obj, keyList])
    const omitted = useMemo(() => omit(obj, keyList as (keyof typeof obj)[]), [obj, keyList])
    const merged = useMemo(() => deepMerge(obj, obj2), [obj, obj2])
    const cloned = useMemo(() => deepClone(obj), [obj])
    const equal = useMemo(() => isEqual(obj, obj2), [obj, obj2])
    const empty = useMemo(() => isEmptyObject(obj), [obj])
    const got = useMemo(() => get(obj, path, 'not found'), [obj, path])
    const setted = useMemo(() => JSON.stringify(set(obj, path, isNaN(Number(pathValue)) ? pathValue : Number(pathValue))), [obj, path, pathValue])
    const flattened = useMemo(() => flattenObject(obj), [obj])
    const inverted = useMemo(() => invert({ a: '1', b: '2', c: '3' }), [])
    const mapped = useMemo(() => mapValues({ a: 1, b: 2 }, (v) => v * 10), [])
    const filtered = useMemo(() => filterObject({ a: 1, b: 2, c: 3 }, (v) => v >= 2), [])

    const results = {
      pick: JSON.stringify(picked),
      omit: JSON.stringify(omitted),
      deepMerge: JSON.stringify(merged),
      deepClone: JSON.stringify(cloned),
      isEqual: `${equal}`,
      isEmptyObject: `${empty}`,
      get: `${got}`,
      set: `${setted}`,
      flattenObject: JSON.stringify(flattened),
      invert: JSON.stringify(inverted),
      mapValues: JSON.stringify(mapped),
      filterObject: JSON.stringify(filtered),
    }

    return (
      <div className="p-6 space-y-6">
        <Card className="p-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="json">对象 JSON</Label>
              <Input id="json" value={json} onChange={(e) => setJson(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="json2">对象2 JSON</Label>
              <Input id="json2" value={json2} onChange={(e) => setJson2(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="keys">键列表（逗号分隔）</Label>
              <Input id="keys" value={keys} onChange={(e) => setKeys(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="path">路径</Label>
              <Input id="path" value={path} onChange={(e) => setPath(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="setValue">设置值</Label>
              <Input id="setValue" value={pathValue} onChange={(e) => setPathValue(e.target.value)} />
            </div>
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
