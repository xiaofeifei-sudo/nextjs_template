'use client';

import {Button} from '@/components/ui/button';
import {useTranslations} from 'next-intl';


export default function Home() {
    const t = useTranslations();
    return (
        <div>
            <Button variant={"default"}>
                {"asdfasdf"}
            </Button>
        </div>
    )

}
