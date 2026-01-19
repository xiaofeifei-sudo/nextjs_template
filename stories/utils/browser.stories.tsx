import { Card } from '../../components/ui/card'
import { Separator } from '../../components/ui/separator'
import { Button } from '../../components/ui/button'
import { isServer, isBrowser, isIOS, isAndroid, isMobile as isMobileDevice, isTouchDevice, isSafari, isChrome, isFirefox, prefersReducedMotion, prefersDarkMode, getDevicePixelRatio, supportsWebGL, supportsIntersectionObserver, getConnectionType, isOnline, getBatteryLevel } from '../../lib/utils/browser'
import { useEffect, useState } from 'react'

export default {
  title: 'Utils/Browser',
  parameters: {
    nextjs: { appDirectory: true },
    docs: { description: { component: '调试浏览器与设备检测工具函数。' } },
  },
  tags: ['autodocs'],
}

export const Status = {
  render: () => {
    const [battery, setBattery] = useState<string>('unknown')
    useEffect(() => {
      getBatteryLevel().then((level) => {
        setBattery(level == null ? 'unsupported' : `${Math.round(level * 100)}%`)
      })
    }, [])

    const items = [
      ['isServer', String(isServer)],
      ['isBrowser', String(isBrowser)],
      ['isMobileDevice', String(isMobileDevice())],
      ['isIOS', String(isIOS())],
      ['isAndroid', String(isAndroid())],
      ['isTouchDevice', String(isTouchDevice())],
      ['isSafari', String(isSafari())],
      ['isChrome', String(isChrome())],
      ['isFirefox', String(isFirefox())],
      ['prefersReducedMotion', String(prefersReducedMotion())],
      ['prefersDarkMode', String(prefersDarkMode())],
      ['getDevicePixelRatio', String(getDevicePixelRatio())],
      ['supportsWebGL', String(supportsWebGL())],
      ['supportsIntersectionObserver', String(supportsIntersectionObserver())],
      ['getConnectionType', String(getConnectionType())],
      ['isOnline', String(isOnline())],
      ['batteryLevel', battery],
    ]

    return (
      <div className="p-6 space-y-6">
        <Card className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map(([k, v]) => (
              <div key={k} className="space-y-1">
                <div className="text-xs text-muted-foreground">{k}</div>
                <div className="rounded-md border p-2 text-sm break-all">{v}</div>
              </div>
            ))}
          </div>
        </Card>
        <Separator />
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setBattery('unknown')}>刷新电量</Button>
          <Button onClick={() => window.location.reload()}>刷新页面</Button>
        </div>
      </div>
    )
  },
}
