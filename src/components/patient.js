/**
 * Individual patient list item
 *  render patient item
 *  handles delete
 */


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startDeletePatientFromServer } from '../actions/patients';

class Patient extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    this.props.deletePatientFromServer(this.props.patient.id);
  }

  render() {
    return (
      <div className="patient card">
        <div className="index">
          <h1>{this.props.patient.id}</h1>
        </div>
        <div className="details">
          <p>{this.props.patient.name}</p>
          <p>{this.props.patient.phone}</p>
        </div>
        <div className="actions">
          <div className="edit-log">
            <img src='/static/images/edit.png' alt='edit' width='25px' heighit='25px' />
          </div>
          <div className="delete-log" onClick={this.handleDelete}>
            <img src='/static/images/delete.svg' alt='delete' width='30px' heighit='35px' />
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deletePatientFromServer: (patient_id) => {
      dispatch(startDeletePatientFromServer(patient_id))
    }
  }
}

export default connect(undefined, mapDispatchToProps)(Patient);
