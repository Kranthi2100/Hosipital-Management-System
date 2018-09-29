import {
  SET_PATIENTS
} from '../actions/types';

const defaultPatientsState = {
  data: [],
  count: 0,
  pageCount: 1
}

export default function(state = defaultPatientsState, action){
  switch(action.type){
    case SET_PATIENTS:
      return {
       data: action.data,
       count: action.count,
       pageCount: action.pageCount
      }
    case 'ADD-PATIENT':
      return {}
    case 'REMOVE-PATIENT':
      return {}
    default:
      return state
  }
}
