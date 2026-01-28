import ExampleModel from '@/model/example';

/**
 * 示例 DAO 层
 * 用于处理数据库操作
 */
class ExampleDao {
  /**
   * 创建数据
   */
  async create(data: any) {
    try {
      const result = await ExampleModel.create(data);
      return [null, result];
    } catch (error) {
      return [error, null];
    }
  }

  /**
   * 根据 ID 查询
   */
  async getById(id: string) {
    try {
      const result = await ExampleModel.findOne({ id });
      return [null, result];
    } catch (error) {
      return [error, null];
    }
  }

  /**
   * 查询列表
   */
  async getList(query: any = {}, options: any = {}) {
    try {
      const { page = 1, pageSize = 10 } = options;
      const skip = (page - 1) * pageSize;

      const total = await ExampleModel.countDocuments(query);
      const list = await ExampleModel.find(query).skip(skip).limit(pageSize);

      return [
        null,
        {
          list,
          total,
          page,
          pageSize,
        },
      ];
    } catch (error) {
      return [error, null];
    }
  }

  /**
   * 更新数据
   */
  async update(id: string, data: any) {
    try {
      const result = await ExampleModel.findOneAndUpdate({ id }, data, { new: true });
      return [null, result];
    } catch (error) {
      return [error, null];
    }
  }

  /**
   * 删除数据
   */
  async delete(id: string) {
    try {
      const result = await ExampleModel.findOneAndDelete({ id });
      return [null, result];
    } catch (error) {
      return [error, null];
    }
  }
}

export default new ExampleDao();
