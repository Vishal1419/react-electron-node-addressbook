import React, { Component } from 'react';
import { connect } from 'react-redux';

import DeleteContact from './DeleteContact';

class DeleteContactContainer extends Component {
  render() {
    return (
      <DeleteContact currentContact={this.props.currentContact} />
    );
  }
}

const mapStateToProps = state => ({
  currentContact: state.contacts.currentContact,
});

export default connect(mapStateToProps)(DeleteContactContainer);