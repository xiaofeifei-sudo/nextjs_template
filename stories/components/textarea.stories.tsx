import { Textarea } from '../../components/ui/textarea'

export default {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: { 
    nextjs: { appDirectory: true },
    docs: { description: { component: '多行文本输入组件，适用于较长内容编辑，支持行数设置。' } },
  },
  tags: ['autodocs'],
}

export const Default = {
  args: {
    placeholder: 'Write something',
    rows: 4,
  },
}
