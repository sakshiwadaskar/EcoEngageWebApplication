delete mongoose.connection.models['Post'];
import schemaConfig from './schema-config.js';
import { commentSchema } from './comment.js';
import mongoose from "mongoose";


const postSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  authorId:{
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  image: {
    type: String, // Assuming storing image URLs
  },
  comments: {
    type: [commentSchema],
    ref: 'Comment'
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
}, schemaConfig);

const Post = mongoose.model('Post', postSchema);
export default Post;