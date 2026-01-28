import mongoose from 'mongoose';

/**
 * 示例数据模型
 */
const ExampleSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    status: {
      type: Number,
      default: 1, // 1: 启用, 0: 禁用
    },
    createdBy: {
      type: String,
      default: '',
    },
    updatedBy: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true, // 自动添加 createdAt 和 updatedAt 字段
  }
);

const ExampleModel = mongoose.model('examples', ExampleSchema);

export default ExampleModel;
