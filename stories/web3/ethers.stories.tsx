import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Button } from '../../components/ui/button'
import { Card } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Separator } from '../../components/ui/separator'
import { Input } from '../../components/ui/input'
import { EthersWeb3ConfigProvider, MetaMask } from 'pelican-web3-lib-ethers'
import { ConfigContext } from 'pelican-web3-lib-common'
import { useEthersSigner } from 'pelican-web3-lib-ethers'
import { isAddress, parseEther } from 'viem'

export default {
  title: 'Web3/EVM/Ethers',
  parameters: { nextjs: { appDirectory: true }, hooksContainer: true },
}

function Panel() {
  const ctx = useContext(ConfigContext)
  const signer = useEthersSigner()
  const wallets = useMemo(() => ctx.availableWallets ?? [], [ctx.availableWallets])
  const [detected, setDetected] = useState<Record<string, { ready?: boolean; installed?: boolean }>>({})
  const [signMsg, setSignMsg] = useState<string>('Hello Ethers!')
  const [signature, setSignature] = useState<string | null>(null)
  const [signLoading, setSignLoading] = useState<boolean>(false)
  const [toAddr, setToAddr] = useState<string>('')
  const [amount, setAmount] = useState<string>('0.001')
  const [txHash, setTxHash] = useState<string | null>(null)
  const [txLoading, setTxLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      const entries = await Promise.all(
        wallets.map(async (w) => {
          const name = String(w.name)
          const ready = (await w.hasWalletReady?.()) ?? undefined
          const installed = (await (w as any).hasExtensionInstalled?.()) ?? undefined
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
          <div className="text-lg font-semibold">Ethers 状态</div>
          <div className="text-xs text-muted-foreground">使用 EthersWeb3ConfigProvider</div>
        </div>
        <Badge>Ethers</Badge>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="text-sm font-medium">账户</div>
          <div className="rounded-md border p-3">
            <div className="text-sm">{ctx.account?.address ?? '未连接'}</div>
            {ctx.balance?.value !== undefined && (
              <div className="text-xs text-muted-foreground">
                余额：{String(ctx.balance.value)} {ctx.balance.symbol}
              </div>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-sm font-medium">Signer</div>
          <div className="rounded-md border p-3">
            <div className="text-sm">{signer ? '已就绪' : '未就绪'}</div>
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
          <Button key={String(w.name)} variant="outline" onClick={() => ctx.connect?.(w)}>
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
              if (!signer || !ctx.account?.address) return
              setSignLoading(true)
              setError(null)
              try {
                const sig = await signer.signMessage(signMsg)
                setSignature(sig)
              } catch (e: any) {
                setError(e?.message ?? String(e))
              } finally {
                setSignLoading(false)
              }
            }}
            disabled={!signer || signLoading}
          >
            {signLoading ? '签名中…' : '签名'}
          </Button>
          {signature && <div className="text-xs text-muted-foreground truncate max-w-[260px]">{signature}</div>}
        </div>
      </div>

      <Separator />

      <div className="space-y-2">
        <div className="text-sm font-medium">发送交易</div>
        <div className="flex items-center gap-2">
          <Input
            value={toAddr}
            onChange={(e) => setToAddr(e.target.value)}
            placeholder="接收地址（0x…）"
            className="w-64"
          />
          <Input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="金额（ETH）"
            className="w-32"
          />
          <Button
            variant="outline"
            onClick={async () => {
              if (!signer || !ctx.account?.address) return
              setTxLoading(true)
              setError(null)
              try {
                if (!isAddress(toAddr)) {
                  throw new Error('无效地址')
                }
                const tx = await signer.sendTransaction({
                  to: toAddr,
                  value: parseEther(amount),
                } as any)
                setTxHash(tx?.hash ?? null)
              } catch (e: any) {
                setError(e?.message ?? String(e))
              } finally {
                setTxLoading(false)
              }
            }}
            disabled={!signer || txLoading}
          >
            {txLoading ? '发送中…' : '发送交易'}
          </Button>
          {txHash && <div className="text-xs text-muted-foreground truncate max-w-[260px]">{txHash}</div>}
        </div>
        {error && <div className="text-xs text-red-500">{error}</div>}
      </div>
    </Card>
  )
}

export const Basic = {
  render: () => {
    return (
      <EthersWeb3ConfigProvider wallets={[MetaMask()]} balance>
        <Panel />
      </EthersWeb3ConfigProvider>
    )
  },
}
