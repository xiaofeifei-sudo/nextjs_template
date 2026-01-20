#!/bin/bash
echo "启动打包后的 Storybook 预览..."
if [ ! -d "storybook-static" ]; then
  echo "错误: storybook-static 目录不存在，请先运行 pnpm build-storybook"
  exit 1
fi
echo "静态服务器已启动在 http://localhost:6006"
echo "按 Ctrl+C 停止服务器"
python3 -m http.server 6006 --directory storybook-static
