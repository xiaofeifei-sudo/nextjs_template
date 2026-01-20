import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query'
import { Button } from '../../components/ui/button'
import { Card } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { Separator } from '../../components/ui/separator'
import { useState, useMemo } from 'react'

export default {
  title: 'Hooks/react-query/useQuery',
  parameters: { nextjs: { appDirectory: true }, hooksContainer: true },
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

async function mockFetch(): Promise<{ time: string }> {
  await sleep(600)
  return { time: new Date().toLocaleTimeString() }
}

async function fetchUser(id: number): Promise<{ id: number; name: string }> {
  await sleep(500)
  return { id, name: `用户-${id}` }
}

async function fetchStats(): Promise<{ cpu: number; mem: number }> {
  await sleep(500)
  return { cpu: Number((Math.random() * 100).toFixed(1)), mem: Number((Math.random() * 100).toFixed(1)) }
}

async function fetchPage(page: number): Promise<{ items: string[]; page: number }> {
  await sleep(500)
  const start = (page - 1) * 5
  const items = Array.from({ length: 5 }, (_, i) => `项目-${start + i + 1}`)
  return { items, page }
}

async function fetchCursor(cursor: number): Promise<{ data: string[]; nextCursor?: number }> {
  await sleep(500)
  const start = cursor * 5
  const data = Array.from({ length: 5 }, (_, i) => `记录-${start + i + 1}`)
  const nextCursor = cursor < 2 ? cursor + 1 : undefined
  return { data, nextCursor }
}

export const BasicQuery = {
  render: () => {
    const { data, isLoading, refetch } = useQuery({
      queryKey: ['now'],
      queryFn: mockFetch,
      staleTime: 10_000,
    })

    return (
      <Card className="space-y-3 p-4">
        <div className="text-sm">{isLoading ? '加载中…' : `当前时间：${data?.time ?? '未知'}`}</div>
        <Button onClick={() => refetch()}>手动刷新</Button>
      </Card>
    )
  },
}

export const MutationAndInvalidate = {
  render: () => {
    const qc = useQueryClient()
    const mutation = useMutation({
      mutationFn: async () => {
        await sleep(500)
        return true
      },
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: ['now'] })
      },
    })

    return (
      <Card className="space-y-3 p-4">
        <Button onClick={() => mutation.mutate()} disabled={mutation.isPending}>
          {mutation.isPending ? '提交中…' : '模拟提交并刷新查询'}
        </Button>
      </Card>
    )
  },
}

export const PollingQuery = {
  render: () => {
    const [enabled, setEnabled] = useState(true)
    const { data, isFetching } = useQuery({
      queryKey: ['stats'],
      queryFn: fetchStats,
      refetchInterval: enabled ? 2000 : false,
    })
    return (
      <Card className="space-y-3 p-4">
        <div className="text-sm">CPU：{data?.cpu ?? '-'}%｜内存：{data?.mem ?? '-'}%</div>
        <div className="text-xs text-muted-foreground">状态：{isFetching ? '轮询中…' : '已暂停'}</div>
        <Button variant="secondary" onClick={() => setEnabled((v) => !v)}>
          {enabled ? '暂停轮询' : '恢复轮询'}
        </Button>
      </Card>
    )
  },
}

export const DependentQuery = {
  render: () => {
    const [userId, setUserId] = useState<number | null>(1)
    const userQuery = useQuery({
      queryKey: ['user', userId],
      queryFn: () => fetchUser(userId as number),
      enabled: userId !== null,
    })
    const detailQuery = useQuery({
      queryKey: ['user-detail', userQuery.data?.id],
      queryFn: async () => {
        await sleep(400)
        return { bio: `这是 ${userQuery.data?.name} 的简介` }
      },
      enabled: !!userQuery.data?.id,
    })
    return (
      <Card className="space-y-3 p-4">
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={userId ?? ''}
            placeholder="输入用户ID"
            onChange={(e) => setUserId(Number(e.target.value) || null)}
            className="w-32"
          />
          <Button onClick={() => setUserId((v) => (v ? v + 1 : 1))}>+1</Button>
        </div>
        <Separator />
        <div className="text-sm">用户：{userQuery.data ? `${userQuery.data.name}（ID：${userQuery.data.id}）` : '加载中…'}</div>
        <div className="text-sm">简介：{detailQuery.data?.bio ?? '等待用户加载…'}</div>
      </Card>
    )
  },
}

export const ParallelQueries = {
  render: () => {
    const a = useQuery({ queryKey: ['A'], queryFn: async () => ({ value: Math.floor(Math.random() * 100) }) })
    const b = useQuery({ queryKey: ['B'], queryFn: async () => ({ value: Math.floor(Math.random() * 100) }) })
    return (
      <Card className="space-y-3 p-4">
        <div className="text-sm">A：{a.data?.value ?? '-'}</div>
        <div className="text-sm">B：{b.data?.value ?? '-'}</div>
        <Button onClick={() => Promise.all([a.refetch(), b.refetch()])}>同时刷新</Button>
      </Card>
    )
  },
}

export const InfiniteQuery = {
  render: () => {
    const query = useInfiniteQuery({
      queryKey: ['cursor'],
      queryFn: ({ pageParam = 0 }) => fetchCursor(pageParam),
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialPageParam: 0,
    })
    const items = useMemo(() => query.data?.pages.flatMap((p) => p.data) ?? [], [query.data])
    return (
      <Card className="space-y-3 p-4">
        <div className="space-y-2">
          {items.map((it) => (
            <div key={it} className="text-sm">
              {it}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => query.fetchNextPage()} disabled={!query.hasNextPage || query.isFetchingNextPage}>
            {query.isFetchingNextPage ? '加载中…' : query.hasNextPage ? '加载更多' : '没有更多了'}
          </Button>
          <Button variant="secondary" onClick={() => query.refetch()} disabled={query.isFetching}>
            刷新
          </Button>
        </div>
      </Card>
    )
  },
}

export const PrefetchOnHover = {
  render: () => {
    const qc = useQueryClient()
    const preview = qc.getQueryData<{ items: string[]; page: number }>(['page', 1])
    const { data } = useQuery({
      queryKey: ['page', 1],
      queryFn: () => fetchPage(1),
      staleTime: 30_000,
    })
    return (
      <Card className="space-y-3 p-4">
        <Button
          onMouseEnter={() => qc.prefetchQuery({ queryKey: ['page', 2], queryFn: () => fetchPage(2) })}
          onFocus={() => qc.prefetchQuery({ queryKey: ['page', 2], queryFn: () => fetchPage(2) })}
        >
          悬停预取下一页
        </Button>
        <div className="text-sm">当前页：{data?.page ?? '-'}</div>
        <div className="text-xs text-muted-foreground">缓存预览：{preview ? `第 ${preview.page} 页` : '无'}</div>
      </Card>
    )
  },
}

export const OptimisticUpdateMutation = {
  render: () => {
    const qc = useQueryClient()
    const listQuery = useQuery({
      queryKey: ['todos'],
      queryFn: async () => {
        await sleep(400)
        return ['学习 React Query', '编写示例']
      },
    })
    const mutation = useMutation({
      mutationFn: async (title: string) => {
        await sleep(600)
        if (Math.random() < 0.3) throw new Error('随机失败')
        return title
      },
      onMutate: async (title) => {
        await qc.cancelQueries({ queryKey: ['todos'] })
        const previous = qc.getQueryData<string[]>(['todos'])
        qc.setQueryData<string[]>(['todos'], (old) => [...(old ?? []), title])
        return { previous }
      },
      onError: (_err, _title, context) => {
        qc.setQueryData(['todos'], context?.previous)
      },
      onSettled: () => {
        qc.invalidateQueries({ queryKey: ['todos'] })
      },
    })
    return (
      <Card className="space-y-3 p-4">
        <div className="space-y-1">
          {(listQuery.data ?? []).map((t) => (
            <div key={t} className="text-sm">
              {t}
            </div>
          ))}
        </div>
        <Button onClick={() => mutation.mutate(`任务-${Date.now()}`)} disabled={mutation.isPending}>
          {mutation.isPending ? '提交中…' : '新增任务（乐观更新）'}
        </Button>
      </Card>
    )
  },
}

export const PaginatedQuery = {
  render: () => {
    const [page, setPage] = useState(1)
    const query = useQuery<{ items: string[]; page: number }>({
      queryKey: ['page', page],
      queryFn: () => fetchPage(page),
    })
    return (
      <Card className="space-y-3 p-4">
        <div className="space-y-1">
          {(query.data?.items ?? []).map((it) => (
            <div key={it} className="text-sm">
              {it}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
            上一页
          </Button>
          <div className="text-sm">第 {page} 页</div>
          <Button onClick={() => setPage((p) => p + 1)}>下一页</Button>
        </div>
      </Card>
    )
  },
}

export const ErrorRetryQuery = {
  render: () => {
    const query = useQuery({
      queryKey: ['unstable'],
      queryFn: async () => {
        await sleep(400)
        if (Math.random() < 0.7) throw new Error('网络不稳定')
        return { ok: true }
      },
      retry: 2,
      retryDelay: 300,
    })
    return (
      <Card className="space-y-3 p-4">
        <div className="text-sm">
          {query.isLoading ? '加载中…' : query.isError ? `失败：${(query.error as Error).message}` : '成功'}
        </div>
        <Button onClick={() => query.refetch()}>重试</Button>
      </Card>
    )
  },
}

export const CacheUpdateSetQueryData = {
  render: () => {
    const qc = useQueryClient()
    const query = useQuery({
      queryKey: ['now'],
      queryFn: mockFetch,
      staleTime: 60_000,
    })
    return (
      <Card className="space-y-3 p-4">
        <div className="text-sm">{query.data?.time ?? '-'}</div>
        <Button
          variant="secondary"
          onClick={() => qc.setQueryData(['now'], { time: '手动更新的缓存' })}
        >
          setQueryData 更新缓存
        </Button>
      </Card>
    )
  },
}
