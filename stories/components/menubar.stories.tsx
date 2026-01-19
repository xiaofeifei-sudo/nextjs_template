import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarLabel } from '../../components/ui/menubar'

export default {
  title: 'Components/Menubar',
  component: Menubar,
  parameters: { 
    nextjs: { appDirectory: true },
    docs: { description: { component: '菜单栏用于顶层导航或操作集合，支持下拉内容。' } },
  },
  tags: ['autodocs'],
}

export const Default = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarLabel>Actions</MenubarLabel>
          <MenubarItem>New</MenubarItem>
          <MenubarItem>Open</MenubarItem>
          <MenubarItem>Save</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
}
