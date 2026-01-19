/**
 * 校验工具
 * 表单与数据的常用校验函数
 */

/**
 * 检查字符串是否为有效邮箱
 */
export function isEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 检查字符串是否为有效 URL
 */
export function isURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * 检查字符串是否为有效电话号码
 */
export function isPhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * 检查值是否为空（null、undefined、空字符串、空数组、空对象）
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

/**
 * 检查字符串是否仅包含数字
 */
export function isNumeric(value: string): boolean {
  return /^\d+$/.test(value);
}

/**
 * 校验密码强度
 */
export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
  strength: 'weak' | 'medium' | 'strong';
} {
  const errors: string[] = [];
  let score = 0;

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  } else {
    score++;
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain a lowercase letter');
  } else {
    score++;
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain an uppercase letter');
  } else {
    score++;
  }

  if (!/\d/.test(password)) {
    errors.push('Password must contain a number');
  } else {
    score++;
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain a special character');
  } else {
    score++;
  }

  let strength: 'weak' | 'medium' | 'strong' = 'weak';
  if (score >= 4) strength = 'strong';
  else if (score >= 3) strength = 'medium';

  return {
    isValid: errors.length === 0,
    errors,
    strength,
  };
}

/**
 * 检查字符串是否为有效印尼 NIK（16 位数字）
 */
export function isNIK(nik: string): boolean {
  return /^\d{16}$/.test(nik);
}

/**
 * 检查字符串是否为有效印尼 NPWP
 */
export function isNPWP(npwp: string): boolean {
  const cleaned = npwp.replace(/[.\-]/g, '');
  return /^\d{15}$/.test(cleaned);
}

/**
 * 检查值是否为有效日期
 */
export function isValidDate(date: unknown): boolean {
  if (date instanceof Date) return !isNaN(date.getTime());
  if (typeof date === 'string' || typeof date === 'number') {
    return !isNaN(new Date(date).getTime());
  }
  return false;
}
