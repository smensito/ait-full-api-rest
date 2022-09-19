const httpStatus = require('http-status');
const pick = require('../utils/pick');
// const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { clubService } = require('../services');
const logger = require('../config/logger');

const getClubs = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['basicInfo.createdDate']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await clubService.queryClubs(filter, options);
  res.send(result);
});

const createClub = catchAsync(async (req, res) => {
  const club = await clubService.createClub(req.body);
  res.status(httpStatus.CREATED).send(club);
});

const updateClubById = catchAsync(async (req, res) => {
  const { clubId } = req.params;

  const club = await clubService.updateClubById(clubId, req.body);
  res.send(club);
});

const removeClubById = catchAsync(async (req, res) => {
  const { clubId } = req.params;
  await clubService.removeClubById(clubId);
  res.status(httpStatus.NO_CONTENT).send(clubId);
});

module.exports = {
  getClubs,
  createClub,
  updateClubById,
  removeClubById,
};
