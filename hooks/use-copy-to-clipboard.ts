'use client';

import { useState, useCallback } from 'react';

interface CopyToClipboardResult {
  isCopied: boolean;
  copyToClipboard: (text: string) => Promise<boolean>;
  error: Error | null;
}

/**
 * useCopyToClipboard - 复制文本到剪贴板
 * 
 * @param resetDelay - 重置 isCopied 状态的延迟时间（毫秒）
 * @returns 包含 isCopied 状态与 copyToClipboard 函数的对象
 * 
 * @example
 * const { isCopied, copyToClipboard } = useCopyToClipboard();
 * 
 * <button onClick={() => copyToClipboard('Hello!')}>
 *   {isCopied ? '已复制！' : '复制'}
 * </button>
 */
export function useCopyToClipboard(
  resetDelay: number = 2000
): CopyToClipboardResult {
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const copyToClipboard = useCallback(
    async (text: string): Promise<boolean> => {
      if (!navigator?.clipboard) {
        const err = new Error('Clipboard not supported');
        setError(err);
        return false;
      }

      try {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        setError(null);

        setTimeout(() => {
          setIsCopied(false);
        }, resetDelay);

        return true;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Copy failed');
        setError(error);
        setIsCopied(false);
        return false;
      }
    },
    [resetDelay]
  );

  return { isCopied, copyToClipboard, error };
}
