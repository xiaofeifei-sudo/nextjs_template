'use client';

import { useState, useEffect } from 'react';

interface WindowSize {
  width: number;
  height: number;
}

/**
 * useWindowSize - 跟踪窗口尺寸
 * 
 * @returns 包含宽度与高度的 WindowSize 对象
 * 
 * @example
 * const { width, height } = useWindowSize();
 * const isMobile = width < 768;
 */
export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // 初始化
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
