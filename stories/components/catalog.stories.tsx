import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Textarea } from '../../components/ui/textarea'
import { Checkbox } from '../../components/ui/checkbox'
import { Switch } from '../../components/ui/switch'
import { Slider } from '../../components/ui/slider'
import { Progress } from '../../components/ui/progress'
import { Badge } from '../../components/ui/badge'
import { Avatar } from '../../components/ui/avatar'
import { Separator } from '../../components/ui/separator'
import { Label } from '../../components/ui/label'
import { Tooltip, TooltipTrigger, TooltipContent } from '../../components/ui/tooltip'
import { Popover, PopoverTrigger, PopoverContent } from '../../components/ui/popover'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../components/ui/dialog'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from '../../components/ui/dropdown-menu'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../../components/ui/select'
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '../../components/ui/sheet'
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from '../../components/ui/drawer'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs'
import { Card } from '../../components/ui/card'
import { Skeleton } from '../../components/ui/skeleton'
import { ScrollArea } from '../../components/ui/scroll-area'

export default {
  title: 'Components/Catalog',
  parameters: {
    nextjs: { appDirectory: true },
  },
}

export const All = {
  render: () => (
    <div className="p-6 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Button>Button</Button>
            <Badge>Badge</Badge>
          </div>
          <Input placeholder="Input" />
          <Textarea placeholder="Textarea" />
          <div className="flex items-center gap-2">
            <Checkbox id="cb1" />
            <Label htmlFor="cb1">Checkbox</Label>
          </div>
          <div className="flex items-center gap-4">
            <Switch />
            <Slider defaultValue={[40]} max={100} step={1} className="w-64" />
          </div>
          <Progress value={50} className="w-64" />
          <Separator />
          <Avatar>
            <img alt="avatar" src="https://avatars.githubusercontent.com/u/1" />
          </Avatar>
        </div>

        <div className="space-y-6">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button>Tooltip Trigger</Button>
            </TooltipTrigger>
            <TooltipContent>Tooltip Content</TooltipContent>
          </Tooltip>

          <Popover>
            <PopoverTrigger asChild>
              <Button>Popover Trigger</Button>
            </PopoverTrigger>
            <PopoverContent>Popover Content</PopoverContent>
          </Popover>

          <Dialog>
            <DialogTrigger asChild>
              <Button>Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dialog Title</DialogTitle>
                <DialogDescription>Dialog Description</DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>Dropdown</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Menu</DropdownMenuLabel>
              <DropdownMenuItem>Item 1</DropdownMenuItem>
              <DropdownMenuItem>Item 2</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Item 3</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="a">Option A</SelectItem>
              <SelectItem value="b">Option B</SelectItem>
              <SelectItem value="c">Option C</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Sheet>
          <SheetTrigger asChild>
            <Button>Open Sheet</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Sheet Title</SheetTitle>
              <SheetDescription>Sheet Description</SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <Drawer>
          <DrawerTrigger asChild>
            <Button>Open Drawer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Drawer Title</DrawerTitle>
              <DrawerDescription>Drawer Description</DrawerDescription>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      </div>

      <div className="space-y-4">
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">Account content</TabsContent>
          <TabsContent value="password">Password content</TabsContent>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-4">Card</Card>
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      </div>

      <ScrollArea className="h-24 w-full rounded-md border">
        <div className="p-4 space-y-2">
          <p>Scroll content 1</p>
          <p>Scroll content 2</p>
          <p>Scroll content 3</p>
          <p>Scroll content 4</p>
          <p>Scroll content 5</p>
          <p>Scroll content 6</p>
          <p>Scroll content 7</p>
          <p>Scroll content 8</p>
        </div>
      </ScrollArea>
    </div>
  ),
}
