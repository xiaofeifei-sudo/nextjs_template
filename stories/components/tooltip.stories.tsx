import { Button } from '../../components/ui/button'
import { Tooltip, TooltipTrigger, TooltipContent } from '../../components/ui/tooltip'

export default {
  title: 'Components/Tooltip',
  component: TooltipContent,
  parameters: { 
    nextjs: { appDirectory: true },
    docs: { description: { component: '工具提示用于轻量说明，触发方式通常为悬停或聚焦。' } },
  },
  tags: ['autodocs'],
}

export const Default = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button>Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>Tooltip content</TooltipContent>
    </Tooltip>
  ),
}
