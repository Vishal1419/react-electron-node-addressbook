import React from 'react';
import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui-icons/Add';
import EditIcon from 'material-ui-icons/Edit';
import DeleteIcon from 'material-ui-icons/Delete';
import PrintIcon from 'material-ui-icons/Print';
import SortUpArrow from 'material-ui-icons/ArrowDropUp';
import SortDownArrow from 'material-ui-icons/ArrowDropDown';
import Button from 'material-ui/Button';
import ReduxBlockUi from 'react-block-ui/redux';

import Color from '../Color';
import ExcelIcon from '../../assets/icons/excel';
import PDFIcon from '../../assets/icons/pdf';
import WifiIcon from '../../assets/icons/wifi';
import PrintContacts from './PrintContacts';

const Contacts = props => {
	const columns = [
		{ name: 'name', value: 'Name' },
		{ name: 'mobileNo', value: 'Mobile No' },
		{ name: 'email', value: 'Email' },
		{ name: 'village', value: 'Location' },
	]
	return (
		<ReduxBlockUi tag="div" blocking={props.loading}>
			<Paper id="react-no-print">
				<div className="contacts-actions">
					<div>
					</div>
					<div className="search-box-wrapper">
						<input
							placeholder="Search..."
							className="search-box"
							style={{ 
								backgroundImage: `url(${require('../../assets/icons/search.svg')})`, 
							}}
							value={props.searchTerm}
							onChange={props.setSearchTerm}
						/>
						<Color color="excel">
							<Button 
								color="primary" 
								variant="raised" 
								className="contacts-helper-button"
								disabled={props.selectedContacts.length <= 0}
								onClick={() => {}}
							>
								<ExcelIcon 
									className="contacts-helper-button-icon"
									fill={props.selectedContacts.length <= 0 ? '#a6a6a6': '#fff'}
								/>
								Import from Excel
							</Button>
						</Color>
						<Color color="excel">
							<Button 
								color="primary" 
								variant="raised" 
								className="contacts-helper-button"
								disabled={props.selectedContacts.length <= 0}
								onClick={() => {}}
							>
								<ExcelIcon 
									className="contacts-helper-button-icon"
									fill={props.selectedContacts.length <= 0 ? '#a6a6a6': '#fff'}
								/>
								Export to Excel
							</Button>
						</Color>
						<Color color="pdf">
							<Button 
								color="primary" 
								variant="raised" 
								className="contacts-helper-button"
								disabled={props.selectedContacts.length <= 0}
								onClick={() => {}}
							>
								<PDFIcon 
									className="contacts-helper-button-icon"
									fill={props.selectedContacts.length <= 0 ? '#a6a6a6': '#fff'}
								/>
								Export to PDF
							</Button>
						</Color>
						<Color color="firebase">
							<Button 
								color="primary" 
								variant="raised" 
								className="contacts-helper-button"
								disabled={!props.isOnline}
								onClick={() => {}}
							>
								<WifiIcon 
									className="contacts-helper-button-icon"
									fill={!props.isOnline ? '#a6a6a6': '#fff'}
								/>
								Sync Online
							</Button>
						</Color>
						<Color color="print">
							<Button 
								color="primary" 
								variant="raised" 
								className="contacts-helper-button"
								disabled={props.selectedContacts.length <= 0}
								onClick={() => {window.print()}}
							>
								<PrintIcon 
									className="contacts-helper-button-icon"
								/>
								Print
							</Button>
						</Color>
						<Button 
							color="secondary" 
							variant="raised" 
							className="contacts-helper-button"
							disabled={props.selectedContacts.length <= 0}
							onClick={props.deleteSelectedContacts}
						>
							<DeleteIcon className="contacts-helper-button-icon" />
							Delete
						</Button>
						<Button 
							color="primary" 
							variant="raised" 
							className="contacts-helper-button"
							onClick={props.addContactDetails}
						>
							<AddIcon className="contacts-helper-button-icon" />
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
			<div id="print-mount">
				<PrintContacts selectedContacts={props.selectedContacts} />
			</div>
		</ReduxBlockUi>
	);
}

export default withStyles()(Contacts);