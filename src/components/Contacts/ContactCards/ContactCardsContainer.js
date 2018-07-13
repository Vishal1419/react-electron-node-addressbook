import React, { Component } from 'react';
import { connect } from 'react-redux';

import ContactCards from './ContactCards';
import * as actions from '../../../actions/ContactsActions';
import * as dialogActions from '../../../actions/DialogActions';
import { EDIT_CONTACT_DIALOG, DELETE_CONTACT_DIALOG } from '../../../constants/dialogNames';

class ContactCardsContainer extends Component {
  constructor(props) {
    super(props);
    this.selectContact = this.selectContact.bind(this);
    this.showEditContact = this.showEditContact.bind(this);
    this.showDeleteContact = this.showDeleteContact.bind(this);
  }

  selectContact(event, contact) {
		event.stopPropagation();
		if (!this.props.selectedContacts.includes(contact)) {
			this.props.selectContact(contact);
		} else {
			this.props.deselectContact(contact._id);
		}
	}

  showEditContact(event, contact) {
		event.stopPropagation();        
		this.props.openDialog(EDIT_CONTACT_DIALOG);
		this.props.setCurrentContact(contact);
	}

	showDeleteContact(event, contact) {
		event.stopPropagation();        
		this.props.openDialog(DELETE_CONTACT_DIALOG);
		this.props.setCurrentContact(contact);
	}

  render() {
    return (
      <ContactCards
        contacts={this.props.contacts}
        selectContact={this.selectContact}
        selectedContacts={this.props.selectedContacts}
        showEditContact={this.showEditContact}
        showDeleteContact={this.showDeleteContact}
      />
    );
  }
}

const mapStateToProps = state => ({
  contacts: state.contacts.contacts,
  selectedContacts: state.contacts.selectedContacts
});

const mapDispatchToProps = dispatch => ({
  openDialog: dialogId => dispatch(dialogActions.openDialog(dialogId)),
  selectContact: contact => dispatch(actions.selectContact(contact)),
  deselectContact: contactId => dispatch(actions.deselectContact(contactId)),
  setCurrentContact: contact => dispatch(actions.setCurrentContact(contact)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactCardsContainer);
