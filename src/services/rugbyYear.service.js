const httpStatus = require('http-status');
const { RugbyYear, Training } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create new training
 * @param {Object} trainingBody
 * @returns {Promise<Training>}
 */
const createRugbyYear = async (rugbyYearBody) => {
  if (await RugbyYear.existsRugbyYear(rugbyYearBody.date)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Rugby year already exists');
  }

  return RugbyYear.create(rugbyYearBody);
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
 * Participate in an existing training
 * @param {Object} trainingBody
 * @returns {Promise<Training>}
 */
const participateTraining = async (participateParams, participateBody) => {
  /*
  if (await Training.isParticipating(participateParams.trainingId, participateBody.userId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'This player already participates in the training');
  }
  */
  const { trainingId } = participateParams;

  const training = await getTrainingById(trainingId);

  training.players.push(participateBody);

  Object.assign(training, participateBody);
  await training.save();

  return training;
};

/**
 * Participate in an existing training
 * @param {Object} trainingBody
 * @returns {Promise<Training>}
 */
const unsubscribeTraining = async (unsubscribeParams) => {
  const { userId, trainingId } = unsubscribeParams;

  const training = await getTrainingById(trainingId);

  training.players = training.players.filter((player) => {
    return player.userId !== userId;
  });

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
  createRugbyYear,
  participateTraining,
  unsubscribeTraining,
  queryTrainings,
  getTrainingById,
  getLastTraining,
  updateTrainingById,
  deleteTrainingById,
};
