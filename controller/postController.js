import Post from '../model/Post.js';
import Comment from '../model/Comment.js';
import Like from '../model/Like.js';
import Notification from '../model/Notification.js';
import User from '../model/User.js';

// Create Post
export const createPost = async (req, res) => {
  const { body } = req.body;
  if (body.trim() === '') {
    return res.status(400).json({ body: 'Body must not be empty' });
  }
  try {
    const user = await User.findOne({ username: req.user.username })
    const post = new Post({
      body,
      username: req.user.username,
      userImage: user.imageUrl
    });
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'something went wrong' });
  }
};

// Get All Posts
export const getAllPosts = async (req, res) => {
  const posts = await Post.find({}).sort('-createdAt');

  res.json(posts);
};

// Get Single Post
export const getSinglePost = async (req, res) => {
  const post = await Post.findById(req.params.postId);
  const comments = await Comment.find({ postId: req.params.postId }).sort(
    '-createdAt'
  );

  if (post) {
    post.comments = comments;
    await post.save();
    res.json(post);
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
};

// Delete Post
export const deletePost = async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.postId);
  if (post) {
    // Delete all details related to this post
    await Comment.deleteMany({ postId: req.params.postId });
    await Like.deleteMany({ postId: req.params.postId });
    await Notification.deleteMany({ postId: req.params.postId });
    
    res.json({ message: 'Post deleted successfully' });
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
};

// Add Comment On Post
export const addCommentOnPost = async (req, res) => {
  const { body } = req.body;
  if (body.trim() === '')
    return res.status(400).json({ comment: 'Must not be empty' });
  try {
    const user = await User.findOne({ username: req.user.username })
    const comment = new Comment({
      body,
      postId: req.params.postId,
      username: req.user.username,
      userImage: user.imageUrl
    });
    const newComment = await comment.save();
    const post = await Post.findById(req.params.postId);
    if (post) {
      post.commentCount = post.commentCount + 1;
    }
    await post.save();

    // Send Notification On Comment
    if (post.username !== req.user.username) {
      const notification = new Notification({
        recipient: post.username,
        sender: req.user.username,
        type: 'comment',
        read: false,
        postId: post._id,
      });
      await notification.save();
    }

    return res.json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Like Post
export const likePost = async (req, res) => {
  try {
    const oldLike = await Like.findOne({
      postId: req.params.postId,
      username: req.user.username,
    });
    if (oldLike) return res.status(400).json({ error: 'Post already liked' });
    else {
      const like = new Like({
        postId: req.params.postId,
        username: req.user.username,
      });
      await like.save();
      const post = await Post.findById(req.params.postId);
      if (post) {
        post.likeCount = post.likeCount + 1;
      }
      await post.save();

      // Send Notification On Like
      if (post.username !== req.user.username) {
        const notification = new Notification({
          recipient: post.username,
          sender: req.user.username,
          type: 'like',
          read: false,
          postId: post._id,
        });
        await notification.save();
      }

      return res.json(post);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'something went wrong' });
  }
};

// UnLike Post
export const unLikePost = async (req, res) => {
  try {
    const oldLike = await Like.findOneAndDelete({
      postId: req.params.postId,
      username: req.user.username,
    });
    if (!oldLike)
      return res.status(400).json({ error: 'Post already Unliked' });

    const post = await Post.findById(req.params.postId);
    if (post) {
      post.likeCount = post.likeCount - 1;
    }
    await post.save();

    // Delete Notification On Unlike
    await Notification.findOneAndDelete({
      sender: req.user.username,
      type: 'like',
      postId: req.params.postId,
    });

    return res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'something went wrong' });
  }
};
