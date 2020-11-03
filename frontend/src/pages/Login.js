import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, CircularProgress, Grid, TextField, Typography } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { global_theme } from '../util/Themes';
import { loginUser } from '../actions/userAction'
import { useDispatch, useSelector } from 'react-redux';
const useStyles = makeStyles(global_theme)

const Login = () => {
  const classes = useStyles();
  const { push } = useHistory()
  const dispatch = useDispatch();
  const { authenticated } = useSelector(state => state.user)
  const { loading, errors} = useSelector(state => state.UI)
  

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  useEffect(() => {
    if (authenticated) push('/')
  }, [push, authenticated])

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password))
  }

  
  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <Typography variant='h2' className={classes.pageTitle}>
          Login
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
        <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              helperText={errors && errors.email}
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
              Login
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <small>
              dont have an account ? sign up <Link to="/signup">here</Link>
            </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

export default Login;
