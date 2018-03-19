import React from 'react';
import ContactsContainer from '../components/Contacts/ContactsContainer';

const Contacts = (props) => (
    <ContactsContainer isOnline={props.isOnline} />
);

export default Contacts;