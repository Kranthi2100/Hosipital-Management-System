import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import PatientList from './patientList';
import '../styles/app.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patients: []
    }
  }

  loadPatientListFromServer(pageCount) {
    fetch(`http://localhost:3001/patients?_page=${pageCount}&limit=10`)
      .then(res => res.json())
      .then(patients => {
        this.setState({ patients })
      });
  }

  componentWillMount(){
    this.loadPatientListFromServer(1);
  }

  handlePageClick(data){
    this.loadPatientListFromServer(data.selected + 1);   
  }

  render() {
    return (
      <div className="app">
        <PatientList patients={this.state.patients}/>
        <ReactPaginate 
          pageCount={15}
          pageRangeDisplayed={2}
          onPageChange={this.handlePageClick.bind(this)}
        />
      </div>
    );
  }
}

export default App;
