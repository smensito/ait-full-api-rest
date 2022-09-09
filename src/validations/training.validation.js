const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createTraining = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    trainingname: Joi.string().required(),
    role: Joi.string().required().valid('training', 'admin'),
  }),
};

const getTrainings = {
  query: Joi.object().keys({
    training: Joi.string(),
    role: Joi.string(),
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
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      trainingname: Joi.string(),
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
