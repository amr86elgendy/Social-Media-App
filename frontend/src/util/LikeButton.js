import React from 'react';
import { Link } from 'react-router-dom';
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import MyButton from '../util/MyButton';
// REdux
import { useDispatch, useSelector } from 'react-redux';
import { likePosts, unlikePosts } from '../actions/postAction';

const LikeButton = ({ postId }) => {
  const dispatch = useDispatch()
  const { authenticated, likes } = useSelector(state => state.user);
  
  const likedPost = () => {
    if (likes && likes.find(like => like.postId === postId))
      return true;
    else return false;
  };
  const clickLikePost = () => {
    dispatch(likePosts(postId));
  };
  const clickUnlikePost = () => {
    dispatch(unlikePosts(postId));
  };

    return !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : likedPost() ? (
      <MyButton tip="Un like" onClick={clickUnlikePost}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={clickLikePost}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );;
}

export default LikeButton