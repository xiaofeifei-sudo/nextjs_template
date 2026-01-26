import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-base font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        xs: "h-8 rounded-lg gap-1.5 px-3 text-sm has-[>svg]:px-2.5",
        sm: "h-9 rounded-lg gap-1.5 px-3 text-sm has-[>svg]:px-2.5",
        default: "h-10 rounded-lg px-4 py-2 has-[>svg]:px-3",
        lg: "h-11 rounded-lg px-6 text-lg has-[>svg]:px-4",
        xl: "h-12 rounded-lg px-7 text-xl has-[>svg]:px-5",
        icon: "size-10",
        "icon-sm": "size-9",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/**
 * Button 用于触发操作，支持 variant 与 size 两类样式配置。
 *
 * 用法示例：
 * ```tsx
 * <Button>提交</Button>
 * <Button variant="outline">取消</Button>
 * <Button size="icon" aria-label="Like"><ThumbsUp /></Button>
 * ```
 */
function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  isLoading = false,
  fullWidth,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    isLoading?: boolean
    fullWidth?: boolean
  }) {
  const Comp = asChild ? Slot : "button"
  const { disabled, children, ...rest } = props

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      aria-busy={isLoading || undefined}
      disabled={isLoading || disabled}
      className={cn(
        buttonVariants({ variant, size, className }),
        fullWidth && "w-full",
        isLoading && "cursor-progress"
      )}
      {...rest}
    >
      {!asChild && isLoading ? <Spinner /> : null}
      {children}
    </Comp>
  )
}

export { Button, buttonVariants }
