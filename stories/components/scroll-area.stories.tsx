import { ScrollArea } from '../../components/ui/scroll-area'

export default {
  title: 'Components/ScrollArea',
  component: ScrollArea,
  parameters: { nextjs: { appDirectory: true } },
}

export const Default = {
  render: () => (
    <ScrollArea className="h-32 w-80 rounded-md border">
      <div className="p-4 space-y-2">
        <p>内容 1</p>
        <p>内容 2</p>
        <p>内容 3</p>
        <p>内容 4</p>
        <p>内容 5</p>
        <p>内容 6</p>
        <p>内容 7</p>
        <p>内容 8</p>
        <p>内容 9</p>
        <p>内容 10</p>
        <p>内容 11</p>
        <p>内容 12</p>
      </div>
    </ScrollArea>
  ),
}

