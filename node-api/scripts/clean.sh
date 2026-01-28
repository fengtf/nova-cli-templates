#!/bin/bash

# 清理脚本
# 清理构建产物、日志、缓存等

set -e

echo "🧹 开始清理项目..."

# 清理构建产物
if [ -d "dist" ]; then
  echo "🗑️  删除 dist 目录..."
  rm -rf dist
fi

if [ -d "build" ]; then
  echo "🗑️  删除 build 目录..."
  rm -rf build
fi

# 清理日志文件
if [ -d "logs" ]; then
  echo "🗑️  清理日志文件..."
  rm -rf logs/*.log
fi

# 清理测试覆盖率
if [ -d "coverage" ]; then
  echo "🗑️  删除 coverage 目录..."
  rm -rf coverage
fi

# 清理 node_modules（可选）
if [ "$1" == "--all" ]; then
  echo "🗑️  删除 node_modules 目录..."
  rm -rf node_modules
  echo "📦 重新安装依赖..."
  pnpm install
fi

echo "✅ 清理完成！"
