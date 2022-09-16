const Joi = require('joi');
const { objectId } = require('./custom.validation');

const trainingsValidation = Joi.object().keys({
  trainingId: Joi.string(),
  title: Joi.string(),
  date: Joi.date(),
});

const seasonStatsValidation = Joi.object().keys({
  numberPlayers: Joi.number(),
  stars: Joi.number(),
});

const seasonValidation = Joi.object().keys({
  seasonType: Joi.string().valid('spring', 'summer', 'autumn', 'winter'),
  trainings: Joi.array().items(trainingsValidation),
  statistics: seasonStatsValidation,
});

const userValidation = Joi.object().keys({
  userId: Joi.string(),
  nickname: Joi.string(),
  name: Joi.string(),
  surname: Joi.string(),
});

const rugbyYearStatsValidation = Joi.object().keys({
  numberPlayers: Joi.number(),
  stars: Joi.number(),
});

const rugbyYearValidation = Joi.object().keys({
  year: Joi.number().required(),
  seasons: Joi.array().items(seasonValidation),
  players: Joi.array().items(userValidation),
  coaches: Joi.array().items(userValidation),
  assistants: Joi.array().items(userValidation),
  statistics: rugbyYearStatsValidation,
});

const createRugbyYear = {
  body: rugbyYearValidation,
};

/*
const getAllRugbyYears = {
  params: Joi.object().keys({

  })
}
*/

// Remove rugby year
const removeRugbyYear = {
  params: Joi.object().keys({
    rugbyYearId: Joi.string().custom(objectId),
  }),
};

// upd rugby year
const updateRugbyYear = {
  params: Joi.object().keys({
    rugbyYearId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      rugbyYear: rugbyYearValidation,
    })
    .min(1),
};

// Add season
const createSeason = {
  params: Joi.object().keys({
    rugbyYearId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    season: seasonValidation,
  }),
};

// Get all seasons by rugby year id
const getAllSeasonsByRugbyYearId = {
  params: Joi.object().keys({
    rugbyYearId: Joi.required().custom(objectId),
  }),
};

// Get season by id
const getSeasonById = {
  params: Joi.object().keys({
    seasonId: Joi.required().custom(objectId),
  }),
};

// Remove season
const removeSeasonById = {
  params: Joi.object().keys({
    seasonId: Joi.required().custom(objectId),
  }),
};

// Upd Season
const updSeasonById = {
  params: Joi.object().keys({
    seasonId: Joi.required().custom(objectId),
  }),
};

// add players to season
const addPlayersToSeason = {
  params: Joi.object().keys({
    seasonId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    players: [userValidation],
  }),
};

// delete players
/**
 * Params: Season ID
 * Body:
 * players => [playerId: String]
 */
const removePlayersFromSeason = {
  params: Joi.object().keys({
    seasonId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    players: [Joi.required().custom(objectId)],
  }),
};

// add training
const addTrainingToSeason = {
  params: Joi.object().keys({
    seasonId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    training: trainingsValidation,
  }),
};

// delete training
const removeTrainingToSeason = {
  params: Joi.object().keys({
    seasonId: Joi.required().custom(objectId),
    trainingId: Joi.required().custom(objectId),
  }),
};

module.exports = {
  createRugbyYear,
  removeRugbyYear,
  updateRugbyYear,
  createSeason,
  getAllSeasonsByRugbyYearId,
  getSeasonById,
  removeSeasonById,
  updSeasonById,
  addPlayersToSeason,
  removePlayersFromSeason,
  addTrainingToSeason,
  removeTrainingToSeason,
};
