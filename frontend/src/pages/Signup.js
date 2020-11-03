import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, CircularProgress, Grid, TextField, Typography } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { global_theme } from '../util/Themes'
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../actions/userAction';

const useStyles = makeStyles(global_theme)

const Signup = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const { push } = useHistory()

  const { authenticated } = useSelector(state => state.user)
  const { loading, errors} = useSelector(state => state.UI)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [handle, setHandle] = useState('');
  

  useEffect(() => {
    if (authenticated) push('/')
  }, [push, authenticated])

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signupUser(email, password, confirmPassword, handle))
      push('/');
  }


  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <Typography variant='h2' className={classes.pageTitle}>
          Sign Up
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
        <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
        <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              helperText={errors.password}
              error={errors.password ? true : false}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="confirmPassword"
              className={classes.textField}
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
            />
            <TextField
              id="handle"
              name="handle"
              type="text"
              label="Username"
              className={classes.textField}
              helperText={errors.handle}
              error={errors.handle ? true : false}
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              fullWidth
            />
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              Sign Up
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <small>
              Already have an account ? Login <Link to="/login">here</Link>
            </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  )
}

export default Signup
