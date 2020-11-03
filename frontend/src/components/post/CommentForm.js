import React, { useState } from 'react'
import { Button, Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { global_theme } from '../../util/Themes';
import { useDispatch, useSelector } from 'react-redux';
import { add_Comment } from '../../actions/postAction';

const useStyles = makeStyles(global_theme);

const CommentForm = ({ postId }) => {
  const classes = useStyles();
  const [body, setBody] = useState('')

  const dispatch = useDispatch()
  const { authenticated } = useSelector(state => state.user)
  const { errors } = useSelector(state => state.UI)

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(add_Comment(postId, body));
    setBody('')
  }

  return authenticated ? (
    <Grid item sm={12} style={{ textAlign: 'center' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="body"
          type="text"
          label="Comment on post"
          error={errors.comment ? true : false}
          helperText={errors.comment}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          fullWidth
          className={classes.textField}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Submit
        </Button>
      </form>
      <hr className={classes.visibleSeparator} />
    </Grid>
  ) : null;
}

export default CommentForm
