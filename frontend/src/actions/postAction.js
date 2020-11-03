import Axios from 'axios';

// Get All Posts
export const getPosts = () => async (dispatch) => {
  try {
    dispatch({ type: 'LOADING_DATA' })
    
    const { data } = await Axios.get('/post/all');
    dispatch({ type: 'SET_POSTS', payload: data })
  } catch (error) {
    dispatch({ type: 'SET_POSTS', payload: [] })
  }
}

// Get Post 
export const get_Post = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'LOADING_UI' })
    const token = localStorage.getItem('token');
    const { data } = await Axios.get(`/post/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    
    dispatch({ type: 'SET_POST', payload: data })
    dispatch({ type: 'STOP_LOADING_UI' })
  } catch (error) {
    console.log(error);
  }
}

// Like Post
export const likePosts = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const { data } = await Axios.get(`/post/${id}/like`, {
      headers: {
        Authorization: token,
      },
    });
    
    dispatch({ type: 'LIKE_POST', payload: data })
  } catch (error) {
    console.log(error);
  }
}

// Unlike Post
export const unlikePosts = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const { data } = await Axios.get(`/post/${id}/unlike`, {
      headers: {
        Authorization: token,
      },
    });
    
    dispatch({ type: 'UNLIKE_POST', payload: data })
  } catch (error) {
    console.log(error);
  }
}

// Delete Post 
export const deletePost = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    await Axios.delete(`/post/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    dispatch({ type: 'DELETE_POST', payload: id })
    
  } catch (error) {
    console.log(error);
  }
}

// Add Post 
export const add_Post = (body) => async (dispatch) => {
  try {
    dispatch({ type: 'LOADING_UI' })
    const token = localStorage.getItem('token');
    const { data } = await Axios.post('/post/create', { body }, {
      headers: {
        Authorization: token,
      },
    });
    dispatch({ type: 'ADD_POST', payload: data })
    dispatch({ type: 'CLEAR_ERRORS' })
  } catch (error) {
    dispatch({ type: 'SET_ERRORS', payload: error.response.data })
  }
}

// Add Comment
export const add_Comment = (id, body) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const { data } = await Axios.post(`/post/${id}/comment`, { body }, {
      headers: {
        Authorization: token,
      },
    });
    dispatch({ type: 'ADD_COMMENT', payload: data })
    dispatch({ type: 'CLEAR_ERRORS' })
  } catch (error) {
    dispatch({ type: 'SET_ERRORS', payload: error.response.data })
  }
}

// Get User Details
export const get_User_Details = (username) => async (dispatch) => {
  try {
    dispatch({ type: 'LOADING_DATA' })
    const { data } = await Axios.get(`/user/${username}`);
    dispatch({ type: 'SET_POSTS', payload: data.posts })
  } catch (error) {
    dispatch({ type: 'SET_POSTS', payload: {} })
  }
}