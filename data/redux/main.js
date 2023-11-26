import { combineReducers } from 'redux';
import { createStore } from 'redux';
import { myReducer } from './myReducer'; 

const rootReducer = combineReducers({
    myReducer: myReducer,
  });

  export const store = createStore(rootReducer);