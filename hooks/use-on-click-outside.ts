'use client';

import { useEffect, RefObject } from 'react';

/**
 * useOnClickOutside - 检测点击是否发生在元素外部
 * 
 * @param ref - 元素的 React ref
 * @param handler - 在元素外部点击时触发的回调
 * 
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * useOnClickOutside(ref, () => setIsOpen(false));
 */
export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: MouseEvent | TouchEvent) => void
): void {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref?.current;
      
      // 如果点击的是当前元素或其子元素则不处理
      if (!el || el.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}
