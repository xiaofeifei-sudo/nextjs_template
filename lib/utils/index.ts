/**
 * 工具函数 - 统配导出
 * 从单一入口重新导出全部工具函数
 */

// 类名合并工具（shadcn）
export { cn } from '../utils';

// 格式化工具
export {
  formatCurrency,
  formatNumber,
  formatPercentage,
  formatFileSize,
  formatPhoneNumber,
  formatCompact,
  formatDuration,
} from './format';

// 校验工具
export {
  isEmail,
  isURL,
  isPhone,
  isEmpty,
  isNumeric,
  validatePassword,
  isNIK,
  isNPWP,
  isValidDate,
} from './validation';

// 日期工具
export {
  formatDate,
  formatRelativeTime,
  isToday,
  isYesterday,
  daysBetween,
  addDays,
  addMonths,
  startOfDay,
  endOfDay,
  toISODateString,
  getAge,
} from './date';

// 字符串工具
export {
  capitalize,
  capitalizeWords,
  slugify,
  truncate,
  removeAccents,
  camelCase,
  kebabCase,
  snakeCase,
  pascalCase,
  randomString,
  generateUUID,
  maskString,
  wordCount,
  reverseString,
  isPalindrome,
  getInitials,
} from './string';

// 数组工具
export {
  chunk,
  unique,
  uniqueBy,
  shuffle,
  groupBy,
  sortBy,
  intersection,
  difference,
  flatten,
  flattenDeep,
  randomItem,
  randomItems,
  first,
  last,
  removeAt,
  remove,
  move,
  sum,
  average,
  min,
  max,
} from './array';

// 对象工具
export {
  pick,
  omit,
  deepClone,
  deepMerge,
  isEqual,
  isEmptyObject,
  get,
  set,
  flattenObject,
  invert,
  mapValues,
  filterObject,
} from './object';

// 数字工具
export {
  clamp,
  randomBetween,
  randomFloatBetween,
  roundTo,
  isEven,
  isOdd,
  inRange,
  toRadians,
  toDegrees,
  lerp,
  mapRange,
  percentage,
  distance,
  ordinal,
  padNumber,
  isPositive,
  isNegative,
  sign,
  factorial,
  gcd,
  lcm,
} from './number';

// 存储工具
export {
  getStorageItem,
  setStorageItem,
  removeStorageItem,
  clearStorage,
  hasStorageItem,
  getStorageKeys,
  getStorageSize,
  setStorageItemWithExpiry,
  getStorageItemWithExpiry,
} from './storage';

// API 工具
export {
  fetcher,
  createApiClient,
  apiClient,
  handleApiError,
  get as apiGet,
  post,
  put,
  patch,
  del,
  buildQueryString,
  sleep,
  retry,
  type ApiError,
  type ApiResponse,
} from './api';

// 颜色工具
export {
  hexToRgb,
  rgbToHex,
  hexToHsl,
  hslToHex,
  lightenColor,
  darkenColor,
  hexToRgba,
  getContrastRatio,
  isLightColor,
  getTextColorForBg,
  randomColor,
  mixColors,
} from './color';

// DOM 工具
export {
  scrollToTop,
  scrollToElement,
  copyToClipboard,
  downloadFile,
  downloadFromUrl,
  isInViewport,
  getOffsetTop,
  lockBodyScroll,
  unlockBodyScroll,
  getScrollPercentage,
  isMobile,
  isTouchDevice,
  getPreferredColorScheme,
  createFocusTrap,
  printElement,
} from './dom';

// 浏览器检测工具（v1.2 新增）
export {
  isServer,
  isBrowser,
  isMobile as isMobileDevice,
  isIOS,
  isAndroid,
  isTouchDevice as hasTouchScreen,
  isSafari,
  isChrome,
  isFirefox,
  prefersReducedMotion,
  prefersDarkMode,
  getDevicePixelRatio,
  supportsWebGL,
  supportsWebP,
  supportsIntersectionObserver,
  getConnectionType,
  isOnline,
  getBatteryLevel,
} from './browser';

// 异步工具（v1.2 新增）
export {
  sleep as delay,
  retry as retryAsync,
  withTimeout,
  parallelLimit,
  debounce,
  throttle,
  memoize,
  createDeferred,
  poll,
  once,
} from './async';

// 加密工具（v1.2 新增）
export {
  uuid,
  nanoid,
  randomString as generateRandomString,
  sha256,
  sha512,
  base64Encode,
  base64Decode,
  generateToken,
  xorEncrypt,
  timingSafeEqual,
  maskString as maskSensitiveData,
  maskEmail,
  generateCSRFToken,
} from './crypto';

// v1.4 新增 - 声音工具
export {
  createSound,
  playSound,
  preloadSounds,
  SynthSound,
  synth,
  SoundManager,
} from './sound';
