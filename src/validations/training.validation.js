const Joi = require('joi');
const { objectId } = require('./custom.validation');

const playerValidation = Joi.object().keys({
  userId: Joi.string(),
  nickname: Joi.string(),
  isParticipate: Joi.boolean(),
  feedback: Joi.string(),
  start: Joi.number(),
});

const statsValidation = Joi.object().keys({
  numberPlayers: Joi.number(),
  start: Joi.number(),
});

const trainingValidation = Joi.object().keys({
  seasonId: Joi.string(),
  players: Joi.array().items(playerValidation),
  date: Joi.date(),
  title: Joi.string(),
  description: Joi.string(),
  stats: statsValidation,
});

const createTraining = {
  body: trainingValidation,
};

const participateTraining = {
  body: Joi.object().keys({
    userId: Joi.string(),
    nickname: Joi.string(),
    isParticipate: Joi.boolean().required(),
  }),
};

const unsubscribeTraining = {
  params: Joi.object().keys({
    trainingId: Joi.string().custom(objectId),
    userId: Joi.string().custom(objectId),
  }),
};

const getTrainings = {
  query: Joi.object().keys({
    training: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getTraining = {
  params: Joi.object().keys({
    trainingId: Joi.string().custom(objectId),
  }),
};

const updateTraining = {
  params: Joi.object().keys({
    trainingId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      players: [
        {
          userId: Joi.string(),
          isParticipate: Joi.boolean(),
          nickname: Joi.string(),
        },
      ],
      feedback: Joi.string().optional().allow(''),
      date: Joi.date().required(),
    })
    .min(1),
};

const deleteTraining = {
  params: Joi.object().keys({
    trainingId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createTraining,
  participateTraining,
  unsubscribeTraining,
  getTrainings,
  getTraining,
  updateTraining,
  deleteTraining,
};
