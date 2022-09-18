const httpStatus = require('http-status');
const { Club } = require('../models');
const ApiError = require('../utils/ApiError');

const logger = require('../config/logger');

/**
 * Create new club
 * @param {Object} clubBody
 * @returns {Promise<Club>}
 */
const createClub = async (clubBody) => {
  logger.info(JSON.stringify(clubBody));
  const { basicInfo } = clubBody;

  if (await Club.isClubTaken(basicInfo)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Club already exists');
  }

  return Club.create(clubBody);
};

module.exports = {
  createClub,
};
