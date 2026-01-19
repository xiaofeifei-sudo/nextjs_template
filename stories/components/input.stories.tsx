import { Input } from '../../components/ui/input'

export default {
  title: 'Components/Input',
  component: Input,
  parameters: { 
    nextjs: { appDirectory: true },
    docs: { description: { component: '文本输入框组件，支持占位符、禁用、校验态等常见场景。' } },
  },
  tags: ['autodocs'],
}

export const Default = {
  args: {
    placeholder: 'Type here',
  },
}
