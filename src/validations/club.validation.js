const Joi = require('joi');
const { objectId } = require('./custom.validation');

const basicInfoValidation = Joi.object().keys({
  name: Joi.string().required(),
  createdDate: Joi.date().required(),
  history: Joi.string(),
});

const rugbyYearInClub = Joi.object().keys({
  year: Joi.number(),
  rugbyYearId: Joi.string().custom(objectId),
});

const clubValidation = Joi.object().keys({
  basicInfo: basicInfoValidation.required(),
  years: Joi.array().items(rugbyYearInClub),
});

const getClubs = {
  query: Joi.object().keys({
    club: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getClub = {
  params: Joi.object().keys({
    clubId: Joi.string().custom(objectId),
  }),
};

const createClub = {
  body: clubValidation,
};

const updateClub = {
  params: Joi.object().keys({
    clubId: Joi.string().custom(objectId),
  }),
  body: clubValidation,
};

const removeClub = {
  params: Joi.object().keys({
    clubId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  getClub,
  getClubs,
  createClub,
  updateClub,
  removeClub,
};
