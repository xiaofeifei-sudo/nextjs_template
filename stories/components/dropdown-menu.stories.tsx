import { Button } from '../../components/ui/button'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from '../../components/ui/dropdown-menu'

export default {
  title: 'Components/DropdownMenu',
  component: DropdownMenuContent,
  parameters: { 
    nextjs: { appDirectory: true },
    docs: { description: { component: '下拉菜单用于承载一组操作，支持分隔线与标签。' } },
  },
  tags: ['autodocs'],
}

export const Default = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        <DropdownMenuItem>Item 1</DropdownMenuItem>
        <DropdownMenuItem>Item 2</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Item 3</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}
