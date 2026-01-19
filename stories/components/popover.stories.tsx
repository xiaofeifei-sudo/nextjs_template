import { Button } from '../../components/ui/button'
import { Popover, PopoverTrigger, PopoverContent } from '../../components/ui/popover'

export default {
  title: 'Components/Popover',
  component: PopoverContent,
  parameters: { nextjs: { appDirectory: true } },
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

