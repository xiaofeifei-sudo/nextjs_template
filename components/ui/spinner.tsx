import { Loader2Icon } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Spinner 加载指示器，使用旋转图标表示加载中。
 *
 * 用法示例：
 * ```tsx
 * <Spinner className="size-6" />
 * ```
 */
function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

export { Spinner }
