/**
 * patient container 
 *  renders
 *   Individual PatientList Component
 *   pagination component
 */

import { connect } from 'react-redux';
import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import '../styles/app.css';
import Header from '../components/header';
import PatientContainer from './patientContainer';
import {
  startLoadPatientsListFromServer,
  startLoadNextPatientsFromServer
} from '../actions/patients';

class AppContainer extends Component {
  handlePageClick(data) {
    /**
     * handle page change event
     */
    const pageCount = data.selected + 1;
    this.props.loadPatientsListFromServer(pageCount);
  }


  updatePatientList() {
    /**
     * update patient list when user deletes patient item
     */
    const { totalPageCount, selectedPage, data, count } = this.props.patients;
    const totalDisplayedPatientsCount = data.length;
    const pageLimit = 10;

    const isLastPage = totalPageCount === selectedPage;
    const isFirstPage = selectedPage === 0;
    const isLastPageEmpty = totalDisplayedPatientsCount === 0;
    /** "_previousPage" should not be negative to calculate "morePatientAreThere" */
    const _previousPage = (selectedPage === 0) ? selectedPage : selectedPage - 1;
    const totalPatientCountTillThisPage = ((_previousPage * pageLimit) + totalDisplayedPatientsCount);
    const morePatientAreThere = totalPatientCountTillThisPage < count;

    if (isLastPage && !isFirstPage && isLastPageEmpty) {
      /* when last page is empty, repaint with prev page.
      * this should not happen on first page. since loadPatients returns []
      * */
      this.props.loadPatientsListFromServer(this.props.patients.selectedPage);
    }
    else if (morePatientAreThere && totalDisplayedPatientsCount < pageLimit) {
      /* if not on last page, every time user deletes, get a new patient details */
      const end = this.props.patients.selectedPage * pageLimit;
      this.props.loadNextPatientsListFromServer(end - 1, end);
    }
  }

  componentDidMount() {
    this.props.loadPatientsListFromServer(1); //intial page render
  }

  componentDidUpdate(prevProps, prevState) {
    this.updatePatientList();
  }

  render() {
    return (
      <div>
        <Header />
        <div id="patient-container" className="app">
          <ReactPaginate
            pageCount={this.props.patients.totalPageCount}
            pageRangeDisplayed={2}
            onPageChange={this.handlePageClick.bind(this)}
            marginPagesDisplayed={1}
            breakLabel={"..."}
            previousLabel={"⇦"}
            nextLabel={"⇨"}
            forcePage={this.props.patients.selectedPage - 1}
          />
          <PatientContainer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    patients: state.patients
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadPatientsListFromServer: (pageCount) => {
      dispatch(startLoadPatientsListFromServer(pageCount))
    },
    loadNextPatientsListFromServer: (start, end) => {
      dispatch(startLoadNextPatientsFromServer(start, end))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
