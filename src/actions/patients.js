/**
 * patient actions
 *  fetch, modify, delete, add patient data on server
 *  dispatch action to update redux store 
 *  few functions here only work with redux-thunk middleware 
 */

import {
  SET_PATIENTS,
  REMOVE_PATIENT,
  ADD_NEXT_PATIENTS,
  EDIT_PATIENT,
  SAVE_PATIENT
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
        actionData.count = parseInt(patientCount, 10); // 10 hardcoded list limit
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

/**
 * load next item from server 
 * @param {fetch result from 'start'. where start is count from begining} start
 * @param {index till which fn need to return data} end 
 */
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

export const startEditPatientOnServer = (patient) => {
  return (dispatch) => {
    fetch(`http://localhost:3001/patients/${patient.id}`, {
      method: 'put',
      body: JSON.stringify(patient),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.ok) {
          dispatch({
            ...patient,
            type: EDIT_PATIENT
          })
        }
      })
      .catch(console.error)
  }
}

/**add new patient to server */
export const startAddPatientToServer = (patient) => {
  return (dispatch) => {
    const headers =  { "Content-Type": "application/json"};
    // due to some limitaion on auto index increment in json-server
    // get index from server
    fetch(`http://localhost:3001/meta`).then(res => res.json)
      .then(({ index }) => {
        fetch(`http://localhost:3001/patients/`, {
          method: 'post',
          body: JSON.stringify({name: patient.name, phone: patient.phone}),
          headers
        })
          .then(res => {
            if (res.ok) {
              return res.json()
            }
          })
          .then(_patient => {
            if(_patient.id){
              dispatch({
                type: SAVE_PATIENT,
                patient: _patient
              })
            }
          })
          .catch(console.error)


      })
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
