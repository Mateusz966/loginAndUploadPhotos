import * as mongoose from 'mongoose';
import post from './post.interface';

const postSchema = new mongoose.Schema({
  author: String,
  content: String,
  imageUrl: String,
  title: String,
});

const postModel = mongoose.model<post & mongoose.Document>('Post', postSchema);

export default postModel;
