import React, { Component } from 'react';
import { connect } from 'react-redux';

import PrintContacts from './PrintContacts';

class PrintContactsContainer extends Component {
  render() {
    return (
      <PrintContacts
        selectedContacts={this.props.selectedContacts}
      />
    );
  }
}

const mapStateToProps = state => ({
  selectedContacts: state.contacts.selectedContacts,
});

export default connect(mapStateToProps)(PrintContactsContainer);
