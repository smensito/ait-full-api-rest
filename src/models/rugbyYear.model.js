const mongoose = require('mongoose');

const { toJSON, paginate } = require('./plugins');

const playerInYearSchema = mongoose.Schema({
  userId: { type: String },
  nickname: { type: String },
  name: { type: String },
  surname: { type: String },
});

const coachInYearSchema = mongoose.Schema({
  userId: { type: String },
  nickname: { type: String },
  name: { type: String },
  surname: { type: String },
});

const assistantInYearSchema = mongoose.Schema({
  userId: { type: String },
  nickname: { type: String },
  name: { type: String },
  surname: { type: String },
});

const trainingInSeasonSchema = mongoose.Schema({
  trainingId: { type: String },
  title: { type: String },
  date: { type: String },
});

const yearlyStatsSchema = mongoose.Schema({});

const seasonStatsSchema = mongoose.Schema({});

const seasonEnumSchema = mongoose.Schema({
  type: String,
  enum: ['spring', 'summer', 'autumn', 'winter'],
  default: ['spring'],
});

const seasonSchema = mongoose.Schema({
  seasonType: seasonEnumSchema,
  players: [playerInYearSchema],
  trainings: [trainingInSeasonSchema],
  seasonStats: seasonStatsSchema,
});

const rugbyYearSchema = mongoose.Schema({
  year: Number,
  season: seasonSchema,
  players: playerInYearSchema,
  coaches: coachInYearSchema,
  assistants: assistantInYearSchema,
  stats: yearlyStatsSchema,
});

/**
 * Check if rugby year already exists
 * @param {Date} date - Training day
 * @returns {Promise<boolean>}
 */
rugbyYearSchema.statics.existsRugbyYear = async function (year) {
  const rugbyYear = await this.findOne({ year });
  return !!rugbyYear;
};

// add plugin that converts mongoose to json
rugbyYearSchema.plugin(toJSON);
rugbyYearSchema.plugin(paginate);

/**
 * @typedef RugbyYear
 */
const RugbyYear = mongoose.model('RugbyYear', rugbyYearSchema);

module.exports = RugbyYear;
