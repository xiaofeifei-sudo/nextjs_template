'use client';

import { useState, useEffect } from 'react';

interface ScrollPosition {
  x: number;
  y: number;
  direction: 'up' | 'down' | 'none';
  isAtTop: boolean;
  isAtBottom: boolean;
  percentage: number;
}

/**
 * useScrollPosition - 跟踪滚动位置与方向
 * 
 * @returns ScrollPosition 对象
 * 
 * @example
 * const { y, direction, isAtTop, percentage } = useScrollPosition();
 * 
 * // 根据滚动方向显示/隐藏头部
 * const showHeader = direction === 'up' || isAtTop;
 */
export function useScrollPosition(): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
    direction: 'none',
    isAtTop: true,
    isAtBottom: false,
    percentage: 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollPosition = () => {
      const scrollY = window.pageYOffset;
      const scrollX = window.pageXOffset;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const maxScroll = scrollHeight - clientHeight;

      const direction: 'up' | 'down' | 'none' =
        scrollY > lastScrollY ? 'down' : scrollY < lastScrollY ? 'up' : 'none';

      setScrollPosition({
        x: scrollX,
        y: scrollY,
        direction,
        isAtTop: scrollY <= 0,
        isAtBottom: scrollY >= maxScroll - 1,
        percentage: maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0,
      });

      lastScrollY = scrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollPosition);
        ticking = true;
      }
    };

    // 初始化
    updateScrollPosition();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollPosition;
}
