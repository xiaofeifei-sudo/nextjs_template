/**
 * 浏览器与设备工具
 * 用于检测浏览器特性与设备能力的辅助函数
 */

/**
 * 检查代码是否在服务端运行（SSR）
 */
export const isServer = typeof window === 'undefined';

/**
 * 检查代码是否在浏览器中运行
 */
export const isBrowser = typeof window !== 'undefined';

/**
 * 检查设备是否为移动端（基于 UA）
 */
export function isMobile(): boolean {
  if (isServer) return false;
  return /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/**
 * 检查设备是否为 iOS
 */
export function isIOS(): boolean {
  if (isServer) return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

/**
 * 检查设备是否为 Android
 */
export function isAndroid(): boolean {
  if (isServer) return false;
  return /Android/.test(navigator.userAgent);
}

/**
 * 检查设备是否支持触控
 */
export function isTouchDevice(): boolean {
  if (isServer) return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * 检查浏览器是否为 Safari
 */
export function isSafari(): boolean {
  if (isServer) return false;
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

/**
 * 检查浏览器是否为 Chrome
 */
export function isChrome(): boolean {
  if (isServer) return false;
  return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
}

/**
 * 检查浏览器是否为 Firefox
 */
export function isFirefox(): boolean {
  if (isServer) return false;
  return navigator.userAgent.toLowerCase().includes('firefox');
}

/**
 * 检查设备是否偏好减少动画
 */
export function prefersReducedMotion(): boolean {
  if (isServer) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * 检查设备是否偏好暗色模式
 */
export function prefersDarkMode(): boolean {
  if (isServer) return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * 获取设备像素比
 */
export function getDevicePixelRatio(): number {
  if (isServer) return 1;
  return window.devicePixelRatio || 1;
}

/**
 * 检查浏览器是否支持 WebGL
 */
export function supportsWebGL(): boolean {
  if (isServer) return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

/**
 * 检查浏览器是否支持 WebP 图片
 */
export async function supportsWebP(): Promise<boolean> {
  if (isServer) return false;
  
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img.width > 0 && img.height > 0);
    img.onerror = () => resolve(false);
    img.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=';
  });
}

/**
 * 检查浏览器是否支持 Intersection Observer
 */
export function supportsIntersectionObserver(): boolean {
  if (isServer) return false;
  return 'IntersectionObserver' in window;
}

/**
 * 获取网络连接类型（如可用）
 */
export function getConnectionType(): string | null {
  if (isServer) return null;
  const nav = navigator as Navigator & {
    connection?: { effectiveType?: string };
  };
  return nav.connection?.effectiveType || null;
}

/**
 * 检查是否在线
 */
export function isOnline(): boolean {
  if (isServer) return true;
  return navigator.onLine;
}

/**
 * 获取电池电量（如支持）
 */
export async function getBatteryLevel(): Promise<number | null> {
  if (isServer) return null;
  
  const nav = navigator as Navigator & {
    getBattery?: () => Promise<{ level: number }>;
  };
  
  if (!nav.getBattery) return null;
  
  try {
    const battery = await nav.getBattery();
    return battery.level;
  } catch {
    return null;
  }
}
