const mongoose = require('mongoose');

const { contactInfo } = require('./contactInfo.model');

const basicInfoSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  surname: {
    type: String,
    required: true,
    trim: true,
  },
  nickname: {
    type: String,
    required: true,
    trim: true,
  },
  birthday: {
    type: Date,
    required: true,
    trim: true,
  },
  contactInfo,
});

/**
 * @typedef BasicInfo
 */
const BasicInfo = mongoose.model('BasicInfo', basicInfoSchema);

module.exports = BasicInfo;
