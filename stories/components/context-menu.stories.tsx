import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator } from '../../components/ui/context-menu'

export default {
  title: 'Components/ContextMenu',
  component: ContextMenuContent,
  parameters: { nextjs: { appDirectory: true } },
}

export const Default = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div className="border rounded-md p-4 w-64 text-sm">Right-click here</div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>Menu</ContextMenuLabel>
        <ContextMenuItem>Copy</ContextMenuItem>
        <ContextMenuItem>Paste</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
}

