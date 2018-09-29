import { SET_PATIENTS } from "./types";

const startLoadPatientsListFromServer = (pageCount) => {
  return (dispatch) => {
    let sudoState = {
      data: [],
      count: 0,
      pageCount: 1
    }
    fetch(`http://localhost:3001/patients?_page=${pageCount}&limit=10`)
      .then(res => {
        let patientCount = res.headers.get("X-Total-Count"); 
        sudoState.count = parseInt(patientCount, 10);
        sudoState.pageCount = patientCount / 10;
        return res;
      })
      .then(res => res.json())
      .then(patients => {
        sudoState.data = patients;
        dispatch({
          type: SET_PATIENTS,
          ...sudoState
        })
      });
  }
}

export { startLoadPatientsListFromServer };
