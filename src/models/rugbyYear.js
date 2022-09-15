const mongoose = require('mongoose');

const SPRING = 'spring';
const SUMMER = 'summer';
const AUTUMN = 'autumn';
const WINTER = 'winter';

const seasonEnum = { spring: SPRING, summer: SUMMER, autumn: AUTUMN, winter: WINTER };

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

const seasonSchema = mongoose.Schema({
  seasonType: seasonEnum,
  players: [playerInYearSchema],
  trainings: [trainingInSeasonSchema],
  seasonStats: seasonStatsSchema,
});

const rugbyYearSchema = mongoose.Schema({
  season: seasonSchema,
  players: playerInYearSchema,
  coaches: coachInYearSchema,
  assistants: assistantInYearSchema,
  stats: yearlyStatsSchema,
});

module.exports = rugbyYearSchema;
