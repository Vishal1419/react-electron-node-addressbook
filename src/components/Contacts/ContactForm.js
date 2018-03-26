import React, { Component } from 'react';
import ReduxBlockUi from 'react-block-ui/redux';
import { Form, Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

import ProfilePic from '../../assets/images/profile_pic.png';

class ContactForm extends Component {
    render() {
        return (
            <ReduxBlockUi tag="div" blocking={this.props.loading}>
                <Form onSubmit={this.props.handleSubmit(this.props.onSaveContact)}>
                    <div className="text-fields-container">
                        <input
                            type="file"
                            ref={(ref) => this.image = ref}
                            style={{display: 'none'}}
                            onChange={this.props.onChangeProfilePicture}
                        />
                        <img 
                            src={this.props.currentContact ? this.props.currentContact.profilePic || ProfilePic : ProfilePic} 
                            alt="Profile" 
                            style={{ height: 120, width: 120, borderRadius: 60, margin: 'auto 20px auto 10px', cursor: 'pointer' }}
                            onClick={() => this.image.click()}
                        />
                        <div>
                            <Field 
                                fullWidth
                                id="name"
                                name="name"
                                label="Name"
                                className="text-field right-text-field"
                                autoFocus
                                component={TextField}
                            />
                            <Field 
                                fullWidth
                                id="address"
                                name="address"
                                label="Address"
                                multiline
                                rows={3}
                                className="text-field right-text-field"
                                component={TextField}
                            />
                        </div>
                    </div>
                    <div className="text-fields-container">
                        <Field 
                            fullWidth
                            id="mobileNo"
                            name="mobileNo"
                            label="Mobile No"
                            className="text-field left-text-field"
                            component={TextField}
                        />
                        <Field 
                            id="email"
                            name="email"
                            fullWidth
                            label="Email"
                            className="text-field right-text-field"
                            component={TextField}
                        />
                    </div>
                    <div className="text-fields-container">
                        <Field 
                            id="village"
                            name="village"
                            fullWidth
                            label="Village"
                            className="text-field left-text-field"
                            component={TextField}
                        />
                        <Field 
                            id="taluka"
                            name="taluka"
                            fullWidth
                            label="Taluka"
                            className="text-field right-text-field"
                            component={TextField}
                        />
                    </div>
                    <div className="text-fields-container">
                        <Field 
                            id="district"
                            name="district"
                            fullWidth
                            label="District"
                            className="text-field left-text-field"
                            component={TextField}
                        />
                        <Field 
                            id="pincode"
                            name="pincode"
                            fullWidth
                            label="Pin Code"
                            className="text-field right-text-field"
                            component={TextField}
                        />
                    </div>
                </Form>
            </ReduxBlockUi>
        );
    }
}

const validate = (values = {}, props) => {
	const errors = {};

    if (!values.name) {
		errors.name = 'Name is required';
	} else if (props.isEditing 
		? props.contacts.find(contact => contact._id !== props.currentContact._id && (contact.name.toLocaleLowerCase() === values.name.toLocaleLowerCase())) 
		: props.contacts.find(contact => contact.name.toLocaleLowerCase() === values.name.toLocaleLowerCase())) {
		errors.name = 'Duplicate contact';
	}

	if (values.email && !values.email.match(/^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/)) { // eslint-disable-line
		errors.email = 'Invalid email';
	}

	if (!values.mobileNo) {
		errors.mobileNo = 'Mobile No. is required';
	} else if (values.mobileNo.length < 10 || values.mobileNo.length > 13) {
		errors.mobileNo = 'Invalid mobile no.'
	}

	return errors;
}

export default reduxForm({ form: 'ContactForm', validate })(ContactForm);
