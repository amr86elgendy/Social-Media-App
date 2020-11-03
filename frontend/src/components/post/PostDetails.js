import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, Grid, Typography } from '@material-ui/core';
import MyButton from '../../util/MyButton';
import LikeButton from '../../util/LikeButton';
import Comment from './Comment';
import CommentForm from './CommentForm';
import day from 'dayjs';
import { Link, useLocation } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';
import { makeStyles } from '@material-ui/core/styles';
import { global_theme } from '../../util/Themes';
import { useDispatch, useSelector } from 'react-redux';
import { get_Post } from '../../actions/postAction';

const useStyles = makeStyles(global_theme);

const PostDetails = ({ id, username: name, openPost }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [path, setPath] = useState('')
  const { pathname } = useLocation()

  const dispatch = useDispatch();
  const {
    post: {
      _id,
      body,
      createdAt,
      likeCount,
      commentCount,
      userImage,
      username,
      comments,
    },
  } = useSelector((state) => state.postInfo);
  
  const { loading } = useSelector((state) => state.UI);

  const handleOpen = () => {
    setOpen(true);
    dispatch(get_Post(id));
    window.history.pushState(null, null, `/user/${name}/post/${id}`)
  };

  const handleClose = () => {
    setOpen(false);
    window.history.pushState(null, null, path)
  }
  useEffect(() => {
    setPath(pathname)
    
    if (openPost) {
      handleOpen()
    }
    // eslint-disable-next-line
  }, [pathname, openPost])

  return (
    <>
      <MyButton
        onClick={handleOpen}
        tip='Expand post'
        tipClassName={classes.expandButton}
      >
        <UnfoldMore color='primary' />
      </MyButton>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth='sm'
      >
        <MyButton
          tip='Close'
          onClick={handleClose}
          tipClassName={classes.closeButton_Post}
        >
          <CloseIcon color='primary' />
        </MyButton>
        <DialogContent className={classes.dialogContent}>
          {loading ? (
            <div className={classes.spinnerDiv}>
              <CircularProgress size={200} thickness={2} />
            </div>
          ) : (
            <Grid container>
              <Grid item sm={5}>
                <img
                  src={userImage}
                  alt='Profile'
                  className={classes.profileImage}
                />
              </Grid>
              <Grid item sm={7}>
                <Typography
                  component={Link}
                  color='primary'
                  variant='h5'
                  to={`/user/${name}`}
                >
                  @{username}
                </Typography>
                <hr className={classes.invisibleSeparator} />
                <Typography variant='body2' color='textSecondary'>
                  {day(createdAt).format('h:mm a, MMMM DD YYYY')}
                </Typography>
                <hr className={classes.invisibleSeparator} />
                <Typography variant='body1'>{body}</Typography>
                <LikeButton postId={_id} />
                <span>{likeCount} likes</span>
                <MyButton tip='comments'>
                  <ChatIcon color='primary' />
                </MyButton>
                <span>{commentCount} comments</span>
              </Grid>
              <hr className={classes.visibleSeparator} />
              <CommentForm postId={_id} />
              <Comment comments={comments} />
            </Grid>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PostDetails;
