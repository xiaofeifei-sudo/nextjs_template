import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * 代理配置
 * 
 * 此代理处理：
 * - i18n 路由 (next-intl)
 * - 安全头
 * - API 路由的 CORS
 * - 请求日志记录
 * 
 * @see https://next-intl.dev/docs/getting-started/app-router
 */

// Create the i18n middleware
const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // === Request Logging ===
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${request.method} ${pathname}`);

  // Skip i18n for API routes and static files
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.includes('.')
  ) {
    const response = NextResponse.next();
    
    // 为 API 路由添加安全头
    if (pathname.startsWith('/api/')) {
      response.headers.set('Access-Control-Allow-Origin', '*');
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    }
    
    return response;
  }

  // 处理所有其他路径的 i18n 路由
  const response = intlMiddleware(request);
  
  // === 添加安全头 ===
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-DNS-Prefetch-Control', 'on');

  return response;
}

export const config = {
  matcher: [
    // 匹配所有路径名，除了：
    // - 以 `/_next`, `/api/`, `/_vercel` 开头的路径
    // - 包含点的路径（静态文件）
    '/((?!_next|api|_vercel|.*\\..*).*)',
    // 但是，匹配 `/api` 内的所有路径名以处理 CORS
    '/api/:path*',
  ],
};
