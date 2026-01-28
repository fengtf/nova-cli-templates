import { describe, it, expect } from '@jest/globals';
import Resolve from '@/lib/helper';

describe('Resolve Helper', () => {
  let resolve: Resolve;

  beforeEach(() => {
    resolve = new Resolve();
  });

  describe('json', () => {
    it('应该返回成功的 JSON 响应', () => {
      const data = { id: 1, name: 'test' };
      const result = resolve.json(data);

      expect(result).toEqual({
        code: 200,
        msg: 'success',
        errorCode: 0,
        data,
      });
    });

    it('应该支持自定义消息', () => {
      const data = { id: 1 };
      const result = resolve.json(data, '创建成功');

      expect(result.msg).toBe('创建成功');
      expect(result.data).toEqual(data);
    });
  });

  describe('fail', () => {
    it('应该返回失败的响应', () => {
      const error = new Error('测试错误');
      const result = resolve.fail(error, '操作失败');

      expect(result).toEqual({
        msg: '操作失败',
        error: '测试错误',
        errorCode: 10001,
      });
    });

    it('应该处理字符串错误', () => {
      const result = resolve.fail('错误信息', '操作失败');

      expect(result.error).toBe('错误信息');
    });
  });

  describe('success', () => {
    it('应该返回成功响应', () => {
      const result = resolve.success('操作成功');

      expect(result).toEqual({
        msg: '操作成功',
        code: 200,
        errorCode: 0,
      });
    });
  });
});
