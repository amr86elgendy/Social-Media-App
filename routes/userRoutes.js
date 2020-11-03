import express from 'express';
import {
  getAuthenticatedUser,
  getUserDetails,
  login,
  markNotificationsRead,
  signup,
  updateUserDetails,
} from '../controller/userController.js';
import requireLogin from '../middleware/requireLogin.js';

const router = express.Router();

// Sign In
router.get('/', requireLogin, getAuthenticatedUser);
router.post('/signup', signup);
router.post('/login', login);
router.get('/:username', getUserDetails);
router.post('/update', requireLogin, updateUserDetails);
router.post('/notifications', requireLogin, markNotificationsRead);

// router.post('/user/image', requireLogin, uploadImage);

// Sign Up

export default router;
