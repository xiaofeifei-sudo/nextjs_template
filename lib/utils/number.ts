/**
 * 数字工具
 * 常用数字处理函数
 */

/**
 * 将数字限制在最小值与最大值之间
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * 获取介于最小值与最大值（含）之间的随机整数
 */
export function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 获取介于最小值与最大值之间的随机浮点数
 */
export function randomFloatBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * 将数字四舍五入到指定小数位
 */
export function roundTo(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/**
 * 检查数字是否为偶数
 */
export function isEven(value: number): boolean {
  return value % 2 === 0;
}

/**
 * 检查数字是否为奇数
 */
export function isOdd(value: number): boolean {
  return value % 2 !== 0;
}

/**
 * 检查数字是否在范围内
 */
export function inRange(
  value: number,
  min: number,
  max: number,
  inclusive: boolean = true
): boolean {
  return inclusive
    ? value >= min && value <= max
    : value > min && value < max;
}

/**
 * 角度转弧度
 */
export function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * 弧度转角度
 */
export function toDegrees(radians: number): number {
  return radians * (180 / Math.PI);
}

/**
 * 两个值之间的线性插值
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * clamp(t, 0, 1);
}

/**
 * 将一个范围的值映射到另一范围
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

/**
 * 计算值在最小与最大之间的百分比
 */
export function percentage(value: number, min: number, max: number): number {
  return ((value - min) / (max - min)) * 100;
}

/**
 * 计算两点之间的距离
 */
export function distance(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

/**
 * 获取数字的序数后缀（如 1st、2nd、3rd）
 */
export function ordinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

/**
 * 使用前导零填充数字
 */
export function padNumber(value: number, length: number): string {
  return String(value).padStart(length, '0');
}

/**
 * 检查数字是否为正
 */
export function isPositive(value: number): boolean {
  return value > 0;
}

/**
 * 检查数字是否为负
 */
export function isNegative(value: number): boolean {
  return value < 0;
}

/**
 * 获取数字符号（-1、0 或 1）
 */
export function sign(value: number): -1 | 0 | 1 {
  if (value > 0) return 1;
  if (value < 0) return -1;
  return 0;
}

/**
 * 计算阶乘
 */
export function factorial(n: number): number {
  if (n < 0) throw new Error('Factorial is not defined for negative numbers');
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

/**
 * 计算最大公约数（GCD）
 */
export function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

/**
 * 计算最小公倍数（LCM）
 */
export function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}
