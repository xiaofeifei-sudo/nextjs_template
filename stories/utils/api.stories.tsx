import { useMemo, useState } from 'react'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Card } from '../../components/ui/card'
import { Separator } from '../../components/ui/separator'
import { Button } from '../../components/ui/button'
import { buildQueryString, handleApiError } from '../../lib/utils/api'

export default {
  title: 'Utils/API',
  parameters: {
    nextjs: { appDirectory: true },
    docs: { description: { component: '调试 API 辅助函数（不执行真实请求）。' } },
  },
  tags: ['autodocs'],
}

export const Playground = {
  render: () => {
    const [queryObj, setQueryObj] = useState('{"q":"test","page":2,"limit":20,"empty":""}')
    const [errorMsg, setErrorMsg] = useState('Network Error')

    let obj: Record<string, unknown> = {}
    try { obj = JSON.parse(queryObj) } catch {}

    const qs = useMemo(() => buildQueryString(obj as Record<string, string | number | boolean | undefined | null>), [obj])

    const apiErr = useMemo(() => handleApiError(new Error(errorMsg)), [errorMsg])

    return (
      <div className="p-6 space-y-6">
        <Card className="p-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="queryObj">查询对象 JSON</Label>
              <Input id="queryObj" value={queryObj} onChange={(e) => setQueryObj(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="errorMsg">错误消息</Label>
              <Input id="errorMsg" value={errorMsg} onChange={(e) => setErrorMsg(e.target.value)} />
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => { setQueryObj('{"q":"test","page":2,"limit":20,"empty":""}'); setErrorMsg('Network Error') }}>重置</Button>
          </div>
        </Card>
        <Separator />
        <Card className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">buildQueryString</div>
              <div className="rounded-md border p-2 text-sm break-all">{qs}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">handleApiError</div>
              <div className="rounded-md border p-2 text-sm break-all">{JSON.stringify(apiErr)}</div>
            </div>
          </div>
        </Card>
      </div>
    )
  },
}
