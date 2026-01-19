import { useState } from 'react'
import { useAsync } from '../../hooks/use-async'
import { Button } from '../../components/ui/button'

export default {
  title: 'Hooks/useAsync',
  parameters: { nextjs: { appDirectory: true }, hooksContainer: true },
}

export const FetchJson = {
  render: () => {
    const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/todos/1')
    const { data, error, isLoading, isError, isSuccess, execute, reset } = useAsync(async () => {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return res.json()
    })
    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={execute}>执行</Button>
          <Button variant="outline" onClick={reset}>重置</Button>
          <Button variant="outline" onClick={() => setUrl('https://jsonplaceholder.typicode.com/invalid')}>使用错误地址</Button>
        </div>
        {isLoading && <div className="text-sm">加载中...</div>}
        {isError && <div className="text-destructive text-sm">错误：{String(error?.message)}</div>}
        {isSuccess && (
          <pre className="rounded-md border p-3 text-xs overflow-auto">{JSON.stringify(data, null, 2)}</pre>
        )}
      </div>
    )
  },
}

