const Distance = require('../models/Distance');
const AppResponse = require('../utils/appResponse');

const prepareResponse = (originalResponse, err, responseBody) => {
	const appResponse = new AppResponse(originalResponse);
	if (err) {
		console.error(err);
		return appResponse.setStatusCode(AppResponse.UNKNOWN_ERROR).setResponseBody({ error: err.message }).send();
	}
	return appResponse.setStatusCode(AppResponse.SUCCESS_CODE).setResponseBody(responseBody).send();
}

module.exports = {

	getDistance: (request, response) => {
		Distance.get((err, distance) => {
			return prepareResponse(response, err, { distance: distance });
		});
	},

	createDistance: (request, response) => {
		const distanceToCreate = {
			distanceX: request.body.distanceX,
			distanceY: request.body.distanceY,
			createdAt: new Date(),
			updatedAt: null,
		};
		Distance.createDistance(distanceToCreate, (err, distance) => {
			return prepareResponse(response, err, { distance: distance });
		});
	},

	updateDistance: (request, response) => {
		const distanceToUpdate = {
			_id: request.params.id,
			distanceX: request.body.distanceX,
			distanceY: request.body.distanceY,
			updatedAt: new Date(),
		};
		Distance.updateDistance(distanceToUpdate, (err, distance) => {
			return prepareResponse(response, err, { distance: distance });
		});
	},

}