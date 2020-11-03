import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  body: {
    type: String, required: true
  },
  username: {
    type: String, required: true
  },
  userImage: {
    type: String, required: true,
    default: 'uploads/no-img.png'
  },
  likeCount: {
    type: Number, default: 0
  },
  commentCount: {
    type: Number, default: 0
  },
  comments: []
}, { timestamps: true });


const Post = mongoose.model('Post', postSchema)

export default Post