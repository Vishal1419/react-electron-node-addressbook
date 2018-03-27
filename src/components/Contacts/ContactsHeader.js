import React from 'react';
import MultiToggle from 'react-multi-toggle';
import Checkbox from 'material-ui/Checkbox';
import Button from 'material-ui/Button';
import Popover from 'material-ui/Popover';
import AddIcon from 'material-ui-icons/Add';
import ListIcon from 'material-ui-icons/ViewList';
import ProfileIcon from 'material-ui-icons/Mood';
import DeleteIcon from 'material-ui-icons/Delete';
import PrintIcon from 'material-ui-icons/Print';
import ImportExportIcon from 'material-ui-icons/ImportExport';
import KeyBoardArrowDownIcon from 'material-ui-icons/KeyboardArrowDown';

import Color from '../Color';
import ImportFromExcelIcon from '../../assets/icons/import_excel';
import ExportToExcelIcon from '../../assets/icons/export_excel';
import PDFIcon from '../../assets/icons/pdf';
import WifiIcon from '../../assets/icons/wifi';

const ContactsHeader = props => (
	<div className="contacts-actions">
		<div>
			{
				props.currentView === 'profile' &&
				<div className="select-all">
					<Checkbox
						id="select-all-checkbox"
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
					<label htmlFor="select-all-checkbox" className="select-all-label">
						{
							props.contacts.length !== 0 && 
							props.selectedContacts.length === props.contacts.length
							? 'DESELECT ALL' : 'SELECT ALL'
						}
					</label>
				</div>
			}
		</div>
		<div className="side-by-side-center-center">
			<div className="multi-toggle-content">
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
						className="contacts-helper-button-icon click-through"
						fill={props.selectedContacts.length <= 0 ? '#a6a6a6': '#fff'}
					/>
					<span className="click-through">Import / Export</span>
					<KeyBoardArrowDownIcon
						className="contacts-helper-button-icon-right click-through"
						fill={props.selectedContacts.length <= 0 ? '#a6a6a6': '#fff'}
					/>
				</Button>
			</Color>
			<Popover
				className="import-export-popover"
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
				<div className="popover-content">
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
);

export default ContactsHeader;
