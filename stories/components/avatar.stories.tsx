import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/avatar'

export default {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: { 
    nextjs: { appDirectory: true },
    docs: { description: { component: '头像组件用于用户身份展示，支持图片与占位 Fallback。' } },
  },
}

export const Image = {
  render: () => (
    <Avatar>
      <AvatarImage
        alt="用户头像"
        src="https://avatars.githubusercontent.com/u/9919?s=80"
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
}

export const Fallback = {
  render: () => (
    <Avatar>
      <AvatarFallback>NA</AvatarFallback>
    </Avatar>
  ),
}
