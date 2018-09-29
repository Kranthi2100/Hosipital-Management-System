/**
 * patient reducer
 *  {
 *   data: array of patient
 *   count: total count of patient
 *   totalPageCount
 *   selectedPage
 *  }
*/

import {
  SET_PATIENTS,
  ADD_NEXT_PATIENTS,
  REMOVE_PATIENT
} from '../actions/types';

const defaultPatientsState = {
  data: [],
  count: 0,
  totalPageCount: 1,
  selectedPage: 0
}

let nextState = {};

export default function (prevState = defaultPatientsState, action) {
  switch (action.type) {
    case SET_PATIENTS:
      nextState = {
        data: action.data,
        count: action.count,
        totalPageCount: action.totalPageCount,
        selectedPage: Math.min(action.selectedPage, action.totalPageCount)
      };
      return nextState;
    case ADD_NEXT_PATIENTS:
      let data = prevState.data.concat(action.data);
      nextState = {
        ...prevState,
        data
      };
      return nextState;
    case REMOVE_PATIENT:
      //update meta
      const count = prevState.count - 1;
      const totalPageCount = Math.ceil(count / 10);
      //when last page is deleted. "selected page" is not updated automatically 
      //workaround: sets minimum of computed selectedPage from prevState or set total Page Count
      const selectedPage = Math.min(totalPageCount, prevState.selectedPage);
      nextState = {
        count,
        totalPageCount,
        data: [],
        selectedPage
      };
      //remove deleted patient from state
      nextState.data = prevState.data.filter(patient => patient.id !== action.id);
      return nextState;
    default:
      return prevState;
  }
}
