import React from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui-icons/Add';
import EditIcon from 'material-ui-icons/Edit';
import DeleteIcon from 'material-ui-icons/Delete';
import PrintIcon from 'material-ui-icons/Print';
import ImportExportIcon from 'material-ui-icons/ImportExport';
import KeyBoardArrowDownIcon from 'material-ui-icons/KeyboardArrowDown';
import Popover from 'material-ui/Popover';
import ListIcon from 'material-ui-icons/ViewList';
import ProfileIcon from 'material-ui-icons/Mood';
import SortUpArrow from 'material-ui-icons/ArrowDropUp';
import SortDownArrow from 'material-ui-icons/ArrowDropDown';
import Button from 'material-ui/Button';
import ReduxBlockUi from 'react-block-ui/redux';
import MultiToggle from 'react-multi-toggle';

import Color from '../Color';
import ImportFromExcelIcon from '../../assets/icons/import_excel';
import ExportToExcelIcon from '../../assets/icons/export_excel';
import PDFIcon from '../../assets/icons/pdf';
import WifiIcon from '../../assets/icons/wifi';
import PrintContacts from './PrintContacts';
import ContactCard from './ContactCard';

const Contacts = props => {
	const columns = [
		{ name: 'name', value: 'Name' },
		{ name: 'mobileNo', value: 'Mobile No' },
		{ name: 'email', value: 'Email' },
		{ name: 'village', value: 'Location' },
	]
	return (
		<ReduxBlockUi tag="div" blocking={props.loading}>
			<div id="react-no-print">
				<div className="contacts-actions">
					<div>
						{
							props.currentView === 'profile' &&
							<div style={{ marginLeft: 13, marginTop: 16 }}>
								<Checkbox
									id="select-all-checkbox"
									style={{ marginTop: -4 }}
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
								<label htmlFor="select-all-checkbox" style={{ marginLeft: -10 }}>
									{
										props.contacts.length !== 0 && 
										props.selectedContacts.length === props.contacts.length
										? 'DESELECT ALL' : 'SELECT ALL'
									}
								</label>
							</div>
						}
					</div>
					<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
						<div className="multi-toggle-wrapper">
							<MultiToggle
								options={[
									{ displayName: <ListIcon />, value: 'table' },
									{ displayName: <ProfileIcon />, value: 'profile' }
								]}
								selectedOption={props.currentView}
								onSelectOption={props.toggleView}
							/>
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
						</div>
						<Button 
							color="primary" 
							variant="fab" 
							className="icon-button"
							onClick={props.addContactDetails}
						>
							<AddIcon className="contacts-helper-button-icon" />
						</Button>
						<Button 
							color="secondary" 
							variant="fab" 
							className="icon-button"
							disabled={props.selectedContacts.length <= 0}
							onClick={props.deleteSelectedContacts}
						>
							<DeleteIcon className="contacts-helper-button-icon" />
						</Button>
						<Color color="print">
							<Button 
								color="primary" 
								variant="fab" 
								className="icon-button"
								disabled={props.selectedContacts.length <= 0}
								onClick={() => {window.print()}}
							>
								<PrintIcon 
									className="contacts-helper-button-icon"
								/>
							</Button>
						</Color>
						<Color color="excel">
							<Button 
								color="primary" 
								variant="raised" 
								className="contacts-helper-button"
								disabled={props.selectedContacts.length <= 0}
								onClick={props.toggleImportExportOptions}
							>
								<ImportExportIcon 
									className="contacts-helper-button-icon"
									style={{ pointerEvents: 'none' }}
									fill={props.selectedContacts.length <= 0 ? '#a6a6a6': '#fff'}
								/>
								<span style={{ pointerEvents: 'none' }}>Import / Export</span>
								<KeyBoardArrowDownIcon
									className="contacts-helper-button-icon-right"
									style={{ pointerEvents: 'none' }}
									fill={props.selectedContacts.length <= 0 ? '#a6a6a6': '#fff'}
								/>
							</Button>
						</Color>
						<Popover
							open={props.openImportExportOptions}
							anchorEl={props.importExportAnchorEl}
							onClose={props.toggleImportExportOptions}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
						>
							<div style={{ display: 'flex', flexDirection: 'column' }}>
								<Color color="pdf">
									<Button 
										color="primary" 
										variant="raised" 
										className="contacts-helper-button import-export-option"
										disabled={props.selectedContacts.length <= 0}
										onClick={props.toggleImportExportOptions}
									>
										<PDFIcon 
											className="contacts-helper-button-icon"
											fill={props.selectedContacts.length <= 0 ? '#a6a6a6': '#fff'}
										/>
										Export to PDF
									</Button>
								</Color>
								<Color color="excel">
									<Button 
										color="primary" 
										variant="raised" 
										className="contacts-helper-button import-export-option"
										disabled={props.selectedContacts.length <= 0}
										onClick={props.toggleImportExportOptions}
									>
										<ImportFromExcelIcon 
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
										className="contacts-helper-button import-export-option"
										disabled={props.selectedContacts.length <= 0}
										onClick={props.toggleImportExportOptions}
									>
										<ExportToExcelIcon 
											className="contacts-helper-button-icon"
											fill={props.selectedContacts.length <= 0 ? '#a6a6a6': '#fff'}
										/>
										Export to Excel
									</Button>
								</Color>
							</div>
						</Popover>
						
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
					</div>
				</div>
				{
					props.currentView === 'table'
					? (
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
					)
					: (
						<div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'flex-start', alignItems: 'stretch' }}>
							{
								props.contacts.map(contact => 
									<div key={contact._id} style={{ margin: 10, display: 'flex' }}>
										<ContactCard  
											contact={contact}
											leftActions={
												<Checkbox
													style={{ height: 24, width: 24 }}												
													checked={props.selectedContacts.indexOf(contact) !== -1}
													onClick={evt => props.selectContact(evt, contact)}
												/>
											}
											rightActions={
												<div style={{ display: 'flex', flexDirection: 'column' }}>
													<IconButton 
														color="primary" 
														className={props.classes.button}
														style={{ height: 24, width: 24, marginBottom: 8 }}
														onClick={event => props.editContactDetails(event, contact)} 
													>
														<EditIcon />
													</IconButton>
													<IconButton 
														color="secondary" 
														className={props.classes.button}
														style={{ height: 24, width: 24 }}
														onClick={event => props.deleteContact(event, contact)} 
													>
														<DeleteIcon />
													</IconButton>
												</div>
											}
										/>
									</div>
								)
							}
						</div>
					)
				}
			</div>
			<div id="print-mount">
				<PrintContacts selectedContacts={props.selectedContacts} />
			</div>
		</ReduxBlockUi>
	);
}

export default withStyles()(Contacts);