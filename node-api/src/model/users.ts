import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  id: String,
  name: String,
  nickname: String,
  avatar: String,
  email: String,
  address: String
});

const Config = mongoose.model('users', UserSchema);

export default Config;
