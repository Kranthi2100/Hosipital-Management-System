import React from 'react';
import createHistory from 'history/createBrowserHistory';
import { 
  Router, 
  Switch 
} from 'react-router-dom';
import AppContainer from '../container/appContainer';
import LoginPage from '../container/loginContainer';
import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoute';
const history = createHistory();

const AppRoute = () => (
  <Router history={history}>
    <Switch>
      <PublicRoute path="/" component={LoginPage} exact={true} />
      <PrivateRoute path="/dashboard" component={AppContainer} />
    </Switch>
  </Router>
)

export default AppRoute;