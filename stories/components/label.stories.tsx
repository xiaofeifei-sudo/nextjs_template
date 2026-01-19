import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'
import { Checkbox } from '../../components/ui/checkbox'

export default {
  title: 'Components/Label',
  component: Label,
  parameters: { 
    nextjs: { appDirectory: true },
    docs: { description: { component: 'Label 标签用于为输入控件提供可点击的语义说明。' } },
  },
  tags: ['autodocs'],
}

export const ForInput = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="name">姓名</Label>
      <Input id="name" placeholder="请输入姓名" />
    </div>
  ),
}

export const ForCheckbox = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="agree" />
      <Label htmlFor="agree">我同意条款</Label>
    </div>
  ),
}
