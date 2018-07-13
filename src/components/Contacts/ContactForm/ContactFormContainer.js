import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';

import ContactForm from './ContactForm';
import * as actions from '../../../actions/ContactsActions';
import * as Toast from '../../Shared/Toast/Toaster';
import requestStates from '../../../util/request-states';
import { ADD_CONTACT_DIALOG, EDIT_CONTACT_DIALOG } from '../../../constants/dialogNames';
import { getBase64 } from '../../../util';

class ContactFormContainer extends Component {
  constructor(props) {
    super(props);
    this.onSaveContactHelper = this.onSaveContactHelper.bind(this);
    this.onSaveContact = this.onSaveContact.bind(this);
    this.onChangeProfilePicture = this.onChangeProfilePicture.bind(this);
    this.onRemoveProfilePicture = this.onRemoveProfilePicture.bind(this);
  }

  onSaveContactHelper(promise, componentToFocusAfterSave) {
		promise.then(() => {
			if (this.props.dialog === ADD_CONTACT_DIALOG) {
				if (!this.props.contactsError) {
					this.props.reset('ContactForm');
					componentToFocusAfterSave.focus();
					Toast.success('New contact added', 'Success');
					this.props.setCurrentContact({});
				} else {
					Toast.error(this.props.contactsError, 'Error');
				}
			} else {
				if (!this.props.contactsError) {
					Toast.success('Contact updated', 'Success');
					this.closeDialog();
				} else {
					Toast.error(this.props.contactsError, 'Error');
				}
			}
		}).catch((err) => {
				Toast.error(err.message, 'Error');
		});
	}

  onSaveContact(componentToFocusAfterSave, values) {
		if (this.props.dialog === ADD_CONTACT_DIALOG) {
			this.onSaveContactHelper(this.props.createContact({...values, profilePic: this.props.currentContact.profilePic}), componentToFocusAfterSave);
		} else {
			this.onSaveContactHelper(this.props.updateContact({...values, profilePic: this.props.currentContact.profilePic}), componentToFocusAfterSave);
		}
	}

  onChangeProfilePicture(event) {
		var file = event.target.files[0];
		if (file) {
			getBase64(file).then((res) => this.props.changeCurrentContactProfilePic(res.target.result));
		}
	}

  onRemoveProfilePicture() {
		this.props.changeCurrentContactProfilePic('');
	}

  render() {
    return (
      <ContactForm
				isEditing={this.props.dialog === EDIT_CONTACT_DIALOG}
				initialValues={this.props.dialog === ADD_CONTACT_DIALOG ? {} : this.props.currentContact}
        contacts={this.props.contacts}
        currentContact={this.props.currentContact}
        loading={this.props.loading}
        onChangeProfilePicture={this.onChangeProfilePicture}
        onRemoveProfilePicture={this.onRemoveProfilePicture}
        onSaveContact={this.onSaveContact}
      />
    );
  }
}

const mapStateToProps = state => ({
  dialog: state.dialogs.dialog,
  contacts: state.contacts.contacts,
  currentContact: state.contacts.currentContact,
  loading: state.contacts.requestState === requestStates.loading,
  contactsError: state.contacts.contactsError
});

const mapDispatchToProps = dispatch => ({
  reset: formName => dispatch(reset(formName)),
  setCurrentContact: contact => dispatch(actions.setCurrentContact(contact)),
	createContact: contact => dispatch(actions.createContactFunction(contact)),
  updateContact: contact => dispatch(actions.updateContactFunction(contact)),
  changeCurrentContactProfilePic: profilePic => actions.changeCurrentContactProfilePic(profilePic)
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactFormContainer);