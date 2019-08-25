import * as mongoose from 'mongoose';
import user from './user.interface';

const userSchema = new mongoose.Schema({
  firstName: String,
})

const userModel = mongoose.model<user & mongoose.Document>('user', userSchema);

export default userModel;