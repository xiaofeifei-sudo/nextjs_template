import { Button } from '../../components/ui/button'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../components/ui/dialog'

export default {
  title: 'Components/Dialog',
  component: DialogContent,
  parameters: { 
    nextjs: { appDirectory: true },
    docs: { description: { component: '对话框用于承载临时内容或交互，支持标题、描述、关闭按钮等。' } },
  },
  tags: ['autodocs'],
}

export const Default = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Title</DialogTitle>
          <DialogDescription>Description</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ),
}
