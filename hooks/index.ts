/**
 * 自定义 Hooks - 汇总导出
 * 从单一入口重新导出所有 hooks
 */

export { useDebounce } from './use-debounce';
export { useThrottle } from './use-throttle';
export { useLocalStorage } from './use-local-storage';
export {
  useMediaQuery,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  useIsLargeDesktop,
  usePrefersDarkMode,
  usePrefersReducedMotion,
} from './use-media-query';
export { useOnClickOutside } from './use-on-click-outside';
export { useScrollPosition } from './use-scroll-position';
export { useWindowSize } from './use-window-size';
export { useCopyToClipboard } from './use-copy-to-clipboard';
export { useAsync } from './use-async';
export { useToggle } from './use-toggle';
export { usePrevious } from './use-previous';
export { useIntersectionObserver } from './use-intersection-observer';
export { useHover } from './use-hover';
export { useKeyboardShortcut } from './use-keyboard-shortcut';

// v1.2 新增
export { useNetworkStatus } from './use-network-status';
export { useFetch } from './use-fetch';
export { useCountdown } from './use-countdown';
export { useElementSize } from './use-element-size';
export { useInterval } from './use-interval';

// v1.4 新增 - 声音
export { useSound, useSoundEffects } from './use-sound';
