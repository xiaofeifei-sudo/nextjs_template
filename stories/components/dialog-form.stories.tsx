import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Toaster } from '../../components/ui/sonner'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../components/ui/dialog'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '../../components/ui/form'
import { Input } from '../../components/ui/input'
import { Textarea } from '../../components/ui/textarea'
import { Button } from '../../components/ui/button'

const schema = z.object({
  title: z.string().min(3, '标题至少 3 个字符'),
  description: z.string().min(5, '描述至少 5 个字符'),
})

export default {
  title: 'Components/DialogForm',
  parameters: { nextjs: { appDirectory: true } },
  tags: ['autodocs'],
}

export const InDialog = {
  render: () => {
    const [open, setOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const form = useForm({
      resolver: zodResolver(schema) as any,
      defaultValues: { title: '', description: '' },
      mode: 'onChange',
    })

    const onSubmit = async (values: any) => {
      setIsSubmitting(true)
      toast.loading('保存中...')
      await new Promise(r => setTimeout(r, 800))
      toast.dismiss()
      toast.success('保存成功')
      setIsSubmitting(false)
      setOpen(false)
      console.log(values)
    }

    return (
      <div className="p-6">
        <Toaster />
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>打开表单对话框</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>创建事项</DialogTitle>
              <DialogDescription>填写信息后点击保存</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>标题</FormLabel>
                      <FormControl>
                        <Input placeholder="请输入标题" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>描述</FormLabel>
                      <FormControl>
                        <Textarea rows={3} placeholder="请输入描述" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-3 justify-end">
                  <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                    取消
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? '保存中...' : '保存'}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    )
  },
}
