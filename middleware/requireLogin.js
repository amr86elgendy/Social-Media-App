import User from '../model/User.js';
import jwt from 'jsonwebtoken';

const requireLogin = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(400).json({ error: 'you must be logged in' })
  } else {
    try {
      const token = authorization.split(' ')[1];
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(payload);
      const user = await User.findById(payload.id).select('-password');
      // console.log(user);
      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: 'not authorized , token failed' })
    }
  }
};

export default requireLogin;