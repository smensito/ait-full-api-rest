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
  const { basicInfo } = clubBody;

  if (await Club.isClubTaken(basicInfo)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Club already exists');
  }

  return Club.create(clubBody);
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
const queryClubs = async (filter, options) => {
  const clubs = await Club.paginate(filter, options);
  return clubs;
};

/**
 * Create new club
 * @param {Object} clubBody
 * @returns {Promise<Club>}
 */
const removeClubById = async (id) => {
  logger.info(id);

  if (await !Club.isExists(id)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Club does not exists');
  }

  await Club.deleteOne({ _id: id });

  return id;
};

module.exports = {
  createClub,
  removeClubById,
  queryClubs,
};
