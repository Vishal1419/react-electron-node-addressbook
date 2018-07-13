import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import BlockUI from 'react-block-ui';

import DeleteSelectedContactsContainer from './DeleteSelectedContactsContainer';
import DeleteContactContainer from './DeleteContactContainer';
import { DELETE_CONTACT_DIALOG, DELETE_SELECTED_CONTACTS_DIALOG } from '../../../constants/dialogNames';
import DialogTransition from '../../Shared/DialogTransition';
import * as actions from '../../../actions/DialogActions';
import * as contactsActions from '../../../actions/ContactsActions';
import * as Toast from '../../Shared/Toast/Toaster';
import requestStates from '../../../util/request-states';

class DeleteContactDialog extends Component {
  constructor(props) {
    super(props);
    this.closeDialog = this.closeDialog.bind(this);
    this.onDeleteContact = this.onDeleteContact.bind(this);
    this.onDeleteSelectedContacts = this.onDeleteSelectedContacts.bind(this);
  }

  closeDialog() {
    this.props.closeDialog();
    this.props.setCurrentContact({});
  }

  onDeleteContact() {
		this.props.deleteContact(this.props.currentContact).then(() => {
			if (!this.props.contactsError) {
				Toast.success('Contact deleted', 'Success');
				this.closeDialog();
				this.props.deselectContact(this.props.currentContact._id);
			} else {
				Toast.error(this.props.contactsError, 'Error');
			}
		}).catch((err) => {
			Toast.error(err.message, 'Error');
		});
	}

	onDeleteSelectedContacts() {
		Promise.all(this.props.selectedContacts.map(contact => this.props.deleteContact(contact))).then(() => {
			if (!this.props.contactsError) {
				Toast.success('Selected contacts deleted', 'Success');
				this.closeDialog();
				this.props.deselectAllContacts();
			} else {
				Toast.error(this.props.contactsError, 'Error');
			}
		}).catch((err) => {
			Toast.error(err.message, 'Error');
		});
	}

  render() {
    return (
      <Dialog
        open={this.props.dialog === DELETE_CONTACT_DIALOG || this.props.dialog === DELETE_SELECTED_CONTACTS_DIALOG}
        onClose={this.closeDialog}
        transition={DialogTransition}
        aria-labelledby="delete-contact-dialog-title"
        aria-describedby="delete-contact-dialog-description"
      >
        <DialogTitle id="delete-contact-dialog-title">
          {`Delete contact${this.props.dialog === DELETE_SELECTED_CONTACTS_DIALOG ? 's' : ''}`}
        </DialogTitle>
        <DialogContent>
          <div id="delete-contact-dialog-description">
            <BlockUI tag="div" blocking={this.props.loading}>
              {
                this.props.dialog === DELETE_SELECTED_CONTACTS_DIALOG
                ? <DeleteSelectedContactsContainer />
                : <DeleteContactContainer />
              }
            </BlockUI>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.closeDialog} color="primary">
            Close
          </Button>
          <Button 
            onClick={
              this.props.dialog === DELETE_SELECTED_CONTACTS_DIALOG 
              ? this.onDeleteSelectedContacts
              : this.onDeleteContact
            } 
            color="secondary" 
            variant="raised"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  dialog: state.dialogs.dialog,
  currentContact: state.contacts.currentContact,
  selectedContacts: state.contacts.selectedContacts,
  loading: state.contacts.requestState === requestStates.loading,
  contactsError: state.contacts.contactsError,
});

const mapDispatchToProps = dispatch => ({
  closeDialog: () => dispatch(actions.closeDialog()),
  setCurrentContact: contact => dispatch(contactsActions.setCurrentContact(contact)),
  deleteContact: contact => dispatch(contactsActions.deleteContactFunction(contact)),
  deselectContact: contactId => dispatch(contactsActions.deselectContact(contactId)),
  deselectAllContacts: () => dispatch(contactsActions.deselectAllContacts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteContactDialog);
