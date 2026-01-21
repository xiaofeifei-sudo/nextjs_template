import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Button } from '../../components/ui/button'
import { Card } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Separator } from '../../components/ui/separator'
import { Input } from '../../components/ui/input'
import { BitcoinWeb3ConfigProvider, PhantomWallet, UnisatWallet, OkxWallet, XverseWallet, useBitcoinWallet, NotImplementedError } from 'pelican-web3-lib-bitcoin'
import { ConfigContext } from 'pelican-web3-lib-common'

function bridgeTopProviders(): void {
  if (typeof window === 'undefined') return
  try {
    const topWin = window.top as any
    if (!topWin || topWin === window) return
    const self = window as any
    if (!self.unisat && topWin.unisat) self.unisat = topWin.unisat
    if (!self.okxwallet && topWin.okxwallet) self.okxwallet = topWin.okxwallet
    const topPhantom = topWin.phantom
    if (topPhantom?.bitcoin) {
      if (!self.phantom) self.phantom = {}
      self.phantom.bitcoin = topPhantom.bitcoin
    }
  } catch {}
}
bridgeTopProviders()

export default {
  title: 'Web3/Bitcoin',
  parameters: { nextjs: { appDirectory: true }, hooksContainer: true },
}

function Panel() {
  const ctx = useContext(ConfigContext)
  const { account, signMessage, signPsbt, sendTransfer, connect: adapterConnect } = useBitcoinWallet()
  const wallets = useMemo(() => ctx.availableWallets ?? [], [ctx.availableWallets])
  const [detected, setDetected] = useState<Record<string, { ready?: boolean; installed?: boolean }>>({})
  const [signMsg, setSignMsg] = useState<string>('Hello Bitcoin!')
  const [signature, setSignature] = useState<string | null>(null)
  const [signLoading, setSignLoading] = useState<boolean>(false)
  const [psbt, setPsbt] = useState<string>('cHNidP8BAF4CAAAAAa/v4ZPYjm+iJc1pB3IybYY6wPpScPDlxvHmNE557J2vAQAAAAD/////AWqKAAAAAAAAIlEgZDcUdAs/gCZIkazJyMw1I54n2QGxN1W2ph6m+4zYHBkAAAAACPwCbWUDc2lnQE+yrULMRi3UwxQDf8idtfykJVzjE08jIP9fdU/6yvEfdlqCAWNwXFgSx1Nb7jrfPFYlY7gLaQ87EpcDpwaLdzQL/AJtZQZzaWdleHAIQnj3E+QqoAAAAQErIgIAAAAAAAAiUSBkNxR0Cz+AJkiRrMnIzDUjnifZAbE3VbamHqb7jNgcGQEDBIMAAAABFyCauIGVY+9bxYwyEp3poW+sSayOhwQuSrI4DnH80/zCuwAA')
  const [psbtResult, setPsbtResult] = useState<string | null>(null)
  const [psbtLoading, setPsbtLoading] = useState<boolean>(false)
  const [toAddr, setToAddr] = useState<string>('bc1pcdv3h6nuq705e3yk4pvdlqrcfchzvd9se9zwlhke3menvxlc58zshl0ryv')
  const [sats, setSats] = useState<string>('10000')
  const [txLoading, setTxLoading] = useState<boolean>(false)
  const [txRes, setTxRes] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      const entries = await Promise.all(
        wallets.map(async (w) => {
          const name = String(w.name)
          const ready = (await w.hasWalletReady?.()) ?? undefined
          let installed = (await (w as any).hasExtensionInstalled?.()) ?? undefined
          // Storybook iframe 环境下扩展可能未注入到子窗口，尝试使用顶层 window 进行软检测
          try {
            const topWin = typeof window !== 'undefined' ? window.top : undefined
            const topInstalled =
              name.toLowerCase().includes('unisat')
                ? Boolean((topWin as any)?.unisat)
                : name.toLowerCase().includes('okx')
                  ? Boolean((topWin as any)?.okxwallet?.bitcoin)
                  : name.toLowerCase().includes('phantom')
                    ? Boolean((topWin as any)?.phantom?.bitcoin)
                    : installed
            if (installed === undefined && topInstalled !== undefined) {
              installed = topInstalled
            }
          } catch {}
          return [name, { ready, installed }] as const
        }),
      )
      if (!cancelled) {
        setDetected((prev) => {
          const next = { ...prev }
          entries.forEach(([name, info]) => {
            next[name] = info
          })
          return next
        })
      }
    }
    if (wallets.length) {
      run()
    }
    return () => {
      cancelled = true
    }
  }, [wallets])

  return (
    <Card className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="text-lg font-semibold">Bitcoin 状态</div>
          <div className="text-xs text-muted-foreground">使用 BitcoinWeb3ConfigProvider</div>
        </div>
        <Badge>Bitcoin</Badge>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="text-sm font-medium">账户</div>
          <div className="rounded-md border p-3">
            <div className="text-sm">{ctx.account?.address ?? '未连接'}</div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-sm font-medium">余额</div>
          <div className="rounded-md border p-3">
            <div className="text-sm">
              {ctx.balance?.value !== undefined ? String(ctx.balance.value) : '未查询'}
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-2">
        <div className="text-sm font-medium">钱包检测</div>
        <div className="flex flex-wrap gap-2">
          {wallets.map((w) => {
            const name = String(w.name)
            const info = detected[name] || {}
            const readyText = info.ready === undefined ? '未检测' : info.ready ? '已就绪' : '未就绪'
            const installedText =
              info.installed === undefined ? '未知' : info.installed ? '扩展已安装' : '扩展未安装'
            return (
              <div key={name} className="flex items-center gap-2 rounded-md border px-3 py-2">
                <div className="text-sm">{name}</div>
                <div className="text-xs text-muted-foreground">{readyText}</div>
                <div className="text-xs text-muted-foreground">{installedText}</div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={async () => {
                    const ready = (await w.hasWalletReady?.()) ?? undefined
                    const installed = (await (w as any).hasExtensionInstalled?.()) ?? undefined
                    setDetected((prev) => ({ ...prev, [name]: { ready, installed } }))
                  }}
                >
                  检测
                </Button>
              </div>
            )
          })}
        </div>
      </div>

      <Separator />

      <div className="flex gap-2">
        {(ctx.availableWallets ?? []).map((w) => (
          <Button
            key={String(w.name)}
            variant="outline"
            onClick={async () => {
              const name = String((w as any).name)
              const info = detected[name] || {}
              if (info.ready === false) {
                setError('钱包未就绪或扩展未安装')
                return
              }
              setError(null)
              try {
                await ctx.connect?.(w)
                // 若上下文未及时更新账户，尝试直接触发适配器连接
                if (!account?.address && adapterConnect) {
                  await adapterConnect()
                }
              } catch (e: any) {
                setError(e?.message ?? String(e))
              }
            }}
          >
            {String(w.name)}
          </Button>
        ))}
        <Button variant="destructive" onClick={() => ctx.disconnect?.()} disabled={!ctx.account?.address}>
          断开连接
        </Button>
      </div>

      <Separator />

      <div className="space-y-2">
        <div className="text-sm font-medium">签名消息</div>
        <div className="flex items-center gap-2">
          <Input
            value={signMsg}
            onChange={(e) => setSignMsg(e.target.value)}
            placeholder="要签名的消息"
            className="w-64"
          />
          <Button
            variant="outline"
            onClick={async () => {
              if (!account || !signMessage) return
              setSignLoading(true)
              setError(null)
              try {
                const res = await signMessage(signMsg)
                setSignature(String(res ?? ''))
              } catch (e: any) {
                setError(e?.message ?? String(e))
              } finally {
                setSignLoading(false)
              }
            }}
            disabled={!account || signLoading}
          >
            {signLoading ? '签名中…' : '签名'}
          </Button>
          {signature && <div className="text-xs text-muted-foreground truncate max-w-[260px]">{signature}</div>}
        </div>
      </div>

      <Separator />

      <div className="space-y-2">
        <div className="text-sm font-medium">签名 PSBT</div>
        <div className="flex items-center gap-2">
          <Input
            value={psbt}
            onChange={(e) => setPsbt(e.target.value)}
            placeholder="PSBT Base64"
            className="w-[520px]"
          />
          <Button
            variant="outline"
            onClick={async () => {
              if (!account || !signPsbt || !psbt) return
              setPsbtLoading(true)
              setError(null)
              try {
                const res = await signPsbt({ psbt })
                setPsbtResult(typeof res === 'string' ? res : JSON.stringify(res))
              } catch (e: any) {
                setError(e?.message ?? String(e))
              } finally {
                setPsbtLoading(false)
              }
            }}
            disabled={!account || psbtLoading}
          >
            {psbtLoading ? '签名中…' : '签名 PSBT'}
          </Button>
          {psbtResult && (
            <div className="text-xs text-muted-foreground truncate max-w-[260px]">{psbtResult}</div>
          )}
        </div>
      </div>

      <Separator />

      <div className="space-y-2">
        <div className="text-sm font-medium">发送转账（sats）</div>
        <div className="flex items-center gap-2">
          <Input
            value={toAddr}
            onChange={(e) => setToAddr(e.target.value)}
            placeholder="接收地址（bc1...）"
            className="w-[520px]"
          />
          <Input
            value={sats}
            onChange={(e) => setSats(e.target.value)}
            placeholder="Sats 数量"
            className="w-32"
          />
          <Button
            variant="outline"
            onClick={async () => {
              if (!account || !sendTransfer) return
              setTxLoading(true)
              setError(null)
              try {
                const n = Math.max(0, Number(sats) || 0)
                const res = await sendTransfer({ to: toAddr, sats: n })
                setTxRes(typeof res === 'string' ? res : JSON.stringify(res))
              } catch (e: any) {
                if (e instanceof NotImplementedError) {
                  setError('当前钱包未实现转账功能')
                } else {
                  setError(e?.message ?? String(e))
                }
              } finally {
                setTxLoading(false)
              }
            }}
            disabled={!account || txLoading}
          >
            {txLoading ? '发送中…' : '发送转账'}
          </Button>
          {txRes && <div className="text-xs text-muted-foreground truncate max-w-[260px]">{txRes}</div>}
        </div>
        {error && <div className="text-xs text-red-500">{error}</div>}
      </div>
    </Card>
  )
}

export const Basic = {
  render: () => {
    return (
      <BitcoinWeb3ConfigProvider
        wallets={[UnisatWallet(), XverseWallet(), OkxWallet(), PhantomWallet()]}
        balance
        autoConnect
      >
        <Panel />
      </BitcoinWeb3ConfigProvider>
    )
  },
}
