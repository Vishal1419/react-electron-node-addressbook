import React, { Component } from 'react';
import { connect } from 'react-redux';

import ContactsHeader from './ContactsHeader';
import * as actions from '../../../actions/ContactsActions';
import * as dialogActions from '../../../actions/DialogActions';

class ContactsHeaderContainer extends Component {
  constructor(props) {
    super(props);
    this.selectAllContacts = this.selectAllContacts.bind(this);
  }

  selectAllContacts(event, checked) {
		if (checked) {
			this.props.selectAllContacts();
		} else {
			this.props.deselectAllContacts();
		}
	}

  render() {
    return (
      <ContactsHeader
        currentView={this.props.currentView}
        contacts={this.props.contacts}
        selectedContacts={this.props.selectedContacts}
        selectAllContacts={this.selectAllContacts}
        toggleContactsView={this.props.toggleContactsView}
        searchTerm={this.props.searchTerm}
        filterContacts={this.props.filterContacts}
        openDialog={this.props.openDialog}
      />
    );
  }
}

const mapStateToProps = state => ({
  currentView: state.contacts.currentView,
  contacts: state.contacts.contacts,
  selectedContacts: state.contacts.selectedContacts,
  searchTerm: state.contacts.searchTerm,
});

const mapDispatchToProps = dispatch => ({
  openDialog: dialogId => dispatch(dialogActions.openDialog(dialogId)),
  selectAllContacts: () => dispatch(actions.selectAllContacts()),
  deselectAllContacts: () => dispatch(actions.deselectAllContacts()),
  toggleContactsView: () => dispatch(actions.toggleContactsView()),
  filterContacts: searchTerm => dispatch(actions.filterContacts(searchTerm)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsHeaderContainer);