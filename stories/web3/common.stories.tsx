import React, { useMemo, useState } from 'react'
import { Card } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Separator } from '../../components/ui/separator'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { fillAddressWith0x, parseNumberToBigint } from 'pelican-web3-lib-common'
import { createGetBrowserLink } from 'pelican-web3-lib-common'

export default {
  title: 'Web3/Common',
  parameters: { nextjs: { appDirectory: true }, hooksContainer: true },
}

export const UtilsDemo = {
  render: () => {
    const [addr, setAddr] = useState('abcd1234')
    const [num, setNum] = useState<string>('12345')
    const getEtherscanLink = useMemo(() => createGetBrowserLink('https://etherscan.io'), [])

    const filled = fillAddressWith0x(addr)
    const parsed = parseNumberToBigint(Number(num))
    const addressLink = getEtherscanLink(filled, 'address')
    const txLink = getEtherscanLink('0xdeadbeef', 'transaction')

    return (
      <Card className="space-y-6 p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-lg font-semibold">Common 工具</div>
            <div className="text-xs text-muted-foreground">格式化与浏览器链接示例</div>
          </div>
          <Badge>Common</Badge>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-medium">fillAddressWith0x</div>
          <div className="flex items-center gap-2">
            <Input className="w-64" value={addr} onChange={(e) => setAddr(e.target.value)} placeholder="输入地址" />
            <Button variant="outline">填充 0x 前缀</Button>
          </div>
          <div className="text-sm">结果：{filled}</div>
        </div>

        <Separator />

        <div className="space-y-3">
          <div className="text-sm font-medium">parseNumberToBigint</div>
          <div className="flex items-center gap-2">
            <Input className="w-64" value={num} onChange={(e) => setNum(e.target.value)} placeholder="输入数字" />
          </div>
          <div className="text-sm">结果：{parsed !== undefined ? String(parsed) : 'undefined'}</div>
        </div>

        <Separator />

        <div className="space-y-3">
          <div className="text-sm font-medium">createGetBrowserLink</div>
          <div className="text-sm">地址链接：<a className="text-primary underline" href={addressLink} target="_blank" rel="noreferrer">{addressLink}</a></div>
          <div className="text-sm">交易链接：<a className="text-primary underline" href={txLink} target="_blank" rel="noreferrer">{txLink}</a></div>
        </div>
      </Card>
    )
  },
}
