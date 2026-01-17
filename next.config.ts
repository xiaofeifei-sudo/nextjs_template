import { routing } from './i18n/routing';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  // ============================================
  // 输出配置
  // ============================================
  
  // 配置静态导出
  // undefined: 默认构建输出，.next 目录，适用于生产模式 `next start` 或 Vercel 等托管提供商
  // 'standalone': 独立构建输出，.next/standalone 目录，仅包含必要的文件/依赖。适用于 Docker 容器自托管
  // 'export': 导出构建输出，out 目录，仅包含静态 HTML/CSS/JS。适用于无 Node.js 服务器的自托管
  output: 'export',
  
  // URL 尾部斜杠配置
  // true: 所有 URL 都以 / 结尾 (如 /about/)
  // false: 所有 URL 都不以 / 结尾 (如 /about)
  // undefined: 保持原样
  trailingSlash: true,
  
  // 自定义构建输出目录，默认为 '.next'
  // distDir: 'build',
  
  // 构建输出目录（默认为 '.next'）现在默认会被清理，除了 Next.js 缓存
  // cleanDistDir: true,
  
  // ============================================
  // 路径配置
  // ============================================
  
  // 在域名的子路径下部署 Next.js 应用
  // basePath: '/base-path',
  
  // 设置 CDN，可以设置资源前缀并配置 CDN 的源以解析到 Next.js 托管的域
  // assetPrefix: 'https://cdn.example.com',
  
  // ============================================
  // 图片优化配置
  // ============================================
  
  images: {
    // 静态导出时需要禁用图片优化
    unoptimized: true,
    
    // 允许的图片域名白名单
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'example.com',
    //     port: '',
    //     pathname: '/images/**',
    //   },
    // ],
    
    // 图片尺寸列表，用于优化
    // imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // 设备尺寸列表
    // deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    
    // 图片格式配置
    // formats: ['image/avif', 'image/webp'],
    
    // 最小缓存时间（秒）
    // minimumCacheTTL: 60,
  },
  
  // ============================================
  // 环境变量配置
  // ============================================
  
  // 在服务端暴露给浏览器的环境变量前缀
  // env: {
  //   CUSTOM_KEY: 'my-value',
  // },
  
  // ============================================
  // 编译配置
  // ============================================
  
  // 启用 React 严格模式
  // reactStrictMode: true,
  
  // SWC 压缩配置
  // swcMinify: true,
  
  // 编译器选项
  compiler: {
    // 移除控制台输出
    // removeConsole: process.env.NODE_ENV === 'production',
    // removeConsole: {
    //   exclude: ['error', 'warn'],
    // },
    
    // 移除 React 属性
    // reactRemoveProperties: true,
    // reactRemoveProperties: {
    //   properties: ['data-custom'],
    // },
    
    // Relay 配置
    // relay: {
    //   src: './src',
    //   artifactDirectory: './__generated__',
    //   language: 'typescript',
    //   eagerEsModules: true,
    // },
    
    // Styled Components 配置
    // styledComponents: true,
    // styledComponents: {
    //   displayName: true,
    //   ssr: true,
    //   fileName: true,
    //   topLevelImportPaths: ['@mui/material', '@mui/icons-material'],
    // },
    
    // Emotion 配置
    // emotion: true,
    // emotion: {
    //   sourceMap: true,
    //   autoLabel: 'dev-only',
    //   labelFormat: '[filename]--[local]',
    // },
    
    // Styled JSX 配置
    // styledJsx: true,
    // styledJsx: {
    //   useLightningcss: true,
    // },
    
    // 编译时替换变量
    // define: {
    //   'process.env.CUSTOM_VAR': JSON.stringify('value'),
    // },
    
    // 编译时替换服务端变量
    // defineServer: {
    //   'process.env.SERVER_VAR': JSON.stringify('server-value'),
    // },
    
    // 生产构建编译完成后执行的钩子函数
    // runAfterProductionCompile: async ({ projectDir, distDir }) => {
    //   console.log('Build completed:', projectDir, distDir);
    // },
  },
  
  // ============================================
  // React 编译器配置
  // ============================================
  
  // 启用 React 编译器
  // reactCompiler: true,
  // reactCompiler: {
  //   compilationMode: 'infer',
  //   panicThreshold: 'none',
  // },
  
  // ============================================
  // React 性能分析
  // ============================================
  
  // 在生产环境中启用 React 性能分析
  // reactProductionProfiling: false,
  
  // React 发出的响应头的最大长度
  // reactMaxHeadersLength: 1000,
  
  // ============================================
  // 实验性功能
  // ============================================
  
  experimental: {
    // 启用服务器组件
    // serverComponentsExternalPackages: ['package-name'],
    
    // 启用优化包导入
    // optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
    
    // 启用类型化路由
    // typedRoutes: true,
    
    // 启用类型化环境变量
    // typedEnv: true,
    
    // 启用缓存组件
    // cacheComponents: true,
    
    // 启用服务器最小化
    // serverMinification: true,
    
    // 启用服务器源映射
    // serverSourceMaps: false,
    
    // 启用并行服务器编译
    // parallelServerCompiles: true,
    
    // 启用并行服务器构建追踪
    // parallelServerBuildTraces: true,
    
    // 启用 Webpack 构建工作线程
    // webpackBuildWorker: true,
    
    // 启用 Webpack 内存优化
    // webpackMemoryOptimizations: true,
    
    // 启用 Turbopack
    // turbopack: {
    //   resolveAlias: {
    //     '@': './src',
    //   },
    //   resolveExtensions: ['.ts', '.tsx', '.js', '.jsx'],
    //   rules: {
    //     '*.svg': {
    //       loaders: ['@svgr/webpack'],
    //     },
    //   },
    //   debugIds: true,
    //   minify: true,
    //   sourceMaps: true,
    //   treeShaking: true,
    //   removeUnusedExports: true,
    //   useSystemTlsCerts: false,
    //   useBuiltinBabel: true,
    //   useBuiltinSass: true,
    //   moduleIds: 'deterministic',
    // },
    
    // 启用 MDX Rust 编译器
    // mdxRs: true,
    // mdxRs: {
    //   development: true,
    //   jsx: true,
    //   jsxRuntime: 'automatic',
    //   jsxImportSource: 'react',
    //   providerImportSource: '@mdx-js/react',
    //   mdxType: 'gfm',
    // },
    
    // 启用污点 API
    // taint: true,
    
    // 服务器操作配置
    // serverActions: {
    //   bodySizeLimit: '1mb',
    //   allowedOrigins: ['my-app.com', '*.my-app.com'],
    // },
    
    // 启用 CSS 分块
    // cssChunking: true,
    // cssChunking: 'strict',
    
    // 禁用 PostCSS Preset Env
    // disablePostcssPresetEnv: true,
    
    // 启用优化 CSS
    // optimizeCss: true,
    
    // 启用 Worker 线程
    // workerThreads: true,
    
    // 启用滚动恢复
    // scrollRestoration: true,
    
    // 启用外部目录
    // externalDir: true,
    
    // 启用 URL 导入
    // urlImports: {
    //   allowedOrigins: ['https://example.com'],
    // },
    
    // 启用 SWC 插件
    // swcPlugins: [
    //   ['plugin-name', { option: 'value' }],
    // ],
    
    // 启用 SWC 追踪性能分析
    // swcTraceProfiling: true,
    
    // 启用强制 SWC 转换
    // forceSwcTransforms: true,
    
    // 启用子资源完整性
    // sri: {
    //   algorithm: 'sha256',
    // },
    
    // Web Vitals 归因
    // webVitalsAttribution: ['CLS', 'LCP', 'FID', 'FCP', 'TTFB', 'INP'],
    
    // 启用客户端追踪元数据
    // clientTraceMetadata: ['trace-id'],
    
    // 启用验证 RSC 请求头
    // validateRSCRequestHeaders: true,
    
    // 移除未捕获错误和拒绝监听器
    // removeUncaughtErrorAndRejectionListeners: true,
    
    // 启用多区域草稿模式
    // multiZoneDraftMode: true,
    
    // 启用应用导航失败处理
    // appNavFailHandling: true,
    
    // 启用预渲染早期退出
    // prerenderEarlyExit: true,
    
    // 启用链接无触摸开始
    // linkNoTouchStart: true,
    
    // 启用区分大小写路由
    // caseSensitiveRoutes: true,
    
    // 启用动态悬停
    // dynamicOnHover: true,
    
    // 启用预加载条目开始
    // preloadEntriesOnStart: true,
    
    // 启用客户端路由过滤器
    // clientRouterFilter: true,
    // clientRouterFilterRedirects: true,
    // clientRouterFilterAllowedRate: 10,
    
    // 启用代理预取
    // proxyPrefetch: 'strict',
    // proxyPrefetch: 'flexible',
    
    // 启用手动客户端基础路径
    // manualClientBasePath: true,
    
    // 启用乐观客户端缓存
    // optimisticClientCache: true,
    
    // 启用 ISR 刷新到磁盘
    // isrFlushToDisk: true,
    
    // 启用代理超时
    // proxyTimeout: 30000,
    
    // 启用 Next Script Workers
    // nextScriptWorkers: true,
    
    // 启用 CRA 兼容
    // craCompat: true,
    
    // 启用 ESM 外部
    // esmExternals: true,
    // esmExternals: 'loose',
    
    // 启用完全指定
    // fullySpecified: true,
    
    // 启用大页面数据字节
    // largePageDataBytes: 128000,
    
    // 启用 CPU 数量
    // cpus: 4,
    
    // 启用基于内存的工作线程计数
    // memoryBasedWorkersCount: true,
    
    // 启用图片优化并发
    // imgOptConcurrency: 4,
    // imgOptTimeoutInSeconds: 60,
    // imgOptMaxInputPixels: 268402689,
    // imgOptSequentialRead: true,
    // imgOptSkipMetadata: true,
    
    // 启用获取缓存键前缀
    // fetchCacheKeyPrefix: 'prefix',
    
    // 启用允许的重新验证头键
    // allowedRevalidateHeaderKeys: ['x-revalidate'],
    
    // 启用客户端参数解析源
    // clientParamParsingOrigins: ['example.com'],
    
    // 启用扩展别名
    // extensionAlias: {
    //   '.js': ['.ts', '.tsx'],
    // },
    
    // 启用外部代理重写解析
    // externalProxyRewritesResolve: true,
    
    // 启用使用倾斜 Cookie
    // useSkewCookie: true,
  },
  
  // ============================================
  // Webpack 配置
  // ============================================
  
  // webpack: (config, { isServer, dev, dir, buildId, config: nextConfig, defaultLoaders, totalPages, nextRuntime }) => {
  //   自定义 webpack 配置
  //   return config;
  // },
  
  // ============================================
  // 头部配置
  // ============================================
  
  // async headers() {
  //   return [
  //     {
  //       source: '/:path*',
  //       headers: [
  //         {
  //           key: 'X-DNS-Prefetch-Control',
  //           value: 'on'
  //         },
  //         {
  //           key: 'X-Frame-Options',
  //           value: 'SAMEORIGIN'
  //         },
  //         {
  //           key: 'X-Content-Type-Options',
  //           value: 'nosniff'
  //         },
  //         {
  //           key: 'Referrer-Policy',
  //           value: 'strict-origin-when-cross-origin'
  //         },
  //       ],
  //     },
  //   ];
  // },
  
  // ============================================
  // 重定向配置
  // ============================================
  
  // async redirects() {
  //   return [
  //     {
  //       source: '/old-path',
  //       destination: '/new-path',
  //       permanent: true,
  //     },
  //   ];
  // },
  
  // ============================================
  // 重写配置
  // ============================================
  
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'https://api.example.com/:path*',
  //     },
  //   ];
  // },
  
  // ============================================
  // 页面扩展名
  // ============================================
  
  // pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  
  // ============================================
  // 日志配置
  // ============================================
  
  // logging: {
  //   fetches: {
  //     fullUrl: true,
  //     hmrRefreshes: true,
  //   },
  //   incomingRequests: true,
  //   incomingRequests: {
  //     ignore: [/\/_next\/health/, /\/api\/health/],
  //   },
  // },
  
  // ============================================
  // 开发环境配置
  // ============================================
  
  // 开发环境指示器配置
  // devIndicators: {
  //   position: 'bottom-left',
  // },
  // devIndicators: false,
  
  // 允许的开发源
  // allowedDevOrigins: ['localhost:3000', '*.example.com'],
  
  // 页面在内存中保持的时间（毫秒）
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  
  // ============================================
  // 生产环境源码映射
  // ============================================
  
  // productionBrowserSourceMaps: false,
  
  // 启用预渲染源映射
  // enablePrerenderSourceMaps: false,
  
  // ============================================
  // TypeScript 配置
  // ============================================
  
  // typescript: {
  //   构建时忽略 TypeScript 错误
  //   ignoreBuildErrors: false,
  //   自定义 tsconfig 文件路径
  //   tsconfigPath: './tsconfig.json',
  // },
  
  // ============================================
  // ESLint 配置
  // ============================================
  
  // eslint: {
  //   构建时忽略 ESLint 错误
  //   ignoreDuringBuilds: false,
  // },
  
  // ============================================
  // 压缩配置
  // ============================================
  
  // compress: true,
  
  // ============================================
  // 生成 Etags
  // ============================================
  
  // generateEtags: true,
  
  // ============================================
  // 静态页面生成配置
  // ============================================
  
  // generateBuildId: async () => {
  //   return 'my-build-id';
  // },
  
  // 静态页面生成超时（秒）
  // staticPageGenerationTimeout: 60,
  
  // ============================================
  // 国际化配置（已通过 next-intl 配置）
  // ============================================
  
  // i18n: {
  //   locales: ['en', 'zh'],
  //   defaultLocale: 'en',
  //   localeDetection: true,
  // },
  
  // ============================================
  // 缓存配置
  // ============================================
  
  // 默认的 Pages 和 App Router 缓存处理器使用文件系统缓存
  // cacheHandler: './cache-handler.js',
  // cacheHandlers: {
  //   default: './cache-handler.js',
  //   remote: './remote-cache-handler.js',
  //   static: './static-cache-handler.js',
  // },
  
  // 配置内存缓存大小（字节），默认为 50 MB
  // 如果 cacheMaxMemorySize: 0，则完全禁用内存缓存
  // cacheMaxMemorySize: 52428800,
  
  // 缓存生命周期配置
  // cacheLife: {
  //   default: {
  //     stale: undefined,
  //     revalidate: 60,
  //     expire: 86400,
  //   },
  //   seconds: {
  //     stale: 1,
  //     revalidate: 1,
  //     expire: 60,
  //   },
  //   minutes: {
  //     stale: 60,
  //     revalidate: 300,
  //     expire: 3600,
  //   },
  //   hours: {
  //     stale: 3600,
  //     revalidate: 86400,
  //     expire: 86400,
  //   },
  //   days: {
  //     stale: 86400,
  //     revalidate: 604800,
  //     expire: 2592000,
  //   },
  //   weeks: {
  //     stale: 604800,
  //     revalidate: 2592000,
  //     expire: 18144000,
  //   },
  //   max: {
  //     stale: Infinity,
  //     revalidate: Infinity,
  //     expire: 31536000,
  //   },
  // },
  
  // 服务器允许提供过期缓存的周期（秒）
  // expireTime: 60,
  
  // ============================================
  // 文件系统路由
  // ============================================
  
  // 默认情况下，Next.js 将在 pages 文件夹中提供每个文件，文件名匹配的路径名
  // 要禁用此行为并防止基于路由设置，请将其设置为 false
  // useFileSystemPublicRoutes: true,
  
  // ============================================
  // 部署配置
  // ============================================
  
  // 部署的唯一标识符，将包含在每个请求的查询字符串或头中
  // deploymentId: 'my-deployment-id',
  
  // ============================================
  // 跨域配置
  // ============================================
  
  // 为 Head 或 NextScript 组件生成的 <script> 元素添加 "crossorigin" 属性
  // crossOrigin: 'anonymous',
  // crossOrigin: 'use-credentials',
  
  // ============================================
  // HTTP 代理配置
  // ============================================
  
  // Next.js 默认启用 HTTP Keep-Alive
  // 您可能希望为某些 fetch() 调用或全局禁用 HTTP Keep-Alive
  // httpAgentOptions: {
  //   keepAlive: true,
  // },
  
  // ============================================
  // 导出路径映射
  // ============================================
  
  // exportPathMap: async function (defaultMap, { dev, dir, outDir, distDir, buildId }) {
  //   return {
  //     '/': { page: '/' },
  //     '/about': { page: '/about' },
  //   };
  // },
  
  // ============================================
  // 转译包配置
  // ============================================
  
  // 自动转译和打包本地包（如 monorepos）或外部依赖（node_modules）的依赖
  // transpilePackages: ['@ui/components', '@ui/utils'],
  
  // ============================================
  // 模块化导入配置
  // ============================================
  
  // modularizeImports: {
  //   'lodash': {
  //     transform: 'lodash/{{member}}',
  //     preventFullImport: true,
  //   },
  //   '@mui/material': {
  //     transform: '@mui/material/{{member}}',
  //     skipDefaultConversion: false,
  //   },
  // },
  
  // ============================================
  // Turbopack 配置
  // ============================================
  
  // turbopack: {
  //   resolveAlias: {
  //     '@': './src',
  //   },
  //   resolveExtensions: ['.ts', '.tsx', '.js', '.jsx'],
  //   rules: {
  //     '*.svg': {
  //       loaders: ['@svgr/webpack'],
  //     },
  //   },
  //   debugIds: true,
  //   minify: true,
  //   sourceMaps: true,
  //   treeShaking: true,
  //   removeUnusedExports: true,
  //   useSystemTlsCerts: false,
  //   useBuiltinBabel: true,
  //   useBuiltinSass: true,
  //   moduleIds: 'deterministic',
  // },
  
  // ============================================
  // 代理配置
  // ============================================
  
  // 跳过代理 URL 规范化
  // skipProxyUrlNormalize: true,
  
  // 跳过尾部斜杠重定向
  // skipTrailingSlashRedirect: true,
  
  // ============================================
  // Sass 配置
  // ============================================
  
  // sassOptions: {
  //   implementation: require('sass'),
  //   includePaths: ['./styles'],
  // },
  
  // ============================================
  // 文件追踪配置
  // ============================================
  
  // 这是仓库根目录，通常只有此目录上方的文件会被追踪和包含
  // outputFileTracingRoot: './',
  
  // 如果在每页基础上错误地包含了太多文件，这允许手动排除追踪的文件
  // outputFileTracingExcludes: {
  //   '/api/**': ['./node_modules/**'],
  // },
  
  // 如果某些文件在每页基础上未被检测到，这允许手动包含追踪的文件
  // outputFileTracingIncludes: {
  //   '/api/**': ['./config/**'],
  // },
  
  // ============================================
  // 监视选项配置
  // ============================================
  
  // watchOptions: {
  //   pollIntervalMs: 1000,
  // },
  
  // ============================================
  // Pages Router 依赖配置
  // ============================================
  
  // 启用打包 node_modules 包（外部）用于页面服务端包
  // bundlePagesRouterDependencies: true,
  
  // 应该在服务端构建中视为外部的包列表
  // serverExternalPackages: ['package-name'],
  
  // ============================================
  // 机器人配置
  // ============================================
  
  // 可以处理流式元数据的爬虫的用户代理
  // htmlLimitedBots: /Mediapartners-Google|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview/i,
  
  // ============================================
  // 其他配置
  // ============================================
  
  // 排除默认的 Moment.js 语言环境
  // excludeDefaultMomentLocales: true,
  
  // 启用或禁用 X-Powered-By 头
  // poweredByHeader: true,
  
  // 类型化路由
  // typedRoutes: true,
};

export default withNextIntl(nextConfig);
