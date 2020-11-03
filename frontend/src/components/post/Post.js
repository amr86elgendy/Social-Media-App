import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ChatIcon from '@material-ui/icons/Chat';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';
import day from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { global_theme } from '../../util/Themes';
import LikeButton from '../../util/LikeButton';
import MyButton from '../../util/MyButton';
import DeletePost from './DeletePost';
import { useSelector } from 'react-redux';
import PostDetails from './PostDetails';

const useStyles = makeStyles(global_theme);

const Post = ({
  body,
  createdAt,
  userImage,
  username,
  _id,
  likeCount,
  commentCount,
  openPost
}) => {

  const classes = useStyles();
  const { authenticated, credentials: {username:name} } = useSelector(state => state.user)
  
  day.extend(relativeTime)
  return (
    <Card className={classes.card}>
        <CardMedia className={classes.image} image={userImage} title='Profile Picture' />
        <CardContent className={classes.content}>
          <Typography variant='h5' color='primary' component={Link} to={`/user/${username}`}>
            {username}
          </Typography>
          <Typography variant='body2' color='textSecondary'>
            {day(createdAt).fromNow()}
          </Typography>
          <Typography variant='body1'>{body}</Typography>
          <LikeButton postId={_id} />
          <span>{likeCount} Likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
          {authenticated && username === name && <DeletePost postId={_id}/>}
          
          <PostDetails
            id={_id}
            username={username}
            openPost={openPost}
          />
        </CardContent>
    </Card>
  );
};

export default Post;
