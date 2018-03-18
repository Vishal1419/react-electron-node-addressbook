import React from 'react';
import ReduxBlockUi from 'react-block-ui/redux';
import PhoneIcon from 'material-ui-icons/Phone';
import EmailIcon from 'material-ui-icons/Email';
import LocationIcon from 'material-ui-icons/LocationOn';

const ContactDetails = props => { 
    const { loading, currentContact } = props;
    const { name, address, mobileNo, email, village, taluka, district, pincode } = currentContact;
    return (
        <ReduxBlockUi tag="div" blocking={loading}>
            <div className="contact-name">{name}</div>
            <div className="side-by-side-space_between-end">
                <div className="side-by-side-space_between-end">
                    <PhoneIcon className="contact-detail-icon" />
                    <span className="contact-phone">{mobileNo}</span>
                </div>
                <div className="side-by-side-space_between-end">
                    {email && <EmailIcon className="contact-detail-icon" />}
                    <span>{email ? email : ''}</span>
                </div>
            </div>
            <br />
            <div className="side-by-side-start">
                {
                    (address || village || taluka || district || pincode) &&
                    <LocationIcon className="contact-location-icon" />
                }
                <div>
                    <p>{address ? address : ''}</p>
                    <span>
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
        </ReduxBlockUi>
    );
}

export default ContactDetails;
