// reducers.js

import { combineReducers } from 'redux';
import signupReducer from './signup';
import tokenLoginReducer from './login';
import logoutReducer from './logout';
// Import your reducers here


// Combine reducers into a single root reducer
const rootReducer = combineReducers({
  // Add your reducers here

  signup:signupReducer,
  login:tokenLoginReducer,
  logout:logoutReducer


  // Add more reducers as needed
});

export default rootReducer;
