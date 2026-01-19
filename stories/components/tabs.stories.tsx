import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs'

export default {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: { nextjs: { appDirectory: true } },
}

export const Default = {
  render: () => (
    <Tabs defaultValue="a" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="a">Tab A</TabsTrigger>
        <TabsTrigger value="b">Tab B</TabsTrigger>
      </TabsList>
      <TabsContent value="a">Content A</TabsContent>
      <TabsContent value="b">Content B</TabsContent>
    </Tabs>
  ),
}

