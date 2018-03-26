const Contact = require('../models/Contact');
const AppResponse = require('../utils/appResponse');

module.exports = {

	getAllContacts: (request, response) => {
		const appResponse = new AppResponse(response);
		Contact.getAll((err, contacts) => {
				if (err) {
					console.error(err);
					return appResponse.setStatusCode(AppResponse.UNKNOWN_ERROR).setResponseBody({ error: err.message }).send();
				}
				return appResponse.setStatusCode(AppResponse.SUCCESS_CODE).setResponseBody({contacts: contacts}).send();
		});
	},

	getContactById: (request, response) => {
		const appResponse = new AppResponse(response);
		Contact.getById(request.params.id, (err, contact) => {
			if (err) {
				console.error(err);
				return appResponse.setStatusCode(AppResponse.UNKNOWN_ERROR).setResponseBody({ error: err.message }).send();
			}
			return appResponse.setStatusCode(AppResponse.SUCCESS_CODE).setResponseBody({ contact: contact }).send();
		});
	},

	createContact: (request, response) => {
		const appResponse = new AppResponse(response);
		const contactToCreate = {
			profilePic: request.body.profilePic,
			name: request.body.name,
			address: request.body.address,
			mobileNo: request.body.mobileNo,
			email: request.body.email,
			village: request.body.village,
			taluka: request.body.taluka,
			district: request.body.district,
			pincode: request.body.pincode,
			createdAt: new Date(),
			updatedAt: null,
		};
		Contact.createContact(contactToCreate, (err, contact) => {
			if (err) {
				console.error(err);
				return appResponse.setStatusCode(AppResponse.UNKNOWN_ERROR).setResponseBody({ error: err.message }).send();
			}
			return appResponse.setStatusCode(AppResponse.SUCCESS_CODE).setResponseBody({ contact: contact }).send();
		});
	},

	updateContact: (request, response) => {
		const appResponse = new AppResponse(response);
		const contactToUpdate = {
			_id: request.params.id,
			profilePic: request.body.profilePic,
			name: request.body.name,
			address: request.body.address,
			mobileNo: request.body.mobileNo,
			email: request.body.email,
			village: request.body.village,
			taluka: request.body.taluka,
			district: request.body.district,
			pincode: request.body.pincode,
			updatedAt: new Date(),
		};
		Contact.updateContact(contactToUpdate, (err, contact) => {
			if (err) {
				console.error(err);
				return appResponse.setStatusCode(AppResponse.UNKNOWN_ERROR).setResponseBody({ error: err.message }).send();
			}
			return appResponse.setStatusCode(AppResponse.SUCCESS_CODE).setResponseBody({ contact: contact }).send();
		});
	},

	deleteContact: (request, response) => {
		const appResponse = new AppResponse(response);
		Contact.deleteContact(request.params.id, (err, contact) => {
			if (err) {
				console.error(err);
				return appResponse.setStatusCode(AppResponse.UNKNOWN_ERROR).setResponseBody({ error: err.message }).send();
			}
			return appResponse.setStatusCode(AppResponse.SUCCESS_CODE).setResponseBody({ contact: contact }).send();
		});
	},

}