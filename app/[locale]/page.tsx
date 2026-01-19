'use client';

import {Button} from '@/components/ui/button';
import {useTranslations} from 'next-intl';
import {useSystemConfigStore} from '@/store/system';
import {Label} from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';


export default function Home() {
    const t = useTranslations();
    const hasData = useSystemConfigStore((s) => s.hasData);
    const callbackStatusList = useSystemConfigStore((s) => s.callbackStatusList);
    return (
        <div className="p-6 space-y-6">
            <div>
                <Button variant={"default"}>
                    {"asdfasdf"}
                </Button>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="callbackStatus">回调状态</Label>
                <Select>
                    <SelectTrigger id="callbackStatus" className="w-64">
                        <SelectValue placeholder="选择回调状态" />
                    </SelectTrigger>
                    <SelectContent>
                        {callbackStatusList.map((opt) => (
                            <SelectItem key={String(opt.value)} value={String(opt.value)}>
                                {opt.text}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <span className="text-sm text-muted-foreground">
                    {hasData ? '已加载系统常量' : '系统常量为空'}
                </span>
            </div>
        </div>
    )

}
