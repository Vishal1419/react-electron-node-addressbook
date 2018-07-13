import React from 'react';
import MultiToggle from 'react-multi-toggle';
import Checkbox from 'material-ui/Checkbox';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import ListIcon from 'material-ui-icons/ViewList';
import ProfileIcon from 'material-ui-icons/Mood';
import DeleteIcon from 'material-ui-icons/Delete';
import PrintIcon from 'material-ui-icons/Print';

import Color from '../../Shared/Color';
import CoverPrintIcon from '../../../assets/icons/cover_print';
import { ADD_CONTACT_DIALOG, DELETE_SELECTED_CONTACTS_DIALOG } from '../../../constants/dialogNames';
import ExportContainer from '../Export/ExportContainer';
import SettingsContainer from '../Settings/SettingsContainer';

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
						onChange={(evt, checked) => props.selectAllContacts(evt, checked)}
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
					onSelectOption={() => props.toggleContactsView()}
				/>
			</div>
			<div className="search-box-wrapper">
				<input
					placeholder="Search..."
					className="search-box"
					style={{ 
						backgroundImage: `url(${require('../../../assets/icons/search.svg')})`, 
					}}
					value={props.searchTerm}
					onChange={(event) => props.filterContacts(event.target.value)}
				/>
			</div>
			<Button 
				color="primary" 
				variant="fab" 
				className="icon-button"
				onClick={() => props.openDialog(ADD_CONTACT_DIALOG)}
			>
				<AddIcon className="helper-button-icon" />
			</Button>
			<Button 
				color="secondary" 
				variant="fab" 
				className="icon-button"
				disabled={props.selectedContacts.length <= 0}
				onClick={() => props.openDialog(DELETE_SELECTED_CONTACTS_DIALOG)}
			>
				<DeleteIcon className="helper-button-icon" />
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
						className="helper-button-icon"
					/>
				</Button>
			</Color>
			<Color color="teal">
				<Button 
					color="primary" 
					variant="fab" 
					className="icon-button"
					disabled={props.selectedContacts.length <= 0}
					onClick={() => {window.print()}}
				>
					<CoverPrintIcon 
						className="helper-button-icon"
						fill={props.selectedContacts.length > 0 ? '#fff' : '#a6a6a6'}
					/>
				</Button>
			</Color>
			<ExportContainer />
			<SettingsContainer />
			<div style={{marginRight: 5}} />
			
			{/* <Color color="firebase">
				<Button 
					color="primary" 
					variant="raised" 
					className="helper-button"
					disabled={!props.isOnline}
					onClick={() => {}}
				>
					<WifiIcon 
						className="helper-button-icon"
						fill={!props.isOnline ? '#a6a6a6': '#fff'}
					/>
					Sync Online
				</Button>
			</Color> */}
		</div>
	</div>
);

export default ContactsHeader;
