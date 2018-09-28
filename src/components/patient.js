import React, {Component} from 'react';

class Patient extends Component{
  render(){
    return (
      <div className="patient card">
        <div className="index">
          <h1>{this.props.patient.id}</h1>
        </div>
        <div className="details">
          <p>{this.props.patient.name}</p>
          <p>{this.props.patient.phone}</p>
        </div>
      </div>
    )
  }
}

export default Patient;