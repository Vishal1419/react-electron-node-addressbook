import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import { submit, reset } from 'redux-form';
import ReduxBlockUi from 'react-block-ui/redux';

import './Contacts.css';
import Contacts from './Contacts';
import { 
	getAllContactsFunction, 
	createContactFunction, 
	updateContactFunction, 
	deleteContactFunction, 
} from '../../actions/ContactsActions';
import ContactDetails from './ContactDetails';
import ContactForm from './ContactForm';
import * as Toast from '../Toast/Toaster';
import RequestStates from '../../util/request-states';
import { orderBy } from '../../util';

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
		this.onSaveContact = this.onSaveContact.bind(this);
		this.onSaveContactHelper = this.onSaveContactHelper.bind(this);
		this.onDeleteContact = this.onDeleteContact.bind(this);
		this.onDeleteSelectedContacts = this.onDeleteSelectedContacts.bind(this);
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
				selectedContacts: [...this.state.selectedContacts.filter(c => c.id !== contact.id)]
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

	onSaveContact(values) {
		if (this.state.showAddContact) {
			this.onSaveContactHelper(this.props.createContact(values));
		} else {
			this.onSaveContactHelper(this.props.updateContact(values));
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
		this.props.deleteContact(this.state.currentContact.id).then(() => {
			if (!this.props.contactsError) {
				Toast.success('Contact deleted', 'Success');
				this.closeDialog();
			} else {
				Toast.error(this.props.contactsError, 'Error');
			}
		}).catch((err) => {
			Toast.error(err.message, 'Error');
		});
	}

	onDeleteSelectedContacts() {
		Promise.all(this.state.selectedContacts.map(contact => this.props.deleteContact(contact.id))).then(() => {
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
		
	render() {
		return (
			<div>
				<Contacts
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
				/>
				<div id="react-no-print">
					<Dialog
						open={this.state.showContactDetails}
						onClose={this.closeDialog}
						transition={this.Transition}
						aria-labelledby="contact-details-dialog-title"
						aria-describedby="contact-details-dialog-description"
					>
						{/* <DialogTitle id="contact-details-dialog-title">Contact Details</DialogTitle> */}
						<DialogContent>
							<div id="contact-details-dialog-description">
								<ContactDetails
									loading={this.props.loading} 
									currentContact={this.state.currentContact}
								/>
							</div>
						</DialogContent>
						<DialogActions>
							<Button onClick={this.closeDialog} color="primary">
								Close
							</Button>
						</DialogActions>
					</Dialog>
					<Dialog
						open={this.state.showAddContact || this.state.showEditContact}
						onClose={this.closeDialog}
						transition={this.Transition}
						aria-labelledby="add-edit-contact-dialog-title"
						aria-describedby="add-edit-contact-dialog-description"
					>
						<DialogTitle id="add-edit-contact-dialog-title">
							{ this.state.showAddContact ? 'Add' : 'Edit' } Contact
						</DialogTitle>
						<DialogContent>
							<div id="add-edit-contact-dialog-description">
								<ContactForm
									loading={this.props.loading}
									initialValues={this.state.showAddContact ? {} : this.state.currentContact}
									currentContact={this.state.currentContact}
									isEditing={this.state.showEditContact}
									contacts={this.props.contacts}
									onSaveContact={this.onSaveContact}
								/>
							</div>
						</DialogContent>
						<DialogActions>
							<Button onClick={this.closeDialog}>
								Close
							</Button>
							<Button 
								onClick={() => this.props.dispatch(submit('ContactForm'))}
								color="primary" 
								variant="raised"
							>
								{this.state.showAddContact ? 'Save' : 'Update' }
							</Button>
						</DialogActions>
					</Dialog>
					<Dialog
						open={this.state.showDeleteContact || this.state.showDeleteSelectedContacts}
						onClose={this.closeDialog}
						transition={this.Transition}
						aria-labelledby="delete-contact-dialog-title"
						aria-describedby="delete-contact-dialog-description"
					>
						<DialogTitle id="delete-contact-dialog-title">
							{`Delete contact${this.state.showDeleteSelectedContacts ? 's' : ''}`}
						</DialogTitle>
						<DialogContent>
							<div id="delete-contact-dialog-description">
								<ReduxBlockUi tag="div" blocking={this.props.loading}>
									{
										this.state.showDeleteSelectedContacts
										? <span className="delete-selected-dialog-body">Delete selected contacts?</span>
										: <span>
												<span className="delete-dialog-body">Are you sure?</span> <br />
												<span>Delete {this.state.currentContact.name}?</span>
											</span>
									}
								</ReduxBlockUi>
							</div>
						</DialogContent>
						<DialogActions>
							<Button onClick={this.closeDialog} color="primary">
								Close
							</Button>
							<Button 
								onClick={
									this.state.showDeleteSelectedContacts 
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
				</div>
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
	deleteContact: (id) => dispatch(deleteContactFunction(id)),
	dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsContainer);