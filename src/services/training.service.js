const httpStatus = require('http-status');
const { Training } = require('../models');
const { userService } = require('./index');
const ApiError = require('../utils/ApiError');
// const logger = require('../config/logger');

/**
 * Create new training
 * @param {Object} trainingBody
 * @returns {Promise<Training>}
 */
const createTraining = async (trainingBody) => {
  if (await Training.existsTrainingByDate(trainingBody.date)) {
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
  const training = await Training.findById(id);

  if (!training) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Training not found');
  }
  return training;
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

  Object.assign(training, updateBody);

  await training.save();
  return training;
};

/**
 * Participate in an existing training
 * Insert player in players list. And update the trainings where the player participates
 * @param {Object} trainingBody
 * @returns {Promise<Training>}
 */
const participateTraining = async (participateParams, participateBody) => {
  if (await !Training.existsTraining(participateParams.trainingId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Training does not exists');
  }

  const { trainingId } = participateParams;
  const training = await getTrainingById(trainingId);

  if (await Training.isParticipating(training, participateBody.userId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'This player already participates in the training');
  }

  // Insert in training array
  training.players.push(participateBody);
  Object.assign(training, participateBody);

  // Update user list of joined trainings
  const { userId } = participateBody;
  const player = await userService.getUserById(userId);

  const trainingAttendance = {
    trainingId,
    title: training.title,
    date: training.date,
  };

  player.trainingAttendance.push(trainingAttendance);

  await training.save();
  await player.save();

  return training;
};

/**
 * Unsubscribe from an existing training
 * @param {Object} trainingBody
 * @returns {Promise<Training>}
 */
const unsubscribeTraining = async (unsubscribeParams) => {
  const { userId, trainingId } = unsubscribeParams;

  const training = await getTrainingById(trainingId);

  const player = await userService.getUserById(userId);

  training.players = training.players.filter((p) => {
    return p.userId !== userId;
  });

  player.trainingAttendance = player.trainingAttendance.filter((t) => {
    return t.trainingId !== trainingId;
  });

  await player.save();
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
  participateTraining,
  unsubscribeTraining,
  queryTrainings,
  getTrainingById,
  getLastTraining,
  updateTrainingById,
  deleteTrainingById,
};
