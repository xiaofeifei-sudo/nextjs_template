import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/avatar'

export default {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: { nextjs: { appDirectory: true } },
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

