import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    // ========================= 消息加载 =========================
    // 1) 单文件消息（当前默认）
    messages: (await import(`../messages/${locale}.json`)).default,
    // 2) 多文件合并（按需启用）
    // messages: {
    //   ...(await import(`../messages/${locale}.json`)).default,
    //   ...(await import(`../messages/${locale}/dashboard.json`)).default,
    //   ...(await import(`../messages/${locale}/auth.json`)).default,
    // },
    //
    // ========================= 可选配置 =========================
    // 3) 时区（影响日期/时间渲染）
    // timeZone: 'Asia/Shanghai',
    //
    // 4) 全局格式（配合 t.formatX 使用）
    // formats: {
    //   dateTime: {
    //     short: { day: '2-digit', month: '2-digit', year: 'numeric' },
    //     long: {
    //       weekday: 'long',
    //       day: '2-digit',
    //       month: 'long',
    //       year: 'numeric',
    //       hour: '2-digit',
    //       minute: '2-digit'
    //     }
    //   },
    //   number: {
    //     currency: { style: 'currency', currency: 'CNY' },
    //     percent: { style: 'percent' }
    //   }
    // },
  };
});
