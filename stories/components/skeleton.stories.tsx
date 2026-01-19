import { Skeleton } from '../../components/ui/skeleton'

export default {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: { nextjs: { appDirectory: true } },
}

export const Lines = {
  render: () => (
    <div className="space-y-2 w-80">
      <Skeleton className="h-5 w-1/2" />
      <Skeleton className="h-5 w-2/3" />
      <Skeleton className="h-5 w-1/3" />
    </div>
  ),
}

export const Circle = {
  render: () => <Skeleton className="h-12 w-12 rounded-full" />,
}

