import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../../components/ui/select'

export default {
  title: 'Components/Select',
  component: SelectTrigger,
  parameters: { 
    nextjs: { appDirectory: true },
    docs: { description: { component: '下拉选择器，触发器与内容分离，可设置标签、分组、分隔线。' } },
  },
  tags: ['autodocs'],
}

export const Default = {
  render: () => (
    <Select>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Select option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="a">Option A</SelectItem>
        <SelectItem value="b">Option B</SelectItem>
        <SelectItem value="c">Option C</SelectItem>
      </SelectContent>
    </Select>
  ),
}
