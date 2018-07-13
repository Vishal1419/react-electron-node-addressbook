import React from 'react';
import { connect } from 'react-redux';

import ContactDetails from './ContactDetails';
import requestStates from '../../../util/request-states';

const ContactDetailsContainer = props => (
  <ContactDetails loading={props.loading} contact={props.currentContact} />
)

const mapStateToProps = state => ({
  currentContact: state.contacts.currentContact,
  loading: (
    state.contacts.requestState === requestStates.init 
    || state.contacts.requestState === requestStates.loading
  ),
})

export default connect(mapStateToProps)(ContactDetailsContainer);
