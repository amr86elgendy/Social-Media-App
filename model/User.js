import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
  username: {
    type: String, required: true, unique: true
  },
  email: {
    type: String, required: true, unique: true
  },
  password: {
    type: String, required: true
  },
  imageUrl: {
    type: String,
    default: "/user/uploads/no-img.png"
  },
  bio: {
    type: String, default: ''
  },
  location: {
    type: String, default: ''
  },
  website: {
    type: String, default: ''
  }
}, { timestamps: true });


userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

// userSchema.methods.matchPassword = async function(enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password)
// }

const User = mongoose.model('User', userSchema)

export default User