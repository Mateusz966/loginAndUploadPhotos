import * as mongoose from 'mongoose';
import post from './post.interface';

const postSchema = new mongoose.Schema({
  author: { 
    type: String,
    required: true,
  },
  content: { 
    type: String,
    required: true,
  },
  imageUrl: { 
    type: String,
    required: true,
  },
  title: { 
    type: String,
    required: true,
  },
});

const postModel = mongoose.model<post & mongoose.Document>('Post', postSchema);

export default postModel;
