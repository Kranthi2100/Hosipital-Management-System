import React, { Component } from 'react';
import Patient from './patient';

class PatientList extends Component {
  getPatientList(){
    return this.props.patients.map( patient => {
      return <Patient key={patient.id} patient={{...patient}} />
    })
  }
  render() {
    return (
      <div className="patient-list">
        { this.getPatientList() }
      </div>
    )
  }
}

export default PatientList;
