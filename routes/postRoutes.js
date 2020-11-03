import express from 'express';
import {
  addCommentOnPost,
  createPost,
  deletePost,
  getAllPosts,
  getSinglePost,
  likePost,
  unLikePost,
} from '../controller/postController.js';
import requireLogin from '../middleware/requireLogin.js';

const router = express.Router();

router.get('/all', getAllPosts);
router.get('/:postId', getSinglePost);
router.post('/create', requireLogin, createPost);
router.delete('/:postId', requireLogin, deletePost);
router.post('/:postId/comment', requireLogin, addCommentOnPost);
router.get('/:postId/like', requireLogin, likePost);
router.get('/:postId/unlike', requireLogin, unLikePost);


export default router;
