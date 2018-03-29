import React from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import SortUpArrow from 'material-ui-icons/ArrowDropUp';
import SortDownArrow from 'material-ui-icons/ArrowDropDown';
import EditIcon from 'material-ui-icons/Edit';
import DeleteIcon from 'material-ui-icons/Delete';

const ContactsTable = props => {
	const columns = [
		{ name: 'name', value: 'Name' },
		{ name: 'mobileNo', value: 'Mobile No' },
		{ name: 'email', value: 'Email' },
		{ name: 'village', value: 'Location' },
	]
	return (
		<Table className="overlay-table slide-in-right">
			<TableHead className="table-header">
				<TableRow>
					<TableCell padding="checkbox">
						<Checkbox
							indeterminate={
								props.selectedContacts.length > 0 &&
								props.selectedContacts.length < props.contacts.length
							}
							checked={
								props.contacts.length !== 0 && 
								props.selectedContacts.length === props.contacts.length
							}
							onChange={(evt, checked) => props.selectAllContacts(evt, checked, props.contacts)}
						/>
					</TableCell>
					{
						columns.map(column => 
							<TableCell key={column.name}>
								<div
									onClick={() => props.sortColumn(column.name)}
									className="contacts-table-header-cell"
									>
									{column.value}
									{
										props.columnToSort === column.name
										? props.sortDirection === 'asc' 
											? <SortUpArrow /> 
											: <SortDownArrow />
										: null
									}
								</div>
							</TableCell>
						)
					}
					<TableCell>
						<div className="contacts-table-header-cell-actions">
							Actions
						</div>
					</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{
					props.contacts.map(contact => (
						<TableRow
							key={contact._id}
							hover
							role="checkbox"
							tabIndex={-1}
							aria-checked={props.selectedContacts.indexOf(contact) !== -1}
							selected={props.selectedContacts.indexOf(contact) !== -1}
							onClick={() => props.viewContactDetails(contact)}
						>
							<TableCell padding="checkbox">
								<Checkbox
									checked={props.selectedContacts.indexOf(contact) !== -1}
									onClick={evt => props.selectContact(evt, contact)}
								/>
							</TableCell>
							<TableCell>
								{contact.name}
							</TableCell>
							<TableCell>{contact.mobileNo}</TableCell>
							<TableCell>{contact.email}</TableCell>
							<TableCell>
								{
									`
										${contact.village ? contact.village : ''}${contact.village && (contact.taluka || contact.district) ? ', ' : ''}
										${contact.taluka ? contact.taluka : ''}${contact.taluka && contact.district ? ', ' : ''}
										${contact.district ? contact.district : ''}
									`
								}
							</TableCell>
							<TableCell>
								<IconButton 
									color="primary" 
									onClick={event => props.editContactDetails(event, contact)} 
								>
									<EditIcon />
								</IconButton>
								<IconButton 
									color="secondary" 
									onClick={event => props.deleteContact(event, contact)} 
								>
									<DeleteIcon />
								</IconButton>
							</TableCell>
						</TableRow>
					))
				}
			</TableBody>
		</Table>
	);
}

export default ContactsTable;