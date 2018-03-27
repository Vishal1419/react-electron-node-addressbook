import React from 'react';
import PhoneIcon from 'material-ui-icons/Phone';
import EmailIcon from 'material-ui-icons/Email';
import LocationIcon from 'material-ui-icons/LocationOn';

import ProfilePic from '../../assets/images/profile_pic.png';

const ContactCard = props => { 
    const { profilePic, name, village, taluka, district, mobileNo, email, pincode } = props.contact;
    return (
        <div className="contact-card">
            <div className="main-details-wrapper">
                <div className="contact-actions">
                    <div>
                        {props.leftActions}
                    </div>
                    <img src={profilePic || ProfilePic} alt="Profile" className="contact-image" />
                    <div>
                        {props.rightActions}
                    </div>
                </div>
                <div className="contact-name">{name}</div>
            </div>
            <div className="side-by-side-start-end contact-detail-line">
                <PhoneIcon className="contact-detail-icon" />
                <span className="contact-phone">{mobileNo}</span>
            </div>
            <div className="side-by-side-start-end contact-detail-line">
                {email && <EmailIcon className="contact-detail-icon" />}
                <span className="contact-detail-email">{email ? email : ''}</span>
            </div>
            <div className="side-by-side-start contact-detail-line">
                {
                    (village || taluka || district || pincode) &&
                    <LocationIcon className="contact-detail-icon" />
                }
                <div>
                    <div>
                        {
                            `
                                ${village ? village : ''}${village && (taluka || district) ? ', ' : ''}
                                ${taluka ? taluka : ''}${taluka && district ? ', ' : ''}
                            `
                        }
                        <br />
                        {
                            `
                                ${district ? district : ''}${((village || taluka || district) && pincode) ? ' - ' : ''}
                                ${pincode ? pincode: ''}
                            `
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactCard;
