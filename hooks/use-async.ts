'use client';

import { useState, useCallback, useEffect } from 'react';

interface AsyncState<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

interface UseAsyncReturn<T> extends AsyncState<T> {
  execute: () => Promise<void>;
  reset: () => void;
}

/**
 * useAsync - 统一管理异步操作的加载、错误与数据状态
 * 
 * @param asyncFunction - 要执行的异步函数
 * @param immediate - 是否在组件挂载时立即执行
 * @returns 包含 data、error、loading 状态以及 execute 函数的对象
 * 
 * @example
 * const { data, isLoading, isError, execute } = useAsync(
 *   () => fetch('/api/data').then(res => res.json()),
 *   true // 组件挂载后立即执行
 * );
 */
export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  immediate: boolean = false
): UseAsyncReturn<T> {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    error: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
  });

  const execute = useCallback(async () => {
    setState({
      data: null,
      error: null,
      isLoading: true,
      isSuccess: false,
      isError: false,
    });

    try {
      const data = await asyncFunction();
      setState({
        data,
        error: null,
        isLoading: false,
        isSuccess: true,
        isError: false,
      });
    } catch (error) {
      setState({
        data: null,
        error: error instanceof Error ? error : new Error(String(error)),
        isLoading: false,
        isSuccess: false,
        isError: true,
      });
    }
  }, [asyncFunction]);

  const reset = useCallback(() => {
    setState({
      data: null,
      error: null,
      isLoading: false,
      isSuccess: false,
      isError: false,
    });
  }, []);

  useEffect(() => {
    if (immediate) {
      setTimeout(() => {
        execute();
      }, 0);
    }
  }, [execute, immediate]);

  return { ...state, execute, reset };
}
