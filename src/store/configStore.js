import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import PatientsReducer from '../reducers/patients';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {}

const middleWare = [thunk];

const reducers = {
  patients: PatientsReducer
}

export default () => {
  const store = createStore(
    combineReducers(reducers), 
    initialState,
    composeEnhancers(applyMiddleware(...middleWare))
  )

  return store;
}
