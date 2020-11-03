import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MyButton from '../../util/MyButton';
// MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import { global_theme } from '../../util/Themes';
import { useDispatch, useSelector } from 'react-redux';
// Redux stuff
import { add_Post } from '../../actions/postAction';

const useStyles = makeStyles(global_theme);

const AddPost = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false)
  const [body, setBody] = useState('')

  const {loading, errors} = useSelector(state => state.UI)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(add_Post(body))
    if (body.trim() !== '') {
      setOpen(false)
    }
  };

  return (
    <>
        <MyButton onClick={() => {
          setOpen(true);
          dispatch({ type: 'CLEAR_ERRORS' }) // to clear errors when re-open 
        }} tip="Add a Post!">
          <AddIcon />
        </MyButton>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={() => setOpen(false)}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>Add a new post</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="POST !!"
                multiline
                rows="3"
                placeholder="Post at your fellow friends"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={(e) => setBody(e.target.value)}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </>
  )
}

export default AddPost
