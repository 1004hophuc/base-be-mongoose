// contain function, class, feature that we usually use
'use strict'

const pick = require('lodash/pick');

const getIntoData = ({ fields = [], object = {} }) => {
  const result = pick(object, fields);
  return result;
}

module.exports = {
  getIntoData
}