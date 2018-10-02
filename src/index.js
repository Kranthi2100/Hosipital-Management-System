import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import './styles/index.css';
import AppRoute from './routers/appRoute';

import configStore from './store/configStore';

const store = configStore();

const App = () => (
  <Provider store={store}>
    <AppRoute />
  </Provider>
)

ReactDOM.render(<App />, document.getElementById('root'));
