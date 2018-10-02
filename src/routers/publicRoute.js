import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({
  isNotAuthenticated,
  component: Component,
  ...rest
}) => (
    <Route {...rest} component={(props) => (
      (isNotAuthenticated) ? (
        <Component {...props} />
      ) : (
          <Redirect to='/dashboard' />
        )
    )} />
  )

const mapStateToProps = (state) => ({
  isNotAuthenticated: !state.auth.isAuth
})

export default connect(mapStateToProps)(PublicRoute);