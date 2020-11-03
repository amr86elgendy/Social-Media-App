import React from 'react';
import { AppBar, Button, Toolbar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomeIcon from '@material-ui/icons/Home';
import MyButton from '../../util/MyButton';
import AddPost from '../post/AddPost';
import Notifications from './Notifications';

const Navbar = () => {
  const { authenticated } = useSelector((state) => state.user);
  return (
    <AppBar>
      <Toolbar style={{ margin: 'auto' }}>
        {authenticated ? (
          <>
            <AddPost />
            <Link to='/'>
              <MyButton tip='Home'>
                <HomeIcon />
              </MyButton>
            </Link>
            <Notifications />
          </>
        ) : (
          <>
            <Button color='inherit' component={Link} to='/login'>
              Login
            </Button>
            <Button color='inherit' component={Link} to='/'>
              Home
            </Button>
            <Button color='inherit' component={Link} to='/signup'>
              Sign up
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
