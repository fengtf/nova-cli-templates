#!/bin/bash

# Docker 构建和部署脚本

set -e

IMAGE_NAME="node-api-template"
IMAGE_TAG="${1:-latest}"
CONTAINER_NAME="node-api-server"

echo "🐳 开始构建 Docker 镜像..."

# 构建镜像
docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .

echo "✅ 镜像构建完成: ${IMAGE_NAME}:${IMAGE_TAG}"

# 询问是否运行容器
read -p "是否立即运行容器? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  # 停止并删除旧容器
  if [ "$(docker ps -aq -f name=${CONTAINER_NAME})" ]; then
    echo "🛑 停止旧容器..."
    docker stop ${CONTAINER_NAME}
    docker rm ${CONTAINER_NAME}
  fi

  # 运行新容器
  echo "🚀 启动容器..."
  docker run -d \
    --name ${CONTAINER_NAME} \
    -p 3050:80 \
    -e SERVER_PORT=80 \
    -e CURRENT_ENV=prod \
    ${IMAGE_NAME}:${IMAGE_TAG}

  echo "✅ 容器已启动！"
  echo "📍 访问地址: http://localhost:3050"
fi
