const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const userId = mongoose.Types.ObjectId;

const trainingSchema = mongoose.Schema({
  players: [{ type: userId, ref: 'User' }],
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

// add plugin that converts mongoose to json
trainingSchema.plugin(toJSON);
trainingSchema.plugin(paginate);

/**
 * @typedef Training
 */
const Training = mongoose.model('Training', trainingSchema);

module.exports = Training;
