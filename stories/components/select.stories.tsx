import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../../components/ui/select'

export default {
  title: 'Components/Select',
  component: SelectTrigger,
  parameters: { nextjs: { appDirectory: true } },
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

