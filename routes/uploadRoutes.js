import path from 'path';
import express from 'express';
import multer from 'multer';
import User from '../model/User.js';
import Post from '../model/Post.js';
import Comment from '../model/Comment.js';
import requireLogin from '../middleware/requireLogin.js';
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

router.post('/', upload.single('image'), requireLogin, async (req, res) => {
  const user = await User.findOne({ username: req.user.username })
  user.imageUrl = `/user/uploads/${req.file.filename}`
  await user.save();
  // change picture in posts
  const posts = await Post.find({ username: req.user.username });
  posts.forEach( async (post) => {
    post.userImage = `/user/uploads/${req.file.filename}`;
    await post.save();
  });
  // change picture in comments
  const comments = await Comment.find({ username: req.user.username });
  comments.forEach( async (comment) => {
    comment.userImage = `/user/uploads/${req.file.filename}`;
    await comment.save();
  })
  res.send(`/${req.file.filename}`)
})

export default router