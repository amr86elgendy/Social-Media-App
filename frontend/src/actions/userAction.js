import Axios from 'axios';

// Sign Up User
export const signupUser = (email, password, confirmPassword, username) => async (
  dispatch
) => {
  try {
    dispatch({ type: 'LOADING_UI' });
    const {
      data: { token },
    } = await Axios.post('/user/signup', {
      email,
      password,
      confirmPassword,
      username,
    });
    localStorage.setItem('token', `Bearer ${token}`);
    dispatch(get_authenticated_UserData());
    dispatch({ type: 'CLEAR_ERRORS' });
  } catch (error) {
    dispatch({ type: 'SET_ERRORS', payload: error.response.data });
  }
};

// Login User
export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: 'LOADING_UI' });
    const {
      data: { token },
    } = await Axios.post('/user/login', { email, password });
    localStorage.setItem('token', `Bearer ${token}`);
    dispatch(get_authenticated_UserData());
    dispatch({ type: 'CLEAR_ERRORS' });
  } catch (error) {
    dispatch({ type: 'SET_ERRORS', payload: error.response.data });
  }
};

// Logout User
export const logoutUser = () => async (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: 'SET_UNAUTHENTICATED' })
}

// Get Authenticated User Data
export const get_authenticated_UserData = () => async (dispatch) => {
  try {
    dispatch({ type: 'LOADING_USER' });
    const token = localStorage.getItem('token');
    const { data } = await Axios.get('/user', {
      headers: {
        Authorization: token,
      },
    });
    dispatch({ type: 'SET_USER', payload: data });
  } catch (error) {
    dispatch({ type: 'SET_ERRORS', payload: error.response.data });
  }
};

// Upload Image
export const uploadImage = (formData) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    await Axios.post('/user/uploads', formData, {
      headers: {
        Authorization: token,
      },
    })
    dispatch(get_authenticated_UserData())
  } catch (error) {
    console.log(error);
  }
}

// Edit User Details
export const editUserDetails = (userDetails) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    await Axios.post('/user/update', userDetails, {
      headers: {
        Authorization: token,
      },
    })
    dispatch(get_authenticated_UserData())
  } catch (error) {
    console.log(error);
  }
}

// Mark Notification as Read
export const mark_notification_as_read = (notificationIds) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    await Axios.post('/user/notifications', { notificationIds }, {
      headers: {
        Authorization: token,
      },
    })
    
    dispatch({ type: 'MARK_NOTIFICATION_READ' })
  } catch (error) {
    console.log(error);
  }
}