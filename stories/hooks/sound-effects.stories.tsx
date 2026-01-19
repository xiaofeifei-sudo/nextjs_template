import { useState } from 'react'
import { useSoundEffects } from '../../hooks/use-sound'
import { Button } from '../../components/ui/button'
import { Switch } from '../../components/ui/switch'
import { Label } from '../../components/ui/label'

export default {
  title: 'Hooks/useSoundEffects',
  parameters: { nextjs: { appDirectory: true }, hooksContainer: true },
}

export const Basic = {
  render: () => {
    const { playHover, playClick, playSuccess, enabled, setEnabled } = useSoundEffects(0.3)
    const [hovering, setHovering] = useState(false)
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Switch id="sound" checked={enabled} onCheckedChange={setEnabled} />
          <Label htmlFor="sound">启用声音</Label>
        </div>
        <div
          onMouseEnter={() => { setHovering(true); playHover(); }}
          onMouseLeave={() => setHovering(false)}
          className={`rounded-md border p-6 text-sm ${hovering ? 'bg-primary text-primary-foreground' : 'bg-background'}`}
        >
          悬停播放 Hover 音效
        </div>
        <div className="flex gap-2">
          <Button onClick={playClick}>播放 Click</Button>
          <Button variant="outline" onClick={playSuccess}>播放 Success</Button>
        </div>
      </div>
    )
  },
}

