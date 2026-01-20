import { isBrowser } from '@/lib/utils/browser'
import { routing } from '@/i18n/routing'
import { siteConfig } from '@/config/site'

const readCookie = (name: string): string | undefined => {
  if (!isBrowser) return undefined
  const parts = document.cookie.split(';').map(s => s.trim())
  const match = parts.find(s => s.startsWith(`${name}=`))
  if (!match) return undefined
  return decodeURIComponent(match.split('=')[1] || '')
}

export function getCurrentLocale(): string {
  const ck = readCookie('NEXT_LOCALE')
  if (ck) return ck
  if (isBrowser) {
    const seg = window.location.pathname.split('/').filter(Boolean)[0]
    if (routing.locales.includes(seg as any)) return seg
  }
  return siteConfig.i18n.defaultLocale
}
