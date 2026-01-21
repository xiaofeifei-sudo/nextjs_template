import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Button } from '../../components/ui/button'
import { Card } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Separator } from '../../components/ui/separator'
import { Input } from '../../components/ui/input'
import { TronWeb3ConfigProvider, TronlinkWallet, BybitWallet, OkxTronWallet, useWallet } from 'pelican-web3-lib-tron'
import { ConfigContext } from 'pelican-web3-lib-common'
import { parseUnits } from 'viem'

export default {
  title: 'Web3/Tron',
  parameters: { nextjs: { appDirectory: true }, hooksContainer: true },
}

function Panel() {
  const ctx = useContext(ConfigContext)
  const { connected, address, signMessage, signTransaction } = useWallet()
  const [detected, setDetected] = useState<Record<string, { ready?: boolean; installed?: boolean }>>({})
  const [balance, setBalance] = useState<string | null>(null)
  const [txTo, setTxTo] = useState<string>('')
  const [txAmount, setTxAmount] = useState<string>('1')
  const [txHash, setTxHash] = useState<string | null>(null)
  const [txLoading, setTxLoading] = useState<boolean>(false)
  const [signMsg, setSignMsg] = useState<string>('sign transfer message')
  const [signRes, setSignRes] = useState<string | null>(null)
  const [contractAddress, setContractAddress] = useState<string>('TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj')
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

  useEffect(() => {
    const tw = (globalThis as any).tronWeb
    const addr = ctx.account?.address
    const fetchBalance = async () => {
      if (!tw || !addr) {
        setBalance(null)
        return
      }
      const sun = await tw.trx.getBalance(addr)
      const trx = Number(sun) / 1_000_000
      setBalance(String(trx))
    }
    fetchBalance().catch(() => setBalance(null))
  }, [ctx.account?.address])

  return (
    <Card className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="text-lg font-semibold">Tron 状态</div>
          <div className="text-xs text-muted-foreground">使用 TronWeb3ConfigProvider</div>
        </div>
        <Badge>Tron</Badge>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="text-sm font-medium">账户</div>
          <div className="rounded-md border p-3">
            <div className="text-sm">{ctx.account?.address ?? '未连接'}</div>
            {balance !== null && (
              <div className="text-xs text-muted-foreground">余额：{balance} TRX</div>
            )}
          </div>
        </div>
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
              if (!connected || !signMessage) return
              const signature = await signMessage(signMsg)
              setSignRes(signature)
            }}
            disabled={!connected}
          >
            签名
          </Button>
          {signRes && <div className="text-xs text-muted-foreground truncate max-w-[260px]">{signRes}</div>}
        </div>
      </div>
      <Separator />
      <div className="space-y-2">
        <div className="text-sm font-medium">发送交易</div>
        <div className="flex items-center gap-2">
          <Input
            value={txTo}
            onChange={(e) => setTxTo(e.target.value)}
            placeholder="接收地址（T 开头）"
            className="w-64"
          />
          <Input
            value={txAmount}
            onChange={(e) => setTxAmount(e.target.value)}
            placeholder="金额（TRX）"
            className="w-40"
          />
          <Button
            variant="outline"
            onClick={async () => {
              const tw = (globalThis as any).tronWeb
              const from = ctx.account?.address
              if (!tw || !from || !txTo || !txAmount) return
              setTxLoading(true)
              try {
                const sun = Math.floor(Number(txAmount) * 1_000_000)
                const tx = await tw.transactionBuilder.sendTrx(txTo, sun, from)
                const signed = await tw.trx.sign(tx)
                const res = await tw.trx.sendRawTransaction(signed)
                const id = String(res?.txid ?? signed?.txID ?? tx?.txID ?? '')
                setTxHash(id || null)
              } finally {
                setTxLoading(false)
              }
            }}
            disabled={!ctx.account?.address || txLoading}
          >
            {txLoading ? '发送中…' : '发送交易'}
          </Button>
          {txHash && <div className="text-xs text-muted-foreground truncate max-w-[260px]">{txHash}</div>}
        </div>
        <div className="text-xs text-muted-foreground">建议使用小额进行测试</div>
      </div>
      <Separator />
      <div className="space-y-2">
        <div className="text-sm font-medium">TRC20 转账（智能合约）</div>
        <div className="flex items-center gap-2">
          <Input
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            placeholder="合约地址（如 USDT）"
            className="w-64"
          />
          <Input
            value={txTo}
            onChange={(e) => setTxTo(e.target.value)}
            placeholder="接收地址（T 开头）"
            className="w-64"
          />
          <Input
            value={txAmount}
            onChange={(e) => setTxAmount(e.target.value)}
            placeholder="金额（单位与合约一致）"
            className="w-40"
          />
          <Button
            variant="outline"
            onClick={async () => {
              const tron = (globalThis as any).tron
              const tronWeb = tron?.tronWeb
              if (!tronWeb || !connected || !signTransaction || !contractAddress || !txTo) return
              setTxLoading(true)
              try {
                const functionSelector = 'transfer(address,uint256)'
                const parameter = [
                  { type: 'address', value: txTo },
                  { type: 'uint256', value: parseUnits(txAmount || '0', 6) },
                ]
                const tx = await tronWeb.transactionBuilder.triggerSmartContract(
                  contractAddress,
                  functionSelector,
                  {},
                  parameter,
                )
                const signed = await signTransaction(tx.transaction)
                const res = await tronWeb.trx.sendRawTransaction(signed)
                setTxHash(String(res?.txid ?? ''))
              } finally {
                setTxLoading(false)
              }
            }}
            disabled={!connected || txLoading}
          >
            {txLoading ? '签名中…' : 'TRC20 转账'}
          </Button>
          {txHash && <div className="text-xs text-muted-foreground truncate max-w-[260px]">{txHash}</div>}
        </div>
      </div>
    </Card>
  )
}

export const Basic = {
  render: () => {
    return (
      <TronWeb3ConfigProvider wallets={[TronlinkWallet, BybitWallet, OkxTronWallet]} autoConnect>
        <Panel />
      </TronWeb3ConfigProvider>
    )
  },
}
