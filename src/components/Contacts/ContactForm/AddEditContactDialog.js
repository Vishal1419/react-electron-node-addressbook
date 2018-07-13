import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import { submit } from 'redux-form';

import ContactFormContainer from './ContactFormContainer';
import { ADD_CONTACT_DIALOG, EDIT_CONTACT_DIALOG } from '../../../constants/dialogNames';
import DialogTransition from '../../Shared/DialogTransition';
import * as actions from '../../../actions/DialogActions';
import * as contactActions from '../../../actions/ContactsActions';

class AddEditContactDialog extends Component {
  constructor(props) {
    super(props);
    this.closeDialog = this.closeDialog.bind(this);
  }

  closeDialog() {
    this.props.closeDialog();
    this.props.setCurrentContact({});
  }

  render() {
    return (
      <Dialog
        open={this.props.dialog === ADD_CONTACT_DIALOG || this.props.dialog === EDIT_CONTACT_DIALOG }
        onClose={this.closeDialog}
        transition={DialogTransition}
        aria-labelledby="add-edit-contact-dialog-title"
        aria-describedby="add-edit-contact-dialog-description"
      >
        <DialogTitle id="add-edit-contact-dialog-title">
          { this.props.dialog === ADD_CONTACT_DIALOG ? 'Add' : 'Edit' } Contact
        </DialogTitle>
        <DialogContent>
          <div id="add-edit-contact-dialog-description">
            <ContactFormContainer />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.closeDialog}>
            Close
          </Button>
          <Button 
            onClick={() => this.props.submit('ContactForm')}
            color="primary" 
            variant="raised"
          >
            {this.props.dialog === ADD_CONTACT_DIALOG ? 'Save' : 'Update' }
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
  submit: formName => dispatch(submit(formName)),
  closeDialog: () => dispatch(actions.closeDialog()),
  setCurrentContact: contact => dispatch(contactActions.setCurrentContact(contact)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddEditContactDialog);
