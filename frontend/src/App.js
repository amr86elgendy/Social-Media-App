import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { root_theme } from './util/Themes';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import User from './pages/User';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { get_authenticated_UserData, logoutUser } from './actions/userAction';

const App = () => {
  const dispatch = useDispatch()
  
    useEffect(() => {
      const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        dispatch(logoutUser());
        
      } else {
        dispatch({ type: 'SET_AUTHENTICATED'});
        dispatch(get_authenticated_UserData())
      }
    } else {
      dispatch({ type: 'SET_UNAUTHENTICATED'});
      
    }
    }, [dispatch])
  
  
    return (
      <MuiThemeProvider theme={root_theme}>
        <BrowserRouter>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/login' component={Login} />
              <Route path='/signup' component={Signup} />
              <Route exact path='/user/:username' component={User} />
              <Route exact path='/user/:username/post/:postId' component={User} />
            </Switch>
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
}

export default App

