import { useMemo, useState } from 'react'
import { Button } from '../../components/ui/button'
import { Card } from '../../components/ui/card'
import { Separator } from '../../components/ui/separator'
import { ScrollArea } from '../../components/ui/scroll-area'
import { SystemApi } from '@/apis/system'
import { useSystemConfigStore } from '@/store/system'
import constantsJson from '@/store/system/data/system_constant.json'

export default {
  title: 'API/SystemApi',
  parameters: {
    nextjs: { appDirectory: true },
    docs: { description: { component: '系统常量接口交互测试：调用真实接口或使用本地数据填充。' } },
  },
  tags: ['autodocs'],
}

export const FetchConstant = {
  render: () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [ts, setTs] = useState<string>('')
    const store = useSystemConfigStore()
    const hasData = store.hasData
    const sys = store.getSystemConstant()
    const listLen = useMemo(() => {
      return store.callbackStatusList.length
    }, [store.callbackStatusList])
    const mapLen = useMemo(() => {
      return Object.keys(store.callbackStatusMap || {}).length
    }, [store.callbackStatusMap])

    const doFetch = async () => {
      setIsLoading(true)
      setError(null)
      try {
        await SystemApi.fetchSystemConstant()
        setTs(new Date().toLocaleTimeString())
      } catch (e: any) {
        setError(e?.message || '请求失败')
      } finally {
        setIsLoading(false)
      }
    }

    const fillLocal = () => {
      useSystemConfigStore.getState().saveSystemConstant(constantsJson as any)
      setTs(new Date().toLocaleTimeString())
    }

    return (
      <div className="p-6 space-y-6">
        <Card className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-lg font-semibold">系统常量请求测试</div>
              <div className="text-sm text-muted-foreground">调用 SystemApi.fetchSystemConstant 并更新 Zustand 存储</div>
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex gap-2">
                <Button onClick={doFetch} disabled={isLoading}>发起请求</Button>
                <Button onClick={fillLocal} variant="outline">使用本地数据填充</Button>
              </div>
              {isLoading && <div className="text-sm">加载中...</div>}
              {error && <div className="text-sm text-destructive">错误：{error}</div>}
              {!!ts && <div className="text-xs text-muted-foreground">上次更新：{ts}</div>}
            </div>
            <div className="space-y-2">
              <div className="text-sm">hasData: {String(hasData)}</div>
              <div className="text-sm">CALLBACK_STATUS 列表项数：{listLen}</div>
              <div className="text-sm">CALLBACK_STATUS 映射键数：{mapLen}</div>
              <Separator />
              <div className="text-sm font-medium">示例数据展示</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-3 space-y-2">
                  <div className="text-xs text-muted-foreground">listConstant.CALLBACK_STATUS</div>
                  <ul className="space-y-1">
                    {(sys?.listConstant?.CALLBACK_STATUS || []).map((it) => (
                      <li key={`${it.value}`} className="text-sm">
                        <span className="inline-block min-w-16 mr-2 text-muted-foreground">{it.value}</span>
                        <span>{it.text}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
                <Card className="p-3 space-y-2">
                  <div className="text-xs text-muted-foreground">mapConstant.CALLBACK_STATUS</div>
                  <ul className="space-y-1">
                    {Object.entries(sys?.mapConstant?.CALLBACK_STATUS || {}).map(([k, v]) => (
                      <li key={k} className="text-sm">
                        <span className="inline-block min-w-16 mr-2 text-muted-foreground">{k}</span>
                        <span>{v}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
              <Separator />
              <div className="text-sm font-medium">完整数据（JSON）</div>
              <ScrollArea className="h-64 rounded-md border p-3">
                <pre className="text-xs whitespace-pre-wrap break-words">
                  {JSON.stringify(sys, null, 2)}
                </pre>
              </ScrollArea>
            </div>
          </div>
        </Card>
      </div>
    )
  },
}
