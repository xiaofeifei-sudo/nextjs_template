"use client"

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

/**
 * Collapsible 折叠容器，点击触发区域展开/折叠内容。
 *
 * 用法示例：
 * ```tsx
 * <Collapsible>
 *   <CollapsibleTrigger>更多</CollapsibleTrigger>
 *   <CollapsibleContent>隐藏内容</CollapsibleContent>
 * </Collapsible>
 * ```
 */
function Collapsible({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
}

function CollapsibleTrigger({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      {...props}
    />
  )
}

function CollapsibleContent({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      {...props}
    />
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
