  const mongoose = require('mongoose');
  const { Schema, model, SchemaTypes } = mongoose;


  const contactsSchema = new Schema({
      name: {
          type: String,
          required: [true, 'Set name for contact']
      },
      email: {
          type: String,
          unique: true,
          required: [true, 'Set email for contact']
      },
      phone: {
          type: String,
          unique: true,
          required: [true, 'Set phone for contact']
      },
      favorite: {
          type: Boolean,
          default: false
      },
       owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    }
  }, { versionKey: false, timestamps: true });

const Contacts = model('contacts', contactsSchema)
  
module.exports = Contacts