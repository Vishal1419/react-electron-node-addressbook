import React from 'react';
import ReduxBlockUi from 'react-block-ui/redux';

import ContactsHeader from './ContactsHeader';
import ContactsTable from './ContactsTable';
import ContactCards from './ContactCards';
import PrintContacts from './PrintContacts';

const Contacts = props => {
	return (
		<ReduxBlockUi tag="div" blocking={props.loading}>
			<div id="react-no-print">
				<ContactsHeader
					contacts={props.contacts}
					selectedContacts={props.selectedContacts}
					selectAllContacts={props.selectAllContacts}
					toggleView={props.toggleView}
					currentView={props.currentView}
					setSearchTerm={props.setSearchTerm}
					searchTerm={props.searchTerm}
					toggleImportExportOptions={props.toggleImportExportOptions}
					openImportExportOptions={props.openImportExportOptions}
					importExportAnchorEl={props.importExportAnchorEl}
					addContactDetails={props.addContactDetails}
					deleteSelectedContacts={props.deleteSelectedContacts}
					isOnline={props.isOnline}
				/>
				{
					props.currentView === 'table'
					? (
						<ContactsTable
							contacts={props.contacts}
							selectContact={props.selectContact}
							selectedContacts={props.selectedContacts}
							selectAllContacts={props.selectAllContacts}
							sortColumn={props.sortColumn}
							columnToSort={props.columnToSort}
							sortDirection={props.sortDirection}
							viewContactDetails={props.viewContactDetails}
							editContactDetails={props.editContactDetails}
							deleteContact={props.editContactDetails}
						/>
					)
					: (
						<ContactCards
							contacts={props.contacts}
							selectContact={props.selectContact}
							selectedContacts={props.selectedContacts}
							editContactDetails={props.editContactDetails}
							deleteContact={props.deleteContact}
						/>
					)
				}
			</div>
			<div id="print-mount">
				<PrintContacts selectedContacts={props.selectedContacts} />
			</div>
		</ReduxBlockUi>
	);
}

export default Contacts;
