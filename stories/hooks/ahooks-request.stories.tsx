import { useRequest } from 'ahooks'
import { Button } from '../../components/ui/button'
import { useState } from 'react'

export default {
  title: 'Hooks/ahooks/useRequest',
  parameters: { nextjs: { appDirectory: true }, hooksContainer: true },
}

export const SimpleRequest = {
  render: () => {
    const [count, setCount] = useState(0)
    const { data, loading, run } = useRequest(
      async () => {
        await new Promise((r) => setTimeout(r, 800))
        return { message: '请求完成', at: new Date().toLocaleTimeString(), count }
      },
      { manual: true }
    )

    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={() => setCount((c) => c + 1)}>
            增加计数：{count}
          </Button>
          <Button onClick={() => run()} disabled={loading}>
            {loading ? '加载中…' : '触发请求'}
          </Button>
        </div>
        <div className="text-sm">
          {data ? (
            <div className="rounded-md border p-3">
              <div>状态：{data.message}</div>
              <div>时间：{data.at}</div>
              <div>计数：{data.count}</div>
            </div>
          ) : (
            <span className="text-muted-foreground">尚未触发请求</span>
          )}
        </div>
      </div>
    )
  },
}

