import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  stories: [
    {
      directory: '../stories',
      files: '**/*.stories.@(js|jsx|mjs|ts|tsx)',
    },
    {
      directory: '../stories',
      files: '**/*.mdx',
    },
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    
  ],
  "framework": "@storybook/nextjs-vite",
  "staticDirs": [
    "../public"
  ]
};
export default config;
