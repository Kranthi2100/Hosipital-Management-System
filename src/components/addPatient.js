import React, { Component } from 'react'

class AddPatient extends Component {
  constructor(props){
    super(props);
    this.handleAddPatient = this.handleAddPatient.bind(this);  
  }

  handleAddPatient(){
    this.props.handleEdit({
      id: 'none',
      name: '',
      phone: '+91'
    })
    this.props.handleOpenModal();
  }

  render() {
    return (
      <div className="add__patient">
        <button onClick={this.handleAddPatient}>&#43;</button>
      </div>
    )
  }
}

export default AddPatient;
