'use client';

import {lazy} from 'react';
import {useTranslations} from 'next-intl';

// Dynamic imports for heavy components (code-split)
const ScrollProgress = lazy(() => import('@/components/scroll-progress').then(m => ({default: m.ScrollProgress})));
const BackToTop = lazy(() => import('@/components/back-to-top').then(m => ({default: m.BackToTop})));


// --- Animation Variants ---
const fadeInUp = {
    initial: {opacity: 0, y: 30},
    animate: {opacity: 1, y: 0},
    transition: {duration: 0.6, ease: [0.22, 1, 0.36, 1]}
};


// --- Main Page Component ---
export default function Home() {
    const t = useTranslations();

    return (
        <div>
        </div>
    );
}
