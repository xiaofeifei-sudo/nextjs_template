import { Card } from '../../components/ui/card'
import { Separator } from '../../components/ui/separator'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { useMemo, useState } from 'react'
import { uuid, nanoid, randomString, sha256, sha512, base64Encode, base64Decode, generateToken, xorEncrypt, timingSafeEqual, maskString, maskEmail, generateCSRFToken } from '../../lib/utils/crypto'

export default {
  title: 'Utils/Crypto',
  parameters: {
    nextjs: { appDirectory: true },
    docs: { description: { component: '调试加密与安全相关工具函数（仅示例用途）。' } },
  },
  tags: ['autodocs'],
}

export const Playground = {
  render: () => {
    const [text, setText] = useState('hello')
    const [key, setKey] = useState('secret')
    const [email, setEmail] = useState('john@example.com')
    const [password, setPassword] = useState('password')

    const syncResults = useMemo(
      () => ({
        uuid: uuid(),
        nanoid: nanoid(),
        randomString: randomString(16),
        base64Encode: base64Encode(text),
        base64Decode: base64Decode(base64Encode(text)),
        xorEncrypt: xorEncrypt(text, key),
        timingSafeEqual: timingSafeEqual('abc', 'abc'),
        maskedString: maskString('4111111111111111', 4, 4),
        maskedEmail: maskEmail(email),
        token: generateToken(16),
        csrf: generateCSRFToken(),
      }),
      [text, key, email]
    )

    const [hash256, setHash256] = useState('')
    const [hash512, setHash512] = useState('')

    const doHash = async () => {
      const h256 = await sha256(password)
      const h512 = await sha512(password)
      setHash256(h256)
      setHash512(h512)
    }

    return (
      <div className="p-6 space-y-6">
        <Card className="p-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="text">文本</Label>
              <Input id="text" value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="key">XOR 密钥</Label>
              <Input id="key" value={key} onChange={(e) => setKey(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">邮箱</Label>
              <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">密码(用于哈希)</Label>
              <Input id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
          <Button variant="outline" onClick={doHash}>计算哈希</Button>
        </Card>
        <Separator />
        <Card className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(syncResults).map(([k, v]) => (
              <div key={k} className="space-y-1">
                <div className="text-xs text-muted-foreground">{k}</div>
                <div className="rounded-md border p-2 text-sm break-all">{String(v)}</div>
              </div>
            ))}
          </div>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">sha256</div>
              <div className="rounded-md border p-2 text-sm break-all">{hash256}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">sha512</div>
              <div className="rounded-md border p-2 text-sm break-all">{hash512}</div>
            </div>
          </div>
        </Card>
      </div>
    )
  },
}
