const httpStatus = require('http-status');
// const pick = require('../utils/pick');
// const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { clubService } = require('../services');
// const logger = require('../config/logger');

const createClub = catchAsync(async (req, res) => {
  const club = await clubService.createClub(req.body);
  res.status(httpStatus.CREATED).send(club);
});

module.exports = {
  createClub,
};
