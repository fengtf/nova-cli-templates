FROM node:22.8-alpine3.19

# 安装必要的系统依赖
RUN apk add --no-cache git openssh

# 设置时区
ENV TZ=Asia/Shanghai

# 设置工作目录
WORKDIR /usr/app

# 复制项目文件
COPY . /usr/app

# 安装 pnpm
RUN npm install -g pnpm

# 安装依赖
RUN pnpm install --frozen-lockfile

# 启动应用
CMD ["pnpm", "run", "start:prod"]

# 暴露端口
EXPOSE 80

