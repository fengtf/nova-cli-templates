# 测试目录

本目录包含项目的所有测试文件。

## 目录结构

```
tests/
├── unit/           # 单元测试
├── integration/    # 集成测试
└── e2e/           # 端到端测试
```

## 运行测试

```bash
# 运行所有测试
pnpm test

# 运行单元测试
pnpm test:unit

# 运行集成测试
pnpm test:integration

# 查看测试覆盖率
pnpm test:coverage
```

## 编写测试

测试文件应该以 `.test.ts` 或 `.spec.ts` 结尾。

示例：

```typescript
import { describe, it, expect } from '@jest/globals';

describe('示例测试', () => {
  it('应该返回正确的结果', () => {
    expect(1 + 1).toBe(2);
  });
});
```
