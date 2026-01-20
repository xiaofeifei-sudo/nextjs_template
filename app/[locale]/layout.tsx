import type { Metadata } from "next";
import { 
  // 标题与展示
  Outfit,
  Space_Grotesk,
  Poppins,
  Raleway,
  Manrope,
  
  // 正文
  Plus_Jakarta_Sans,
  Inter,
  Nunito,
  DM_Sans,
  Source_Sans_3,
  
  // 衬线与优雅
  Playfair_Display,
  Lora,
  Merriweather,
  
  // 等宽字体
  JetBrains_Mono,
  Fira_Code,
  
  // 手写风格
  Caveat,
} from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import type { Locale } from '@/i18n/routing';
import { ReactQueryProvider } from '@/components/react-query-provider';

// === 字体配置 ===
const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"] });
const poppins = Poppins({ variable: "--font-poppins", subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });
const raleway = Raleway({ variable: "--font-raleway", subsets: ["latin"] });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });
const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const nunito = Nunito({ variable: "--font-nunito", subsets: ["latin"] });
const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"] });
const sourceSans = Source_Sans_3({ variable: "--font-source-sans", subsets: ["latin"] });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"] });
const lora = Lora({ variable: "--font-lora", subsets: ["latin"] });
const merriweather = Merriweather({ variable: "--font-merriweather", subsets: ["latin"], weight: ["300", "400", "700", "900"] });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });
const firaCode = Fira_Code({ variable: "--font-fira-code", subsets: ["latin"] });
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"] });

const fontVariables = [
  outfit, spaceGrotesk, poppins, raleway, manrope,
  jakarta, inter, nunito, dmSans, sourceSans,
  playfair, lora, merriweather,
  jetbrainsMono, firaCode,
  caveat,
].map(font => font.variable).join(' ');

// 为所有支持的语言生成静态路径参数
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// 页面默认元信息（示例）
export const metadata: Metadata = {
  title: "Layout",
  description: "Layout for Next.js Boilerplate",
};

// Layout 组件的 Props 类型
type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  
  // 校验 locale 是否受支持
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // 启用静态渲染并设置当前请求的语言
  setRequestLocale(locale as Locale);

  // 获取当前语言的国际化消息
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${fontVariables} antialiased font-sans bg-background`}>
        {/* 国际化上下文：提供给客户端组件的文案与格式化 */}
        <NextIntlClientProvider messages={messages}>
          {/* 主题提供者：支持系统主题、明暗切换 */}
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* React Query 提供者：为页面/组件提供数据缓存与请求管理 */}
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
