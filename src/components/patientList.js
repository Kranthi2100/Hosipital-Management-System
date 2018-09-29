/**
 * PatientList 
 *  renders Individual Patient Components
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Patient from './patient';

class PatientList extends Component {
  getPatientList() {
    return this.props.patientsList.map(patient => {
      return <Patient key={patient.id} patient={{ ...patient }} />
    })
  }

  render() {
    return (
      <div className="patient-list">
        {this.getPatientList()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    patientsList: state.patients.data
  }
}

export default connect(mapStateToProps)(PatientList)
