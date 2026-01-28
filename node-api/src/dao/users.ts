import userModel from '../model/users';

export type CreateParams = {
  id: string;
  name: string;
  nickname: string;
  avatar: string;
};

class UserDao {
  // 创建
  static async create(params: CreateParams) {
    try {
      const res = await userModel.create(params);
      return [null, res.id];
    } catch (error) {
      return [error, null];
    }
  }

  // 通过id查询用户信息
  static async getUserByUserId(
    id: string
  ): Promise<[null | any, null | CreateParams]> {
    try {
      const res = await userModel.findOne({ id });
      if (res?.id) {
        return [
          null,
          {
            name: res?.name || '',
            nickname: res?.nickname || '',
            avatar: res?.avatar || '',
            id: res?.id || '',
          },
        ];
      } else {
        return [null, null];
      }
    } catch (error) {
      return [error, null];
    }
  }

  // 更新用户信息
  static async updateUser(id: string, params: Partial<CreateParams>) {
    try {
      const res = await userModel.updateOne({ id }, params);
      return [null, res];
    } catch (error) {
      return [error, null];
    }
  }
}

export default UserDao;
