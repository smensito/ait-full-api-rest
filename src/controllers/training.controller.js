const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { trainingService } = require('../services');

const createTraining = catchAsync(async (req, res) => {
  const training = await trainingService.createTraining(req.body);
  res.status(httpStatus.CREATED).send(training);
});

const getTrainings = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['username', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await trainingService.queryTrainings(filter, options);
  res.send(result);
});

const getTraining = catchAsync(async (req, res) => {
  const training = await trainingService.getTrainingById(req.params.trainingId);
  if (!training) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Training not found');
  }
  res.send(training);
});

const updateTraining = catchAsync(async (req, res) => {
  const training = await trainingService.updateTrainingById(req.params.trainingId, req.body);
  res.send(training);
});

const deleteTraining = catchAsync(async (req, res) => {
  await trainingService.deleteTrainingById(req.params.trainingId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createTraining,
  getTrainings,
  getTraining,
  updateTraining,
  deleteTraining,
};
