import { useFetch } from '../../hooks/use-fetch'
import { Button } from '../../components/ui/button'

export default {
  title: 'Hooks/useFetch',
  parameters: { nextjs: { appDirectory: true }, hooksContainer: true },
}

export const JsonPlaceholder = {
  render: () => {
    const { data, isLoading, isError, error, refetch } = useFetch<any>('https://jsonplaceholder.typicode.com/posts?_limit=5')
    return (
      <div className="p-6 space-y-4">
        <div className="flex gap-3">
          <Button onClick={refetch} variant="outline">刷新</Button>
        </div>
        {isLoading && <div className="text-sm">加载中...</div>}
        {isError && <div className="text-destructive text-sm">错误：{error?.message}</div>}
        {data && (
          <ul className="space-y-2">
            {data.map((p: any) => (
              <li key={p.id} className="border rounded-md p-3">
                <div className="font-medium">{p.title}</div>
                <div className="text-muted-foreground text-sm">{p.body}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  },
}
