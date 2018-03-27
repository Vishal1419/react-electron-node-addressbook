import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slide from 'material-ui/transitions/Slide';
import { reset } from 'redux-form';

import Contacts from './Contacts';
import ContactDialogs from './ContactDialogs';
import { 
	getAllContactsFunction, 
	createContactFunction, 
	updateContactFunction, 
	deleteContactFunction, 
} from '../../actions/ContactsActions';
import * as Toast from '../Toast/Toaster';
import RequestStates from '../../util/request-states';
import { orderBy, getBase64 } from '../../util';

const invertDirection = {
	asc: 'desc',
	desc: 'asc',
};

class ContactsContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showContactDetails: false,
			showAddContact: false,
			showEditContact: false,
			showDeleteContact: false,
			showDeleteSelectedContacts: false,
			currentContact: {},
			columnToSort: '',
			sortDirection: 'desc',
			searchTerm: '',
			selectedContacts: [],
			currentView: 'profile',
			openImportExportOptions: false,
			importExportAnchorEl: null,
		}
		this.selectAllContacts = this.selectAllContacts.bind(this);
		this.selectContact = this.selectContact.bind(this);
		this.sortColumn = this.sortColumn.bind(this);
		this.setSearchTerm = this.setSearchTerm.bind(this);
		this.viewContactDetails = this.viewContactDetails.bind(this);
		this.addContactDetails = this.addContactDetails.bind(this);
		this.editContactDetails = this.editContactDetails.bind(this);
		this.deleteContact = this.deleteContact.bind(this);
		this.deleteSelectedContacts = this.deleteSelectedContacts.bind(this);
		this.closeDialog = this.closeDialog.bind(this);
		this.onChangeProfilePicture = this.onChangeProfilePicture.bind(this);
		this.onSaveContact = this.onSaveContact.bind(this);
		this.onSaveContactHelper = this.onSaveContactHelper.bind(this);
		this.onDeleteContact = this.onDeleteContact.bind(this);
		this.onDeleteSelectedContacts = this.onDeleteSelectedContacts.bind(this);
		this.toggleView = this.toggleView.bind(this);
		this.toggleImportExportOptions = this.toggleImportExportOptions.bind(this);
	}

	componentWillMount() {
		this.props.getAllContacts().then(() => {
			if (this.props.contactsError) {
				Toast.error(this.props.contactsError, 'Error');
			}
		}).catch((err) => {
			Toast.error(err.message, 'Error');
		});
	}

	selectAllContacts(event, checked, contacts) {
		if (checked) {
			this.setState({
				selectedContacts: contacts
			});
		} else {
			this.setState({
				selectedContacts: []
			});
		}
	}
	
	selectContact(event, contact) {
		event.stopPropagation();
		if (!this.state.selectedContacts.includes(contact)) {
			this.setState({
				selectedContacts: [...this.state.selectedContacts, contact]
			});
		} else {
			this.setState({
				selectedContacts: [...this.state.selectedContacts.filter(c => c._id !== contact._id)]
			});
		}
	}

	sortColumn(columnName) {
		this.setState({
			columnToSort: columnName,
			sortDirection: this.state.columnToSort === columnName 
											? invertDirection[this.state.sortDirection] : 'asc',
		});
	}

	setSearchTerm(event) {
		this.setState({
			searchTerm: event.target.value,
		});
	}

	viewContactDetails(contact) {
		this.setState({
			showContactDetails: true,
			currentContact: contact,
		});
	}

	addContactDetails() {
		this.setState({
			showAddContact: true,
		});
	}

	editContactDetails(event, contact) {
		event.stopPropagation();        
		this.setState({
			showEditContact: true,
			currentContact: contact,
		});
	}

	deleteContact(event, contact) {
		event.stopPropagation();        
		this.setState({
			showDeleteContact: true,
			currentContact: contact,
		});
	}

	deleteSelectedContacts() {
		this.setState({
			showDeleteSelectedContacts: true,
		});
	}
	 
	onChangeProfilePicture(event) {
		var file = event.target.files[0];
		getBase64(file).then((res) => this.setState({
			currentContact: {
				...this.state.currentContact,
				profilePic: res.target.result,
			}
		}));
	}

	onSaveContact(values) {
		if (this.state.showAddContact) {
			this.onSaveContactHelper(this.props.createContact({...values, profilePic: this.state.currentContact.profilePic}));
		} else {
			this.onSaveContactHelper(this.props.updateContact({...values, profilePic: this.state.currentContact.profilePic}));
		}
	}

	onSaveContactHelper(promise) {
		promise.then(() => {
			if (this.state.showAddContact) {
				if (!this.props.contactsError) {
					this.props.dispatch(reset('ContactForm'));
					Toast.success('New contact added', 'Success');
					this.setState({
						currentContact: {}
					});
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

	onDeleteContact() {
		const currentContactId = this.state.currentContact._id;
		this.props.deleteContact(this.state.currentContact).then(() => {
			if (!this.props.contactsError) {
				Toast.success('Contact deleted', 'Success');
				this.closeDialog();
				console.log(this.state.selectedContacts);
				console.log(this.state.currentContact);
				this.setState({
					selectedContacts: [...this.state.selectedContacts.filter(contact => contact._id !== currentContactId)]
				});
			} else {
				Toast.error(this.props.contactsError, 'Error');
			}
		}).catch((err) => {
			Toast.error(err.message, 'Error');
		});
	}

	onDeleteSelectedContacts() {
		Promise.all(this.state.selectedContacts.map(contact => this.props.deleteContact(contact))).then(() => {
			if (!this.props.contactsError) {
				Toast.success('Selected contacts deleted', 'Success');
				this.closeDialog();
				this.setState({
					selectedContacts: []
				});
			} else {
				Toast.error(this.props.contactsError, 'Error');
			}
		}).catch((err) => {
			Toast.error(err.message, 'Error');
		});
	}

	closeDialog() {
		this.setState({
			showContactDetails: false,
			showAddContact: false,
			showEditContact: false,
			showDeleteContact: false,
			showDeleteSelectedContacts: false,
			currentContact: {},
		});
	}

	Transition(props) {
		return <Slide direction="down" {...props} />;
	}

	toggleView() {
		this.setState({
			currentView: this.state.currentView === 'table' ? 'profile' : 'table',
		});
	}

	toggleImportExportOptions(event) {
		this.setState({
			openImportExportOptions: !this.state.openImportExportOptions,
			importExportAnchorEl: event.target,
		});
	}

	render() {
		return (
			<div>
				<Contacts
					isOnline={this.props.isOnline}
					loading={this.props.loading} 
					contacts={
						orderBy(
							this.props.contacts.filter(
								contact => {
									const sTerm = this.state.searchTerm.toLocaleLowerCase();
									return contact.name.toLocaleLowerCase().includes(sTerm)
											|| contact.mobileNo.toLocaleLowerCase().includes(sTerm)
											|| contact.email.toLocaleLowerCase().includes(sTerm)
											|| contact.village.toLocaleLowerCase().includes(sTerm)
											|| contact.taluka.toLocaleLowerCase().includes(sTerm)
											|| contact.district.toLocaleLowerCase().includes(sTerm)
								}
							), 
							this.state.columnToSort, 
							this.state.sortDirection
						)
					}
					selectedContacts={
						this.state.selectedContacts.filter(
							contact => {
								const sTerm = this.state.searchTerm.toLocaleLowerCase();
								return contact.name.toLocaleLowerCase().includes(sTerm)
										|| contact.mobileNo.toLocaleLowerCase().includes(sTerm)
										|| contact.email.toLocaleLowerCase().includes(sTerm)
										|| contact.village.toLocaleLowerCase().includes(sTerm)
										|| contact.taluka.toLocaleLowerCase().includes(sTerm)
										|| contact.district.toLocaleLowerCase().includes(sTerm)
							}
						)
					}
					selectAllContacts={this.selectAllContacts}
					selectContact={this.selectContact}
					viewContactDetails={this.viewContactDetails}
					addContactDetails={this.addContactDetails}
					editContactDetails={this.editContactDetails}
					deleteContact={this.deleteContact}
					deleteSelectedContacts={this.deleteSelectedContacts}
					sortColumn={this.sortColumn}
					columnToSort={this.state.columnToSort}
					sortDirection={this.state.sortDirection}
					setSearchTerm={this.setSearchTerm}
					toggleView={this.toggleView}
					currentView={this.state.currentView}
					toggleImportExportOptions={this.toggleImportExportOptions}
					openImportExportOptions={this.state.openImportExportOptions}
					importExportAnchorEl={this.state.importExportAnchorEl}
				/>
				<ContactDialogs
					loading={this.props.loading}
					showContactDetails={this.state.showContactDetails}
					showAddContact={this.state.showAddContact}
					showEditContact={this.state.showEditContact}
					showDeleteContact={this.state.showDeleteContact}
					showDeleteSelectedContacts={this.state.showDeleteSelectedContacts}
					closeDialog={this.closeDialog}
					Transition={this.Transition}
					contacts={this.props.contacts}
					currentContact={this.state.currentContact}
					onSaveContact={this.onSaveContact}
					onChangeProfilePicture={this.onChangeProfilePicture}
					onDeleteContact={this.onDeleteContact}
					onDeleteSelectedContacts={this.onDeleteSelectedContacts}
					dispatch={this.props.dispatch}
				/>
			</div>
		);
	}
}

const mapStateToProps = state  => ({
	contacts: state.contacts.contacts,
	selectedContacts: state.contacts.selectedContacts,
	loading: state.contacts.requestState === RequestStates.loading,
	contactsError: state.contacts.contactsError
});

const mapDispatchToProps = dispatch => ({
	getAllContacts: () => dispatch(getAllContactsFunction()),
	createContact: (contact) => dispatch(createContactFunction(contact)),
	updateContact: (contact) => dispatch(updateContactFunction(contact)),
	deleteContact: (contact) => dispatch(deleteContactFunction(contact)),
	dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsContainer);