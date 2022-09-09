const mongoose = require('mongoose');

const { user } = require('./user.model');

const trainingSchema = mongoose.Schema({
  players: [{ user }],
  feedback: {
    type: String,
    required: true,
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
 * @typedef Training
 */
const Training = mongoose.model('Training', trainingSchema);

module.exports = Training;
