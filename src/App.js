import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-block-ui/style.css';

import './App.css';
import store from './store';
import Contacts from './pages/Contacts';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <div>
            <Contacts />
            <ToastContainer position="top-right" className="toastify" />
          </div>
        </Provider>
      </div>
    );
  }
}

export default App;
