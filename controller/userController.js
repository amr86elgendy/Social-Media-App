import User from '../model/User.js';
import Post from '../model/Post.js';
import Notification from '../model/Notification.js';
import bcrypt from 'bcryptjs';
import {
  reduceUserDetails,
  validateLoginData,
  validateSignupData,
} from '../middleware/validation.js';
import generateToken from '../middleware/generateToken.js';
import Like from '../model/Like.js';

// Sign Up Users
export const signup = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  const newUser = { username, email, password, confirmPassword };
  console.log(newUser);

  // Validate data
  const { valid, errors } = validateSignupData(newUser);
  if (!valid) return res.status(400).json(errors);
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(400).json({ username: 'User already exists' });
    } else {
      const user = await User.create({ username, email, password });
      return res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ general: 'Something went wrong, please try again' });
  }
};

// Login In Users ###################
export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = { email, password };

  // Validate data
  const { valid, errors } = validateLoginData(user);
  if (!valid) return res.status(400).json(errors);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ msg: 'Invalid Email' });
    } else {
      const correctPassword = await bcrypt.compare(password, user.password);
      if (correctPassword) {
        res.json({
          _id: user._id,
          username: user.username,
          email: user.email,
          token: generateToken(user._id),
        });
      } else {
        res.status(401).json({ msg: 'Invalid password' });
      }
    }
  } catch (error) {
    console.error(error);
    return res
      .status(403)
      .json({ general: 'Something went wrong, please try again' });
  }
};

// Get any user's details
export const getUserDetails = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username}).select('-password');
    if (!user)
      return res.status(404).json({ errror: 'User not found' });
  
    const posts = await Post.find({ username: req.params.username });
    return res.json({ user, posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}

// updateUserDetails
export const updateUserDetails = async (req, res) => {
  const userDetails = reduceUserDetails(req.body);
  try {
    const user = await User.findOne({ username: req.user.username });
    user.bio = userDetails.bio
    user.location = userDetails.location
    user.website = userDetails.website
  
    await user.save()
    return res.json({ message: 'Details added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}

// Get Authenticated User Details
export const getAuthenticatedUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    const likes = await Like.find({ username: req.user.username }) || [];
    const notifications = await Notification.find({ recipient: req.user.username }) || [];

    return res.json({ credentials: user, likes, notifications })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}

// Mark Notification As Read
export const markNotificationsRead = (req, res) => {
  
  req.body.notificationIds.forEach(async (id) => {
    await Notification.findByIdAndUpdate(id, { read: true })
  })

  return res.json({ message: "Notifications marked read" });
}
