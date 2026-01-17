# ourin-nextjs-starter

一个基于 Next.js 16 的现代 Web 应用程序启动模板，包含多字体排版系统、实用工具、自定义钩子和暗色模式 UI。

## 技术栈

- **Next.js 16** - React 全栈框架，支持 App Router
- **React 19** - 用户界面库
- **TypeScript 5** - 类型安全的 JavaScript
- **Tailwind CSS 4** - 实用优先的 CSS 框架
- **Framer Motion** - 动画库
- **next-intl** - 国际化支持
- **next-themes** - 主题切换支持
- **Zustand** - 状态管理
- **React Hook Form** - 表单处理
- **Lucide React** - 图标库

## 特性

- 🎨 **多字体排版系统** - 8 种精选字体，包括显示字体、正文字体、等宽字体和手写字体
- 🛠️ **185+ 实用工具** - 涵盖字符串、数组、日期、验证、加密、异步等常用功能
- 🪝 **20+ 自定义钩子** - 包括防抖、节流、本地存储、媒体查询、网络状态等
- 🌙 **暗色模式** - 完整的暗色/亮色主题切换支持
- 🌍 **国际化** - 支持多语言（英语、印尼语）
- 🎵 **音频系统** - 内置音效和 Spotify 播放器
- 📱 **响应式设计** - 适配各种屏幕尺寸
- ⚡ **性能优化** - 代码分割、懒加载、图像优化
- 🎭 **动画效果** - 丰富的页面过渡和交互动画
- 🔧 **TypeScript** - 完整的类型安全支持

## 目录结构

```
ourin-nextjs-starter/
├── app/                          # Next.js App Router 目录
│   ├── [locale]/                  # 国际化路由
│   │   ├── privacy/              # 隐私政策页面
│   │   │   └── page.tsx
│   │   ├── terms/                # 服务条款页面
│   │   │   └── page.tsx
│   │   ├── layout.tsx            # 国际化布局
│   │   └── page.tsx             # 国际化首页
│   ├── api/                      # API 路由
│   │   ├── health/              # 健康检查 API
│   │   │   └── route.ts
│   │   └── users/              # 用户 API
│   │       ├── [id]/            # 动态用户路由
│   │       │   └── route.ts
│   │       └── route.ts
│   ├── privacy/                  # 隐私政策页面
│   │   └── page.tsx
│   ├── terms/                    # 服务条款页面
│   │   └── page.tsx
│   ├── globals.css               # 全局样式
│   ├── layout.tsx               # 根布局
│   └── page.tsx                # 首页
├── components/                   # React 组件
│   ├── ui/                     # UI 组件
│   │   ├── skiper/             # 主题切换器
│   │   ├── animated-beam.tsx   # 动画光束
│   │   ├── button.tsx          # 按钮组件
│   │   ├── highlighter.tsx     # 高亮器
│   │   ├── interactive-hover-button.tsx # 交互悬停按钮
│   │   ├── layout-text-flip.tsx # 文本翻转动画
│   │   ├── magic-card.tsx      # 魔法卡片
│   │   ├── sticky-banner.tsx   # 粘性横幅
│   │   └── word-rotate.tsx     # 文字旋转
│   ├── animated-theme-toggle.tsx # 动画主题切换
│   ├── back-to-top.tsx         # 返回顶部
│   ├── scroll-progress.tsx      # 滚动进度
│   ├── spotify-modal.tsx        # Spotify 模态框
│   ├── theme-provider.tsx       # 主题提供者
│   └── theme-toggle.tsx        # 主题切换
├── config/                     # 配置文件
│   └── site.ts                # 网站配置
├── constants/                   # 常量
│   └── index.ts               # 常量定义
├── hooks/                      # 自定义钩子
│   ├── index.ts               # 钩子导出
│   ├── use-async.ts          # 异步钩子
│   ├── use-copy-to-clipboard.ts # 复制到剪贴板
│   ├── use-countdown.ts       # 倒计时
│   ├── use-debounce.ts       # 防抖
│   ├── use-element-size.ts    # 元素尺寸
│   ├── use-fetch.ts          # 数据获取
│   ├── use-hover.ts          # 悬停状态
│   ├── use-intersection-observer.ts # 交叉观察器
│   ├── use-interval.ts       # 定时器
│   ├── use-keyboard-shortcut.ts # 键盘快捷键
│   ├── use-local-storage.ts   # 本地存储
│   ├── use-media-query.ts    # 媒体查询
│   ├── use-network-status.ts  # 网络状态
│   ├── use-on-click-outside.ts # 外部点击
│   ├── use-previous.ts       # 上一个值
│   ├── use-scroll-position.ts # 滚动位置
│   ├── use-sound.ts         # 音效
│   ├── use-throttle.ts       # 节流
│   ├── use-toggle.ts         # 切换状态
│   └── use-window-size.ts    # 窗口尺寸
├── i18n/                      # 国际化配置
│   ├── navigation.ts          # 导航配置
│   ├── request.ts            # 请求配置
│   └── routing.ts           # 路由配置
├── lib/                       # 工具库
│   ├── utils/                # 实用工具
│   │   ├── api.ts          # API 工具
│   │   ├── array.ts        # 数组工具
│   │   ├── async.ts        # 异步工具
│   │   ├── browser.ts      # 浏览器工具
│   │   ├── color.ts        # 颜色工具
│   │   ├── crypto.ts       # 加密工具
│   │   ├── date.ts         # 日期工具
│   │   ├── dom.ts          # DOM 工具
│   │   ├── format.ts       # 格式化工具
│   │   ├── index.ts        # 工具导出
│   │   ├── number.ts       # 数字工具
│   │   ├── object.ts       # 对象工具
│   │   ├── sound.ts        # 音效工具
│   │   ├── storage.ts      # 存储工具
│   │   ├── string.ts       # 字符串工具
│   │   └── validation.ts   # 验证工具
│   └── utils.ts             # 通用工具
├── messages/                   # 国际化消息
│   ├── en.json              # 英语消息
│   └── id.json              # 印尼语消息
├── public/                    # 静态资源
│   ├── anjay.jpeg           # 图片
│   ├── file.svg             # SVG 图标
│   ├── globe.svg            # SVG 图标
│   ├── logo.png             # Logo
│   ├── next.svg             # Next.js 图标
│   ├── vercel.svg           # Vercel 图标
│   └── window.svg           # SVG 图标
├── scripts/                   # 脚本文件
│   ├── build-static.sh      # 静态导出构建脚本
│   ├── serve-static.sh      # 静态服务器脚本
│   └── README.md           # 脚本说明
├── types/                     # 类型定义
│   └── index.ts             # 类型导出
├── .gitignore                 # Git 忽略文件
├── CHANGELOG.md               # 更新日志
├── LICENSE                    # 许可证
├── README.md                 # 项目说明
├── components.json            # 组件配置
├── eslint.config.mjs          # ESLint 配置
├── middleware.ts             # 中间件（已重命名为 proxy.ts）
├── next.config.ts            # Next.js 配置
├── package.json              # 项目依赖和脚本
├── pnpm-lock.yaml           # pnpm 锁文件
├── postcss.config.mjs        # PostCSS 配置
└── tsconfig.json            # TypeScript 配置
```

## 开发脚本

- `pnpm dev` - 启动开发服务器
- `pnpm build` - 构建生产版本
- `pnpm start` - 启动生产服务器
- `pnpm lint` - 运行 ESLint
- `pnpm run build:static` - 构建静态导出版本
- `pnpm run serve:static` - 预览静态导出版本

## 静态导出

项目支持静态导出，可以部署到任何静态托管服务。运行 `pnpm run build:static` 即可生成静态文件到 `out/` 目录。