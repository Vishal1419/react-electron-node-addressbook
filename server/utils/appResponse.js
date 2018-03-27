class AppResponse {
	constructor(response) {
		this.statusCode = 1001;
		this.body = [];
		this.response = response;
	}
  
	setStatusCode(statusCode) {
		this.statusCode = statusCode;
		return this;
	}

	setResponseBody(responseBody) {
		this.body = responseBody;
		return this;
	}
  
	send() {
		const responseBody = {
			statusCode: this.statusCode
		};
  
		for (const key in this.body) {
			responseBody[key] = this.body[key];
		}
  
		this.response.send(responseBody);
	}
}
  
AppResponse.SUCCESS_CODE = 1000;
AppResponse.UNKNOWN_ERROR = 1001;
// reserved 1002 and 1003 for future use
AppResponse.INVALID_DATA_TYPE = 1004;
AppResponse.REQUIRED_FIELD = 1005;
AppResponse.PATTERN_NOT_MATCH = 1006;

module.exports = AppResponse;