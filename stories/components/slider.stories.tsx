import { Slider } from '../../components/ui/slider'

export default {
  title: 'Components/Slider',
  component: Slider,
  parameters: { nextjs: { appDirectory: true } },
}

export const SingleValue = {
  render: () => (
    <div className="w-64">
      <Slider defaultValue={[40]} max={100} step={1} aria-label="Slider single" />
    </div>
  ),
}

export const Range = {
  render: () => (
    <div className="w-64">
      <Slider defaultValue={[20, 80]} max={100} step={1} aria-label="Slider range" />
    </div>
  ),
}

export const Vertical = {
  render: () => (
    <div className="h-44">
      <Slider orientation="vertical" defaultValue={[50]} max={100} step={1} aria-label="Slider vertical" />
    </div>
  ),
}

