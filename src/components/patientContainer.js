import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import PatientList from './patientList';
import { startLoadPatientsListFromServer } from '../actions/patients';
import '../styles/app.css';
import { connect } from 'react-redux';


class PatientContainer extends Component {
  handlePageClick(data) {
    const pageCount = data.selected + 1;
    this.props.loadPatientsListFromServer(pageCount);
  }

  componentWillMount() {
    this.props.loadPatientsListFromServer(1);
  }

  render() {
    return (
      <div className="app">
        <PatientList patients={this.props.patients.data} />
        <ReactPaginate
          pageCount={this.props.patients.pageCount}
          pageRangeDisplayed={2}
          onPageChange={this.handlePageClick.bind(this)}
          marginPagesDisplayed={1}
          breakLabel={"..."}
          previousLabel={"<"}
          nextLabel={">"}
        />
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
  }
 }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientContainer);
