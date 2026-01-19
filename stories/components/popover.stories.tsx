import { Button } from '../../components/ui/button'
import { Popover, PopoverTrigger, PopoverContent } from '../../components/ui/popover'

export default {
  title: 'Components/Popover',
  component: PopoverContent,
  parameters: { 
    nextjs: { appDirectory: true },
    docs: { description: { component: '气泡卡片承载轻量内容或操作，与触发元素相对定位展示。' } },
  },
  tags: ['autodocs'],
}

export const Default = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>Popover content</PopoverContent>
    </Popover>
  ),
}
