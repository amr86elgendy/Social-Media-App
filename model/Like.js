import mongoose from 'mongoose';

const likeSchema = mongoose.Schema({
  
  username: {
    type: String, required: true
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId, required: true,
    ref: 'Post'
  },
  
}, { timestamps: true });


const Like = mongoose.model('Like', likeSchema)

export default Like