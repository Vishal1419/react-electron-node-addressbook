import React from 'react';
import ReduxBlockUi from 'react-block-ui/redux';
import { Form, Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

const ContactForm = props => {
    const { textField, leftTextField, rightTextField } = styles;
    return (
        <ReduxBlockUi tag="div" blocking={props.loading}>
            <Form onSubmit={props.handleSubmit(props.onSaveContact)}>
                <Field 
                    fullWidth
                    id="name"
                    name="name"
                    label="Name"
                    style={textField}
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
                    style={textField}
                    component={TextField}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Field 
                        fullWidth
                        id="mobileNo"
                        name="mobileNo"
                        label="Mobile No"
                        style={leftTextField}
                        component={TextField}
                    />
                    <Field 
                        id="email"
                        name="email"
                        fullWidth
                        label="Email"
                        style={rightTextField}
                        component={TextField}
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Field 
                        id="village"
                        name="village"
                        fullWidth
                        label="Village"
                        style={leftTextField}
                        component={TextField}
                    />
                    <Field 
                        id="taluka"
                        name="taluka"
                        fullWidth
                        label="Taluka"
                        style={rightTextField}
                        component={TextField}
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Field 
                        id="district"
                        name="district"
                        fullWidth
                        label="District"
                        style={leftTextField}
                        component={TextField}
                    />
                    <Field 
                        id="pincode"
                        name="pincode"
                        fullWidth
                        label="Pin Code"
                        style={rightTextField}
                        component={TextField}
                    />
                </div>
            </Form>
        </ReduxBlockUi>
    );
}

const styles = {
    textField: {
        marginTop: 10,
        marginBottom: 10,
    },
    leftTextField: {
        marginTop: 10,
        marginBottom: 10,
        marginRight: 10,
    },
    rightTextField: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
    },
};

const validate = (values = {}, props) => {
	const errors = {};

	if (!values.name) {
		errors.name = 'Name is required';
	} else if (props.isEditing 
		? props.contacts.find(contact => contact.id !== props.currentContact.id && (contact.name.toLocaleLowerCase() === values.name.toLocaleLowerCase())) 
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
