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

const createClub = {
  body: clubValidation,
};

module.exports = {
  createClub,
};
