/**
 * 存储工具
 * 带类型安全的 LocalStorage/SessionStorage 辅助函数
 */

/**
 * 从 localStorage 获取项（类型安全）
 */
export function getStorageItem<T>(
  key: string,
  defaultValue: T,
  storage: Storage = typeof window !== 'undefined' ? localStorage : null!
): T {
  if (typeof window === 'undefined' || !storage) return defaultValue;
  
  try {
    const item = storage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

/**
 * 设置 localStorage 项（类型安全）
 */
export function setStorageItem<T>(
  key: string,
  value: T,
  storage: Storage = typeof window !== 'undefined' ? localStorage : null!
): void {
  if (typeof window === 'undefined' || !storage) return;
  
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error setting storage item:', error);
  }
}

/**
 * 从 localStorage 删除项
 */
export function removeStorageItem(
  key: string,
  storage: Storage = typeof window !== 'undefined' ? localStorage : null!
): void {
  if (typeof window === 'undefined' || !storage) return;
  storage.removeItem(key);
}

/**
 * 清空 localStorage 所有项
 */
export function clearStorage(
  storage: Storage = typeof window !== 'undefined' ? localStorage : null!
): void {
  if (typeof window === 'undefined' || !storage) return;
  storage.clear();
}

/**
 * 检查键是否存在于 localStorage
 */
export function hasStorageItem(
  key: string,
  storage: Storage = typeof window !== 'undefined' ? localStorage : null!
): boolean {
  if (typeof window === 'undefined' || !storage) return false;
  return storage.getItem(key) !== null;
}

/**
 * 获取 localStorage 的所有键
 */
export function getStorageKeys(
  storage: Storage = typeof window !== 'undefined' ? localStorage : null!
): string[] {
  if (typeof window === 'undefined' || !storage) return [];
  return Object.keys(storage);
}

/**
 * 获取存储大小（字节）
 */
export function getStorageSize(
  storage: Storage = typeof window !== 'undefined' ? localStorage : null!
): number {
  if (typeof window === 'undefined' || !storage) return 0;
  
  let size = 0;
  for (const key of Object.keys(storage)) {
    const item = storage.getItem(key);
    if (item) {
      size += key.length + item.length;
    }
  }
  return size * 2; // UTF-16 = 每字符 2 字节
}

/**
 * 设置带过期时间的项
 */
export function setStorageItemWithExpiry<T>(
  key: string,
  value: T,
  ttl: number, // 存活时间（毫秒）
  storage: Storage = typeof window !== 'undefined' ? localStorage : null!
): void {
  const item = {
    value,
    expiry: Date.now() + ttl,
  };
  setStorageItem(key, item, storage);
}

/**
 * 获取带过期检查的项
 */
export function getStorageItemWithExpiry<T>(
  key: string,
  defaultValue: T,
  storage: Storage = typeof window !== 'undefined' ? localStorage : null!
): T {
  const item = getStorageItem<{ value: T; expiry: number } | null>(
    key,
    null,
    storage
  );
  
  if (!item) return defaultValue;
  
  if (Date.now() > item.expiry) {
    removeStorageItem(key, storage);
    return defaultValue;
  }
  
  return item.value;
}
