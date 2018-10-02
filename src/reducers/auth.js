import { LOGIN, LOGOUT } from '../actions/types';

export default (state = { 'isAuth': false }, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        'isAuth': true
      };
    case LOGOUT:
      return {
        'isAuth': false
      }
    default:
      return state;
  }
}