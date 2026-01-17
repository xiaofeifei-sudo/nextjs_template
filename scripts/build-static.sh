#!/bin/bash

# 静态导出构建脚本
# 临时重命名 proxy.ts 和移除 API 路由，构建静态导出，然后恢复文件

echo "准备静态导出构建..."

# 检查 proxy.ts 文件是否存在
if [ -f "proxy.ts" ]; then
    echo "临时重命名 proxy.ts 为 proxy.ts.bak"
    mv proxy.ts proxy.ts.bak
fi

# 临时移除 API 路由目录（使用 git 来管理）
if [ -d "app/api" ]; then
    echo "临时移除 app/api 目录"
    mv app/api /tmp/app-api-$(date +%s)
fi

# 清理 Next.js 缓存
echo "清理 Next.js 缓存..."
rm -rf .next

# 执行构建
echo "执行构建..."
pnpm build

# 恢复 API 路由目录（从 /tmp 恢复）
for dir in /tmp/app-api-*; do
    if [ -d "$dir" ]; then
        echo "恢复 app/api 目录"
        mv "$dir" app/api
        break
    fi
done

# 恢复 proxy.ts 文件
if [ -f "proxy.ts.bak" ]; then
    echo "恢复 proxy.ts 文件"
    mv proxy.ts.bak proxy.ts
fi

echo "静态导出构建完成！输出在 out/ 目录中"