import type {StorybookConfig} from '@storybook/nextjs-vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

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
    ],
    viteFinal: async (config) => {
        config.plugins = [
            ...(config.plugins ?? []),
            nodePolyfills({
                protocolImports: true,
                include: [
                    'buffer',
                    'process',
                    'stream',
                    'util',
                    'events',
                    'path',
                    'url',
                    'tty'
                ],
            }),
        ];
        return config;
    }
};
export default config;
