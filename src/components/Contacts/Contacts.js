import React from 'react';
import ReduxBlockUi from 'react-block-ui/redux';

import ContactsHeaderContainer from './ContactsHeader/ContactsHeaderContainer';
import ContactsTableContainer from './ContactsTable/ContactsTableContainer';
import ContactCardsContainer from './ContactCards/ContactCardsContainer';
import PrintContactsContainer from './PrintContacts/PrintContactsContainer';

const Contacts = props => {
	return (
		<ReduxBlockUi tag="div" className="contacts-loader" blocking={props.loading}>
			<div id="react-no-print">
				<ContactsHeaderContainer />
				<div style={{ whiteSpace: 'nowrap' }}>
					{
						props.currentView === 'profile'
						? <ContactCardsContainer />
						: <ContactsTableContainer />
					}
				</div>
			</div>
			<div id="print-mount">
				<PrintContactsContainer />
			</div>
		</ReduxBlockUi>
	);
}

export default Contacts;
