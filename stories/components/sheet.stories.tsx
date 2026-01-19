import { Button } from '../../components/ui/button'
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '../../components/ui/sheet'

export default {
  title: 'Components/Sheet',
  component: SheetContent,
  parameters: { 
    nextjs: { appDirectory: true },
    docs: { description: { component: 'Sheet 与 Drawer 类似，承载临时内容，通常用于移动端或轻量编辑。' } },
  },
  tags: ['autodocs'],
}

export const Default = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Title</SheetTitle>
          <SheetDescription>Description</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
}
