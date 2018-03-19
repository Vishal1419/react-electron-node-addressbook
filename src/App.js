import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { check, watch } from 'is-offline';

import 'react-block-ui/style.css';

import store from './store';
import Contacts from './pages/Contacts';
import LightTheme from './assets/themes/light';

let unwatch;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOnline: false,
    };
  }

  componentWillMount() {
    const setNetworkStatus = (networkStatus) => {
      this.setState({ isOnline: !networkStatus });
    }
    check().then(setNetworkStatus);
    unwatch = watch(setNetworkStatus);
  }

  componentWillUnmount() {
    unwatch();
  }

  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <MuiThemeProvider theme={LightTheme}>
            <Contacts isOnline={this.state.isOnline} />
            <ToastContainer position="top-right" className="toastify" />
          </MuiThemeProvider>
        </Provider>
      </div>
    );
  }
}

export default App;
