import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import MyButton from '../../util/MyButton';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import { global_theme } from '../../util/Themes';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../actions/postAction';

const useStyles = makeStyles(global_theme);

const DeletePost = ({ postId }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch()

  const clickDeletePost = () => {
    dispatch(deletePost(postId));
    setOpen(false)
  };

  return (
    <>
        <MyButton
          tip="Delete Scream"
          onClick={() => setOpen(true)}
          btnClassName={classes.deleteButton}
        >
          <DeleteForeverOutlinedIcon color="primary" />
        </MyButton>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            Are you sure you want to delete this post ?
          </DialogTitle>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={clickDeletePost} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </>
  )
}

export default DeletePost
