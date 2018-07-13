import React, { Component } from 'react';
import { connect } from 'react-redux';

import ContactsTable from './ContactsTable';
import * as actions from '../../../actions/ContactsActions';
import * as dialogActions from '../../../actions/DialogActions';
import { EDIT_CONTACT_DIALOG, DELETE_CONTACT_DIALOG, CONTACT_DETAILS_DIALOG } from '../../../constants/dialogNames';

class ContactCardsContainer extends Component {
  constructor(props) {
    super(props);
    this.selectAllContacts = this.selectAllContacts.bind(this);
    this.selectContact = this.selectContact.bind(this);
    this.showEditContact = this.showEditContact.bind(this);
    this.showDeleteContact = this.showDeleteContact.bind(this);
    this.showContactDetails = this.showContactDetails.bind(this);
  }

	selectAllContacts(event, checked) {
		if (checked) {
			this.props.selectAllContacts();
		} else {
			this.props.deselectAllContacts();
		}
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
  
  showContactDetails(contact) {
    this.props.openDialog(CONTACT_DETAILS_DIALOG);
    this.props.setCurrentContact(contact);
  }

  render() {
    return (
      <ContactsTable
        contacts={this.props.contacts}
        selectAllContacts={this.selectAllContacts}
        selectContact={this.selectContact}
        selectedContacts={this.props.selectedContacts}
        showEditContact={this.showEditContact}
        showDeleteContact={this.showDeleteContact}
        showContactDetails={this.showContactDetails}
        sortContacts={this.props.sortContacts}
        sortKey={this.props.sortKey}
        sortDirection={this.props.sortDirection}
      />
    );
  }
}

const mapStateToProps = state => ({
  contacts: state.contacts.contacts,
  selectedContacts: state.contacts.selectedContacts,
  sortKey: state.contacts.sortKey,
	sortDirection: state.contacts.sortDirection,
});

const mapDispatchToProps = dispatch => ({
  openDialog: dialogId => dispatch(dialogActions.openDialog(dialogId)),
  selectAllContacts: () => dispatch(actions.selectAllContacts()),
	deselectAllContacts: () => dispatch(actions.deselectAllContacts()),
  selectContact: contact => dispatch(actions.selectContact(contact)),
  deselectContact: contactId => dispatch(actions.deselectContact(contactId)),
  setCurrentContact: contact => dispatch(actions.setCurrentContact(contact)),
  sortContacts: key => dispatch(actions.sortContacts(key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactCardsContainer);
