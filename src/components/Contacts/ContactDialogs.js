import React from 'react';
import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import { submit } from 'redux-form';
import ReduxBlockUi from 'react-block-ui/redux';

import ContactDetails from './ContactDetails';
import ContactForm from './ContactForm';

const ContactDialogs = props => (
    <div id="react-no-print">
        <Dialog
            open={props.showContactDetails}
            onClose={props.closeDialog}
            transition={props.Transition}
            aria-labelledby="contact-details-dialog-title"
            aria-describedby="contact-details-dialog-description"
        >
            <DialogContent>
                <div id="contact-details-dialog-description">
                    <ContactDetails
                        loading={props.loading} 
                        currentContact={props.currentContact}
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.closeDialog} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
        <Dialog
            open={props.showAddContact || props.showEditContact}
            onClose={props.closeDialog}
            transition={props.Transition}
            aria-labelledby="add-edit-contact-dialog-title"
            aria-describedby="add-edit-contact-dialog-description"
        >
            <DialogTitle id="add-edit-contact-dialog-title">
                { props.showAddContact ? 'Add' : 'Edit' } Contact
            </DialogTitle>
            <DialogContent>
                <div id="add-edit-contact-dialog-description">
                    <ContactForm
                        loading={props.loading}
                        initialValues={props.showAddContact ? {} : props.currentContact}
                        currentContact={props.currentContact}
                        isEditing={props.showEditContact}
                        contacts={props.contacts}
                        onSaveContact={props.onSaveContact}
                        onChangeProfilePicture={props.onChangeProfilePicture}
                        onRemoveProfilePicture={props.onRemoveProfilePicture}
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.closeDialog}>
                    Close
                </Button>
                <Button 
                    onClick={() => props.dispatch(submit('ContactForm'))}
                    color="primary" 
                    variant="raised"
                >
                    {props.showAddContact ? 'Save' : 'Update' }
                </Button>
            </DialogActions>
        </Dialog>
        <Dialog
            open={props.showDeleteContact || props.showDeleteSelectedContacts}
            onClose={props.closeDialog}
            transition={props.Transition}
            aria-labelledby="delete-contact-dialog-title"
            aria-describedby="delete-contact-dialog-description"
        >
            <DialogTitle id="delete-contact-dialog-title">
                {`Delete contact${props.showDeleteSelectedContacts ? 's' : ''}`}
            </DialogTitle>
            <DialogContent>
                <div id="delete-contact-dialog-description">
                    <ReduxBlockUi tag="div" blocking={props.loading}>
                        {
                            props.showDeleteSelectedContacts
                            ? <span className="delete-selected-dialog-body">Delete selected contacts?</span>
                            : <span>
                                    <span className="delete-dialog-body">Are you sure?</span> <br />
                                    <span>Delete {props.currentContact.name}?</span>
                                </span>
                        }
                    </ReduxBlockUi>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.closeDialog} color="primary">
                    Close
                </Button>
                <Button 
                    onClick={
                        props.showDeleteSelectedContacts 
                        ? props.onDeleteSelectedContacts
                        : props.onDeleteContact
                    } 
                    color="secondary" 
                    variant="raised"
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    </div>
);

export default ContactDialogs;
