import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import ContactCard from './ContactCard';
import * as actions from '../../../actions/ContactsActions';
import * as dialogActions from '../../../actions/DialogActions';

class ContactCardContainer extends Component {
  constructor(props) {
    super(props);
    this.showDialog = this.showDialog.bind(this);
  }

  showDialog(dialogId) {
    this.props.openDialog(dialogId);
    this.props.setCurrentContact(this.props.contact);
  }

  render() {
    return (
      <Fragment>
        <ContactCard
          contact={this.props.contact}
          leftActions={this.props.leftActions}
          rightActions={this.props.rightActions}
          showDialog={this.showDialog}
          onClick={this.props.onClick}
        />
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  openDialog: dialogId => dispatch(dialogActions.openDialog(dialogId)),
  setCurrentContact: contact => dispatch(actions.setCurrentContact(contact)),
})

export default connect(null, mapDispatchToProps)(ContactCardContainer);
