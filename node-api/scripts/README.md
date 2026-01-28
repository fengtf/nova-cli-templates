# 脚本工具

本目录包含项目的实用脚本。

## 可用脚本

### init.sh
项目初始化脚本，用于快速设置新项目。

```bash
./scripts/init.sh
```

功能：
- 检查 Node.js 版本
- 安装 pnpm（如果未安装）
- 安装项目依赖
- 创建环境变量文件
- 创建配置文件

### clean.sh
清理脚本，清理构建产物、日志、缓存等。

```bash
# 清理构建产物和日志
./scripts/clean.sh

# 清理所有内容（包括 node_modules）
./scripts/clean.sh --all
```

### docker-build.sh
Docker 构建和部署脚本。

```bash
# 构建镜像（默认 tag 为 latest）
./scripts/docker-build.sh

# 构建镜像并指定 tag
./scripts/docker-build.sh v1.0.0
```

## 使用说明

所有脚本都已添加执行权限，可以直接运行。如果遇到权限问题，请执行：

```bash
chmod +x scripts/*.sh
```
