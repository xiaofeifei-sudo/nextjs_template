import { useHover } from '../../hooks/use-hover'

export default {
  title: 'Hooks/useHover',
  parameters: { nextjs: { appDirectory: true }, hooksContainer: true },
}

export const Basic = {
  render: () => {
    const [ref, isHovered] = useHover<HTMLDivElement>()
    return (
      <div className="p-6">
        <div
          ref={ref}
          className={`w-64 h-32 rounded-xl border flex items-center justify-center transition-all ${isHovered ? 'bg-primary text-primary-foreground' : 'bg-background'}`}
        >
          {isHovered ? '正在悬停' : '移入我试试'}
        </div>
      </div>
    )
  },
}
