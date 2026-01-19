'use client';

import { useState, useCallback } from 'react';

/**
 * useToggle - 布尔值切换状态，提供便捷方法
 * 
 * @param initialValue - 初始布尔值
 * @returns [value, toggle, setTrue, setFalse, setValue]
 * 
 * @example
 * const [isOpen, toggle, open, close] = useToggle(false);
 * 
 * <button onClick={toggle}>切换</button>
 * <button onClick={open}>打开</button>
 * <button onClick={close}>关闭</button>
 */
export function useToggle(
  initialValue: boolean = false
): [
  boolean,
  () => void,
  () => void,
  () => void,
  (value: boolean) => void
] {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue((prev) => !prev), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return [value, toggle, setTrue, setFalse, setValue];
}
