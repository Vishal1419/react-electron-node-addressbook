import React, { Component } from 'react';
import { connect } from 'react-redux';
import isElectron from 'is-electron';

import Export from './Export';
import * as Toast from '../../Shared/Toast/Toaster';

let ipcRenderer;
if (isElectron()) {
	ipcRenderer = window.require('electron').ipcRenderer;	
}

class ExportContainer extends Component {
  constructor(props) {
		super(props);
		this.printPDF = this.printPDF.bind(this);
		this.exportToExcel = this.exportToExcel.bind(this);
		this.exportToJSON = this.exportToJSON.bind(this);
  }

	componentDidMount() {
		if (isElectron()) {
			ipcRenderer.on('wrote-pdf', (event, path) => {
				Toast.success(`Wrote PDF to: ${path}`, 'PDF Generated!');
			});	
			ipcRenderer.on('failed-write-pdf', (event, path) => {
				Toast.error(`Failed to write PDF to: ${path}`, 'PDF creation error!');
			});	
			ipcRenderer.on('cancelled-write-pdf', (event) => {
				Toast.info(`Export to PDF cancelled`, 'PDF creation cancelled!');
			})
			ipcRenderer.on('wrote-excel', (event, path) => {
				Toast.success(`Wrote Excel to: ${path}`, 'Excel Generated!');
			});
			ipcRenderer.on('failed-write-excel', (event, path) => {
				Toast.error(`Failed to write Excel to: ${path}`, 'Excel creation error!');
			});	
			ipcRenderer.on('cancelled-write-excel', (event) => {
				Toast.info(`Export to Excel cancelled`, 'Excel creation cancelled!');
			});
			ipcRenderer.on('wrote-json', (event, path) => {
				Toast.success(`Wrote JSON file to: ${path}`, 'JSON Generated!');
			});
			ipcRenderer.on('failed-write-json', (event, path) => {
				Toast.error(`Failed to write JSON file to: ${path}`, 'JSON creation error!');
			});	
			ipcRenderer.on('cancelled-write-json', (event) => {
				Toast.info(`Export to JSON file cancelled`, 'JSON creation cancelled!');
			});
		}
	}

  printPDF() {
		if(isElectron()) {
			ipcRenderer.send('print-to-pdf');
		}
  }

  exportToExcel() {
		if(isElectron()) {
			const contactsHeaders = ['ID', 'Name', 'Mobile Number', 'Email', 'Village', 
				'Taluka', 'District', 'Address', 'Pin Code'];
			const contactsToExport = this.props.selectedContacts.map(contact => [
				contact._id,
				contact.name,
				contact.mobileNo,
				contact.email,
				contact.village,
				contact.taluka,
				contact.district,
				contact.address,
				contact.pincode
			]);
			const sheets = [
				{
					name: 'Address Book',
					header: contactsHeaders,
					data: contactsToExport
				}
			]
			ipcRenderer.send('export-to-excel', 'D:\\AddressBook.xlsx', sheets);
		}
  }

  exportToJSON() {
		if (isElectron()) {
			ipcRenderer.send('export-to-json', 'D:\\AddressBook.json', JSON.stringify(this.props.selectedContacts));
		}
  }

  render() {
    return (
			<Export
				printPDF={this.printPDF}
				exportToExcel={this.exportToExcel}
				exportToJSON={this.exportToJSON}
				selectedContacts={this.props.selectedContacts}
			/>
    );
  }
}

const mapStateToProps = state => ({
	selectedContacts: state.contacts.selectedContacts,
})

export default connect(mapStateToProps)(ExportContainer);
