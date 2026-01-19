import { useMemo, useState } from 'react'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Card } from '../../components/ui/card'
import { Separator } from '../../components/ui/separator'
import { validatePassword, isEmail, isURL, isPhone, isEmpty, isNumeric, isNIK, isNPWP, isValidDate } from '../../lib/utils/validation'

export default {
  title: 'Utils/Validation',
  parameters: {
    nextjs: { appDirectory: true },
    docs: { description: { component: '调试数据校验工具函数。' } },
  },
  tags: ['autodocs'],
}

export const Playground = {
  render: () => {
    const [email, setEmail] = useState('john@example.com')
    const [url, setUrl] = useState('https://example.com')
    const [phone, setPhone] = useState('081234567890')
    const [text, setText] = useState('')
    const [numeric, setNumeric] = useState('12345')
    const [nik, setNik] = useState('1234567890123456')
    const [npwp, setNpwp] = useState('12.345.678.9-012.345')
    const [date, setDate] = useState('2025-01-01')
    const [password, setPassword] = useState('Aa1!aaaa')

    const pwd = useMemo(() => validatePassword(password), [password])

    const results = useMemo(
      () => ({
        isEmail: String(isEmail(email)),
        isURL: String(isURL(url)),
        isPhone: String(isPhone(phone)),
        isEmpty: String(isEmpty(text)),
        isNumeric: String(isNumeric(numeric)),
        isNIK: String(isNIK(nik)),
        isNPWP: String(isNPWP(npwp)),
        isValidDate: String(isValidDate(date)),
        passwordValid: String(pwd.isValid),
        passwordStrength: pwd.strength,
        passwordErrors: pwd.errors.join(', '),
      }),
      [email, url, phone, text, numeric, nik, npwp, date, pwd]
    )

    return (
      <div className="p-6 space-y-6">
        <Card className="p-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">邮箱</Label>
              <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input id="url" value={url} onChange={(e) => setUrl(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">电话</Label>
              <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="text">文本</Label>
              <Input id="text" value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="numeric">数字字符串</Label>
              <Input id="numeric" value={numeric} onChange={(e) => setNumeric(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nik">NIK</Label>
              <Input id="nik" value={nik} onChange={(e) => setNik(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="npwp">NPWP</Label>
              <Input id="npwp" value={npwp} onChange={(e) => setNpwp(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">日期</Label>
              <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="password">密码</Label>
              <Input id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
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
