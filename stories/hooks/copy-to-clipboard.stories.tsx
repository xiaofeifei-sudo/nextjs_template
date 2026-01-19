import { useState } from 'react'
import { useCopyToClipboard } from '../../hooks/use-copy-to-clipboard'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'

export default {
  title: 'Hooks/useCopyToClipboard',
  parameters: { nextjs: { appDirectory: true }, hooksContainer: true },
}

export const Basic = {
  render: () => {
    const [text, setText] = useState('Hello Hooks')
    const { isCopied, copyToClipboard, error } = useCopyToClipboard()
    return (
      <div className="p-6 space-y-3">
        <Input value={text} onChange={(e) => setText(e.target.value)} />
        <div className="flex gap-2">
          <Button onClick={() => copyToClipboard(text)}>
            {isCopied ? '已复制' : '复制到剪贴板'}
          </Button>
          {error && <div className="text-destructive text-sm">错误：{error.message}</div>}
        </div>
      </div>
    )
  },
}
