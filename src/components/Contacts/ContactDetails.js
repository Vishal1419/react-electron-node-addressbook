import React from 'react';
import ReduxBlockUi from 'react-block-ui/redux';
import PhoneIcon from 'material-ui-icons/Phone';
import EmailIcon from 'material-ui-icons/Email';
import LocationIcon from 'material-ui-icons/LocationOn';

const ContactDetails = props => { 
    const { nameStyle, sideBySide, phoneIconStyle, phoneStyle, emailIconStyle,
            sideBySideStart, locationIconStyle } = styles;
    const { loading, currentContact } = props;
    const { name, address, mobileNo, email, village, taluka, district, pincode } = currentContact;
    return (
        <ReduxBlockUi tag="div" blocking={loading}>
            <div style={nameStyle}>{name}</div>
            <div style={sideBySide}>
                <div style={sideBySide}>
                    <PhoneIcon style={phoneIconStyle} />
                    <span style={phoneStyle}>{mobileNo}</span>
                </div>
                <div style={sideBySide}>
                    {email && <EmailIcon style={emailIconStyle} />}
                    <span>{email ? email : ''}</span>
                </div>
            </div>
            <br />
            <div style={sideBySideStart}>
                {
                    (address || village || taluka || district || pincode) &&
                    <LocationIcon style={locationIconStyle} />
                }
                <div>
                    <p>{address ? address : ''}</p>
                    <span>
                        {
                            `
                                ${village ? village : ''}${village && (taluka || district) ? ', ' : ''}
                                ${taluka ? taluka : ''}${taluka && district ? ', ' : ''}
                                ${district ? district : ''}${(village || taluka || district) ? ' - ' : ''}
                                ${pincode ? pincode: ''}
                            `
                        }
                    </span>
                </div>
            </div>
        </ReduxBlockUi>
    );
}

const styles = {
    nameStyle: {
        fontSize: 48,
    },
    sideBySide: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    phoneIconStyle: {
        marginRight: 5,
    },
    phoneStyle: {
        marginRight: 20,
    },
    emailIconStyle: {
        marginRight: 5,
    },
    sideBySideStart: {
        display: 'flex',
        justifyContent: 'flex-start',
    },
    locationIconStyle: {
        paddingTop: 12,
        paddingRight: 10,
    },
};

export default ContactDetails;
