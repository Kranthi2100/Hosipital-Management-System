import React from 'react';
import ReactDOM from 'react-dom';
import PatientContainer from './components/patientContainer';
import {Provider} from 'react-redux';
import './styles/index.css';

import configStore from './store/configStore';

const store = configStore();

const App = () => (
  <Provider store={store} >
    <PatientContainer />
  </Provider>
)

ReactDOM.render(<App />, document.getElementById('root'));

