import { useEffect, useMemo, useState } from 'react'
import { Button } from '../../components/ui/button'
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from '../../components/ui/command'

const data = [
  { id: 'new', label: '新建文件', shortcut: 'N' },
  { id: 'open', label: '打开文件', shortcut: 'O' },
  { id: 'save', label: '保存', shortcut: 'S' },
  { id: 'settings', label: '设置', shortcut: ',' },
  { id: 'theme', label: '切换主题', shortcut: 'T' },
]

export default {
  title: 'Components/Command',
  parameters: { nextjs: { appDirectory: true } },
}

export const Palette = {
  render: () => {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState('')

    useEffect(() => {
      const onKeyDown = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault()
          setOpen((v) => !v)
        }
      }
      window.addEventListener('keydown', onKeyDown)
      return () => window.removeEventListener('keydown', onKeyDown)
    }, [])

    const filtered = useMemo(() => {
      const q = query.trim().toLowerCase()
      if (!q) return data
      return data.filter((d) => d.label.toLowerCase().includes(q))
    }, [query])

    return (
      <div className="p-6 space-y-3">
        <div className="flex items-center gap-3">
          <Button onClick={() => setOpen(true)}>打开命令面板</Button>
          <span className="text-sm text-muted-foreground">快捷键：⌘K / Ctrl+K</span>
        </div>

        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput
            placeholder="搜索命令..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            <CommandEmpty>无匹配结果</CommandEmpty>
            <CommandGroup heading="常用">
              {filtered.map((item) => (
                <CommandItem
                  key={item.id}
                  onSelect={() => {
                    setOpen(false)
                  }}
                >
                  <span>{item.label}</span>
                  <CommandShortcut>⌘{item.shortcut}</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
          </CommandList>
        </CommandDialog>
      </div>
    )
  },
}

