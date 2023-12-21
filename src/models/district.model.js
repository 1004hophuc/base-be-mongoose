const { model, Schema, Types } = require('mongoose');

const DOCUMENT_NAME = 'district';
const COLLECTION_NAME = 'districts';

// Declare the Schema of the Mongo model
const districtSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  code_district: {
    type: Number,
    unique: true,
    trim: true
  },
  province_code: {
    type: Number,
    ref: 'province',
    index: true
  },
}, {
  timestamps: true,
  collection: COLLECTION_NAME
});

// Export the model
module.exports = model(DOCUMENT_NAME, districtSchema)