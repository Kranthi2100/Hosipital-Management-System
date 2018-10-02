import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  handleUser(e) {
    this.setState({
      ...this.state,
      username: e.target.value
    })
  }

  handlePassword(e) {
    this.setState({
      ...this.state,
      password: e.target.value
    })
  }

  handleEnter(e){
    if(e.key === 'Enter')
      this.handleLogin()
  }

  handleLogin() {
    if (this.state.username === 'admin' && this.state.password === 'password')
      this.props.login();
  }

  render() {
    return (
      <div className="login">
        <div className="login__content">
          <div className="login__logo">
            <img src='/static/images/logo.png' width='80px' height='80px' alt='logo' />
          </div>
          <div className="login__username">
            <div>
              <label>
                User Name
              </label>
            </div>
            <div>
              <input
                type='text'
                value={this.state.username}
                onChange={this.handleUser.bind(this)}
              />
            </div>
          </div>
          <div className="login__password">
            <div>
              <label> password </label>
            </div>
            <div>
              <input
                type="password"
                value={this.state.password}
                onChange={this.handlePassword.bind(this)}
                onKeyDown={this.handleEnter.bind(this)}
              />
            </div>
          </div>
          <div className="login__button">
            <button onClick={this.handleLogin.bind(this)}>Login</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: () => {
      dispatch(startLogin())
    }
  }
}

export default connect(undefined, mapDispatchToProps)(LoginPage);
