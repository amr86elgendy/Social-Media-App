import mongoose from 'mongoose';

const notificationSchema = mongoose.Schema({
  recipient: {
    type: String, required: true
  },
  sender: {
    type: String, required: true
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId, required: true,
    ref: 'Post'
  },
  read: {
    type: Boolean, required: true, default: false
  },
  type: {
    type: String, required: true
  }
}, { timestamps: true });


const Notification = mongoose.model('Notification', notificationSchema)

export default Notification