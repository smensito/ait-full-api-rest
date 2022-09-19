const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
// const logger = require('../config/logger');

const statsSchema = mongoose.Schema({
  numberPlayers: { type: Number },
  stars: { type: Number },
});

const playerInTrainingSchema = mongoose.Schema(
  {
    userId: { type: String },
    nickname: { type: String },
    isParticipate: { type: Boolean },
    feedback: { type: String },
    stars: { type: Number },
  },
  { _id: false }
);

// TODO: Añadir required true a season ID
const trainingSchema = mongoose.Schema({
  seasonId: {
    type: String,
    required: false,
    trim: true,
  },
  players: [playerInTrainingSchema],
  date: {
    type: Date,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  stats: statsSchema,
});

/**
 * Check if training already exists by ID
 * @param {string} trainingId - Training ID
 * @returns {Promise<boolean>}
 */
trainingSchema.statics.existsTraining = async function (trainingId) {
  const training = await this.findOne({ _id: trainingId });
  return !!training;
};

/**
 * Check if training already exists by date
 * @param {Date} date - Training day
 * @returns {Promise<boolean>}
 */
trainingSchema.statics.existsTrainingByDate = async function (date) {
  const training = await this.findOne({ date });
  return !!training;
};

/**
 * Check if the player already participates in the training
 * @param {string} userId - Player id
 * @returns {Promise<boolean>}
 */
trainingSchema.statics.isParticipating = async function (training, playerId) {
  const { players } = training;

  const isFound = players.some((player) => {
    if (player.userId === playerId) {
      return true;
    }

    return false;
  });

  return isFound;
};

// add plugin that converts mongoose to json
trainingSchema.plugin(toJSON);
trainingSchema.plugin(paginate);

/**
 * @typedef Training
 */
const Training = mongoose.model('Training', trainingSchema);

module.exports = Training;
