import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'zh-CN'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  // ========================= 可选配置（按需取消注释） =========================
  // 1) 本地化路径配置（SEO友好）：将用户可见路径映射到内部路径
  // pathnames: {
  //   '/': '/',
  //   '/about': {
  //     en: '/about',
  //     'zh-CN': '/about' // 也可使用中文，如 '/关于我们'
  //   },
  //   // 动态路由示例（严格类型，提供 params）
  //   '/users/[userId]': {
  //     en: '/users/[userId]',
  //     'zh-CN': '/users/[userId]'
  //   }
  // },
  //
  // 2) 域名与区域配置（多域名部署）
  // domains: [
  //   { domain: 'us.example.com', defaultLocale: 'en', locales: ['en'] },
  //   { domain: 'cn.example.com', defaultLocale: 'zh-CN', locales: ['zh-CN'] },
  // ],
  //
  // 3) 自定义前缀（按语言定制用户可见的前缀）
  // localePrefix: {
  //   mode: 'as-needed', // 'always' | 'as-needed' | 'never'
  //   prefixes: {
  //     // 为 zh-CN 使用更短的前缀（仅用户可见，内部仍为 zh-CN）
  //     'zh-CN': '/zh'
  //   }
  // },
  //
  // 4) 关闭自动语言检测（仅依赖 URL/域名解析）
  // localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
