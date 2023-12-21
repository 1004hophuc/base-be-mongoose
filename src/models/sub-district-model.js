const { model, Schema, Types } = require('mongoose');

const DOCUMENT_NAME = 'sub-district';
const COLLECTION_NAME = 'sub-districts';

// Declare the Schema of the Mongo model
const subDistrictSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  code_sub_district: {
    type: Number,
    unique: true,
    trim: true
  },
  province_code: {
    type: Number,
    ref: 'province',
    index: true
  },
  district_code: {
    type: Number,
    ref: 'district',
    index: true
  },
}, {
  timestamps: true,
  collection: COLLECTION_NAME
});

// Export the model
module.exports = model(DOCUMENT_NAME, subDistrictSchema)