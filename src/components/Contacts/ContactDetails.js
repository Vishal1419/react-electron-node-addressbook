import React from 'react';
import ReduxBlockUi from 'react-block-ui/redux';
import PhoneIcon from 'material-ui-icons/Phone';
import EmailIcon from 'material-ui-icons/Email';
import LocationIcon from 'material-ui-icons/LocationOn';

import ProfilePic from '../../assets/images/profile_pic.png';

const ContactDetails = props => { 
    const { loading, currentContact } = props;
    const { profilePic, name, address, mobileNo, email, village, taluka, district, pincode } = currentContact;
    return (
        <ReduxBlockUi tag="div" blocking={loading} className="contact-details">
            <div className="main-details-wrapper">
                <img src={profilePic || ProfilePic} alt="Profile" className="contact-image" />
                <div className="contact-name">{name}</div>
            </div>
            <div className="side-by-side-start-end contact-detail-line">
                <PhoneIcon className="contact-detail-icon" />
                <span>{mobileNo}</span>
            </div>
            <div className="side-by-side-start-end contact-detail-line">
                {email && <EmailIcon className="contact-detail-icon" />}
                <span>{email ? email : ''}</span>
            </div>
            <div className="side-by-side-start contact-detail-line contact-address-wrapper">
                {
                    (address || village || taluka || district || pincode) &&
                    <LocationIcon className="contact-detail-icon" />
                }
                <div>
                    <span>{address ? address : ''}</span>
                    <br />
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
