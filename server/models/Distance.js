const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const distanceSchema = new Schema({
  distanceX: { type: Number, required: true },
  distanceY: { type: Number, required: true },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

const Distance = mongoose.model('Distance', distanceSchema, 'distances');

Distance.get = (callback) => {
  Distance.find().exec((err, distances) => {
    callback(err, distances[0]);
  });
};

Distance.createDistance = (distance, callback) => {
  const newDistance = new Distance(distance)
  newDistance.save(callback);
};

Distance.updateDistance = (distance, callback) => {
  Distance.findOneAndUpdate(
    { "_id": distance._id },
    {
      "$set": {
        "distanceX": distance.distanceX,
        "distanceY": distance.distanceY,
        "updatedAt": distance.updatedAt,
      }
    },
    { multi: false, new: true },
    callback
  );
};

module.exports = Distance;