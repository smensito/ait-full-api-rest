const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createTraining = {
  body: Joi.object().keys({
    players: Joi.array(),
    feedback: Joi.string().optional().allow(''),
    date: Joi.date().required(),
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
      players: Joi.array(),
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
  getTrainings,
  getTraining,
  updateTraining,
  deleteTraining,
};
