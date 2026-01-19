import { Checkbox } from '../../components/ui/checkbox'
import { Label } from '../../components/ui/label'

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: { 
    nextjs: { appDirectory: true },
    docs: { description: { component: '复选框用于布尔选择，支持禁用与校验态展示。' } },
  },
  tags: ['autodocs'],
}

export const Default = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="cb" />
      <Label htmlFor="cb">Accept terms</Label>
    </div>
  ),
}
