import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui-icons/Edit';
import DeleteIcon from 'material-ui-icons/Delete';

import ContactCard from './ContactCard';

const ContactCards = props => (
	<div className="side-by-side-start-stretch contacts-profile-view slide-in-left">
		{
			props.contacts.map(contact => 
				<div key={contact._id} className="contact-profile-view">
					<ContactCard  
						contact={contact}
						leftActions={
							<Checkbox
								className="contact-profile-view-action"
								checked={props.selectedContacts.indexOf(contact) !== -1}
								onClick={evt => props.selectContact(evt, contact)}
							/>
						}
						rightActions={
							<div className="contact-profile-view-actions">
								<IconButton 
									color="primary" 
									className="contact-profile-view-action"
									onClick={event => props.editContactDetails(event, contact)} 
								>
									<EditIcon />
								</IconButton>
								<IconButton 
									color="secondary" 
									className="contact-profile-view-action"
									onClick={event => props.deleteContact(event, contact)} 
								>
									<DeleteIcon />
								</IconButton>
							</div>
						}
						viewContactDetails={props.viewContactDetails}
					/>
				</div>
			)
		}
	</div>
);

export default ContactCards;
