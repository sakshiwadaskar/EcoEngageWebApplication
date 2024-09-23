import mongoose from 'mongoose';
import schemaConfig from './schema-config.js';

const eventSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  eventStartDate: {
    type: Date,
    required: true,
    default: Date.now()
  },
  eventEndDate: {
    type: Date,
    required: true,
    default: Date.now()
  },
  usersRegistered: {
    type: [mongoose.ObjectId],
    required: true
  },
  images: {
    type: [String],
  },
  location: {
    address1: {
      type: String,
      required: true
    },
    address2: {
      type: String,
      default: ''
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zipCode: {
      type: String,
      required: true
    },
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  }
}, schemaConfig);

const Event = mongoose.model('event', eventSchema);
export default Event;