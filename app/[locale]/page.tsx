'use client';

import { memo, useMemo, useCallback, useState, useRef, useEffect, lazy, Suspense } from 'react';
import { motion, useScroll, useMotionValueEvent, useInView } from 'framer-motion';
import { AnimatedThemeToggle } from '@/components/animated-theme-toggle';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { MagicCard } from '@/components/ui/magic-card';
import { StickyBanner } from '@/components/ui/sticky-banner';
import { LayoutTextFlip } from '@/components/ui/layout-text-flip';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import {
  Github,
  Zap,
  Palette,
  Code2,
  Layers,
  Sparkles,
  Copy,
  Check,
  Terminal,
  Rocket,
  Star,
  Heart,
  BookOpen,
  Shield,
  Package,
  Boxes,
  FileCode,
  Type,
  Globe,
  ChevronDown,
  History,
  Languages,
} from 'lucide-react';
import { useRouter, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { useSoundEffects } from '@/hooks/use-sound';



export default function Home() {
    const t = useTranslations();
    return (
        <div>
           <Button variant={"link"}>
            {"asdfasdf"}
           </Button>
        </div>
    )

}