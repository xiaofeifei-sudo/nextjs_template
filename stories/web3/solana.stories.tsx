import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Button } from '../../components/ui/button'
import { Card } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Separator } from '../../components/ui/separator'
import { Input } from '../../components/ui/input'
import {
  SolanaWeb3ConfigProvider,
  useWallet,
  useConnection,
  PhantomWallet,
  BackpackWallet,
  SolflareWallet,
  WalletConnectWallet,
  solana,
  solanaDevnet,
} from 'pelican-web3-lib-solana'
import { ConfigContext } from 'pelican-web3-lib-common'
import { PublicKey, SystemProgram, Transaction } from '@solana/web3.js'
import { Buffer } from 'buffer'

export default {
  title: 'Web3/Solana',
  parameters: { nextjs: { appDirectory: true }, hooksContainer: true },
}

function Panel() {
  const ctx = useContext(ConfigContext)
  const { connected, signMessage, sendTransaction, publicKey } = useWallet()
  const { connection } = useConnection()
  const [detected, setDetected] = useState<Record<string, { ready?: boolean; installed?: boolean }>>({})
  const [msg, setMsg] = useState<string>('Hello Solana!')
  const [sig, setSig] = useState<string | null>(null)
  const [toAddr, setToAddr] = useState<string>('')
  const [amount, setAmount] = useState<string>('0.001')
  const [txSig, setTxSig] = useState<string | null>(null)
  const [txLoading, setTxLoading] = useState<boolean>(false)

  const wallets = useMemo(() => ctx.availableWallets ?? [], [ctx.availableWallets])

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
          <div className="text-lg font-semibold">Solana 状态</div>
          <div className="text-xs text-muted-foreground">使用 SolanaWeb3ConfigProvider</div>
        </div>
        <Badge>Solana</Badge>
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
          <div className="text-sm font-medium">当前链</div>
          <div className="rounded-md border p-3">
            <div className="text-sm">{ctx.chain?.name ?? '未选择'}</div>
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
      <div className="flex flex-wrap gap-2">
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
          <Input value={msg} onChange={(e) => setMsg(e.target.value)} className="w-64" />
          <Button
            variant="outline"
            onClick={async () => {
              if (!connected || !signMessage) return
              const encoded = new TextEncoder().encode(msg)
              const res = await signMessage(encoded)
              setSig(Buffer.from(res ?? []).toString('base64'))
            }}
            disabled={!connected}
          >
            签名
          </Button>
          {sig && <div className="text-xs text-muted-foreground truncate max-w-[260px]">{sig}</div>}
        </div>
      </div>

      <Separator />
      <div className="space-y-2">
        <div className="text-sm font-medium">发送 SOL 交易</div>
        <div className="flex items-center gap-2">
          <Input value={toAddr} onChange={(e) => setToAddr(e.target.value)} placeholder="接收地址" className="w-64" />
          <Input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="金额（SOL）" className="w-32" />
          <Button
            variant="outline"
            onClick={async () => {
              if (!connected || !publicKey || !sendTransaction || !connection) return
              setTxLoading(true)
              try {
                const tx = new Transaction().add(
                  SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: new PublicKey(toAddr),
                    lamports: Math.floor(Number(amount) * 1_000_000_000),
                  }),
                )
                const signature = await sendTransaction(tx, connection)
                setTxSig(signature)
              } finally {
                setTxLoading(false)
              }
            }}
            disabled={!connected || txLoading}
          >
            {txLoading ? '发送中…' : '发送交易'}
          </Button>
          {txSig && <div className="text-xs text-muted-foreground truncate max-w-[260px]">{txSig}</div>}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {(ctx.availableChains ?? []).map((c) => (
          <Button
            key={String(c.id)}
            variant={ctx.chain?.id === c.id ? 'default' : 'outline'}
            onClick={() => ctx.switchChain?.(c)}
          >
            {c.name}
          </Button>
        ))}
      </div>
    </Card>
  )
}

export const Basic = {
  render: () => {
    const wcProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
    return (
      <SolanaWeb3ConfigProvider
        wallets={
          wcProjectId
            ? [PhantomWallet(), BackpackWallet(), SolflareWallet(), WalletConnectWallet()]
            : [PhantomWallet(), BackpackWallet(), SolflareWallet()]
        }
        chains={[solana, solanaDevnet]}
        balance
        autoAddRegisteredWallets
        walletConnect={wcProjectId ? { projectId: wcProjectId } : undefined}
      >
        <Panel />
      </SolanaWeb3ConfigProvider>
    )
  },
}
