const mongoose = require('mongoose');

const contactInfoId = mongoose.Types.ObjectId;

const contactInfoSchema = mongoose.Schema({
  user: { type: contactInfoId, ref: 'BasicInfo' }, // overriding _id with ObjectId
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
});

/**
 * @typedef ContactInfo
 */
const ContactInfo = mongoose.model('ContactInfo', contactInfoSchema);

module.exports = ContactInfo;
