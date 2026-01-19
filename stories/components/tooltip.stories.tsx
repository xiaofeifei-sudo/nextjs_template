import { Button } from '../../components/ui/button'
import { Tooltip, TooltipTrigger, TooltipContent } from '../../components/ui/tooltip'

export default {
  title: 'Components/Tooltip',
  component: TooltipContent,
  parameters: { nextjs: { appDirectory: true } },
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

