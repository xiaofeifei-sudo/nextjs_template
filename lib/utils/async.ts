/**
 * 异步与 Promise 工具
 * 处理异步操作的辅助函数
 */

/**
 * 休眠/延迟指定毫秒
 * @example
 * await sleep(1000); // 等待 1 秒
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 使用指数退避重试函数
 * @example
 * const data = await retry(() => fetchData(), { attempts: 3, delay: 1000 });
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options: { attempts?: number; delay?: number; backoff?: number } = {}
): Promise<T> {
  const { attempts = 3, delay = 1000, backoff = 2 } = options;
  
  let lastError: Error | undefined;
  
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err as Error;
      if (i < attempts - 1) {
        await sleep(delay * Math.pow(backoff, i));
      }
    }
  }
  
  throw lastError;
}

/**
 * 为 Promise 创建超时包装
 * @example
 * const data = await withTimeout(fetchData(), 5000);
 */
export async function withTimeout<T>(
  promise: Promise<T>,
  ms: number,
  errorMessage = 'Operation timed out'
): Promise<T> {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error(errorMessage)), ms)
  );
  return Promise.race([promise, timeout]);
}

/**
 * 并行执行 Promise，并限制并发数
 * @example
 * const results = await parallelLimit(urls.map(url => () => fetch(url)), 5);
 */
export async function parallelLimit<T>(
  tasks: (() => Promise<T>)[],
  limit: number
): Promise<T[]> {
  const results: T[] = [];
  const executing: Promise<void>[] = [];
  
  for (const task of tasks) {
    const p = Promise.resolve().then(() => task()).then(result => {
      results.push(result);
    });
    executing.push(p);
    
    if (executing.length >= limit) {
      await Promise.race(executing);
      executing.splice(
        executing.findIndex(p => 
          p.then(() => true).catch(() => true)
        ),
        1
      );
    }
  }
  
  await Promise.all(executing);
  return results;
}

/**
 * 防抖函数
 * @example
 * const debouncedSearch = debounce(search, 300);
 */
export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * 节流函数
 * @example
 * const throttledScroll = throttle(handleScroll, 100);
 */
export function throttle<T extends (...args: Parameters<T>) => ReturnType<T>>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * 通过缓存为函数记忆化
 * @example
 * const memoizedCalc = memoize(expensiveCalculation);
 */
export function memoize<T extends (...args: Parameters<T>) => ReturnType<T>>(
  fn: T,
  keyResolver?: (...args: Parameters<T>) => string
): T {
  const cache = new Map<string, ReturnType<T>>();
  
  return ((...args: Parameters<T>) => {
    const key = keyResolver ? keyResolver(...args) : JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

/**
 * 创建可手动解析的延迟 Promise
 * @example
 * const deferred = createDeferred<string>();
 * deferred.resolve('done');
 */
export function createDeferred<T>() {
  let resolve: (value: T) => void;
  let reject: (reason?: unknown) => void;
  
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  
  return { promise, resolve: resolve!, reject: reject! };
}

/**
 * 轮询函数直至满足条件
 * @example
 * await poll(() => checkStatus(), status => status === 'complete', 1000);
 */
export async function poll<T>(
  fn: () => Promise<T> | T,
  condition: (result: T) => boolean,
  interval: number,
  maxAttempts = Infinity
): Promise<T> {
  let attempts = 0;
  
  while (attempts < maxAttempts) {
    const result = await fn();
    if (condition(result)) return result;
    await sleep(interval);
    attempts++;
  }
  
  throw new Error('Polling exceeded max attempts');
}

/**
 * 函数仅执行一次并缓存结果
 * @example
 * const getConfig = once(() => loadConfig());
 */
export function once<T extends (...args: Parameters<T>) => ReturnType<T>>(fn: T): T {
  let called = false;
  let result: ReturnType<T>;
  
  return ((...args: Parameters<T>) => {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  }) as T;
}
