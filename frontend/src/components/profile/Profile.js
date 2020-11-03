import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { global_theme } from '../../util/Themes';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Paper, Typography } from '@material-ui/core';
import MuiLink from '@material-ui/core/Link';
import EditIcon from '@material-ui/icons/Edit';
import { CalendarToday, KeyboardReturn, LocationOn } from '@material-ui/icons'
import LinkIcon from '@material-ui/icons/Link';
import { Link } from 'react-router-dom';
import day from 'dayjs';
import MyButton from '../../util/MyButton';
import { logoutUser, uploadImage } from '../../actions/userAction';
import EditDetails from './EditDetails';
import ProfileSkeleton from '../../util/ProfileSkeleton';

const useStyles = makeStyles(global_theme);

const Profile = () => {
  const classes = useStyles();
  const input = useRef();
  const dispatch = useDispatch()

  const {
    loading,
    authenticated,
    credentials: { handle, createdAt, imageUrl, location, website, bio },
  } = useSelector((state) => state.user);

  const handleImageChange = (e) => {
    // const image = e.target.files[0];
    // console.log(image.name);
    // const formData = new FormData();
    // formData.append('image', image, image.name);
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    dispatch(uploadImage(formData));

  };

  const handleEditPicture = () => {
    // const fileInput = document.getElementById('imageInput');
    input.current.click();
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      {!loading ? (
        authenticated ? (
          <Paper className={classes.paper}>
            <div className={classes.profile}>
              <div className='image-wrapper'>
                <img src={imageUrl} alt='profile' className='profile-image' />
                <input
                  type='file'
                  // id='imageInput'
                  ref={input}
                  hidden='hidden'
                  onChange={handleImageChange}
                />
                <MyButton
                  tip='Edit profile picture'
                  onClick={handleEditPicture}
                  btnClassName='button'
                >
                  <EditIcon color='primary' />
                </MyButton>
              </div>
              <hr />
              <div className='profile-details'>
                <MuiLink
                  component={Link}
                  to={`/user/${handle}`}
                  color='primary'
                  variant='h5'
                >
                  @{handle}
                </MuiLink>
                <hr />
                {bio && <Typography variant='body2'>{bio}</Typography>}
                <hr />
                {location && (
                  <>
                    <LocationOn color='primary' /> <span>{location}</span>
                    <hr />
                  </>
                )}
                {website && (
                  <>
                    <LinkIcon color='primary' />
                    <a href={website} target='_blank' rel='noopener noreferrer'>
                      {' '}
                      {website}
                    </a>
                    <hr />
                  </>
                )}
                <CalendarToday color='primary' />{' '}
                <span>Joined {day(createdAt).format('MMM YYYY')}</span>
              </div>
              <MyButton tip='Logout' onClick={handleLogout}>
                <KeyboardReturn color='primary' />
              </MyButton>
              <EditDetails />
            </div>
          </Paper>
        ) : (
          <Paper className={classes.paper}>
            <Typography variant='body2' align='center'>
              No profile found, please login again
            </Typography>
            <div className={classes.buttons}>
              <Button
                variant='contained'
                color='primary'
                component={Link}
                to='/login'
              >
                Login
              </Button>
              <Button
                variant='contained'
                color='secondary'
                component={Link}
                to='/signup'
              >
                Signup
              </Button>
            </div>
          </Paper>
        )
      ) : (
        <ProfileSkeleton />
      )}
    </>
  );
};

export default Profile;
