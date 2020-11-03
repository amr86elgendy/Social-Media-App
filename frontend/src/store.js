import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer } from './reducers/userReducer';
import { uiReducer } from './reducers/uiReducer';
import { postReducer } from './reducers/postReducer';

const reducer = combineReducers({
  user: userReducer,
  UI: uiReducer,
  postInfo: postReducer
})

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;