import React from 'react'
import { Card } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Separator } from '../../components/ui/separator'
import * as Chains from 'pelican-web3-lib-assets'
import * as Wallets from 'pelican-web3-lib-assets'
import * as Icons from 'pelican-web3-lib-icons'

export default {
  title: 'Web3/Assets',
  parameters: { nextjs: { appDirectory: true }, hooksContainer: true },
}

export const Overview = {
  render: () => {
    const chainList = [
      Chains.Mainnet,
      Chains.Sepolia,
      Chains.Polygon,
      Chains.BSC,
      Chains.Arbitrum,
      Chains.Optimism,
      Chains.Solana,
      Chains.SolanaDevnet,
      Chains.suiMainnet,
    ].filter(Boolean)

    const walletList = [
      Wallets.metadata_MetaMask,
      Wallets.metadata_CoinbaseWallet,
      Wallets.metadata_RainbowWallet,
      Wallets.metadata_Phantom,
      Wallets.metadata_OkxWallet,
      Wallets.metadata_Trust,
    ].filter(Boolean)

    const sampleIcons = [
      Icons.EthereumColorful,
      Icons.BitcoinColorful,
      Icons.SolanaColorful,
      Icons.BnbColorful,
      Icons.PolygonColorful,
    ].filter(Boolean)

    return (
      <Card className="space-y-6 p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-lg font-semibold">Assets 概览</div>
            <div className="text-xs text-muted-foreground">链、钱包与图标示例</div>
          </div>
          <Badge>Assets</Badge>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-medium">常见链</div>
          <div className="grid grid-cols-3 gap-3">
            {chainList.map((c) => (
              <div key={String(c.id)} className="rounded-md border p-3">
                <div className="text-sm">{c.name}</div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <div className="text-sm font-medium">常见钱包</div>
          <div className="grid grid-cols-3 gap-3">
            {walletList.map((w) => (
              <div key={String(w.name)} className="rounded-md border p-3">
                <div className="text-sm">{String(w.name)}</div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <div className="text-sm font-medium">图标示例</div>
          <div className="flex flex-wrap gap-3">
            {sampleIcons.map((Icon: any, i) => (
              <div key={i} className="rounded-md border p-3">
                <Icon width={24} height={24} />
              </div>
            ))}
          </div>
        </div>
      </Card>
    )
  },
}
