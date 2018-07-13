const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const config = require('./appConfig');

require('./db');
const contactRoute = require('./routes/contact');
const distanceRoute = require('./routes/distance');

// support parsing of application/json type post data
app.use(bodyParser.json());

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
	next();
});

contactRoute(app);
distanceRoute(app);

app.listen(config.ENV_CONFIG.server.port, config.ENV_CONFIG.server.host, function (err) {
	console.log(`Server is running at : ${config.ENV_CONFIG.server.host}:${config.ENV_CONFIG.server.port}`);
});