const { model, Schema, Types } = require('mongoose');

const DOCUMENT_NAME = 'province';
const COLLECTION_NAME = 'provinces';

// Declare the Schema of the Mongo model
const provinceSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  code_province: {
    type: Number,
    trim: true
  }
}, {
  timestamps: true,
  collection: COLLECTION_NAME
});

// Export the model
module.exports = model(DOCUMENT_NAME, provinceSchema)