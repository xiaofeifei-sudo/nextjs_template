import { useEffect, useMemo, useRef, useState } from 'react'
import { Card } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Separator } from '../../components/ui/separator'
import { Badge } from '../../components/ui/badge'
import { debounce, throttle, range, tryit, select } from 'radash'
import * as R from 'radash'

export default {
  title: 'Utils/Radash',
  parameters: {
    nextjs: { appDirectory: true },
    docs: {
      description: {
        component:
          'Radash 是现代的 TypeScript 工具库。本页提供常用 API 的交互式调试示例：debounce、throttle、range、tryit、select。官方文档：https://radash-docs.vercel.app/docs/getting-started',
      },
    },
  },
  tags: ['autodocs'],
}

export const Debounce = {
  render: () => {
    const [value, setValue] = useState('')
    const [logs, setLogs] = useState<string[]>([])
    const debounced = useMemo(
      () =>
        debounce({ delay: 500 }, (v: string) => {
          setLogs((l) => [`触发: ${v} @${new Date().toLocaleTimeString()}`, ...l].slice(0, 8))
        }),
      []
    )

    useEffect(() => {
      return () => {
        debounced.cancel()
      }
    }, [debounced])

    return (
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">debounce</h3>
            <p className="text-sm text-muted-foreground">延迟触发，短时间频繁输入仅在静默后执行一次</p>
          </div>
          <Badge>radash</Badge>
        </div>

        <Card className="p-4 space-y-3">
          <Input
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              debounced(e.target.value)
            }}
            placeholder="输入内容，停止后约 500ms 执行"
            className="max-w-md"
            aria-label="debounce-input"
          />

          <div className="text-sm text-muted-foreground">
            待触发: {debounced.isPending() ? '是' : '否'}
          </div>

          <div className="space-x-2">
            <Button variant="outline" onClick={() => debounced.flush(value)}>
              立即执行 flush
            </Button>
            <Button variant="destructive" onClick={() => debounced.cancel()}>
              取消等待 cancel
            </Button>
          </div>
        </Card>

        <Separator />
        <div className="space-y-2">
          <div className="text-sm font-medium">触发日志</div>
          <ul className="text-sm space-y-1">
            {logs.map((l, i) => (
              <li key={i} className="text-muted-foreground">
                {l}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  },
}

export const Throttle = {
  render: () => {
    const [count, setCount] = useState(0)
    const throttled = useMemo(
      () =>
        throttle({ interval: 800 }, () => {
          setCount((c) => c + 1)
        }),
      []
    )

    return (
      <div className="p-6 space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">throttle</h3>
          <p className="text-sm text-muted-foreground">在时间窗内仅允许一次触发，适合滚动与高频事件</p>
        </div>

        <Card className="p-4 space-y-3">
          <div className="flex items-center gap-3">
            <Button onClick={() => throttled()}>快速点击</Button>
            <div className="text-sm text-muted-foreground">
              已触发次数：{count}（{throttled.isThrottled() ? '节流中' : '可触发'}）
            </div>
          </div>
        </Card>
      </div>
    )
  },
}

export const Range = {
  render: () => {
    const seq = useMemo(() => Array.from(range(0, 20, 3)), [])
    return (
      <div className="p-6 space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">range</h3>
          <p className="text-sm text-muted-foreground">生成迭代器并以流式方式遍历，避免大数组一次性分配</p>
        </div>

        <Card className="p-4">
          <div className="text-sm">区间 [0, 20] 步长 3：</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {seq.map((n) => (
              <span key={n} className="px-2 py-1 rounded border text-sm">
                {n}
              </span>
            ))}
          </div>
        </Card>
      </div>
    )
  },
}

export const Tryit = {
  render: () => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [message, setMessage] = useState<string>('')
    const pending = useRef<AbortController | null>(null)

    const simulate = async () => {
      setStatus('loading')
      setMessage('')
      pending.current?.abort()
      pending.current = new AbortController()

      const fakeApi = async () => {
        await new Promise((r) => setTimeout(r, 700))
        if (Math.random() < 0.4) throw new Error('随机错误：服务暂不可用')
        return { ok: true, time: new Date().toLocaleTimeString() }
      }

      const [err, res] = await tryit(fakeApi)()
      if (err) {
        setStatus('error')
        setMessage(err.message)
        return
      }
      setStatus('success')
      setMessage(`成功 @ ${res.time}`)
    }

    return (
      <div className="p-6 space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">tryit</h3>
          <p className="text-sm text-muted-foreground">错误优先返回元组，友好处理异步异常</p>
        </div>

        <Card className="p-4 space-y-3">
          <Button onClick={simulate} disabled={status === 'loading'}>
            {status === 'loading' ? '请求中...' : '模拟请求'}
          </Button>
          <div className="text-sm">
            状态：<span className="font-medium">{status}</span>
          </div>
          {message && <div className="text-sm text-muted-foreground">{message}</div>}
        </Card>
      </div>
    )
  },
}

export const Select = {
  render: () => {
    const [powerMin, setPowerMin] = useState(50)
    const gods = useMemo(
      () => [
        { name: 'Ra', culture: 'egypt', power: 90 },
        { name: 'Zeus', culture: 'greek', power: 85 },
        { name: 'Anubis', culture: 'egypt', power: 70 },
        { name: 'Hera', culture: 'greek', power: 55 },
        { name: 'Thor', culture: 'norse', power: 95 },
      ],
      []
    )
    const result = useMemo(
      () =>
        select(
          gods,
          (g) => ({ ...g, power: g.power * 1.1 }),
          (g) => g.power >= powerMin
        ),
      [gods, powerMin]
    )

    return (
      <div className="p-6 space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">select</h3>
          <p className="text-sm text-muted-foreground">合并 map + filter 为单次遍历，提升性能</p>
        </div>

        <Card className="p-4 space-y-3">
          <div className="flex items-center gap-3">
            <label htmlFor="min-power" className="text-sm text-muted-foreground">
              最小 power：
            </label>
            <Input
              id="min-power"
              type="number"
              value={powerMin}
              onChange={(e) => setPowerMin(Number(e.target.value))}
              className="w-28"
            />
          </div>

          <Separator />
          <div className="space-y-2">
            <div className="text-sm font-medium">结果（提升 10% power 后再过滤）</div>
            <ul className="text-sm space-y-1">
              {result.map((g) => (
                <li key={g.name} className="flex items-center justify-between">
                  <span className="text-muted-foreground">{g.name}</span>
                  <span className="text-muted-foreground">{g.culture}</span>
                  <span className="font-mono">{Math.round(g.power)}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    )
  },
}

export const AllMethods = {
  render: () => {
    const [q, setQ] = useState('')
    const all = useMemo(
      () =>
        Object.keys(R)
          .filter((k) => typeof (R as any)[k] === 'function')
          .sort(),
      []
    )
    const setAll = useMemo(() => new Set(all), [all])
    const groupMap = useMemo(() => {
      const array = [
        'alphabetical',
        'boil',
        'cluster',
        'counting',
        'flat',
        'fork',
        'group',
        'iterate',
        'list',
        'merge',
        'objectify',
        'range',
        'replaceOrAppend',
        'replace',
        'select',
        'shift',
        'sift',
        'sum',
        'toggle',
        'zip',
      ]
      const async = ['all', 'defer', 'guard', 'map', 'reduce', 'retry', 'sleep', 'tryit']
      const curry = ['chain', 'compose', 'debounce', 'memo', 'partob', 'proxied', 'throttle']
      const number = ['inRange', 'toFloat', 'toInt']
      const object = [
        'assign',
        'clone',
        'crush',
        'get',
        'invert',
        'keys',
        'listify',
        'lowerize',
        'mapEntries',
        'mapKeys',
        'mapValues',
        'omit',
        'pick',
        'set',
        'shake',
        'upperize',
      ]
      const random = ['draw', 'random', 'shuffle', 'uid', 'series']
      const string = ['camel', 'capitalize', 'dash', 'pascal', 'snake', 'template', 'title', 'trim']
      const typed = [
        'isArray',
        'isDate',
        'isEmpty',
        'isEqual',
        'isFloat',
        'isFunction',
        'isInt',
        'isNumber',
        'isObject',
        'isPrimitive',
        'isPromise',
        'isString',
        'isSymbol',
      ]
      const groups = [
        { key: 'Array', names: array },
        { key: 'Async', names: async },
        { key: 'Curry', names: curry },
        { key: 'Number', names: number },
        { key: 'Object', names: object },
        { key: 'Random', names: random },
        { key: 'String', names: string },
        { key: 'Typed', names: typed },
      ]
      const used = new Set<string>()
      const resolved = groups.map((g) => {
        const items = g.names.filter((n) => setAll.has(n)).sort()
        items.forEach((n) => used.add(n))
        return { key: g.key, items }
      })
      const unmatched = all.filter((n) => !used.has(n))
      if (unmatched.length) {
        resolved.push({ key: '未分类', items: unmatched })
      }
      return resolved
    }, [all, setAll])
    const filtered = useMemo(() => {
      if (!q) return groupMap
      const s = q.toLowerCase()
      return groupMap
        .map((g) => ({ key: g.key, items: g.items.filter((n) => n.toLowerCase().includes(s)) }))
        .filter((g) => g.items.length)
    }, [groupMap, q])
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">Radash 方法总览</h3>
            <p className="text-sm text-muted-foreground">自动枚举所有导出的方法，支持关键字过滤</p>
          </div>
          <Badge variant="secondary">共 {all.length} 项</Badge>
        </div>
        <Card className="p-4 space-y-3">
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="输入方法名过滤，例如：debounce / is"
            className="max-w-md"
            aria-label="radash-filter-input"
          />
        </Card>
        <div className="space-y-6">
          {filtered.map((g) => (
            <Card key={g.key} className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">{g.key}</div>
                <Badge variant="outline">{g.items.length}</Badge>
              </div>
              <Separator />
              <div className="flex flex-wrap gap-2">
                {g.items.map((n) => (
                  <span
                    key={n}
                    className="px-2 py-1 rounded border text-sm hover:bg-muted/40"
                    aria-label={`radash-${n}`}
                    title={n}
                  >
                    {n}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    )
  },
}
