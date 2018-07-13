var mongoose = require('mongoose');
var Distance = require('../models/Distance');
var distanceController = require('../controllers/distanceController');

require('../db');

var distances = [
  { distanceX: 0, distanceY: 0, createdAt: new Date() },
]

var done = 0;

for(var i = 0; i < distances.length; i++)
{
  Distance.createDistance(distances[i], function(err, result){
      done++;
      if(done == distances.length){
          exit();
      }
  });
}

function exit() {
    mongoose.disconnect();
}
