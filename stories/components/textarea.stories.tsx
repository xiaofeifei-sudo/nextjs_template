import { Textarea } from '../../components/ui/textarea'

export default {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: { nextjs: { appDirectory: true } },
}

export const Default = {
  args: {
    placeholder: 'Write something',
    rows: 4,
  },
}

