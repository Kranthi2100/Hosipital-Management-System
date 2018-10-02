/**
 * PatientList 
 *  renders Individual Patient Components
 */

import { connect } from 'react-redux';
import Modal from 'react-modal';
import React, { Component } from 'react';
import AddPatient from '../components/addPatient';
import EditPatient from '../components/editPatient';
import Patient from '../components/patient';
import { 
  startEditPatientOnServer, 
  startAddPatientToServer 
} from '../actions/patients';

Modal.setAppElement('#root') //screen reader compatibilty

class PatientContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      modalTitle: '',
      patient: {}
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleOpenModalEdit = this.handleOpenModal('Edit Patient', 'edit').bind(this);
    this.handleOpenModalAdd = this.handleOpenModal('Add Patient', 'add').bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd(patient) {
    this.props.addPatient(patient);
  }

  handleSave(patient) {
    /**
     * passed to modal
     * invoked when user presses save
     */
    this.props.editPatient(patient);
  }

  handleEdit(patient) {
    /**  function passed to patient components
     *   called on when user presses edit option in patient component
     *   this updated current patient details for dispalying on modal component
     */
    this.setState({
      ...this.state,
      patient: patient
    });
  }

  handleOpenModal(title, type) {
    /**  passed to child component
     *   called on when user presses edit option
     *   this opens modal
     */
    return function () {
      this.setState({
        showModal: true,
        modalType: type,
        modalTitle: title
      })
      //lock scroll
      document.body.style.overflow = 'hidden';
    }
  };

  handleCloseModal() {
    /**
     * passed to child component
     * this closes patient
     */
    this.setState({ showModal: false })
    //release lock scroll
    document.body.style.overflow = 'visible';
  };

  getPatientList() {
    /**
     * genarate patient list
     */
    return this.props.patientsList.map(patient => {
      return (
        <Patient
          key={patient.id}
          patient={{ ...patient }}
          handleOpenModal={this.handleOpenModalEdit} // invoked when user press on close
          handleEdit={this.handleEdit} //invoked on edit option onClick
        />
      )
    })
  }

  render() {
    return (
      <div>
        <div className="patient-list">
          {this.getPatientList()}
        </div>
        <Modal
          isOpen={this.state.showModal}
          onRequestClose={this.handleCloseModal}
          shouldCloseOnOverlayClick={false}
          contentLabel={this.state.modalTitle}
          className="modal"
          overlayClassName="overlay"
          closeTimeoutMS={500}  // close delay 
        >
          <EditPatient
            handleCloseModal={this.handleCloseModal}
            handleSave={this.handleSave}
            handleAdd={this.handleAdd}
            title={this.state.modalTitle}
            operationType={this.state.modalType}
            patient={this.state.patient} // pass details of patient for editing
          />
        </Modal>
        <AddPatient
          handleOpenModal={this.handleOpenModalAdd} // invoked when user press add patient
          handleEdit={this.handleEdit} //invoked on edit option onClick
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    patientsList: state.patients.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editPatient: (patient) => {
      dispatch(startEditPatientOnServer(patient))
    },
    addPatient: (patient) => {
      dispatch(startAddPatientToServer(patient))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientContainer)
