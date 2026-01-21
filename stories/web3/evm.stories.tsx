import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Button } from '../../components/ui/button'
import { Card } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Separator } from '../../components/ui/separator'
import { Input } from '../../components/ui/input'
import {
  WagmiWeb3ConfigProvider,
  MetaMask,
  CoinbaseWallet,
  RainbowWallet,
  WalletConnect,
  Mainnet,
  Sepolia,
} from 'pelican-web3-lib-evm'
import { ConfigContext } from 'pelican-web3-lib-common'
import { createSiweMessage, type CreateSiweMessageParameters } from 'viem/siwe'
import { http, useSendTransaction, useSignMessage } from 'wagmi'
import { isAddress, parseEther } from 'viem'

export default {
  title: 'Web3/EVM/Wagmi',
  parameters: { nextjs: { appDirectory: true }, hooksContainer: true },
}

function Panel({ wcEnabled }: { wcEnabled?: boolean }) {
  const ctx = useContext(ConfigContext)
  const [connecting, setConnecting] = useState<string | null>(null)
  const [switching, setSwitching] = useState<number | null>(null)
  const [signing, setSigning] = useState<boolean>(false)
  const [nftLoading, setNftLoading] = useState<boolean>(false)
  const [nftMeta, setNftMeta] = useState<any>(null)
  const [wcQr, setWcQr] = useState<string | null>(null)
  const [wcFetching, setWcFetching] = useState<boolean>(false)
  const [detected, setDetected] = useState<Record<string, { ready?: boolean; installed?: boolean; wcSupport?: boolean }>>({})
  const [connectError, setConnectError] = useState<string | null>(null)
  const [signMsg, setSignMsg] = useState<string>('Hello Wallet')
  const [signRes, setSignRes] = useState<string | null>(null)
  const [txTo, setTxTo] = useState<string>('')
  const [txAmount, setTxAmount] = useState<string>('0.0001')
  const [txHash, setTxHash] = useState<string | null>(null)
  const [txLoading, setTxLoading] = useState<boolean>(false)

  const wallets = useMemo(() => ctx.availableWallets ?? [], [ctx.availableWallets])
  const chains = useMemo(() => ctx.availableChains ?? [], [ctx.availableChains])
  const wcWallet = useMemo(() => wallets.find((w) => String(w.name) === 'WalletConnect'), [wallets])
  const eipWallets = useMemo(
    () => wallets.filter((w) => Array.isArray((w as any).connectors) && (w as any).connectors.includes('EIP6963')),
    [wallets],
  )
  const { signMessageAsync } = useSignMessage()
  const { sendTransactionAsync } = useSendTransaction()

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      const entries = await Promise.all(
        wallets.map(async (w) => {
          const name = String(w.name)
          const ready = (await w.hasWalletReady?.()) ?? undefined
          const installed = (await (w as any).hasExtensionInstalled?.()) ?? undefined
          const wcSupport =
            Array.isArray((w as any).connectors) && (w as any).connectors.includes('WalletConnect')
              ? true
              : !!w.getQrCode
          return [name, { ready, installed, wcSupport }] as const
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
          <div className="text-lg font-semibold">EVM 示例</div>
          <div className="text-xs text-muted-foreground">使用 WagmiWeb3ConfigProvider</div>
        </div>
        <Badge>EVM</Badge>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="text-sm font-medium">账户</div>
          <div className="rounded-md border p-3">
            <div className="flex items-center gap-2">
              {ctx.account?.avatar && <img alt="ens" src={ctx.account.avatar as any} className="h-6 w-6 rounded-full" />}
              <div className="text-sm">
                {ctx.account?.name ? `${ctx.account.name} (${ctx.account.address})` : ctx.account?.address ?? '未连接'}
              </div>
            </div>
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
        <div className="text-sm font-medium">EIP-6963 注入钱包</div>
        <div className="flex flex-wrap gap-2">
          {eipWallets.map((w) => {
            const name = String(w.name)
            const info = detected[name] || {}
            return (
              <div key={name} className="flex items-center gap-2 rounded-md border px-3 py-2">
                {Boolean((w as any).icon) && (
                  <img alt="icon" src={(w as any).icon} className="h-5 w-5 rounded-sm" />
                )}
                <div className="text-sm">{name}</div>
                <div className="text-xs text-muted-foreground">
                  {(w as any).remark || (w as any).key || ''}
                </div>
                <div className="text-xs">{info.ready ? '已就绪' : '未就绪'}</div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => ctx.connect?.(w)}
                  disabled={connecting === name}
                >
                  连接
                </Button>
              </div>
            )
          })}
        </div>
      </div>
      <Separator />

      <div className="space-y-2">
        <div className="text-sm font-medium">WalletConnect 示例</div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={async () => {
              if (!wcWallet) return
              setConnecting('WalletConnect')
              setConnectError(null)
              try {
                if (!wcEnabled) {
                  throw new Error('未配置 WalletConnect projectId')
                }
                await ctx.connect?.(wcWallet as any, { connectType: 'qrCode' } as any)
              } catch (e: any) {
                setConnectError(e?.message ?? String(e))
              } finally {
                setConnecting(null)
              }
            }}
            disabled={!wcWallet || connecting === 'WalletConnect' || !wcEnabled}
          >
            {connecting === 'WalletConnect' ? '打开官方弹窗…' : '官方弹窗连接'}
          </Button>
          <Button
            variant="outline"
            onClick={async () => {
              if (!wcEnabled || !wcWallet?.getQrCode) return
              setWcFetching(true)
              try {
                const connectPromise = ctx.connect?.(wcWallet as any, { connectType: 'qrCode' } as any)
                const res = await wcWallet.getQrCode()
                if (res?.uri) {
                  setWcQr(res.uri)
                }
                // 捕获连接异常但不阻断二维码展示
                connectPromise?.catch(() => {})
              } finally {
                setWcFetching(false)
              }
            }}
            disabled={!wcEnabled || !wcWallet?.getQrCode || wcFetching}
          >
            {wcFetching ? '获取二维码…' : '手动获取二维码'}
          </Button>
          {wcQr && (
            <div className="flex items-center gap-3">
              <img
                alt="wc-qr"
                className="h-40 w-40 rounded border"
                src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(wcQr)}`}
              />
              <div className="text-xs text-muted-foreground break-all max-w-[260px]">{wcQr}</div>
            </div>
          )}
          {!wcEnabled && (
            <div className="text-xs text-muted-foreground">
              请设置环境变量 NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID 以启用 WalletConnect
            </div>
          )}
          {connectError && (
            <div className="text-xs text-red-500">{connectError}</div>
          )}
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
            const wcSupportText =
              info.wcSupport === undefined ? '未知' : info.wcSupport ? '支持 WalletConnect' : '不支持 WalletConnect'
            return (
              <div key={name} className="flex items-center gap-2 rounded-md border px-3 py-2">
                <div className="text-sm">{name}</div>
                <div className="text-xs text-muted-foreground">{readyText}</div>
                <div className="text-xs text-muted-foreground">{installedText}</div>
                <div className="text-xs text-muted-foreground">{wcSupportText}</div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={async () => {
                    const ready = (await w.hasWalletReady?.()) ?? undefined
                    const installed = (await (w as any).hasExtensionInstalled?.()) ?? undefined
                    const wcSupport =
                      Array.isArray((w as any).connectors) && (w as any).connectors.includes('WalletConnect')
                        ? true
                        : !!w.getQrCode
                    setDetected((prev) => ({ ...prev, [name]: { ready, installed, wcSupport } }))
                  }}
                >
                  检测
                </Button>
                {Boolean(detected[name]?.wcSupport) && (
                  <Button
                    size="sm"
                    variant="default"
                    onClick={async () => {
                      if (!wcEnabled) return
                      const target: any = (w as any).getQrCode ? w : wcWallet
                      if (!target?.getQrCode) return
                      setWcFetching(true)
                      try {
                        const connectPromise = ctx.connect?.(target as any, { connectType: 'qrCode' } as any)
                        const res = await (target as any).getQrCode()
                        if (res?.uri) {
                          setWcQr(res.uri)
                        }
                        connectPromise?.catch(() => {})
                      } finally {
                        setWcFetching(false)
                      }
                    }}
                    disabled={!wcEnabled || wcFetching || !(w as any).getQrCode && !wcWallet?.getQrCode}
                  >
                    扫码连接
                  </Button>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <Separator />
      <div className="space-y-2">
        <div className="text-sm font-medium">自定义钱包信息</div>
        <div className="flex flex-wrap gap-2">
          {wallets.map((w) => (
            <div key={String(w.name)} className="flex items-center gap-2 rounded-md border px-3 py-2">
              {Boolean((w as any).icon) && <img alt="icon" src={(w as any).icon} className="h-5 w-5 rounded-sm" />}
              <div className="text-sm">{String(w.name)}</div>
              {(w as any).remark && <div className="text-xs text-muted-foreground">{(w as any).remark}</div>}
              {(w as any).key && <div className="text-xs text-muted-foreground">{(w as any).key}</div>}
            </div>
          ))}
        </div>
      </div>
      <Separator />

      <div className="space-y-2">
        <div className="text-sm font-medium">连接钱包</div>
        <div className="flex flex-wrap gap-2">
          {wallets.map((w) => (
            <Button
              key={String(w.name)}
              variant="outline"
              onClick={async () => {
                setConnecting(String(w.name))
                try {
                  await ctx.connect?.(w)
                } finally {
                  setConnecting(null)
                }
              }}
              disabled={connecting === String(w.name) || (String(w.name) === 'WalletConnect' && !wcEnabled)}
            >
              {connecting === String(w.name) ? '连接中…' : String(w.name)}
            </Button>
          ))}
          <Button
            variant="destructive"
            onClick={() => ctx.disconnect?.()}
            disabled={!ctx.account?.address}
          >
            断开连接
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-sm font-medium">切换链</div>
        <div className="flex flex-wrap gap-2">
          {chains.map((c) => (
            <Button
              key={String(c.id)}
              variant={ctx.chain?.id === c.id ? 'default' : 'outline'}
              onClick={async () => {
                setSwitching(Number(c.id))
                try {
                  await ctx.switchChain?.(c)
                } finally {
                  setSwitching(null)
                }
              }}
              disabled={switching === Number(c.id)}
            >
              {switching === Number(c.id) ? '切换中…' : c.name}
            </Button>
          ))}
        </div>
      </div>
      <Separator />
      <div className="space-y-2">
        <div className="text-sm font-medium">签名登录</div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={async () => {
              if (!ctx.account?.address) return
              setSigning(true)
              try {
                await ctx.sign?.signIn?.(ctx.account.address)
              } finally {
                setSigning(false)
              }
            }}
            disabled={!ctx.account?.address || signing || !ctx.sign?.signIn}
          >
            {signing ? '签名中…' : '签名登录'}
          </Button>
        </div>
      </div>
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
              if (!signMessageAsync || !signMsg) return
              const sig = await signMessageAsync({ message: signMsg })
              setSignRes(sig)
            }}
            disabled={!ctx.account?.address || !signMessageAsync}
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
            placeholder="接收地址"
            className="w-64"
          />
          <Input
            value={txAmount}
            onChange={(e) => setTxAmount(e.target.value)}
            placeholder="金额（ETH）"
            className="w-40"
          />
          <Button
            variant="outline"
            onClick={async () => {
              if (!sendTransactionAsync || !isAddress(txTo)) return
              setTxLoading(true)
              try {
                const hash = await sendTransactionAsync({
                  to: txTo as `0x${string}`,
                  value: parseEther(txAmount || '0'),
                } as any)
                setTxHash(String((hash as any).hash ?? hash))
              } finally {
                setTxLoading(false)
              }
            }}
            disabled={!ctx.account?.address || !isAddress(txTo) || !txAmount || txLoading}
          >
            {txLoading ? '发送中…' : '发送交易'}
          </Button>
          {txHash && <div className="text-xs text-muted-foreground truncate max-w-[260px]">{txHash}</div>}
        </div>
        <div className="text-xs text-muted-foreground">
          建议在测试网进行交易
        </div>
      </div>

      <Separator />
      <div className="space-y-2">
        <div className="text-sm font-medium">NFT 元数据</div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={async () => {
              setNftLoading(true)
              try {
                const res = await ctx.getNFTMetadata?.({
                  address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
                  tokenId: BigInt(1),
                } as any)
                setNftMeta(res ?? null)
              } finally {
                setNftLoading(false)
              }
            }}
            disabled={nftLoading || !ctx.account?.address}
          >
            {nftLoading ? '查询中…' : '获取 BAYC #1 元数据'}
          </Button>
          {nftMeta && (
            <div className="text-xs text-muted-foreground truncate max-w-[260px]">
              {typeof nftMeta === 'object' ? JSON.stringify(nftMeta) : String(nftMeta)}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

export const Basic = {
  render: () => {
    const wcProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
    return (
      <WagmiWeb3ConfigProvider
        wallets={[MetaMask(), CoinbaseWallet(), RainbowWallet(), WalletConnect()]}
        chains={[Mainnet, Sepolia]}
        transports={{
          [Mainnet.id]: http(),
          [Sepolia.id]: http(),
        }}
        balance
        eip6963={{ autoAddInjectedWallets: true } as any}
        walletConnect={
          wcProjectId
            ? {
                projectId: wcProjectId,
                useWalletConnectOfficialModal: true,
                metadata: {
                  name: 'NextJS Template',
                  description: 'Storybook WalletConnect demo',
                  url: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:6006',
                  icons: ['https://raw.githubusercontent.com/walletconnect/walletconnect-assets/master/Icon/WalletConnectIcon.svg'],
                },
                qrModalOptions: {
                  themeMode: 'dark',
                },
              }
            : false
        }
        siwe={{
          getNonce: async (address: string) => address,
          createMessage: (args: CreateSiweMessageParameters) => createSiweMessage(args),
          verifyMessage: async () => true,
        }}
      >
        <Panel wcEnabled={Boolean(wcProjectId)} />
      </WagmiWeb3ConfigProvider>
    )
  },
}
