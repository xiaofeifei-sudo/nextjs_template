import { SpotifyModal } from '../../components/spotify-modal'
import { Card } from '../../components/ui/card'
import { Separator } from '../../components/ui/separator'
import { Badge } from '../../components/ui/badge'

export default {
  title: 'Components/SpotifyModal',
  component: SpotifyModal,
  parameters: {
    nextjs: { appDirectory: true },
    docs: {
      description: {
        component:
          '悬浮音乐按钮，点击后打开包含 Spotify 播放器的模态框。支持播放列表、歌曲与专辑。',
      },
    },
  },
  tags: ['autodocs'],
}

export const Playlist = {
  render: (args: React.ComponentProps<typeof SpotifyModal>) => (
    <div className="min-h-[160vh] p-6 space-y-6">
      <Card className="p-6 space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline">浮动按钮</Badge>
          <span className="text-sm text-muted-foreground">
            点击左下角按钮打开 Spotify 播放器
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          你可以在参数中切换播放列表、歌曲或专辑。为便于观察，此处提供一定滚动高度。
        </p>
      </Card>
      <Separator />
      <div className="space-y-4">
        {Array.from({ length: 16 }).map((_, i) => (
          <p key={i} className="text-sm text-muted-foreground">
            占位内容段落 #{i + 1}。用于模拟页面内容。
          </p>
        ))}
      </div>
      <SpotifyModal {...args} />
    </div>
  ),
  args: {
    playlistId: '37i9dQZF1DXcBWIGoYBM5M',
    theme: 'dark',
    height: 380,
    position: 'bottom-left',
  } as React.ComponentProps<typeof SpotifyModal>,
}

export const Track = {
  ...Playlist,
  args: {
    trackId: '11dFghVXANMlKmJXsNCbNl',
    theme: 'light',
    height: 360,
    position: 'bottom-right',
  } as React.ComponentProps<typeof SpotifyModal>,
}

