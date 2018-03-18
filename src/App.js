import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import 'react-block-ui/style.css';

import store from './store';
import Contacts from './pages/Contacts';
import LightTheme from './assets/themes/light';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <MuiThemeProvider theme={LightTheme}>
            <Contacts />
            <ToastContainer position="top-right" className="toastify" />
          </MuiThemeProvider>
        </Provider>
      </div>
    );
  }
}

export default App;
