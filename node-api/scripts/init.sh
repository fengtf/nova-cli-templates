#!/bin/bash

# 项目初始化脚本
# 用于快速设置新项目

set -e

echo "🚀 开始初始化项目..."

# 检查 Node.js 版本
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
  echo "❌ 错误: 需要 Node.js 18 或更高版本"
  exit 1
fi

# 检查 pnpm 是否安装
if ! command -v pnpm &> /dev/null; then
  echo "📦 安装 pnpm..."
  npm install -g pnpm
fi

# 安装依赖
echo "📦 安装项目依赖..."
pnpm install

# 创建环境变量文件
if [ ! -f .env.development ]; then
  echo "📝 创建 .env.development 文件..."
  cp .env.example .env.development
fi

if [ ! -f .env.production ]; then
  echo "📝 创建 .env.production 文件..."
  cp .env.example .env.production
fi

# 创建配置文件
if [ ! -f src/config/config.json ]; then
  echo "📝 创建配置文件..."
  cp src/config/config.example.json src/config/config.json
fi

# 创建日志目录
mkdir -p logs

echo "✅ 项目初始化完成！"
echo ""
echo "📋 下一步操作："
echo "  1. 编辑 .env.development 配置环境变量"
echo "  2. 编辑 src/config/config.json 配置数据库等信息"
echo "  3. 运行 pnpm start:dev 启动开发服务器"
echo ""
echo "🎉 祝您开发愉快！"
