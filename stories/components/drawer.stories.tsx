import { Button } from '../../components/ui/button'
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from '../../components/ui/drawer'

export default {
  title: 'Components/Drawer',
  component: DrawerContent,
  parameters: { 
    nextjs: { appDirectory: true },
    docs: { description: { component: '抽屉用于从屏幕边缘滑出的临时内容面板。' } },
  },
  tags: ['autodocs'],
}

export const Default = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Title</DrawerTitle>
          <DrawerDescription>Description</DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  ),
}
