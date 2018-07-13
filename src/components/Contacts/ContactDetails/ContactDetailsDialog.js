import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';

import ContactDetailsContainer from './ContactDetailsContainer';
import { CONTACT_DETAILS_DIALOG } from '../../../constants/dialogNames';
import DialogTransition from '../../Shared/DialogTransition';
import * as actions from '../../../actions/DialogActions';
import * as contactActions from '../../../actions/ContactsActions';

class ContactDetailsDialog extends Component {
  constructor(props) {
    super(props);
    this.closeDialog = this.closeDialog.bind(this);
  }

  closeDialog() {
    this.props.closeDialog();
    this.props.setCurrentContact({});
  }

  render() {
    console.log('this dialog is visible now: ', this.props.dialog, CONTACT_DETAILS_DIALOG, this.props.dialog === CONTACT_DETAILS_DIALOG)
    return (
      <Dialog
        open={this.props.dialog === CONTACT_DETAILS_DIALOG }
        onClose={this.closeDialog}
        transition={DialogTransition}
        aria-labelledby="contact-details-dialog-title"
        aria-describedby="contact-details-dialog-description"
      >
        <DialogContent>
          <div id="contact-details-dialog-description">
            <ContactDetailsContainer />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.closeDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  dialog: state.dialogs.dialog,
});

const mapDispatchToProps = dispatch => ({
  closeDialog: () => dispatch(actions.closeDialog()),
  setCurrentContact: contact => dispatch(contactActions.setCurrentContact(contact)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetailsDialog);
