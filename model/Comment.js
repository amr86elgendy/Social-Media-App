import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
  body: {
    type: String, required: true
  },
  username: {
    type: String, required: true
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId, required: true,
    ref: 'Post'
  },
  userImage: {
    type: String, required: true
  }
  
}, { timestamps: true });


const Comment = mongoose.model('Comment', commentSchema)

export default Comment