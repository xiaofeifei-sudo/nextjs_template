import { routing } from './i18n/routing';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  // Configure static export
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
};

export default withNextIntl(nextConfig);
