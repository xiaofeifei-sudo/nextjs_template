import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction } from '../../components/ui/card'
import { Button } from '../../components/ui/button'

export default {
  title: 'Components/Card',
  component: Card,
  parameters: { nextjs: { appDirectory: true } },
}

export const Default = {
  render: () => (
    <Card>
      <CardHeader className="px-6">
        <CardTitle>标题</CardTitle>
        <CardDescription>这是一段描述文字</CardDescription>
      </CardHeader>
      <CardContent className="px-6">
        <p>卡片内容区域。</p>
      </CardContent>
      <CardFooter className="px-6">
        <CardAction className="ml-auto">
          <Button variant="outline">取消</Button>
          <Button className="ml-2">确认</Button>
        </CardAction>
      </CardFooter>
    </Card>
  ),
}

