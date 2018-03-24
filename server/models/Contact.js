const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String },
  mobileNo: { type: String, required: true },
  email: { type: String },
  village: { type: String },
  taluka: { type: String },
  district: { type: String },
  pincode: { type: String },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

const Contact = mongoose.model('Contact', contactSchema, 'contacts');

Contact.getAll = (callback) => {
  Contact.find().sort('contact').exec((err, contacts) => {
    callback(err, contacts);
  });
};

Contact.getById = (id, callback) => {
  Contact.findById(id, (err, contact) => {
    callback(err, contact);
  });
};

Contact.createContact = (contact, callback) => {
  const newContact = new Contact(contact)
  newContact.save(callback);
};

Contact.updateContact = (contact, callback) => {
  Contact.findOneAndUpdate(
    { "_id": contact._id },
    {
      "$set": {
        "name": contact.name,
        "address": contact.address,
        "mobileNo": contact.mobileNo,
        "email": contact.email,
        "village": contact.village,
        "taluka": contact.taluka,
        "district": contact.district,
        "pincode": contact.pincode,
        "updatedAt": contact.updatedAt,
      }
    },
    { multi: false, new: true },
    callback
  );
};

Contact.deleteContact = (id, callback) => {
  Contact.findByIdAndRemove(id, (err, contact) => {
    callback(err, contact);
  });
}

module.exports = Contact;