#!/bin/bash

# 静态服务器预览脚本
# 用于预览静态导出的结果

echo "启动静态服务器预览..."

# 检查 out 目录是否存在
if [ ! -d "out" ]; then
    echo "错误: out 目录不存在，请先运行 ./build-static.sh 构建静态文件"
    exit 1
fi

# 启动静态服务器
echo "静态服务器已启动在 http://localhost:8080"
echo "按 Ctrl+C 停止服务器"

# 使用 Python 的简单 HTTP 服务器
python3 -m http.server 8080 --directory out