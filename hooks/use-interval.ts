import { useEffect, useRef } from 'react';

/**
 * useInterval
 * 声明式 setInterval，支持暂停
 * 
 * @example
 * useInterval(() => console.log('tick'), 1000);
 * useInterval(() => console.log('tick'), isActive ? 1000 : null);
 */
export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  // 记住最新的回调
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // 设置定时器
  useEffect(() => {
    if (delay === null) return;

    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}
