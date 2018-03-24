const validator = require('isvalid');
const AppResponse = require('../utils/appResponse');

const validateRequest = (schema, errorCallback) => {
  return (request, response, next) => {
    validator((request.body || request.params),
      schema,
      (err) => {
        if (!err) {
          next();
        } else {
          if (errorCallback !== undefined) {
            errorCallback(request, response);
          }

          const customResponse = new AppResponse(response);
          customResponse.setStatusCode(err.message.errorCode)
            .setResponseBody({ error: err.message.message })
            .send();
        }
      }
    );
  };
};

module.exports = validateRequest;
