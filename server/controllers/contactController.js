const Contact = require('../models/Contact');
const AppResponse = require('../utils/appResponse');

const prepareContact = request => ({
	profilePic: request.body.profilePic,
	name: request.body.name,
	address: request.body.address,
	mobileNo: request.body.mobileNo,
	email: request.body.email,
	village: request.body.village,
	taluka: request.body.taluka,
	district: request.body.district,
	pincode: request.body.pincode,
})

const prepareResponse = (originalResponse, err, responseBody) => {
	const appResponse = new AppResponse(originalResponse);
	if (err) {
		console.error(err);
		return appResponse.setStatusCode(AppResponse.UNKNOWN_ERROR).setResponseBody({ error: err.message }).send();
	}
	return appResponse.setStatusCode(AppResponse.SUCCESS_CODE).setResponseBody(responseBody).send();
}

module.exports = {

	getAllContacts: (request, response) => {
		Contact.getAll((err, contacts) => {
			return prepareResponse(response, err, { contacts: contacts });
		});
	},

	getContactById: (request, response) => {
		Contact.getById(request.params.id, (err, contact) => {
			return prepareResponse(response, err, { contact: contact });
		});
	},

	createContact: (request, response) => {
		const contactToCreate = {
			...prepareContact(request),
			createdAt: new Date(),
			updatedAt: null,
		};
		Contact.createContact(contactToCreate, (err, contact) => {
			return prepareResponse(response, err, { contact: contact });
		});
	},

	updateContact: (request, response) => {
		const contactToUpdate = {
			_id: request.params.id,
			...prepareContact(request),
			updatedAt: new Date(),
		};
		Contact.updateContact(contactToUpdate, (err, contact) => {
			return prepareResponse(response, err, { contact: contact });
		});
	},

	deleteContact: (request, response) => {
		Contact.deleteContact(request.params.id, (err, contact) => {
			return prepareResponse(response, err, { contact: contact });
		});
	},

}