import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
 // Import redux-thunk
 import rootReducer from './reducer'

const store = createStore(rootReducer, applyMiddleware(thunk)); // Apply middleware to the store

export default store;
