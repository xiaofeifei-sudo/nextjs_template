import { useMemo, useState } from 'react'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Button } from '../../components/ui/button'
import { Card } from '../../components/ui/card'
import { Separator } from '../../components/ui/separator'
import { capitalize, capitalizeWords, slugify, truncate, removeAccents, camelCase, kebabCase, snakeCase, pascalCase, randomString, generateUUID, maskString, wordCount, reverseString, isPalindrome, getInitials } from '../../lib/utils/string'

export default {
  title: 'Utils/String',
  parameters: {
    nextjs: { appDirectory: true },
    docs: {
      description: {
        component: '调试字符串工具函数，支持实时输入与结果展示。',
      },
    },
  },
  tags: ['autodocs'],
}

export const Playground = {
  render: () => {
    const [text, setText] = useState('hello world')
    const [len, setLen] = useState(8)
    const [vs, setVs] = useState(3)
    const [ve, setVe] = useState(3)

    const results = useMemo(
      () => ({
        capitalize: capitalize(text),
        capitalizeWords: capitalizeWords(text),
        slugify: slugify(text),
        truncate: truncate(text, len),
        removeAccents: removeAccents(text),
        camelCase: camelCase(text),
        kebabCase: kebabCase(text),
        snakeCase: snakeCase(text),
        pascalCase: pascalCase(text),
        randomString: randomString(10),
        uuid: generateUUID(),
        mask: maskString(text, vs, ve),
        wordCount: String(wordCount(text)),
        reverse: reverseString(text),
        isPalindrome: String(isPalindrome(text)),
        initials: getInitials(text, 2),
      }),
      [text, len, vs, ve]
    )

    return (
      <div className="p-6 space-y-6">
        <Card className="p-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="text">输入文本</Label>
              <Input id="text" value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="len">截断长度</Label>
              <Input
                id="len"
                type="number"
                value={len}
                onChange={(e) => setLen(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vs">遮掩前缀可见长度</Label>
              <Input
                id="vs"
                type="number"
                value={vs}
                onChange={(e) => setVs(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ve">遮掩后缀可见长度</Label>
              <Input
                id="ve"
                type="number"
                value={ve}
                onChange={(e) => setVe(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setText('hello world')}>重置文本</Button>
            <Button variant="outline" onClick={() => setLen(8)}>重置截断长度</Button>
            <Button variant="outline" onClick={() => { setVs(3); setVe(3) }}>重置遮掩参数</Button>
          </div>
        </Card>

        <Separator />

        <Card className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(results).map(([k, v]) => (
              <div key={k} className="space-y-1">
                <div className="text-xs text-muted-foreground">{k}</div>
                <div className="rounded-md border p-2 text-sm break-all">{v}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    )
  },
}
