import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

// ========================= 可选用法/API 速查 =========================
// 1) 受 localePrefix 影响的 Link 行为：
// <Link href="/about" locale="zh-CN">关于</Link>
// - 当 localePrefix !== 'always' 时，Link 仍可能带前缀以更新 cookie，
//   随后会自动重定向到无前缀版本（提升 UX）
//
// 2) 强制带前缀（切换语言时，先更新 cookie，再跳转）
// redirect(
//   {
//     href: { pathname: '/about' },
//     locale: 'zh-CN'
//   },
//   { forcePrefix: true }
// );
//
// 3) 动态路由（pathnames 启用后会有严格类型）
// <Link
//   href={{
//     pathname: '/users/[userId]',
//     params: { userId: '42' }
//   }}
// >
//   用户详情
// </Link>
//
// 4) 获取当前内部路径（无 locale 前缀）
// const pathname = getPathname(); // 例如返回 '/about' 而不是 '/zh/about'
//
// 5) 获取某个 locale 下的目标 pathname（可用于构造站点地图/SEO）
// import { getLocalizedPathname } from 'next-intl/navigation';
// const zhAbout = getLocalizedPathname({
//   href: { pathname: '/about' },
//   locale: 'zh-CN'
// });
//
// 6) 编程式导航（与 Next.js useRouter 一致，自动本地化）
// const router = useRouter();
// router.push({ pathname: '/users/[userId]', params: { userId: '5' } });
