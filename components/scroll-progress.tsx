'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * ScrollProgress 组件
 * 
 * 位于页面顶部的水平进度条，用于显示滚动进度。
 * 使用 Framer Motion 实现平滑动画。
 * 
 * @example
 * ```tsx
 * // 在你的布局或页面中
 * <ScrollProgress />
 * ```
 */

interface ScrollProgressProps {
  /** 进度条颜色。默认：主色渐变 */
  color?: string;
  /** 进度条高度（像素）。默认：3 */
  height?: number;
  /** 位置：'top' 或 'bottom'。默认：'top' */
  position?: 'top' | 'bottom';
  /** 显示百分比文本。默认：false */
  showPercentage?: boolean;
  /** 层级 z-index。默认：50 */
  zIndex?: number;
}

export function ScrollProgress({
  color,
  height = 3,
  position = 'top',
  showPercentage = false,
  zIndex = 50,
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setPercentage(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  const positionClass = position === 'top' ? 'top-0' : 'bottom-0';
  const defaultGradient = 'bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500';

  return (
    <>
      <motion.div
        className={`fixed left-0 right-0 ${positionClass} origin-left`}
        style={{
          scaleX,
          height,
          zIndex,
          background: color || undefined,
        }}
      >
        {!color && (
          <div className={`w-full h-full ${defaultGradient}`} />
        )}
      </motion.div>
      
      {showPercentage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: percentage > 5 ? 1 : 0 }}
          className={`fixed ${position === 'top' ? 'top-4' : 'bottom-4'} right-4 px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm border border-border text-xs font-mono`}
          style={{ zIndex }}
        >
          {percentage}%
        </motion.div>
      )}
    </>
  );
}

export default ScrollProgress;
