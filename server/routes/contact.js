const validateRequest = require('../validation/request-validator');
const validationSchema = require('../validation/validationSchema');
const contactController = require('../controllers/contactController');

module.exports = (server) => {

	server.get('/contact', contactController.getAllContacts);
	server.get('/contact/:id', contactController.getContactById);
  server.post('/contact', validateRequest(validationSchema.contact), contactController.createContact);
	server.put('/contact/:id', validateRequest(validationSchema.contact), contactController.updateContact);
	server.delete('/contact/:id', contactController.deleteContact);

}