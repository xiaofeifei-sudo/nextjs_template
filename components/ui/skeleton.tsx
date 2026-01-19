import { cn } from "@/lib/utils"

/**
 * Skeleton 骨架屏占位，用于数据加载中的占位展示。
 *
 * 用法示例：
 * ```tsx
 * <Skeleton className="h-4 w-32" />
 * ```
 */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }
