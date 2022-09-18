const mongoose = require('mongoose');

const { toJSON, paginate } = require('./plugins');
// const logger = require('../config/logger');

const basicInfoSchema = mongoose.Schema({
  name: { type: String },
  createdDate: { type: String },
  history: { type: String },
});

const rugbyYearInClubSchema = mongoose.Schema({
  year: { type: Number },
  rugbyYearId: { type: String },
});

const clubSchema = mongoose.Schema({
  basicInfo: basicInfoSchema,
  years: [rugbyYearInClubSchema],
});

/**
 * Check if club is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
clubSchema.statics.isClubTaken = async function (basicInfo, excludeClubId) {
  const { name } = basicInfo;
  const club = await this.findOne({ 'basicInfo.name': name, _id: { $ne: excludeClubId } });
  return !!club;
};

// add plugin that converts mongoose to json
clubSchema.plugin(toJSON);
clubSchema.plugin(paginate);

/**
 * @typedef ClubSchema
 */
const ClubSchema = mongoose.model('Club', clubSchema);

module.exports = ClubSchema;
