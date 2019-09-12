import * as mongoose from 'mongoose';
import user from './userInterface';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  }
})

const userModel = mongoose.model<user & mongoose.Document>('user', userSchema);

export default userModel;