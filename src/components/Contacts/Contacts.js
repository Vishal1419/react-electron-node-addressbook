import React from 'react';
import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui-icons/Add';
import EditIcon from 'material-ui-icons/Edit';
import DeleteIcon from 'material-ui-icons/Delete';
import SearchIcon from 'material-ui-icons/Search';
import SortUpArrow from 'material-ui-icons/ArrowDropUp';
import SortDownArrow from 'material-ui-icons/ArrowDropDown';
import Button from 'material-ui/Button';
import ReduxBlockUi from 'react-block-ui/redux';

const Contacts = props => {
	const columns = [
		{ name: 'name', value: 'Name' },
		{ name: 'mobileNo', value: 'Mobile No' },
		{ name: 'email', value: 'Email' },
		{ name: 'village', value: 'Location' },
	]
	return (
		<ReduxBlockUi tag="div" blocking={props.loading}>
			<Paper>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<div>
					</div>
					<div style={{ marginTop: 4 }}>
						<input
							style={{ 
								background: `url(${require('../../assets/icons/search.svg')})`, 
								backgroundSize: '24px 24px',
								backgroundRepeat: 'no-repeat',
								backgroundPosition: 'left 5.5px top 5.5px',
								border: '1px solid #ddd', 
								borderRadius: 2,
								paddingLeft: 36,
								height: 35,
								fontSize: 14,
								marginRight: 10,
								color: '#777',
							}}
							value={props.searchTerm}
							onChange={props.setSearchTerm}
						/>
						<Button 
							color="secondary" 
							variant="raised" 
							style={{ margin: 10, marginTop: 6 }}
							disabled={props.selectedContacts.length <= 0}
							onClick={props.deleteSelectedContacts}
						>
							<DeleteIcon style={{ marginRight: 10 }} />
							Delete Selected
						</Button>
						<Button 
							color="primary" 
							variant="raised" 
							style={{ margin: 10, marginTop: 6 }}
							onClick={props.addContactDetails}
						>
							<AddIcon style={{ marginRight: 10 }} />
							Add New
						</Button>
					</div>
				</div>
				<hr />
				<Table className="overlay-table">
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
											style={{ display: 'flex', alignItems: 'center' }}
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
								<div style={{ marginLeft: 15 }}>
									Actions
								</div>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{
							props.contacts.map(contact => (
								<TableRow
									key={contact.id}
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
											className={props.classes.button}
											onClick={event => props.editContactDetails(event, contact)} 
										>
											<EditIcon />
										</IconButton>
										<IconButton 
											color="secondary" 
											className={props.classes.button}
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
			</Paper>
		</ReduxBlockUi>
	);
}

export default withStyles()(Contacts);