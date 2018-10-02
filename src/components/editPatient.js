import React, { Component } from 'react'
import { AsYouType } from 'libphonenumber-js'

class EditPatient extends Component {
  /**
   * edit or add new patient
   */

  constructor(props) {
    super(props);
    this.state = {
      saved: false,
      patient: {
        id: props.patient.id,
        name: props.patient.name,
        phone: props.patient.phone
      }
    }
    this.handleNameEdit = this.handleNameEdit.bind(this);
    this.handlePhoneEdit = this.handlePhoneEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave() {
    let _name = this.state.patient.name;
    let _phone = this.state.patient.phone;
    if(_name.length < 1){
      alert('Cannot save! Name should be atleast one character!');
      return;
    }
    if(_phone.length !== 18){
      alert('Enter valid phone number');
      return;
    }
    this.setState({
      saved: true,
      patient: {
        ...this.state.patient
      }
    })
    if(this.props.operationType === 'edit'){
      this.props.handleSave(this.state.patient);
    }
    else if(this.props.operationType === 'add'){
      this.props.handleAdd(this.state.patient);
    }

  }

  handleNameEdit(e) {
    let _name = e.target.value;
    this.setState({
      saved: false,
      patient: {
        ...this.state.patient,
        name: _name
      }
    })
  }

  formatPhoneNumber(_phone) {
    /** make phone number look like (000) 000-0000 */
    _phone = _phone.substring(3, 20); //strip +91
    _phone = '+91 ' + new AsYouType('US').input(_phone);

    // asYouType automatically adds ")" every time you come to delete 9th char so strip 9th char
    _phone = (_phone.length === 9) ? _phone.substring(0, 8) : _phone;

    return _phone;
  }

  handlePhoneEdit(e) {
    let _phone = e.target.value;
    if (_phone.length > 18) return;
    _phone = this.formatPhoneNumber(_phone);

    this.setState({
      saved: false,
      patient: {
        ...this.state.patient,
        phone: _phone
      }
    })
  }

  render() {
    return (
      <div className="edit__patient">
        <div className="edit__patient__title"> {this.props.title} </div>
        <div className="edit__patient_index">
          <div className="edit__patient_index__label">
            {this.state.patient.id}
          </div>
        </div>
        <div className="edit__patient__block edit__patient__block--top-line">
          <div className="edit__patient__block__label">
            Name
          </div>
          <div className="edit__patient__block__input">
            <input type="text" name="name" value={this.state.patient.name} onChange={this.handleNameEdit} />
          </div>
        </div>
        <div className="edit__patient__block --last">
          <div className="edit__patient__block__label">
            Phone No
          </div>
          <div className="edit__patient__block__input">
            <input type="text" name="name" value={this.state.patient.phone} onChange={this.handlePhoneEdit} />
          </div>
        </div>
        <div className="edit__patient__button--save">
          <button onClick={this.handleSave}>{this.state.saved ? "saved" : "save" }</button>
        </div>
        <div className="edit__patient_button--close">
          <button onClick={this.props.handleCloseModal}>&times;</button>
        </div>
      </div>
    )
  }
}

export default EditPatient;
