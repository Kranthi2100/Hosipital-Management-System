import React from 'react';
import ReactDOM from 'react-dom';
import PatientContainer from './components/patientContainer';
import Header from './components/header';
import { Provider } from 'react-redux';
import './styles/index.css';

import configStore from './store/configStore';

const store = configStore();

const App = () => (
  <Provider store={store} >
    <div>
      <Header />
      <PatientContainer />
    </div>
  </Provider>
)

ReactDOM.render(<App />, document.getElementById('root'));
