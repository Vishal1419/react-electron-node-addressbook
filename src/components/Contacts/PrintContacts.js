import React from 'react';
import PrintTemplate from 'react-print';
import PhoneIcon from 'material-ui-icons/Phone';
import EmailIcon from 'material-ui-icons/Email';
import LocationIcon from 'material-ui-icons/LocationOn';

const renderTableCell = contact => {
	const { name, address, mobileNo, email, village, taluka, district, pincode } = contact;
	return (
		<td className="contacts-table-cell">
			<div className="contact-wrapper">
				<div className="contact-name">{name}</div>
				<div className="side-by-side-start-center">
					<PhoneIcon className="contact-detail-icon" />
					<span>{mobileNo}</span>
				</div>
				<div className="side-by-side-start-center">
					{email && <EmailIcon className="contact-detail-icon" />}
					<span>{email ? email : ''}</span>
				</div>
				<div className="side-by-side-start-center">
					{
						(address || village || taluka || district || pincode) &&
						<LocationIcon className="contact-detail-icon contact-location-icon" />
					}
					<div className="contact-address-wrapper">
						<p className="contact-address">
							{address ? address : ''}
						</p>
						<span className="contact-address-details">
							{
								`
									${village ? village : ''}${village && (taluka || district) ? ', ' : ''}
									${taluka ? taluka : ''}${taluka && district ? ', ' : ''}
									${district ? district : ''}${((village || taluka || district) && pincode) ? ' - ' : ''}
									${pincode ? pincode: ''}
								`
							}
						</span>
					</div>
				</div>
			</div>
		</td>
	)
}

const PrintContacts = props => { 
	const { selectedContacts } = props;
	let leftSide = selectedContacts && selectedContacts.map((contact, index) => index % 2 === 0 && contact);
	leftSide = leftSide.filter(contact => contact !== false);
	let rightSide = selectedContacts && selectedContacts.map((contact, index) => index % 2 === 1 && contact);
	rightSide = rightSide.filter(contact => contact !== false);
	return (
		<PrintTemplate>
			<table className="print-body">
				<tbody>
					{
						selectedContacts && selectedContacts.map((con, idx) =>
							idx % 2 === 0 &&
							<tr key={con.id} className="no-page-break">
								{
									renderTableCell(leftSide[Math.floor(idx/2)])
								}
								{
									rightSide[Math.floor(idx/2)]
									? renderTableCell(rightSide[Math.floor(idx/2)])
									: <td />
								}
							</tr>
						)
					} 
				</tbody>
			</table>
		</PrintTemplate>
	);
}

export default PrintContacts;
