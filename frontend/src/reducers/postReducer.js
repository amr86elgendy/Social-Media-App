const initialState = {
  posts: [],
  post: {},
  loading: false,
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOADING_DATA':
      return {
        ...state,
        loading: true,
      };
    case 'SET_POSTS':
      return {
        ...state,
        loading: false,
        posts: action.payload,
      };
    case 'SET_POST':
      return {
        ...state,
        post: action.payload,
      };
    case 'LIKE_POST':
      const plusLikePosts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
      // const indexPost = state.posts.findIndex(post => post.postId === action.payload.postId)
      // state.posts[indexPost] = action.payload
      if (state.post) {
        state.post.likeCount++;
      }
      return {
        ...state,
        posts: plusLikePosts,
        loading: false,
      };
    case 'UNLIKE_POST':
      const minLikePosts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
      if (state.post) {
        state.post.likeCount--;
      }
      return {
        ...state,
        posts: minLikePosts,
        loading: false,
      };
    case 'DELETE_POST':
      const posts_after_delete = state.posts.filter(
        (post) => post._id !== action.payload
      );
      return {
        ...state,
        post: action.payload,
        posts: posts_after_delete,
      };
    case 'ADD_POST':
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case 'ADD_COMMENT':
      state.posts.forEach((post) => {
        if (post._id === action.payload.postId) {
          post.commentCount = post.commentCount + 1;
        }
      });
      return {
        ...state,
        post: {
          ...state.post,
          commentCount: state.post.commentCount + 1,
          comments: [action.payload, ...state.post.comments],
        },
      };
    case 'SET_USER':
      state.posts.forEach(
        (post) =>
          post.username === action.payload.credentials.username &&
          (post.userImage = action.payload.credentials.imageUrl)
      );
      return {
        ...state,
      };
    default:
      return state;
  }
};
