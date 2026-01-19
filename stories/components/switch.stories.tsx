import { Switch } from '../../components/ui/switch'
import { Label } from '../../components/ui/label'

export default {
  title: 'Components/Switch',
  component: Switch,
  parameters: { nextjs: { appDirectory: true } },
}

export const Default = {
  render: () => <Switch aria-label="Switch default" />,
}

export const Checked = {
  render: () => <Switch defaultChecked aria-label="Switch checked" />,
}

export const WithLabel = {
  render: () => (
    <div className="flex items-center gap-3">
      <Switch id="notifications" />
      <Label htmlFor="notifications">启用通知</Label>
    </div>
  ),
}

export const Disabled = {
  render: () => <Switch disabled aria-label="Switch disabled" />,
}
