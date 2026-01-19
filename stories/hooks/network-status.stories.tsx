import { useNetworkStatus } from '../../hooks/use-network-status'

export default {
  title: 'Hooks/useNetworkStatus',
  parameters: { nextjs: { appDirectory: true }, hooksContainer: true },
}

export const Basic = {
  render: () => {
    const { isOnline, connectionType } = useNetworkStatus()
    return (
      <div className="space-y-2">
        <div className="text-sm">在线：{String(isOnline)}</div>
        <div className="text-sm">连接类型：{connectionType ?? '未知'}</div>
      </div>
    )
  },
}

