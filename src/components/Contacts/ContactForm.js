import React from 'react';
import ReduxBlockUi from 'react-block-ui/redux';
import { Form, Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

const ContactForm = props => {
    return (
        <ReduxBlockUi tag="div" blocking={props.loading}>
            <Form onSubmit={props.handleSubmit(props.onSaveContact)}>
                <Field 
                    fullWidth
                    id="name"
                    name="name"
                    label="Name"
                    className="text-field"
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
                    className="text-field"
                    component={TextField}
                />
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
