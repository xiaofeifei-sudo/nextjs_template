'use client';

import { useState, useEffect } from 'react';

/**
 * usePrevious - 获取状态的前一个值
 * 
 * @param value - 当前值
 * @returns 上一个值
 * 
 * @example
 * const [count, setCount] = useState(0);
 * const prevCount = usePrevious(count);
 * 
 * console.log(`Count changed from ${prevCount} to ${count}`);
 */
export function usePrevious<T>(value: T): T | undefined {
  const [prev, setPrev] = useState<T | undefined>(undefined);

  useEffect(() => {
    setPrev(value);
  }, [value]);

  return prev;
}
