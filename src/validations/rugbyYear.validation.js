const Joi = require('joi');
const seasonEnum = require('../utils/enums/seasonEnum');
// const { objectId } = require('./custom.validation');

const trainingsValidation = Joi.object().keys({
  trainingId: Joi.string(),
  title: Joi.boolean(),
  date: Joi.date(),
});

const seasonStatsValidation = Joi.object().keys({
  numberPlayers: Joi.number(),
  stars: Joi.number(),
});

const seasonValidation = Joi.object().keys({
  seasonType: Joi.object(seasonEnum),
  trainings: Joi.array().items(trainingsValidation),
  statistics: Joi.object(seasonStatsValidation),
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

const createRugbyYear = {
  body: Joi.object().keys({
    seasons: Joi.array().items(seasonValidation),
    players: Joi.array().items(userValidation),
    coaches: Joi.array().items(userValidation),
    assistants: Joi.array().items(userValidation),
    statistics: Joi.object(rugbyYearStatsValidation),
  }),
};

// Delete rugby year

// upd rugby year

// add players

// delete players

// add training

// delete training

module.exports = {
  createRugbyYear,
};
