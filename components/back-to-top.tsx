'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useSoundEffects } from '@/hooks/use-sound';

/**
 * BackToTop 组件
 * 
 * 一个悬浮按钮，用户向下滚动时出现，点击后滚动回到顶部。
 * 具有平滑动画和音效。
 * 
 * @example
 * ```tsx
 * // 在你的布局或页面中
 * <BackToTop />
 * ```
 */

interface BackToTopProps {
  /** 显示按钮的滚动阈值（像素）。默认：400 */
  threshold?: number;
  /** 按钮位置。默认：'bottom-right' */
  position?: 'bottom-left' | 'bottom-right';
  /** 是否使用平滑滚动。默认：true */
  smooth?: boolean;
  /** 是否显示进度环。默认：true */
  showProgress?: boolean;
}

export function BackToTop({
  threshold = 400,
  position = 'bottom-right',
  smooth = true,
  showProgress = true,
}: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { playHover, playClick } = useSoundEffects(0.15);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollY / docHeight : 0;
      
      setIsVisible(scrollY > threshold);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 初始检查
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  const scrollToTop = useCallback(() => {
    playClick();
    window.scrollTo({
      top: 0,
      behavior: smooth ? 'smooth' : 'auto',
    });
  }, [smooth, playClick]);

  const positionClasses = position === 'bottom-left' 
    ? 'left-6 bottom-24' // 位于 Spotify 按钮上方
    : 'right-6 bottom-6';

  // 进度环的 SVG 圆形属性
  const size = 48;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - scrollProgress * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onClick={scrollToTop}
          onMouseEnter={playHover}
          className={`fixed ${positionClasses} z-40 w-12 h-12 rounded-full bg-primary/90 hover:bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 flex items-center justify-center transition-all duration-200 hover:scale-110 group`}
          aria-label="Back to top"
        >
          {/* Progress ring */}
          {/* 进度环 */}
          {showProgress && (
            <svg
              className="absolute inset-0 -rotate-90"
              width={size}
              height={size}
            >
              {/* 背景圆 */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                className="opacity-20"
              />
              {/* 进度圆 */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-150"
              />
            </svg>
          )}
          
          {/* 箭头图标 */}
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default BackToTop;
