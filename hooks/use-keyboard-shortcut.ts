'use client';

import { useEffect, useCallback, useRef } from 'react';

type KeyCombo = string[];
type KeyboardShortcutCallback = (event: KeyboardEvent) => void;

interface UseKeyboardShortcutOptions {
  enabled?: boolean;
  preventDefault?: boolean;
  stopPropagation?: boolean;
}

/**
 * useKeyboardShortcut - 处理键盘快捷键
 * 
 * @param keys - 键数组（例如 ['ctrl', 'k']）
 * @param callback - 触发快捷键时调用的函数
 * @param options - 快捷键配置项
 * 
 * @example
 * // 单键
 * useKeyboardShortcut(['Escape'], () => setIsOpen(false));
 * 
 * // 组合键（Ctrl+K）
 * useKeyboardShortcut(['ctrl', 'k'], () => openCommandPalette());
 * 
 * // 组合键（Ctrl+Shift+P）
 * useKeyboardShortcut(['ctrl', 'shift', 'p'], () => openSettings());
 */
export function useKeyboardShortcut(
  keys: KeyCombo,
  callback: KeyboardShortcutCallback,
  options: UseKeyboardShortcutOptions = {}
): void {
  const { enabled = true, preventDefault = true, stopPropagation = false } = options;
  
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return;

      const normalizedKeys = keys.map((key) => key.toLowerCase());
      const pressedKeys: string[] = [];

      if (event.ctrlKey || event.metaKey) pressedKeys.push('ctrl');
      if (event.shiftKey) pressedKeys.push('shift');
      if (event.altKey) pressedKeys.push('alt');

      const key = event.key.toLowerCase();
      if (!['control', 'shift', 'alt', 'meta'].includes(key)) {
        pressedKeys.push(key);
      }

      const isMatch =
        normalizedKeys.length === pressedKeys.length &&
        normalizedKeys.every((k) => pressedKeys.includes(k));

      if (isMatch) {
        if (preventDefault) event.preventDefault();
        if (stopPropagation) event.stopPropagation();
        callbackRef.current(event);
      }
    },
    [keys, enabled, preventDefault, stopPropagation]
  );

  useEffect(() => {
    if (!enabled) return;

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown, enabled]);
}
