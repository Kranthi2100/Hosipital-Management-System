/**
 * patient actions
 */

import {
  SET_PATIENTS,
  REMOVE_PATIENT,
  ADD_NEXT_PATIENTS
} from "./types";

/* fetch patient list from server and update state */
export const startLoadPatientsListFromServer = (pageCount) => {
  return (dispatch) => {
    let actionData = {
      data: [],
      count: 0,
      totalPageCount: 1,
      selectedPage: pageCount
    }
    fetch(`http://localhost:3001/patients?_page=${pageCount}&limit=10`)
      .then(res => {
        let patientCount = res.headers.get("X-Total-Count"); //count set by json-server 
        actionData.count = parseInt(patientCount, 10);
        actionData.totalPageCount = Math.ceil(patientCount / 10);
        return res;
      })
      .then(res => res.json())
      .then(patients => {
        actionData.data = patients;
        dispatch({
          type: SET_PATIENTS,
          ...actionData
        })
      })
      .catch(console.error);
  }
}

export const startLoadNextPatientsFromServer = (start, end) => {
  return (dispatch) => {
    fetch(`http://localhost:3001/patients?_start=${start}&_end=${end}`)
    .then(res => res.json())
    .then(patients => {
      dispatch({
        type: ADD_NEXT_PATIENTS,
        data: patients
      })
    })
    .catch(console.error);
  }
}

/* delete data from server and update state */
export const startDeletePatientFromServer = (patient_id) => {
  return (dispatch) => {
    fetch(`http://localhost:3001/patients/${patient_id}`, {
      method: 'delete',
      mode: 'cors'
    })
      .then(res => {
        if (res.ok) {
          dispatch({
            type: REMOVE_PATIENT,
            id: patient_id
          })
        }
      })
      .catch(console.error)
  }
}
