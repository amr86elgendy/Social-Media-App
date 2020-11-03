import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { global_theme } from '../../util/Themes';
import { useDispatch, useSelector } from 'react-redux';
import MyButton from '../../util/MyButton';
import EditIcon from '@material-ui/icons/Edit';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import { editUserDetails } from '../../actions/userAction';

const useStyles = makeStyles(global_theme);

const EditDetails = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState('');

  const dispatch = useDispatch()
  const {
    credentials: { bio: userBio, location: userLocation, website: userWebsite },
  } = useSelector((state) => state.user);

  useEffect(() => {
    if (userBio) {
      setBio(userBio)
    }
    if (userLocation) {
      setLocation(userLocation)
    }
    if (userWebsite) {
      setWebsite(userWebsite)
    }
  }, [userBio, userLocation, userWebsite]);

  const handleSubmit = () => {
    const userDetails = { bio, website, location };
    dispatch(editUserDetails(userDetails));
    setOpen(false)
  };

  return <>
        <MyButton
          tip="Edit Details"
          onClick={() => setOpen(true)}
          btnClassName={classes.button}
        >
          <EditIcon color="primary" />
        </MyButton>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit your details</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="bio"
                tpye="text"
                label="Bio"
                multiline
                rows="3"
                placeholder="A short bio about yourself"
                className={classes.textField}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                fullWidth
              />
              <TextField
                name="website"
                tpye="text"
                label="Website"
                placeholder="Your personal/professinal website"
                className={classes.textField}
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                fullWidth
              />
              <TextField
                name="location"
                tpye="text"
                label="Location"
                placeholder="Where you live"
                className={classes.textField}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </>;
};

export default EditDetails;
