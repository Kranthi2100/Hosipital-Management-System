/**
 * site header 
 */

import React from 'react'
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

class Header extends React.Component {
 
  handleLogout() {
    this.props.logout();
  }

  render() {
    return (
      <div>
        <header>
          <img src='/static/images/logo.png' width='40px' height='40px' alt='logo' />
          <h2>H.M.S.</h2>
          <button onClick={this.handleLogout.bind(this)} className="logout">Logout</button>
        </header>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(startLogout())
    }
  }
}

export default connect(undefined, mapDispatchToProps)(Header);
