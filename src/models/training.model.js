const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const logger = require('../config/logger');

const trainingSchema = mongoose.Schema({
  players: [{ userId: { type: String }, nickname: { type: String }, isParticipate: { type: Boolean } }],
  feedback: {
    type: String,
    required: false,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
    trim: true,
  },
});

/**
 * Check if training already exists by date
 * @param {Date} date - Training day
 * @returns {Promise<boolean>}
 */
trainingSchema.statics.existsTraining = async function (date) {
  const training = await this.findOne({ date });
  return !!training;
};

/**
 * Check if the player already participates in the training
 * @param {string} userId - Player id
 * @returns {Promise<boolean>}
 */
trainingSchema.statics.isParticipating = async function (trainingId, playerId) {
  logger.info(playerId);
  const isParticipate = await this.findOne({ id: trainingId });
  return !!isParticipate;
};

// add plugin that converts mongoose to json
trainingSchema.plugin(toJSON);
trainingSchema.plugin(paginate);

/**
 * @typedef Training
 */
const Training = mongoose.model('Training', trainingSchema);

module.exports = Training;
