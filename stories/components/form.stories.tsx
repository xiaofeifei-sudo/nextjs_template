import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Toaster } from '../../components/ui/sonner'
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '../../components/ui/form'
import { Input } from '../../components/ui/input'
import { Textarea } from '../../components/ui/textarea'
import { Checkbox } from '../../components/ui/checkbox'
import { Switch } from '../../components/ui/switch'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../../components/ui/select'
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group'
import { Slider } from '../../components/ui/slider'
import { Button } from '../../components/ui/button'

const schema = z.object({
  name: z.string().min(2, '姓名至少 2 个字符'),
  email: z.string().email('邮箱格式不正确'),
  age: z.coerce.number().min(18, '年龄需 ≥ 18'),
  role: z.enum(['user', 'admin', 'guest']),
  gender: z.enum(['male', 'female']),
  agree: z.boolean().refine(val => val === true, '必须同意条款'),
  newsletter: z.boolean().optional(),
  bio: z.string().max(200, '最多 200 字').optional(),
  range: z.array(z.number()).min(1),
})

export default {
  title: 'Components/Form',
  parameters: { nextjs: { appDirectory: true } },
  tags: ['autodocs'],
}

export const Validation = {
  render: () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const form = useForm({
      resolver: zodResolver(schema) as any,
      defaultValues: {
        name: '',
        email: '',
        age: 18,
        role: undefined,
        gender: undefined,
        agree: false,
        newsletter: true,
        bio: '',
        range: [30],
      },
      mode: 'onChange',
    })

    const onSubmit = async (values: any) => {
      setIsSubmitting(true)
      toast.loading('提交中...')
      await new Promise(r => setTimeout(r, 800))
      toast.dismiss()
      toast.success('提交成功')
      setIsSubmitting(false)
      console.log(values)
    }

    return (
      <div className="max-w-lg space-y-6 p-6 border rounded-xl">
        <Toaster />
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>姓名</FormLabel>
                  <FormControl>
                    <Input placeholder="请输入姓名" {...field} />
                  </FormControl>
                  <FormDescription>用于展示与通知。</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>邮箱</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>年龄</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>角色</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择角色" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">用户</SelectItem>
                        <SelectItem value="admin">管理员</SelectItem>
                        <SelectItem value="guest">访客</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>性别</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="male" id="male" />
                        <label htmlFor="male">男</label>
                        <RadioGroupItem value="female" id="female" />
                        <label htmlFor="female">女</label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="range"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>范围</FormLabel>
                  <FormControl>
                    <Slider defaultValue={field.value} onValueChange={field.onChange} max={100} step={1} />
                  </FormControl>
                  <div className="text-sm text-muted-foreground">当前：{field.value?.[0]}%</div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newsletter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>订阅邮件</FormLabel>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} aria-label="订阅" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="agree"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} id="agree" />
                    </FormControl>
                    <label htmlFor="agree">我同意服务条款</label>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>个人简介</FormLabel>
                  <FormControl>
                    <Textarea placeholder="最多 200 字" rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? '提交中...' : '提交'}
              </Button>
              <Button type="button" variant="outline" onClick={() => form.reset()} disabled={isSubmitting}>
                重置
              </Button>
            </div>
          </form>
        </Form>
      </div>
    )
  },
}
