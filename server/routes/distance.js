const validateRequest = require('../validation/request-validator');
const validationSchema = require('../validation/validationSchema');
const distanceController = require('../controllers/distanceController');

module.exports = (server) => {

	server.get('/distance', distanceController.getDistance);
  server.post('/distance', validateRequest(validationSchema.distance), distanceController.createDistance);
	server.put('/distance/:id', validateRequest(validationSchema.distance), distanceController.updateDistance);

}