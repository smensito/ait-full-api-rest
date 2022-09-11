const httpStatus = require('http-status');
const { Training } = require('../models');
const ApiError = require('../utils/ApiError');
// const logger = require('../config/logger');

/**
 * Create new training
 * @param {Object} trainingBody
 * @returns {Promise<Training>}
 */
const createTraining = async (trainingBody) => {
  if (await Training.existsTraining(trainingBody.date)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Training already exists for this day');
  }
  return Training.create(trainingBody);
};

/**
 * Query for trainings
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryTrainings = async (filter, options) => {
  const trainings = await Training.paginate(filter, options);
  return trainings;
};

/**
 * Get training by id
 * @param {ObjectId} id
 * @returns {Promise<Training>}
 */
const getTrainingById = async (id) => {
  return Training.findById(id);
};

/**
 * Get last training
 * @returns {Promise<Training>}
 */
const getLastTraining = async () => {
  return Training.find().sort({ _id: -1 }).limit(1);
};

/**
 * Update training by id
 * @param {ObjectId} trainingId
 * @param {Object} updateBody
 * @returns {Promise<Training>}
 */
const updateTrainingById = async (trainingId, updateBody) => {
  const training = await getTrainingById(trainingId);
  if (!training) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Training not found');
  }

  Object.assign(training, updateBody);
  await training.save();
  return training;
};

/**
 * Delete training by id
 * @param {ObjectId} trainingId
 * @returns {Promise<Training>}
 */
const deleteTrainingById = async (trainingId) => {
  const training = await getTrainingById(trainingId);
  if (!training) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Training not found');
  }
  await training.remove();
  return training;
};

module.exports = {
  createTraining,
  queryTrainings,
  getTrainingById,
  getLastTraining,
  updateTrainingById,
  deleteTrainingById,
};
