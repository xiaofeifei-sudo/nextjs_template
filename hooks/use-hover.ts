'use client';

import { useState, useEffect, useRef, RefObject } from 'react';

/**
 * useHover - 监听元素的悬停状态
 * 
 * @returns [ref, isHovered]
 * 
 * @example
 * const [ref, isHovered] = useHover<HTMLDivElement>();
 * 
 * return (
 *   <div ref={ref} style={{ color: isHovered ? 'red' : 'black' }}>
 *     鼠标移到我这里！
 *   </div>
 * );
 */
export function useHover<T extends HTMLElement = HTMLDivElement>(): [
  RefObject<T | null>,
  boolean
] {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return [ref, isHovered];
}
